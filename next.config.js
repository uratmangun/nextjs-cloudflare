/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize for production
  swcMinify: true,
  
  // Disable image optimization for Cloudflare Pages
  images: {
    unoptimized: true,
  },
  
  // Environment variables that will be available in the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  
  // Webpack configuration for Cloudflare Workers compatibility
  webpack: (config, { isServer }) => {
    // Exclude Node.js built-ins for both server and client
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Node.js built-ins that aren't available in Cloudflare Workers
      async_hooks: false,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      path: false,
      os: false,
      stream: false,
      buffer: false,
      util: false,
      url: false,
      querystring: false,
      string_decoder: false,
      events: false,
      http: false,
      https: false,
      zlib: false,
      child_process: false,
      worker_threads: false,
      cluster: false,
      dgram: false,
      dns: false,
      module: false,
      readline: false,
      repl: false,
      vm: false,
    };

    // Exclude problematic modules from bundling
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('async_hooks');
    }
    
    return config;
  },
  
  // Trailing slashes configuration
  trailingSlash: false,
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Generate ETags
  generateEtags: true,
}

module.exports = nextConfig;
