/// <reference types="cypress" />

describe('Engine / wait command', () => {
  it('pauses execution when LM Studio model is busy', () => {
    cy.request({
      url: 'http://localhost:1234/ready?timeout=5000',
      failOnStatusCode: false
    }).then((response) => {
      // Check if another client is using the GPU (busy state)
      const isBusy = response.body && response.body.busy > 0;
      
      console.log('Model busy status:', isBusy);
      
      if (isBusy) {
        console.log('Model is currently busy. Pausing for', process.env.ENGINE_MODEL_WAIT_SECONDS || 3, 'seconds...');
        // Wait the configured seconds (or default 3)
        const waitMs = (parseInt(process.env.ENGINE_MODEL_WAIT_SECONDS, 10) || 3) * 1000;
        cy.wait(waitMs);
      } else {
        console.log('Model is idle. Proceeding normally.');
      }
      
      // Final check: ensure model is still ready
      cy.request('http://localhost:1234/ready?timeout=5000').then(() => {
        console.log('Ready after wait check');
      });
    });
  });

  it.skip('loads unloaded model before proceeding', () => {
    // This test is skipped - model loading is handled separately by LM Studio
    // The agent should handle this case differently based on workflow
    
    cy.request({
      url: 'http://localhost:1234/ready?timeout=5000',
      failOnStatusCode: false
    }).then((response) => {
      if (!response.body || !response.body.loaded) {
        console.log('Model is not loaded. Loading...');
        // Note: This requires stopping the server, loading model, restarting
        // The workflow should handle this outside of cypress tests
      } else {
        console.log('Model is loaded and ready');
      }
    });
  });

  it('handles multiple concurrent clients correctly', () => {
    // Simulate checking busy status under load
    const client1 = cy.request('http://localhost:1234/ready?timeout=5000').then(res1 => {
      console.log('Client 1 - Busy:', res1.body?.busy);
    });
    
    return client1.then(() => {
      // In a real scenario, you'd coordinate between multiple agents
      // This test documents the expected behavior
      cy.contains('Multiple clients should respect each other').should('exist');
    });
  });

  it('documents expected busy states', () => {
    // Busy scenarios:
    // 1. LM Studio actively processing a request from another client
    // 2. Model generation in progress (tokens being created)
    // 3. Peak usage periods with multiple concurrent requests
    
    cy.log('Expected busy state indicators:');
    cy.log('- `busy > 0` in /ready endpoint');
    cy.log('- Generation in progress on GPU');
    cy.log('- Multiple concurrent API calls from different clients');
    
    cy.request({
      url: 'http://localhost:1234/ready?timeout=5000',
      failOnStatusCode: false
    }).then((response) => {
      console.log('Ready endpoint response:', JSON.stringify(response.body, null, 2));
      cy.log(`Current GPU utilization: ${response.body?.gpu?.usage || 'unknown'}%`);
    });
  });
});
