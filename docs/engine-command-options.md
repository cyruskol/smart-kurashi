# Engine Command Options

This directory contains scripts for the Smart Kurashi content scraper engine. Each script implements a different waiting strategy before scraping.

## Scripts

### 1. `preflight-check.js` - Model State Check with Wait

Verifies LM Studio model state and waits when busy. This is the most robust option when you have access to LM Studio's API endpoints.

**Features:**
- Checks if qwen3.5-9b:reasoning model is loaded
- Monitors GPU utilization
- Waits when model is being used by other clients
- Configurable wait timeout via `ENGINE_MODEL_WAIT_SECONDS` environment variable (default: 3 seconds)

**Usage:**
```bash
# Basic usage
node scripts/engine/preflight-check.js

# With debug output
DEBUG=true node scripts/engine/preflight-check.js

# Custom wait timeout
ENGINE_MODEL_WAIT_SECONDS=10 node scripts/engine/preflight-check.js
```

**Expected outputs:**
- `[OK] Model is loaded, currently used by 0 client(s)` - Ready to proceed
- `[Busy] Model is currently busy... Pausing for X seconds` - Waiting before scrape
- `[Error] Failed to parse ready response` - API error (check LM Studio status)

### 2. `preflight-check-simple.js` - Simple Load Count Check

Checks model load count via `/v1/load-count` endpoint. Falls back to simple wait if model appears to be in use.

**Features:**
- Checks `/v1/load-count` for concurrent client count
- Waits when multiple clients are using the model
- Simpler, doesn't require GPU metrics
- Default wait time: 3 seconds

**Usage:**
```bash
node scripts/engine/preflight-check-simple.js

# With debug output
DEBUG=true node scripts/engine/preflight-check-simple.js
```

**Expected outputs:**
- `[OK] Model is loaded, currently used by 0 client(s)` - Ready to proceed
- `[Info] Model is in use. Waiting Xs before scraping...` - Pausing before scrape
- `[Warning] Model does not appear to be loaded` - Requires manual load

### 3. `deploy-check.js` - Vercel Deployment Verification

Verifies that the Smart Kurashi site is properly deployed on Vercel. This checks:

**Features:**
- Checks HTTPS endpoint accessibility
- Verifies home page responds with status 200
- Checks about page for basic routing verification
- Handles expected 404 states gracefully (new deployments)

**Usage:**
```bash
# Basic usage
node scripts/vercel/deploy-check.js

# With debug output (shows full response body)
DEBUG=true node scripts/vercel/deploy-check.js
```

**Expected outputs:**
- `[OK] Home page is accessible (status 200)` - Deployment successful
- `[Warning] Home page returned status 404` - Routes not set up yet (common for new deploys)
- `[Error] Unexpected error` - Deployment issue (needs investigation)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ENGINE_MODEL_WAIT_SECONDS` | Wait duration in seconds when model is busy | 3 |
| `DEBUG` | Enable verbose debug output | false |

## Integration

These scripts are called from cron jobs:
- `Engine-daemon` - Continuous monitoring and scraping
- `Site-Monitor` - Vercel deployment checks every 2 hours
- `Health-Check` - Engine status checks every 6 hours

## Workflow

### For Scraping Tasks (preflight-check.js)

```bash
# Before scraping, run preflight check
ENGINE_MODEL_WAIT_SECONDS=3 node scripts/engine/preflight-check-simple.js
npm test -- e2e/engine/wait.spec.js
node scripts/vercel/deploy-check.js
hermes kanban complete $TASK_ID --summary "scrape completed" --metadata '{"source": "smart-kurashi", ...'
```

### For Deployment Monitoring (deploy-check.js)

```bash
# Check deployment status every 2 hours via cron
node scripts/vercel/deploy-check.js
hermes kanban complete $TASK_ID --summary "deployment verified" --metadata '{"deploy_url": "https://smart-kurashi-git-main-cyruskol.vercel.app", ...'
```

## Notes

- All scripts handle errors gracefully and exit with appropriate codes
- Debug mode (`DEBUG=true`) shows full response bodies for troubleshooting
- Scripts are designed to work within cron job constraints (5-minute timeouts)
- For model-related waits, the environment variable `ENGINE_MODEL_WAIT_SECONDS` can be adjusted
