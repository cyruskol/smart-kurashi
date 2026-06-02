/**
 * Engine Pre-flight Check Script
 * 
 * This script verifies the engine is ready for scraping by:
 * 1. Checking if the LM Studio model is loaded
 * 2. Checking GPU utilization to detect busy state
 * 3. Waiting when model is busy (configured via ENGINE_MODEL_WAIT_SECONDS)
 * 
 * Usage:
 *   node scripts/engine/preflight-check.js
 */

const http = require('http');

const ENGINE_API_URL = 'http://localhost:1234/ready';
const ENGINE_MODEL_WAIT_SECONDS = process.env.ENGINE_MODEL_WAIT_SECONDS || 3;
const DEBUG = process.env.DEBUG === 'true';

/**
 * Parse the ready endpoint response to check model state
 */
function parseReadyResponse(body) {
  try {
    const data = typeof body === 'string' ? JSON.parse(body) : body;
    
    return {
      loaded: data.loaded,
      busy: data.busy || 0,
      gpuUsage: data.gpu?.usage || null,
      error: data.error || null
    };
  } catch (e) {
    console.error('[Error] Failed to parse ready response:', e.message);
    return { error: `Parse error: ${e.message}` };
  }
}

/**
 * Fetch and parse the ready endpoint
 */
function checkReady() {
  return new Promise((resolve, reject) => {
    http.get(ENGINE_API_URL, (res) => {
      let data = '';
      
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Ready endpoint returned status ${res.statusCode}`));
          return;
        }
        
        const state = parseReadyResponse(data);
        
        if (DEBUG) {
          console.log('[Ready] Status:', JSON.stringify(state, null, 2));
        }
        
        resolve(state);
      });
    }).on('error', reject);
  });
}

/**
 * Main execution flow
 */
async function main() {
  console.log('[Engine] Checking model state before scraping...');
  console.log(`[Engine] API URL: ${ENGINE_API_URL}`);
  console.log(`[Engine] Wait timeout: ${ENGINE_MODEL_WAIT_SECONDS}s`);
  
  try {
    const state = await checkReady();
    
    if (state.error) {
      console.error('[Error]', state.error);
      process.exitCode = 1;
      return;
    }
    
    // Check if model is loaded
    if (!state.loaded) {
      console.log('[Warning] Model is not loaded. Please ensure it\'s loaded before scraping.');
      console.log('[Engine] Load model via: curl -X POST http://localhost:1234/internal/next-model');
      process.exitCode = 1;
      return;
    }
    
    // Check if model is busy
    if (state.busy > 0) {
      console.log('[Busy] Model is currently busy (concurrent requests:', state.busy, ')');
      
      if (DEBUG) {
        console.log(`[Engine] Pausing for ${ENGINE_MODEL_WAIT_SECONDS} seconds...`);
      }
      
      // Wait for the configured duration
      const waitMs = ENGINE_MODEL_WAIT_SECONDS * 1000;
      await new Promise(resolve => setTimeout(resolve, waitMs));
      
      console.log('[Done] Wait period completed');
    } else {
      console.log('[OK] Model is idle and ready');
    }
    
    // Final check after potential wait
    if (DEBUG) {
      const finalState = await checkReady();
      console.log('[Final] Status:', JSON.stringify(finalState, null, 2));
    }
    
    console.log('[Engine] Pre-flight check passed. Ready for scraping.');
    
  } catch (error) {
    console.error('[Error]', error.message);
    process.exitCode = 1;
  }
}

main();
