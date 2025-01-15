# Simple Proxy

A lightweight and configurable HTTP/HTTPS proxy server that forwards requests to a specified target URL.

## Overview

Simple Proxy is a minimalist yet powerful HTTP/HTTPS proxy server with the following key features:
- 🚀 Lightweight with minimal dependencies
- 🔧 Easy configuration through CLI flags or environment variables
- 🐳 Available as Docker image and NPM package
- 🔄 Supports both HTTP and HTTPS protocols
- 📝 Customizable request headers

## Installation & Usage

### NPM Package

```bash
# Install globally
npm install -g @tanguyantoine/simple-proxy

# Run with CLI flags
simple-proxy --target https://api.example.com --port 3000

# Or use environment variables
TARGET=https://api.example.com simple-proxy

# Or use directly with npx
npx @tanguyantoine/simple-proxy --target https://api.example.com
```

### Docker

```bash
# Pull the image
docker pull tanguyantoine/simple-proxy:latest
# or from GitHub Container Registry
docker pull ghcr.io/tanguyantoine/simple-proxy:latest

# Run with environment variables
docker run -e TARGET=https://api.example.com -p 3000:3000 tanguyantoine/simple-proxy

# Or use CLI flags (requires entrypoint override)
docker run -p 3000:3000 tanguyantoine/simple-proxy --target https://api.example.com
```

## Configuration Options

You can configure the proxy using either CLI flags or environment variables:

| Option          | CLI Flag      | Environment Var | Description                                  | Required | Default |
| --------------- | ------------- | -------------- | -------------------------------------------- | -------- | ------- |
| Target URL      | `--target`    | `TARGET`       | Target URL to proxy requests to              | Yes      | -       |
| Port            | `--port`      | `PORT`         | Port number for the proxy server             | No       | 3000    |
| Extra Headers   | `--headers`   | `EXTRA_HEADERS`| JSON string of additional headers            | No       | {}      |

### Example Configurations

1. Using CLI flags:
```bash
# Basic usage with custom port
simple-proxy --target https://api.example.com --port 8080

# Adding custom headers
simple-proxy --target https://api.example.com --headers '{"X-API-Key": "123456"}'
```

2. Using environment variables:
```bash
# Basic usage with custom port
PORT=8080 TARGET=https://api.example.com simple-proxy

# Adding custom headers
EXTRA_HEADERS='{"X-API-Key": "123456"}' TARGET=https://api.example.com simple-proxy
```

3. Docker with CLI flags:
```bash
docker run \
  -p 3000:3000 \
  tanguyantoine/simple-proxy \
  --target https://api.example.com \
  --headers '{"X-API-Key": "123456"}'
```

## Development

To contribute or run from source:

```bash
# Clone the repository
git clone https://github.com/tanguyantoine/simple-proxy.git
cd simple-proxy

# Install dependencies
npm install

# Start the proxy (using CLI flags)
npm start -- --target https://api.example.com
```

## License

MIT License - See LICENSE file for details
