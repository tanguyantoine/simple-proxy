#!/usr/bin/env node
// @ts-check
const http = require('http')
const https = require('https')

// Parse command line arguments
const args = process.argv.slice(2)
const config = {
  target: process.env.TARGET,
  port: process.env.PORT || 3000,
  extraHeaders: process.env.EXTRA_HEADERS
    ? JSON.parse(process.env.EXTRA_HEADERS)
    : {},
}

// Parse CLI flags
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  switch (arg) {
    case '--help':
      console.log('Simple HTTP/HTTPS Proxy')
      console.log('\nUsage:')
      console.log('  node index.js [options]')
      console.log('\nOptions:')
      console.log('  --target URL     Target URL to proxy requests to')
      console.log('  --port NUMBER    Port to listen on (default: 3000)')
      console.log(
        '  --headers JSON   Additional headers to add to requests (JSON format)'
      )
      console.log('  --help           Show this help message')
      console.log('\nEnvironment variables (alternative to flags):')
      console.log('  TARGET          Same as --target')
      console.log('  PORT            Same as --port')
      console.log('  EXTRA_HEADERS   Same as --headers')
      console.log('\nExample:')
      console.log(
        '  node index.js --target https://api.example.com --port 8080'
      )
      console.log('  # or using environment variables:')
      console.log('  TARGET=https://api.example.com PORT=8080 node index.js')
      process.exit(0)
      break
    case '--target':
      config.target = args[++i]
      break
    case '--port':
      config.port = parseInt(args[++i], 10)
      break
    case '--headers':
      try {
        config.extraHeaders = JSON.parse(args[++i])
      } catch (error) {
        console.error('\nError: Invalid JSON format for --headers')
        process.exit(1)
      }
      break
  }
}

if (!config.target) {
  console.error(
    '\nError: Target URL must be set via --target flag or TARGET environment variable'
  )
  console.log('\nRun with --help for usage information')
  process.exit(1)
}

const targetUrl = new URL(config.target)
const port = config.port

// Log the configuration
console.log('Configuration:')
console.log('  Target:', config.target)
console.log('  Port:', port)
if (Object.keys(config.extraHeaders).length > 0) {
  console.log('  Extra Headers:', config.extraHeaders)
}

function onRequest(req, res) {
  console.log('serve: ' + req.url)

  const options = {
    hostname: targetUrl.hostname,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: targetUrl.hostname,
      ...config.extraHeaders,
    },
  }

  const proxy = https.request(options, function (r) {
    res.writeHead(r.statusCode, r.headers)
    r.pipe(res, {
      end: true,
    })
  })

  req.pipe(proxy, {
    end: true,
  })
}

const server = http.createServer(onRequest).listen(port)
console.log('Listening on port ' + port)

// Graceful shutdown handling
let isShuttingDown = false

function gracefulShutdown(signal) {
  if (isShuttingDown) {
    console.log('Force shutdown requested, exiting immediately')
    process.exit(1)
  }
  
  console.log(`Received ${signal}, shutting down gracefully...`)
  isShuttingDown = true
  
  server.close(() => {
    console.log('HTTP server closed')
    process.exit(0)
  })
  
  // Force exit after 10 seconds if graceful shutdown fails
  setTimeout(() => {
    console.log('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
