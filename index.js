// @ts-check
const http = require('http')
const https = require('https')

if (!process.env.TARGET) {
  console.error('TARGET environment variable must be set')
  process.exit(1)
}

const targetUrl = new URL(process.env.TARGET)
const port = process.env.PORT || 3000

// Parse extra headers from environment variable
let extraHeaders = {}
try {
  if (process.env.EXTRA_HEADERS) {
    extraHeaders = JSON.parse(process.env.EXTRA_HEADERS)
    console.log('Using extra headers:', extraHeaders)
  }
} catch (error) {
  console.error('Failed to parse EXTRA_HEADERS:', error.message)
  process.exit(1)
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
      ...extraHeaders,
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

http.createServer(onRequest).listen(port)
console.log('Listening on port ' + port)
