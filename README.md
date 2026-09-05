# Arqivo Image Gen

Arqivo Image Gen is a privacy focused text to-image web application built on **Cloudflare Workers**.

The project combines:

* Cloudflare Workers AI for fast hosted generation
* AI Horde for community powered image generation
* Cloudflare Turnstile for abuse prevention

Arqivo is designed around three goals:

1. **Privacy**

   * No user accounts
   * No prompt history database
   * No application image storage
   * No generated image gallery

2. **Free tier operation**

   * Designed to run without paid image APIs
   * Uses free available infrastructure where possible

3. **Image quality**

   * Multiple generation models
   * Multiple providers
   * Resolution control
   * Seed control
   * Model comparison

---

# Features

* Text-to-image generation
* Multiple AI providers
* Cloudflare Workers AI models
* AI Horde models
* Multiple selectable models per request
* Multiple image variations
* Standard and Best quality modes
* Seed support
* Custom resolutions
* Download generated images
* Cloudflare Turnstile protection
* No accounts
* No application database
* No prompt storage
* No image storage
* Responsive interface

---

# Supported Providers

## Cloudflare Workers AI

Cloudflare models run directly through the Arqivo Worker AI binding.

Current models:

## SDXL Lightning

Model:

```text
@cf/bytedance/stable-diffusion-xl-lightning
```

Description:

```text
Fastest Cloudflare model for quick image generation
```

Best for:

* Fast previews
* Quick iterations
* Testing prompts

---

## SDXL Base

Model:

```text
@cf/stabilityai/stable-diffusion-xl-base-1.0
```

Description:

```text
Balanced general-purpose model for high-quality images
```

Best for:

* General image generation
* Balanced quality and speed

---

## Lucid Origin

Model:

```text
@cf/leonardo/lucid-origin
```

Description:

```text
Strong prompt responsiveness and clean compositions
```

Best for:

* Following detailed prompts
* Strong subject placement

---

## Phoenix

Model:

```text
@cf/leonardo/phoenix-1.0
```

Description:

```text
Detailed images with strong instruction following
```

Best for:

* Complex prompts
* Detailed scenes

---

# AI Horde Models

AI Horde uses a distributed volunteer GPU network.

Jobs are asynchronous.

Arqivo submits Horde jobs, then the browser checks status for up to one hour.

Current Horde models:

---

## AlbedoBase XL 3.1

Description:

```text
Best all-around Horde model
```

Best for:

* General image generation
* Balanced quality
* SDXL-style output

Default selected model.

---

## AbsoluteReality

Description:

```text
Photorealistic images and portraits
```

Best for:

* People
* Portraits
* Photography-style images

---

## Realistic Vision

Description:

```text
Realism and human photography
```

Best for:

* Realistic subjects
* Lifestyle photography

---

## Deliberate 3.0

Description:

```text
Cinematic and creative images
```

Best for:

* Cinematic scenes
* Creative styles
* Dramatic compositions

---

# Generation Limits

A single request can generate:

```text
Maximum 8 images
```

Supported variations:

```text
1 image per model

2 variations per model

4 variations per model
```

Large requests may be rejected to protect available AI resources.

---

# Image Sizes

Available presets include:

## Square

```text
512 × 512
768 × 768
1024 × 1024
1280 × 1280
1536 × 1536
2048 × 2048
```

## Landscape

```text
1024 × 768
1152 × 768
1024 × 576
1344 × 768
1536 × 1024
1536 × 640
1792 × 1024
2048 × 1152
```

## Portrait

```text
768 × 1024
768 × 1152
576 × 1024
768 × 1344
1024 × 1280
1024 × 1536
1024 × 1792
1152 × 2048
```

Custom sizes:

```text
256px - 2048px
```

Custom dimensions must use multiples of:

```text
64 pixels
```

---

# Privacy Architecture

Arqivo intentionally avoids application storage.

The application does not intentionally store:

* Prompts
* Generated images
* User accounts
* User profiles
* Generation history
* Image galleries

Request flow:

```text
Visitor

↓

Cloudflare Turnstile

↓

Arqivo Cloudflare Worker

↓

Selected AI Provider

↓

Generated Image

↓

Visitor Browser
```

---

# AI Horde Privacy Notice

AI Horde is a distributed volunteer network.

When using Horde:

* Prompts are sent to AI Horde
* Generation may run on volunteer workers
* Queue times vary
* Results depend on available workers

Do not use Horde for sensitive prompts.

---

# Security

Arqivo includes:

## Cloudflare Turnstile

Every generation request requires verification.

## Same-Origin Protection

API endpoints reject unexpected origins.

## Security Headers

The Worker sends:

```text
Content-Security-Policy

X-Content-Type-Options

X-Frame-Options

Referrer-Policy

Permissions-Policy

Cross-Origin-Opener-Policy

Cross-Origin-Resource-Policy
```

## Secret Protection

Private keys remain server-side.

Browser JavaScript does not contain provider secrets.

---

# Project Structure

```text
arqivo-image-gen/

├── src/

│   └── index.js

├── package.json

├── package-lock.json

├── wrangler.jsonc

└── README.md
```

The main Worker file contains:

* HTML
* CSS
* Browser JavaScript
* Provider configuration
* Image generation logic
* API routes
* Security headers

---

# Requirements

Install:

* Node.js
* npm
* Git
* Wrangler
* Cloudflare account
* GitHub account

---

# Installation

Clone:

```bash
git clone https://github.com/arqivo/arqivo-image-gen.git
```

Enter directory:

```bash
cd arqivo-image-gen
```

Install packages:

```bash
npm install
```

---

# Cloudflare Setup

Enable Workers AI:

```jsonc
{
  "ai": {
    "binding": "AI"
  }
}
```

Required environment values:

```text
TURNSTILE_SITE_KEY

EXPECTED_HOSTNAME
```

---

# Secrets

Turnstile secret:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

AI Horde key:

```bash
npx wrangler secret put AI_HORDE_API_KEY
```

Optional Horde model overrides:

```text
AI_HORDE_MODEL_A

AI_HORDE_MODEL_B

AI_HORDE_MODEL_C

AI_HORDE_MODEL_D
```

---

# Local Development

Run:

```bash
npx wrangler dev
```

Default:

```text
http://localhost:8787
```

---

# Deployment

Deploy:

```bash
npx wrangler deploy
```

---

# Model Configuration

Models are configured near the top of:

```text
src/index.js
```

Each model supports:

```text
key

provider

label

description

model ID

generation steps

guidance settings

default selection
```

---

# Adding Models

Before adding a model:

1. Confirm provider availability
2. Confirm supported parameters
3. Confirm image output format
4. Confirm free-tier behavior
5. Test generation quality
6. Confirm it improves the application

Avoid adding models only to increase model count.

---

# Error Handling

Failures are isolated per model.

Possible failures:

* Provider unavailable
* Invalid settings
* AI quota exhaustion
* Queue timeout
* Turnstile failure
* Invalid model output

AI Horde failures do not block faster providers.

---

# Development Goals

Future improvements:

* Better model availability indicators
* Improved progress reporting
* Model-specific settings
* Better mobile experience
* More provider options
* Improved accessibility
* Regenerate controls

The project priorities remain:

```text
Privacy

↓

Free operation

↓

Image quality

↓

Simplicity
```

---

# License

No license selected yet.

Add an open-source license before encouraging redistribution.

---

# Project Information

```text
Project:
Arqivo Image Gen

Platform:
Cloudflare Workers

AI Providers:
Cloudflare Workers AI
AI Horde

Database:
None

Persistent Prompt Storage:
None

Persistent Image Storage:
None
```