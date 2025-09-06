# QuickProxy

A simple, universal proxy server implemented as a serverless function.  
Allows you to proxy API requests to bypass CORS restrictions and centralize API calls.

---

## Features

- Proxy any GET API request by passing the target URL as a query parameter.
- Restricts access to specified allowed origins for security.
- Minimal dependencies (`axios`).
- Designed for easy deployment on any platform that supports serverless functions.
- Supports local development origins (`localhost`, `127.0.0.1`).

---

## Setup

### 1. Clone the repo

    git clone https://github.com/yourusername/QuickProxy.git
    cd QuickProxy

### 2. Install dependencies

    npm install

### 3. Configure environment variables

Create a `.env` file in the root directory (do **not** commit this file!) and add your allowed origins:

    ALLOWED_ORIGIN=https://axewhyzed.github.io,http://127.0.0.1:5500,http://localhost:5500

### 4. Run locally (optional)

If your platform provides a local serverless function emulator or you want to test with Node.js, you can run locally using tools like [serverless framework](https://www.serverless.com/) or similar.

---

## Usage

Make a GET request to your deployed proxy function endpoint:

    https://your-deployment-domain/api/proxy?url=ENCODED_TARGET_URL

- Replace `your-deployment-domain` with your actual deployment domain.
- `ENCODED_TARGET_URL` is the URL-encoded API endpoint you want to proxy.

Example:

    GET /api/proxy?url=https%3A%2F%2Fsrcimdb.com%2Fapi%2F%3Fimdb%3Dtt6869538

This will fetch the data from `https://srcimdb.com/api/?imdb=tt6869538` and return it.

---

## Environment Variable

- `ALLOWED_ORIGIN` — Comma-separated list of origins allowed to access this proxy. Requests from other origins will be rejected.

---

## Deployment

Deploy this project to any platform that supports serverless functions or Node.js apps.  
Examples include:

- Vercel  
- Netlify Functions  
- AWS Lambda  
- Cloudflare Workers (with some adaptation)  
- Railway, Render, Heroku (for full Node.js apps)  

Make sure to set your environment variables accordingly.