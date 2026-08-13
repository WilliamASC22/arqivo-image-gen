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
      Private-by-default text-to-image generation.
      No accounts. No prompt history. No database.
    </p>

    <form id="gen-form" novalidate>
      <label for="prompt">Describe the image you want</label>
      <textarea
        id="prompt"
        name="prompt"
        rows="6"
        maxlength="500"
        placeholder="Example: A photorealistic portrait of a woman in soft window light, shallow depth of field, natural skin texture, cinematic realism"
        required
      ></textarea>

		<div
			class="cf-turnstile"
			data-sitekey="${siteKey}"
			data-error-callback="onTurnstileError"
		></div>

      <button id="submit-btn" type="submit">Generate image</button>
    </form>

    <p id="status" class="status" aria-live="polite"></p>

    <section id="result-card" class="result-card hidden">
      <img id="result-image" alt="Generated image" />
    </section>
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
  width: min(900px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0.5rem;
}

.lead {
  color: var(--muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

form, .result-card {
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
}

textarea {
  width: 100%;
  resize: vertical;
  min-height: 150px;
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
  padding: 0.9rem 1.2rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.status {
  min-height: 1.5rem;
  margin: 1rem 0;
  color: var(--muted);
}

.result-card {
  margin-top: 1rem;
}

.result-card img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 14px;
}

.hidden {
  display: none;
}
`;

const JS = `
const form = document.getElementById('gen-form');
const promptEl = document.getElementById('prompt');
const button = document.getElementById('submit-btn');
const statusEl = document.getElementById('status');
const resultCard = document.getElementById('result-card');
const resultImage = document.getElementById('result-image');

let currentObjectUrl = null;

window.onTurnstileError = function(errorCode) {
  setStatus(
    'Turnstile error: ' + errorCode,
    true
  );

  console.error('Turnstile error code:', errorCode);
};

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ff8d8d' : '#b8c1e0';
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
  setStatus('Generating your image. This can take a little while.');
  resultCard.classList.add('hidden');

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, turnstileToken })
    });

    if (!response.ok) {
      let message = 'Generation failed.';
      try {
        const data = await response.json();
        if (data?.error) message = data.error;
      } catch (_) {}
      throw new Error(message);
    }

    const blob = await response.blob();

    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
    }

    currentObjectUrl = URL.createObjectURL(blob);
    resultImage.src = currentObjectUrl;
    resultCard.classList.remove('hidden');
    setStatus('Done.');
  } catch (error) {
    setStatus(error.message || 'Something went wrong.', true);
  } finally {
    globalThis.turnstile?.reset?.();
    button.disabled = false;
    button.textContent = 'Generate image';
  }
});

window.addEventListener('beforeunload', () => {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
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
    "connect-src 'self'; " +
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
	console.error("Turnstile verification failed:", {
		errorCodes: verification.errorCodes,
		hostname: verification.hostname,
		expectedHostname: env.EXPECTED_HOSTNAME
	});

	return json({
		error: "Verification failed.",
		code: verification.errorCodes?.join(", ") || "unknown"
	}, 403);
	}

  const modelId = env.MODEL_ID || "@cf/lykon/dreamshaper-8-lcm";

  const finalPrompt =
    "Photorealistic, ultra-detailed, realistic lighting, natural textures, " +
    "sharp focus, high realism, professional photography. " +
    prompt;

  const negativePrompt =
    "blurry, low quality, deformed, bad anatomy, extra fingers, extra limbs, " +
    "duplicate subjects, cropped, watermark, logo, text, cartoon, painting, illustration";

  try {
    const imageStream = await env.AI.run(modelId, {
      prompt: finalPrompt,
      negative_prompt: negativePrompt,
      width: 1024,
      height: 1024,
      num_steps: 20,
      guidance: 7.5,
      seed: Math.floor(Math.random() * 1000000)
    });

    return new Response(imageStream, {
      headers: {
        ...COMMON_HEADERS,
        "Content-Type": "image/png"
      }
    });
  } catch {
    return json(
      { error: "Image generation failed. Please try again in a moment." },
      500
    );
  }
}

async function verifyTurnstile(
  secret,
  token,
  remoteip,
  expectedHostname
) {
  if (!secret) {
    return {
      success: false,
      errorCodes: ["missing-secret"]
    };
  }

  if (!expectedHostname) {
    return {
      success: false,
      errorCodes: ["missing-expected-hostname"]
    };
  }

  const params = new URLSearchParams();

  params.set("secret", secret);
  params.set("response", token);

  if (remoteip) {
    params.set("remoteip", remoteip);
  }

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
      return {
        success: false,
        errorCodes: ["siteverify-http-error"]
      };
    }

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        errorCodes: data["error-codes"] || ["siteverify-failed"],
        hostname: data.hostname || null
      };
    }

    if (data.hostname !== expectedHostname) {
      return {
        success: false,
        errorCodes: ["hostname-mismatch"],
        hostname: data.hostname
      };
    }

    return {
      success: true,
      hostname: data.hostname
    };

  } catch (error) {
    console.error("Siteverify request failed:", error);

    return {
      success: false,
      errorCodes: ["siteverify-request-error"]
    };
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