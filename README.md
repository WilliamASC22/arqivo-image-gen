# Arqivo Image Gen

Arqivo Image Gen is a privacy-focused, public text-to-image web app built on Cloudflare Workers and Workers AI.

The project is designed around three priorities:

1. **Privacy** — prompts and generated images are not intentionally stored by the application.
2. **Cost** — the project is designed to operate on Cloudflare's free-tier services without requiring a paid API provider.
3. **Image quality** — users can compare multiple image-generation models and choose resolutions, quality settings, and variations.

## Features

* Text-to-image generation
* Multiple selectable AI image models
* Generate with one model or compare several models
* Generate multiple variations per model
* Multiple preset image resolutions
* Custom image dimensions
* Standard and Best quality modes
* Optional seed control
* Individual image downloads
* Cloudflare Turnstile bot protection
* No user accounts
* No application database
* No prompt history
* No image gallery or persistent image storage
* Responsive interface
* Cloudflare Worker backend
* GitHub-based source control

## Current Models

Arqivo currently supports the following Workers AI image models:

### SDXL Lightning

```text
@cf/bytedance/stable-diffusion-xl-lightning
```

Designed for fast Stable Diffusion XL image generation.

### SDXL Base

```text
@cf/stabilityai/stable-diffusion-xl-base-1.0
```

The standard Stable Diffusion XL base model.

### Lucid Origin

```text
@cf/leonardo/lucid-origin
```

Used for stronger prompt responsiveness and higher-quality image generation.

### Phoenix

```text
@cf/leonardo/phoenix-1.0
```

Used for strong prompt adherence and detailed image generation.

Users can select any available combination of models before generating.

## Image Sizes

Arqivo includes preset Square, Landscape, Portrait, Widescreen, and Cinematic sizes.

Examples include:

```text
512 × 512
768 × 768
1024 × 1024
1280 × 1280
1536 × 1536
2048 × 2048

1024 × 768
1152 × 768
1024 × 576
1344 × 768
1536 × 1024
1536 × 640
1792 × 1024
2048 × 1152

768 × 1024
768 × 1152
576 × 1024
768 × 1344
1024 × 1280
1024 × 1536
1024 × 1792
1152 × 2048
```

Users can also choose a custom resolution between:

```text
256 × 256
```

and:

```text
2048 × 2048
```

Custom dimensions must use increments of 64 pixels.

## Images Per Model

Users can generate:

```text
1 image per model
2 variations per model
4 variations per model
```

The application currently limits a single request to a maximum of:

```text
8 generated images
```

This is intended to reduce abuse and protect the available AI quota.

## Quality Modes

### Best Quality

Uses the higher configured generation-step count for each model.

### Standard

Uses fewer generation steps to reduce generation time and AI usage.

Each model has its own Standard and Best step configuration.

## Seed Control

Users can optionally provide a numeric seed.

Using the same seed can help make model comparisons more consistent.

If no seed is provided, Arqivo generates one automatically.

For multiple variations, the application derives additional seeds from the base seed.

## Privacy Design

Arqivo is intentionally designed without an application database.

The application does not intentionally persist:

* prompts
* generated images
* generation history
* user accounts
* user profiles
* image galleries
* cookies for application accounts
* browser localStorage history

The basic request flow is:

```text
User browser
    ↓
Prompt + generation options
    ↓
Cloudflare Turnstile verification
    ↓
Cloudflare Worker
    ↓
Workers AI model
    ↓
Generated image
    ↓
Browser
```

Generated images are returned to the browser and displayed directly to the user.

The application sends `Cache-Control: no-store` headers for dynamic responses.

### Important Privacy Note

Arqivo itself does not intentionally store prompts or generated images.

However, the application runs on third-party infrastructure provided by Cloudflare and selected AI model providers available through Workers AI. Infrastructure providers may maintain operational, security, abuse-prevention, or service logs according to their own policies.

Therefore, the project should not claim that data is mathematically guaranteed to never exist anywhere outside the application.

## Security

Arqivo includes several security measures.

### Cloudflare Turnstile

Every generation request requires a valid Cloudflare Turnstile token.

Turnstile validation happens on the server through Cloudflare's Siteverify endpoint.

### Hostname Validation

Successful Turnstile responses are checked against the expected Arqivo hostname.

### Same-Origin Requests

The generation endpoint rejects requests originating from unexpected origins.

### Security Headers

The Worker sends headers including:

```text
Content-Security-Policy
X-Content-Type-Options
X-Frame-Options
Referrer-Policy
Permissions-Policy
Cross-Origin-Opener-Policy
Cross-Origin-Resource-Policy
```

### No Client-Side API Secret

Private credentials are never intentionally included in browser JavaScript.

The Turnstile secret is stored as a Cloudflare Worker secret.

## Project Structure

The project currently uses a minimal structure:

```text
arqivo-image-gen/
├── src/
│   └── index.js
├── package.json
├── package-lock.json
├── wrangler.jsonc
└── README.md
```

The main application is currently contained in:

```text
src/index.js
```

That file contains:

* Worker routes
* HTML
* CSS
* browser JavaScript
* image-generation logic
* model configuration
* Turnstile validation
* security headers

## Requirements

Install:

* Node.js
* npm
* Git
* Wrangler
* a Cloudflare account
* a GitHub account

## Local Setup

Clone the repository:

```bash
git clone https://github.com/arqivo/arqivo-image-gen.git
```

Enter the project directory:

```bash
cd arqivo-image-gen
```

Install dependencies:

```bash
npm install
```

## Cloudflare Configuration

The project requires a Workers AI binding.

Example `wrangler.jsonc` configuration:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "arqivo-image-gen",
  "main": "src/index.js",
  "compatibility_date": "2026-08-11",

  "ai": {
    "binding": "AI"
  },

  "vars": {
    "TURNSTILE_SITE_KEY": "YOUR_PUBLIC_SITE_KEY",
    "EXPECTED_HOSTNAME": "YOUR-WORKER.workers.dev"
  }
}
```

Do not include the private Turnstile secret inside `wrangler.jsonc`.

## Turnstile Secret

Add the Turnstile secret using Wrangler:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Paste the secret when Wrangler asks for it.

Never commit the secret key to GitHub.

## Environment Values

### `TURNSTILE_SITE_KEY`

Public Turnstile site key.

This can be stored in `wrangler.jsonc`.

### `TURNSTILE_SECRET_KEY`

Private Turnstile secret.

This must be stored as a Cloudflare Worker secret.

### `EXPECTED_HOSTNAME`

The exact hostname used by the deployed Worker.

Example:

```text
arqivo-image-gen.example.workers.dev
```

Do not include:

```text
https://
```

Do not include a trailing:

```text
/
```

## Local Development

Run:

```bash
npx wrangler dev
```

The local development server normally becomes available at:

```text
http://localhost:8787
```

## Deployment

Deploy the Worker with:

```bash
npx wrangler deploy
```

After deployment, the application will normally be available at a Cloudflare Workers URL similar to:

```text
https://arqivo-image-gen.example.workers.dev
```

## GitHub Workflow

After making changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe the change"
```

Push:

```bash
git push origin main
```

If Cloudflare Git integration is enabled, pushes to the production branch can automatically trigger deployments.

## Turnstile Setup

In Cloudflare:

1. Open **Turnstile**.
2. Create or open the `arqivo-image-gen` widget.
3. Add the production Workers hostname.
4. Copy the Site Key.
5. Add the Site Key to `wrangler.jsonc`.
6. Store the Secret Key using `wrangler secret put`.
7. Set `EXPECTED_HOSTNAME` to the exact production hostname.

The site key and secret key must belong to the same Turnstile widget.

## AI Usage Limits

Image generation uses Cloudflare Workers AI capacity.

Using:

* more models
* more variations
* larger image dimensions
* higher generation steps

will consume more AI resources.

The application therefore includes request limits to reduce accidental or abusive usage.

Users may encounter generation failures when the available free AI allocation has been exhausted.

The application is intentionally designed so that generation can fail instead of requiring persistent paid infrastructure.

## Cost Philosophy

Arqivo is intended to remain usable without requiring a paid image-generation API.

The project should remain configured on free service tiers unless the project owner explicitly chooses otherwise.

Do not add:

* automatic paid overages
* third-party APIs requiring billing information
* services that silently upgrade into paid usage
* credentials for paid APIs

without documenting the change clearly.

## Model Configuration

Models are configured near the top of `src/index.js`.

Example:

```js
const MODELS = [
  {
    key: "sdxl-lightning",
    label: "SDXL Lightning",
    id: "@cf/bytedance/stable-diffusion-xl-lightning",
    standardSteps: 10,
    bestSteps: 20,
    guidance: 7.5
  }
];
```

Each model can define its own:

```text
key
label
model ID
standard steps
best-quality steps
guidance
```

## Adding a Model

Before adding another model:

1. Confirm the model is available through Cloudflare Workers AI.
2. Confirm its input parameters.
3. Confirm supported width and height limits.
4. Confirm supported generation-step limits.
5. Confirm its output format.
6. Confirm its cost and free-tier behavior.
7. Test it with the same prompts as the existing models.
8. Only keep it if it meaningfully improves the application.

Avoid adding models only to increase the model count.

## Adding a Resolution

Add a new entry to the `SIZES` object.

Example:

```js
"landscape-example": {
  label: "Example Landscape",
  width: 1280,
  height: 768
}
```

Then add its key to the appropriate group in `SIZE_GROUPS`.

All dimensions should remain compatible with every selectable model unless model-specific resolution handling is added.

## Error Handling

A generation can fail independently for one model.

When this happens, Arqivo returns an error card for that model rather than intentionally storing or retrying the prompt indefinitely.

Possible failures include:

* model errors
* invalid image dimensions
* Turnstile verification failure
* free AI quota exhaustion
* temporary Workers AI errors
* request-size limits

## Development Goals

Future improvements may include:

* improved image quality
* smarter model-specific prompting
* model-specific resolution recommendations
* model availability indicators
* better generation progress
* per-model regenerate buttons
* advanced guidance controls
* reusable aspect-ratio controls
* optional negative-prompt controls
* improved mobile layout
* better error reporting
* accessibility improvements

Any future feature should continue to prioritize:

```text
Privacy
↓
Zero-cost operation
↓
Image quality
↓
Simplicity
```

## Security Disclaimer

No public website can truthfully guarantee that it is impossible to hack.

Arqivo instead aims to reduce its attack surface by:

* not maintaining user accounts
* not maintaining an application database
* not storing prompt history
* not storing generated images
* keeping private secrets server-side
* validating requests
* using Turnstile
* limiting requests
* using restrictive security headers
* keeping the architecture simple

Security issues should be treated seriously and dependencies should be kept up to date.

## License

No license has been selected yet.

If this repository is intended to be open source, add an appropriate license before encouraging third-party redistribution or modification.

## Project

```text
Arqivo Image Gen
Repository: arqivo/arqivo-image-gen
Platform: Cloudflare Workers
AI: Cloudflare Workers AI
Source control: GitHub
Database: None
Persistent prompt storage: None
Persistent image storage: None
```
