const MODELS = [
  {
    label: "SDXL Lightning",
    id: "@cf/bytedance/stable-diffusion-xl-lightning",
    width: 1024,
    height: 1024,
    num_steps: 20,
    guidance: 7.5
  },
  {
    label: "SDXL Base",
    id: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    width: 1024,
    height: 1024,
    num_steps: 20,
    guidance: 7.5
  },
  {
    label: "DreamShaper",
    id: "@cf/lykon/dreamshaper-8-lcm",
    width: 1024,
    height: 1024,
    num_steps: 20,
    guidance: 7.5
  },
  {
    label: "Phoenix",
    id: "@cf/leonardo/phoenix-1.0",
    width: 1024,
    height: 1024,
    num_steps: 25,
    guidance: 7.5
  }
];

const HTML = (siteKey) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Arqivo Image Gen</title>
  <link rel="stylesheet" href="/styles.css" />
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <script src="/app.js" defer></script>
</head>
<body>
  <main class="container">
    <h1>Arqivo Image Gen</h1>
    <p class="lead">
      Private-by-default text-to-image generation. No accounts. No prompt history. No database.
    </p>

    <form id="gen-form" novalidate>
      <label for="prompt">Describe the image you want</label>
      <textarea
        id="prompt"
        name="prompt"
        rows="6"
        maxlength="500"
        placeholder="Example: a photorealistic black sports car parked on a city street at night"
        required
      ></textarea>

      <div
        class="cf-turnstile"
        data-sitekey="${siteKey}"
        data-error-callback="onTurnstileError"
      ></div>

      <button id="submit-btn" type="submit">Generate 4 images</button>
    </form>

    <p id="status" class="status" aria-live="polite"></p>

    <section id="results" class="results hidden"></section>
  </main>
</body>
</html>`;

const CSS = `
:root {
  --bg: #0b1020;
  --panel: #151b2f;
  --panel-2: #1c2540;
  --text: #f2f5ff;
  --muted: #b8c1e0;
  --border: #2c365f;
  --accent: #6ea8fe;
  --danger: #ff8d8d;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #0b1020 0%, #121933 100%);
  color: var(--text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  min-height: 100vh;
}

.container {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

h1 {
  font-size: clamp(2rem, 4vw, 4rem);
  margin-bottom: 0.5rem;
}

.lead {
  color: var(--muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

form {
  background: rgba(21, 27, 47, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1rem;
  backdrop-filter: blur(12px);
}

label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}

textarea {
  width: 100%;
  resize: vertical;
  min-height: 180px;
  border: 1px solid var(--border);
  background: var(--panel-2);
  color: var(--text);
  border-radius: 12px;
  padding: 0.9rem 1rem;
  font: inherit;
  line-height: 1.5;
  margin-bottom: 1rem;
}

button {
  appearance: none;
  border: none;
  background: var(--accent);
  color: #08101f;
  font-weight: 800;
  border-radius: 999px;
  padding: 0.95rem 1.3rem;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.status {
  min-height: 1.5rem;
  margin: 1rem 0;
  color: var(--muted);
  font-size: 1.05rem;
}

.results {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.result-card {
  background: rgba(21, 27, 47, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 1rem;
}

.result-card h3 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
}

.result-card img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 14px;
  background: #0a0d18;
}

.result-actions {
  margin-top: 0.75rem;
}

.result-actions a {
  display: inline-block;
  text-decoration: none;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  font-size: 0.95rem;
}

.error-card {
  border-color: #6a2d2d;
}

.error-card p {
  color: var(--danger);
  margin: 0;
}

.hidden {
  display: none;
}

@media (max-width: 900px) {
  .results {
    grid-template-columns: 1fr;
  }
}
`;

const JS = `
const form = document.getElementById('gen-form');
const promptEl = document.getElementById('prompt');
const button = document.getElementById('submit-btn');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ff8d8d' : '#b8c1e0';
}

window.onTurnstileError = function(errorCode) {
  console.error('Turnstile error:', errorCode);
  setStatus('Turnstile error: ' + errorCode, true);
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderResults(results) {
  resultsEl.innerHTML = '';

  for (const item of results) {
    const card = document.createElement('article');

    if (item.error) {
      card.className = 'result-card error-card';
      card.innerHTML = \`
        <h3>\${escapeHtml(item.label)}</h3>
        <p>\${escapeHtml(item.error)}</p>
      \`;
      resultsEl.appendChild(card);
      continue;
    }

    card.className = 'result-card';

    const fileName = item.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-');

    card.innerHTML = \`
      <h3>\${escapeHtml(item.label)}</h3>
      <img src="\${item.dataURI}" alt="\${escapeHtml(item.label)} generated image" />
      <div class="result-actions">
        <a href="\${item.dataURI}" download="\${fileName}.png">Download</a>
      </div>
    \`;

    resultsEl.appendChild(card);
  }

  resultsEl.classList.remove('hidden');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const prompt = promptEl.value.trim();
  const turnstileToken = globalThis.turnstile?.getResponse?.();

  if (!prompt) {
    setStatus('Please enter a prompt.', true);
    return;
  }

  if (!turnstileToken) {
    setStatus('Please complete the verification first.', true);
    return;
  }

  button.disabled = true;
  button.textContent = 'Generating...';
  resultsEl.classList.add('hidden');
  resultsEl.innerHTML = '';
  setStatus('Generating 4 images. This may take a little while.');

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, turnstileToken })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Generation failed.');
    }

    renderResults(data.results || []);
    setStatus('Done.');
  } catch (error) {
    console.error(error);
    setStatus(error.message || 'Something went wrong.', true);
  } finally {
    globalThis.turnstile?.reset?.();
    button.disabled = false;
    button.textContent = 'Generate 4 images';
  }
});
`;

const COMMON_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; " +
    "img-src 'self' blob: data:; " +
    "style-src 'self'; " +
    "script-src 'self' https://challenges.cloudflare.com; " +
    "frame-src https://challenges.cloudflare.com; " +
    "connect-src 'self' https://challenges.cloudflare.com; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return new Response(HTML(env.TURNSTILE_SITE_KEY || ""), {
        headers: {
          ...COMMON_HEADERS,
          "Content-Type": "text/html; charset=UTF-8"
        }
      });
    }

    if (request.method === "GET" && url.pathname === "/styles.css") {
      return new Response(CSS, {
        headers: {
          ...COMMON_HEADERS,
          "Content-Type": "text/css; charset=UTF-8"
        }
      });
    }

    if (request.method === "GET" && url.pathname === "/app.js") {
      return new Response(JS, {
        headers: {
          ...COMMON_HEADERS,
          "Content-Type": "application/javascript; charset=UTF-8"
        }
      });
    }

    if (request.method === "POST" && url.pathname === "/api/generate") {
      return handleGenerate(request, env);
    }

    return json({ error: "Not found" }, 404);
  }
};

async function handleGenerate(request, env) {
  const requestOrigin = request.headers.get("Origin");
  const siteOrigin = new URL(request.url).origin;

  if (requestOrigin && requestOrigin !== siteOrigin) {
    return json({ error: "Forbidden origin." }, 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ error: "Content-Type must be application/json." }, 415);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const prompt = String(body?.prompt || "").trim();
  const turnstileToken = String(body?.turnstileToken || "").trim();

  if (prompt.length < 3 || prompt.length > 500) {
    return json({ error: "Prompt must be between 3 and 500 characters." }, 400);
  }

  if (!turnstileToken) {
    return json({ error: "Missing verification token." }, 400);
  }

  const remoteip = request.headers.get("CF-Connecting-IP") || "";

  const verification = await verifyTurnstile(
    env.TURNSTILE_SECRET_KEY,
    turnstileToken,
    remoteip,
    env.EXPECTED_HOSTNAME
  );

  if (!verification.success) {
    console.error("Turnstile verification failed:", verification);
    return json({ error: "Verification failed." }, 403);
  }

  const finalPrompt = buildPrompt(prompt);
  const negativePrompt = buildNegativePrompt();

  const results = await Promise.all(
    MODELS.map((model) => generateImageForModel(env, model, finalPrompt, negativePrompt))
  );

  return json({ results });
}

function buildPrompt(userPrompt) {
  return `
SUBJECT:
${userPrompt}

Create an image of exactly the subject described above.

REQUIREMENTS:
- photorealistic
- true-to-life materials and textures
- realistic lighting and reflections
- the primary subject must be fully visible
- keep the entire subject clearly inside the frame
- leave visible space around the subject
- do not crop the main subject
- center the main subject
- natural perspective
- sharp focus
- high detail
- professional commercial photography
- no stylized illustration look
`;
}

function buildNegativePrompt() {
  return `
wrong subject,
camera,
camera equipment,
lens,
tripod,
microphone,
cartoon,
anime,
illustration,
painting,
drawing,
3d render,
cgi,
stylized,
cropped,
cut off,
partially outside frame,
subject outside frame,
close up crop,
extreme close up,
blurry,
low quality,
low detail,
deformed,
distorted,
watermark,
logo,
text
`;
}

async function generateImageForModel(env, model, prompt, negativePrompt) {
  try {
    const stream = await env.AI.run(model.id, {
      prompt,
      negative_prompt: negativePrompt,
      width: model.width,
      height: model.height,
      num_steps: model.num_steps,
      guidance: model.guidance,
      seed: Math.floor(Math.random() * 1000000)
    });

    const dataURI = await streamToDataURI(stream, "image/png");

    return {
      label: model.label,
      model: model.id,
      dataURI
    };
  } catch (error) {
    console.error("Model failed:", model.label, error);

    return {
      label: model.label,
      model: model.id,
      error: "This model failed to generate an image."
    };
  }
}

async function streamToDataURI(stream, mimeType) {
  const arrayBuffer = await new Response(stream).arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const base64 = uint8ToBase64(bytes);
  return `data:${mimeType};base64,${base64}`;
}

function uint8ToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

async function verifyTurnstile(secret, token, remoteip, expectedHostname) {
  if (!secret || !expectedHostname) {
    return { success: false };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteip) params.set("remoteip", remoteip);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      }
    );

    if (!response.ok) {
      return { success: false };
    }

    const data = await response.json();

    return {
      success: data.success === true && data.hostname === expectedHostname
    };
  } catch (error) {
    console.error("Turnstile verify error:", error);
    return { success: false };
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...COMMON_HEADERS,
      "Content-Type": "application/json; charset=UTF-8"
    }
  });
}