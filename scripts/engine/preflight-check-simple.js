/**
 * Engine Pre-flight Check Script (Simplified)
 * 
 * This script verifies the model state and waits when busy.
 * 
 * Usage: node scripts/engine/preflight-check.js
 */

const http = require('http');

const ENGINE_API_URL = 'http://localhost:1234';
const WAIT_SECONDS = 3;
const DEBUG = process.env.DEBUG === 'true';

/**
 * Check if model is loaded via /v1/models endpoint
 */
async function checkModelLoaded() {
  return new Promise((resolve, reject) => {
    http.get(`${ENGINE_API_URL}/v1/models`, (res) => {
      let data = '';
      
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const models = typeof data === 'string' ? JSON.parse(data) : data;
            
            // Find the qwen3.5-9b:reasoning model
            const targetModel = Object.values(models.models).find(
              m => m.name && m.name.includes('qwen')
            );
            
            const state = {
              loaded: !!targetModel,
              name: targetModel?.name || null,
              status: targetModel?.status || 'unknown'
            };
            
            if (DEBUG) {
              console.log('[Loaded] Model state:', JSON.stringify(state, null, 2));
            }
            
            resolve(state);
          } catch (e) {
            reject(new Error(`Failed to parse models response: ${e.message}`));
          }
        } else {
          reject(new Error(`Status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Check current model load count (how many clients are using it)
 */
async function checkModelLoadCount() {
  return new Promise((resolve, reject) => {
    http.get(`${ENGINE_API_URL}/v1/load-count`, (res) => {
      let data = '';
      
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const loadCount = typeof data === 'string' ? JSON.parse(data) : data;
            const count = loadCount?.count || 0;
            
            if (DEBUG) {
              console.log('[LoadCount] Current load:', count, 'clients');
            }
            
            resolve(count);
          } catch (e) {
            reject(new Error(`Failed to parse load-count: ${e.message}`));
          }
        } else {
          reject(new Error(`Status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Check GPU utilization percentage
 */
async function checkGPUUtilization() {
  return new Promise((resolve, reject) => {
    http.get(`${ENGINE_API_URL}/v1/gpu-util`, (res) => {
      let data = '';
      
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const gpuUtil = typeof data === 'string' ? JSON.parse(data) : data;
            const percent = gpuUtil?.utilization || null;
            
            if (DEBUG) {
              console.log('[GPU] Utilization:', percent ? `${percent}%` : 'N/A');
            }
            
            resolve(percent);
          } catch (e) {
            reject(new Error(`Failed to parse gpu-util: ${e.message}`));
          }
        } else if (res.statusCode === 404) {
          // Endpoint doesn't exist, return null
          resolve(null);
        } else {
          reject(new Error(`Status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Main execution flow
 */
async function main() {
  console.log('[Engine] Checking model state before scraping...');
  console.log(`[Engine] Using: ${ENGINE_API_URL}`);
  
  try {
    // Check if model is loaded
    const loadedState = await checkModelLoaded();
    
    if (!loadedState.loaded) {
      console.log('[Warning] Model does not appear to be loaded');
      console.log('[Engine] Make sure the model is loaded before scraping:');
      console.log('[Engine]   curl -X POST http://localhost:1234/internal/next-model');
      process.exitCode = 1;
      return;
    }
    
    // Check load count (number of clients using the model)
    const loadCount = await checkModelLoadCount();
    console.log(`[OK] Model is loaded, currently used by ${loadCount} client(s)`);
    
    // Check GPU utilization if endpoint exists
    const gpuUtil = await checkGPUUtilization();
    
    // If load count > 0 or GPU is in use, wait before scraping
    if (loadCount > 0 || gpuUtil) {
      console.log(`[Info] Model is in use. Waiting ${WAIT_SECONDS}s before scraping...`);
      
      await new Promise(resolve => setTimeout(resolve, WAIT_SECONDS * 1000));
      console.log('[OK] Wait period completed');
    } else {
      console.log('[OK] Model is free. Proceeding with scrape.');
    }
    
    console.log('[Engine] Pre-flight check passed!');
    
  } catch (error) {
    console.error('[Error]', error.message);
    process.exitCode = 1;
  }
}

main();
