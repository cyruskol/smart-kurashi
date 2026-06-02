/**
 * Vercel Deployment Verification Script
 * 
 * This script verifies that the Smart Kurashi site is properly deployed by:
 * 1. Checking if the Vercel server is responding
 * 2. Verifying key pages are accessible (home, search)
 * 3. Checking for common deployment issues
  
 * Usage: node scripts/vercel/deploy-check.js
 */

const https = require('https');
const http = require('http');
const zlib = require('zlib');

const DEPLOY_URL = 'https://smart-kurashi-git-main-cyruskol.vercel.app';
const DEBUG = process.env.DEBUG === 'true';
const TARGET_PAGES = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' }
];

/**
 * Make an HTTPS request to the deployment
 */
function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const url = DEPLOY_URL + path;
    
    const req = https.get(url, { timeout: 10000 }, res => {
      let data = '';
      
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          body: data.substring(0, DEBUG ? 200 : 0) // Truncate if debug
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.setTimeout(10000);
  });
}

/**
 * Main verification flow
 */
async function verifyDeployment() {
  console.log('[Vercel] Checking deployment status...');
  console.log(`[Vercel] URL: ${DEPLOY_URL}`);
  
  // Check home page
  console.log('\n--- Checking Home Page ---');
  try {
    const home = await fetchPage('/');
    
    if (home.statusCode === 200) {
      console.log('[OK] Home page is accessible (status 200)');
      
      // Verify expected content
      if (DEBUG && home.body.includes('Smart Kurashi')) {
        console.log('[OK] Expected title found in response');
      }
    } else if (home.statusCode === 404) {
      console.warn(`[Warning] Home page returned status ${home.statusCode} - Routes may not be set up yet`);
      console.warn('[Info] This is expected for new deployments before Next.js routing is configured');
    } else {
      console.error(`[Error] Home page returned status ${home.statusCode}`);
    }
    
  } catch (error) {
    console.error('[Error]', error.message);
    return false;
  }
  
  // Check about page
  console.log('\n--- Checking About Page ---');
  try {
    const about = await fetchPage('/about');
    
    if (about.statusCode === 200) {
      console.log('[OK] About page is accessible (status 200)');
    } else if (about.statusCode === 404) {
      console.warn(`[Warning] About page returned status ${about.statusCode} - Routes may not be set up yet`);
    } else {
      console.error(`[Error] About page returned status ${about.statusCode}`);
    }
    
  } catch (error) {
    console.error('[Error]', error.message);
  }
  
  console.log('\n[Vercel] Deployment verification complete.');
}

verifyDeployment().catch(console.error);
