# Simple Proxy

A lightweight and configurable HTTP/HTTPS proxy server that forwards requests to a specified target URL. It's designed to be simple, efficient, and easily deployable.

## Features

- Forward HTTP/HTTPS requests to a specified target
- Configurable port
- Customizable request headers
- Available as NPM package and Docker image
- Minimal dependencies

## Installation

### NPM Package

```bash
# Install globally
npm install -g @tanguyantoine/simple-proxy

# Install in your project
npm install @tanguyantoine/simple-proxy
```

### Docker Image

```bash
# Pull from Docker Hub
docker pull tanguyantoine/simple-proxy:latest

# Or from GitHub Container Registry
docker pull ghcr.io/tanguyantoine/simple-proxy:latest
```

## Usage

### Running with Node.js

```bash
# Using npx
npx @tanguyantoine/simple-proxy

# Or if installed globally
simple-proxy
```

### Running with Docker

```bash
docker run -e TARGET=https://api.example.com -p 3000:3000 tanguyantoine/simple-proxy
```

## Configuration

The proxy can be configured using environment variables:

| Variable        | Description                                                     | Required | Default |
| --------------- | --------------------------------------------------------------- | -------- | ------- |
| `TARGET`        | Target URL to proxy requests to (e.g., https://api.example.com) | Yes      | -       |
| `PORT`          | Port number for the proxy server                                | No       | 3000    |
| `EXTRA_HEADERS` | JSON string of additional headers to add to proxied requests    | No       | {}      |

### Examples

1. Basic usage with custom port:

```bash
# Using Node.js
PORT=8080 TARGET=https://api.example.com node index.js

# Using Docker
docker run -e TARGET=https://api.example.com -e PORT=8080 -p 8080:8080 tanguyantoine/simple-proxy
```

2. Adding custom headers:

```bash
# Using Node.js
EXTRA_HEADERS='{"X-API-Key": "123456", "X-Custom": "value"}' TARGET=https://api.example.com node index.js

# Using Docker
docker run -e TARGET=https://api.example.com -e 'EXTRA_HEADERS={"X-API-Key": "123456", "X-Custom": "value"}' -p 3000:3000 tanguyantoine/simple-proxy
```

## Development

```bash
# Clone the repository
git clone https://github.com/tanguyantoine/simple-proxy.git
cd simple-proxy

# Run locally
TARGET=https://api.example.com node index.js
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
