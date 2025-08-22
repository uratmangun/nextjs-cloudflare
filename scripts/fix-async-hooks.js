#!/usr/bin/env node

// Post-build script to ensure async_hooks polyfill is available for Cloudflare Pages
const fs = require('fs');
const path = require('path');

const polyfillContent = `// Auto-generated polyfill for async_hooks in Cloudflare Workers
export const AsyncLocalStorage = class {
  constructor() {
    this.store = new Map();
  }
  
  run(store, callback, ...args) {
    return callback(...args);
  }
  
  getStore() {
    return undefined;
  }
};

export const createHook = () => ({
  enable: () => {},
  disable: () => {},
});

export const executionAsyncId = () => 0;
export const triggerAsyncId = () => 0;

export default {
  AsyncLocalStorage,
  createHook,
  executionAsyncId,
  triggerAsyncId,
};`;

// Create the polyfill in the Vercel output directory
const outputDir = path.join(process.cwd(), '.vercel/output/static/_worker.js/__next-on-pages-dist__/functions');
const polyfillPath = path.join(outputDir, 'async_hooks.js');

// Ensure directory exists
if (fs.existsSync(outputDir)) {
  fs.writeFileSync(polyfillPath, polyfillContent);
  console.log('✅ Created async_hooks polyfill at:', polyfillPath);
} else {
  console.log('⚠️  Output directory not found, skipping polyfill creation');
}
