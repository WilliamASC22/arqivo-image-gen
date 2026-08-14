const MODELS = [
  {
    label: "SDXL Lightning",
    id: "@cf/bytedance/stable-diffusion-xl-lightning",
    standardSteps: 10,
    bestSteps: 20,
    guidance: 7.5,
    supportsNegativePrompt: true
  },
  {
    label: "SDXL Base",
    id: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    standardSteps: 12,
    bestSteps: 20,
    guidance: 7.5,
    supportsNegativePrompt: true
  },
  {
    label: "Lucid Origin",
    id: "@cf/leonardo/lucid-origin",
    standardSteps: 20,
    bestSteps: 32,
    guidance: 5.5,
    supportsNegativePrompt: false
  },
  {
    label: "Phoenix",
    id: "@cf/leonardo/phoenix-1.0",
    standardSteps: 20,
    bestSteps: 35,
    guidance: 6.0,
    supportsNegativePrompt: true
  }
];

const SIZES = {
  square512: {
    label: "Square — 512 × 512",
    width: 512,
    height: 512
  },
  square768: {
    label: "Square — 768 × 768",
    width: 768,
    height: 768
  },
  square: {
    label: "Square — 1024 × 1024",
    width: 1024,
    height: 1024
  },
  landscape: {
    label: "Landscape — 1024 × 768",
    width: 1024,
    height: 768
  },
  portrait: {
    label: "Portrait — 768 × 1024",
    width: 768,
    height: 1024
  },
  widescreen: {
    label: "Widescreen — 1024 × 576",
    width: 1024,
    height: 576
  },
  tall: {
    label: "Tall — 576 × 1024",
    width: 576,
    height: 1024
  }
};

const MAX_SEED = 2147483647;

const HTML = (siteKey) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="description"
    content="Private-by-default multi-model AI image generation."
  />

  <title>Arqivo Image Gen</title>

  <link
    rel="stylesheet"
    href="/styles.css"
  />

  <script
    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
    async
    defer
  ></script>

  <script
    src="/app.js"
    defer
  ></script>
</head>

<body>
  <main class="container">

    <header class="hero">
      <h1>Arqivo Image Gen</h1>

      <p class="lead">
        Private-by-default text-to-image generation.
        No accounts. No prompt history. No database.
      </p>
    </header>

    <form
      id="gen-form"
      novalidate
      autocomplete="off"
    >
      <div class="prompt-section">

        <label for="prompt">
          Describe the image you want
        </label>

        <textarea
          id="prompt"
          name="prompt"
          rows="6"
          maxlength="500"
          placeholder="Example: an all-black exotic sports car, fully visible, parked on a wet city street at night, photorealistic"
          required
        ></textarea>

      </div>

      <div class="controls">

        <div class="control">

          <label for="size">
            Image size
          </label>

          <select
            id="size"
            name="size"
          >
            <option value="square512">
              Square — 512 × 512
            </option>

            <option value="square768">
              Square — 768 × 768
            </option>

            <option
              value="square"
              selected
            >
              Square — 1024 × 1024
            </option>

            <option value="landscape">
              Landscape — 1024 × 768
            </option>

            <option value="portrait">
              Portrait — 768 × 1024
            </option>

            <option value="widescreen">
              Widescreen — 1024 × 576
            </option>

            <option value="tall">
              Tall — 576 × 1024
            </option>
          </select>

          <span class="control-help">
            Larger images use more of the daily AI allowance.
          </span>

        </div>

        <div class="control">

          <label for="quality">
            Quality
          </label>

          <select
            id="quality"
            name="quality"
          >
            <option
              value="best"
              selected
            >
              Best quality
            </option>

            <option value="standard">
              Standard
            </option>
          </select>

          <span class="control-help">
            Best uses more generation steps.
          </span>

        </div>

        <div class="control">

          <label for="seed">
            Seed
            <span class="optional">
              optional
            </span>
          </label>

          <input
            id="seed"
            name="seed"
            type="number"
            min="0"
            max="${MAX_SEED}"
            step="1"
            inputmode="numeric"
            placeholder="Random"
          />

          <span class="control-help">
            Reuse a seed to compare similar generations.
          </span>

        </div>

      </div>

      <div class="verification-row">

        <div
          class="cf-turnstile"
          data-sitekey="${siteKey}"
          data-error-callback="onTurnstileError"
        ></div>

      </div>

      <div class="submit-row">

        <button
          id="submit-btn"
          type="submit"
        >
          Generate 4 images
        </button>

      </div>
    </form>

    <p
      id="status"
      class="status"
      aria-live="polite"
    ></p>

    <section
      id="results"
      class="results hidden"
      aria-live="polite"
    ></section>

  </main>
</body>
</html>`;

const CSS = `
:root {
  --bg: #0b1020;
  --bg-2: #111833;

  --panel: #151b2f;
  --panel-2: #1c2540;
  --panel-3: #10172a;

  --text: #f2f5ff;
  --muted: #b8c1e0;
  --muted-2: #8994ba;

  --border: #2c365f;
  --border-strong: #3a4778;

  --accent: #6ea8fe;
  --accent-hover: #8ab8ff;

  --danger: #ff8d8d;
  --success: #9be5ad;

  --radius: 18px;
  --radius-small: 12px;
}

* {
  box-sizing: border-box;
}

html {
  color-scheme: dark;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at top center,
      #172143 0%,
      transparent 35%
    ),
    linear-gradient(
      180deg,
      var(--bg) 0%,
      var(--bg-2) 100%
    );

  color: var(--text);

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

button,
textarea,
select,
input {
  font-family: inherit;
}

.container {
  width: min(
    1240px,
    calc(100% - 2rem)
  );

  margin: 0 auto;

  padding:
    2.5rem
    0
    5rem;
}

.hero {
  margin-bottom: 1.75rem;
}

h1 {
  margin:
    0
    0
    0.55rem;

  font-size:
    clamp(
      2.25rem,
      5vw,
      4.25rem
    );

  letter-spacing: -0.04em;
}

.lead {
  max-width: 850px;

  margin: 0;

  color: var(--muted);

  line-height: 1.6;

  font-size:
    clamp(
      1rem,
      2vw,
      1.15rem
    );
}

form {
  padding: 1.25rem;

  background:
    rgba(
      21,
      27,
      47,
      0.94
    );

  border:
    1px
    solid
    var(--border);

  border-radius:
    var(--radius);

  backdrop-filter:
    blur(12px);
}

.prompt-section {
  margin-bottom: 1rem;
}

label {
  display: block;

  margin-bottom: 0.55rem;

  font-weight: 700;

  font-size: 1rem;
}

textarea {
  width: 100%;

  min-height: 185px;

  resize: vertical;

  padding:
    0.95rem
    1rem;

  border:
    1px
    solid
    var(--border);

  border-radius:
    var(--radius-small);

  background:
    var(--panel-2);

  color:
    var(--text);

  font-size: 1rem;

  line-height: 1.55;
}

textarea::placeholder,
input::placeholder {
  color:
    var(--muted-2);
}

.controls {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 1rem;

  margin:
    0
    0
    1.25rem;
}

.control {
  display: flex;

  flex-direction: column;

  min-width: 0;
}

.control label {
  margin-bottom: 0.45rem;

  color: var(--muted);

  font-size: 0.92rem;
}

.optional {
  margin-left: 0.25rem;

  font-weight: 400;

  opacity: 0.75;
}

select,
input[type="number"] {
  width: 100%;

  min-height: 48px;

  padding:
    0.75rem
    0.85rem;

  border:
    1px
    solid
    var(--border);

  border-radius:
    10px;

  background:
    var(--panel-2);

  color:
    var(--text);

  font-size: 0.95rem;
}

.control-help {
  display: block;

  margin-top: 0.42rem;

  color:
    var(--muted-2);

  font-size: 0.78rem;

  line-height: 1.35;
}

textarea:focus,
select:focus,
input[type="number"]:focus {
  outline:
    2px
    solid
    var(--accent);

  outline-offset: 1px;

  border-color:
    transparent;
}

.verification-row {
  min-height: 70px;

  display: flex;

  align-items: center;

  margin-top: 0.25rem;
}

.submit-row {
  margin-top: 0.25rem;
}

button {
  appearance: none;

  border: none;

  border-radius: 999px;

  padding:
    0.95rem
    1.35rem;

  background:
    var(--accent);

  color:
    #08101f;

  font-size: 1rem;

  font-weight: 800;

  cursor: pointer;

  transition:
    transform 120ms ease,
    background 120ms ease,
    opacity 120ms ease;
}

button:hover:not(:disabled) {
  background:
    var(--accent-hover);

  transform:
    translateY(-1px);
}

button:active:not(:disabled) {
  transform:
    translateY(0);
}

button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.status {
  min-height: 1.6rem;

  margin:
    1rem
    0;

  color:
    var(--muted);

  font-size: 1rem;
}

.results {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 1rem;

  margin-top: 1rem;
}

.result-card {
  min-width: 0;

  padding: 1rem;

  background:
    rgba(
      21,
      27,
      47,
      0.95
    );

  border:
    1px
    solid
    var(--border);

  border-radius:
    var(--radius);
}

.result-card h3 {
  margin:
    0
    0
    0.35rem;

  font-size: 1.05rem;
}

.result-meta {
  margin:
    0
    0
    0.8rem;

  color:
    var(--muted-2);

  font-size: 0.78rem;

  line-height: 1.4;

  overflow-wrap: anywhere;
}

.image-shell {
  display: flex;

  align-items: center;

  justify-content: center;

  width: 100%;

  overflow: hidden;

  border-radius: 14px;

  background:
    #070a12;

  border:
    1px
    solid
    rgba(
      255,
      255,
      255,
      0.04
    );
}

.result-card img {
  display: block;

  width: 100%;

  height: auto;

  object-fit: contain;
}

.result-actions {
  display: flex;

  gap: 0.5rem;

  margin-top: 0.8rem;

  flex-wrap: wrap;
}

.result-actions a {
  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 40px;

  padding:
    0.5rem
    0.9rem;

  border:
    1px
    solid
    var(--border);

  border-radius: 999px;

  color:
    var(--text);

  text-decoration: none;

  font-size: 0.9rem;
}

.result-actions a:hover {
  border-color:
    var(--border-strong);
}

.error-card {
  border-color:
    #6a2d2d;
}

.error-card p {
  margin: 0;

  color:
    var(--danger);

  line-height: 1.5;
}

.hidden {
  display: none;
}

@media (max-width: 900px) {

  .results {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 760px) {

  .controls {
    grid-template-columns: 1fr;
  }

  .container {
    width:
      min(
        100% - 1rem,
        1240px
      );

    padding-top: 1.25rem;
  }

  form {
    padding: 0.85rem;
  }

}
`;

const JS = `
const form =
  document.getElementById('gen-form');

const promptEl =
  document.getElementById('prompt');

const button =
  document.getElementById('submit-btn');

const statusEl =
  document.getElementById('status');

const resultsEl =
  document.getElementById('results');

const sizeEl =
  document.getElementById('size');

const qualityEl =
  document.getElementById('quality');

const seedEl =
  document.getElementById('seed');


function setStatus(
  message,
  isError = false
) {
  statusEl.textContent =
    message;

  statusEl.style.color =
    isError
      ? '#ff8d8d'
      : '#b8c1e0';
}


window.onTurnstileError =
  function(errorCode) {

    console.error(
      'Turnstile error:',
      errorCode
    );

    setStatus(
      'Verification service error: ' +
        errorCode,
      true
    );
  };


function extensionForMime(
  mimeType
) {
  if (
    mimeType ===
    'image/jpeg'
  ) {
    return 'jpg';
  }

  if (
    mimeType ===
    'image/webp'
  ) {
    return 'webp';
  }

  if (
    mimeType ===
    'image/gif'
  ) {
    return 'gif';
  }

  return 'png';
}


function safeFileName(
  value
) {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      '-'
    )
    .replace(
      /^-+|-+$/g,
      ''
    );
}


function createResultCard(
  item
) {
  const card =
    document.createElement(
      'article'
    );

  card.className =
    'result-card';


  const heading =
    document.createElement(
      'h3'
    );

  heading.textContent =
    item.label;

  card.appendChild(
    heading
  );


  if (item.error) {

    card.classList.add(
      'error-card'
    );

    const errorText =
      document.createElement(
        'p'
      );

    errorText.textContent =
      item.error;

    card.appendChild(
      errorText
    );

    return card;
  }


  const metadata =
    document.createElement(
      'p'
    );

  metadata.className =
    'result-meta';

  metadata.textContent =
    item.width +
    ' × ' +
    item.height +
    ' • ' +
    item.qualityLabel +
    ' • ' +
    item.steps +
    ' steps • Seed ' +
    item.seed;

  card.appendChild(
    metadata
  );


  const imageShell =
    document.createElement(
      'div'
    );

  imageShell.className =
    'image-shell';


  const image =
    document.createElement(
      'img'
    );

  image.src =
    item.dataURI;

  image.alt =
    item.label +
    ' generated image';

  image.loading =
    'eager';

  image.decoding =
    'async';

  imageShell.appendChild(
    image
  );

  card.appendChild(
    imageShell
  );


  const actions =
    document.createElement(
      'div'
    );

  actions.className =
    'result-actions';


  const download =
    document.createElement(
      'a'
    );

  const extension =
    extensionForMime(
      item.mimeType
    );

  download.href =
    item.dataURI;

  download.download =
    safeFileName(
      item.label
    ) +
    '-' +
    item.width +
    'x' +
    item.height +
    '-seed-' +
    item.seed +
    '.' +
    extension;

  download.textContent =
    'Download';

  actions.appendChild(
    download
  );

  card.appendChild(
    actions
  );


  return card;
}


function renderResults(
  results
) {
  resultsEl.replaceChildren();

  for (
    const item
    of results
  ) {
    resultsEl.appendChild(
      createResultCard(
        item
      )
    );
  }

  resultsEl.classList.remove(
    'hidden'
  );
}


form.addEventListener(
  'submit',
  async (event) => {

    event.preventDefault();


    const prompt =
      promptEl.value.trim();

    const size =
      sizeEl.value;

    const quality =
      qualityEl.value;

    const seedValue =
      seedEl.value.trim();


    const seed =
      seedValue === ''
        ? null
        : Number.parseInt(
            seedValue,
            10
          );


    const turnstileToken =
      globalThis.turnstile
        ?.getResponse?.();


    if (!prompt) {

      setStatus(
        'Please enter a prompt.',
        true
      );

      return;
    }


    if (
      seed !== null &&
      (
        !Number.isSafeInteger(
          seed
        ) ||
        seed < 0 ||
        seed > ${MAX_SEED}
      )
    ) {

      setStatus(
        'Seed must be between 0 and ${MAX_SEED}.',
        true
      );

      return;
    }


    if (!turnstileToken) {

      setStatus(
        'Please complete the verification first.',
        true
      );

      return;
    }


    button.disabled =
      true;

    button.textContent =
      'Generating...';


    resultsEl.classList.add(
      'hidden'
    );

    resultsEl.replaceChildren();


    setStatus(
      'Generating with all 4 models. This may take a little while.'
    );


    try {

      const response =
        await fetch(
          '/api/generate',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify({
                prompt,
                size,
                quality,
                seed,
                turnstileToken
              })
          }
        );


      let data;

      try {

        data =
          await response.json();

      } catch {

        throw new Error(
          'The server returned an invalid response.'
        );
      }


      if (!response.ok) {

        throw new Error(
          data?.error ||
          'Generation failed.'
        );
      }


      const results =
        Array.isArray(
          data.results
        )
          ? data.results
          : [];


      renderResults(
        results
      );


      const successCount =
        results.filter(
          (item) =>
            !item.error
        ).length;


      if (
        successCount === 4
      ) {

        setStatus(
          'Done — all 4 models generated successfully.'
        );

      } else if (
        successCount > 0
      ) {

        setStatus(
          'Done — ' +
          successCount +
          ' of 4 models generated successfully.'
        );

      } else {

        setStatus(
          'All 4 models failed to generate an image.',
          true
        );
      }

    } catch (error) {

      console.error(
        error
      );

      setStatus(
        error?.message ||
        'Something went wrong.',
        true
      );

    } finally {

      globalThis.turnstile
        ?.reset?.();

      button.disabled =
        false;

      button.textContent =
        'Generate 4 images';
    }
  }
);
`;

const COMMON_HEADERS = {
  "Cache-Control":
    "no-store, no-cache, must-revalidate, max-age=0",

  "Pragma":
    "no-cache",

  "Expires":
    "0",

  "X-Content-Type-Options":
    "nosniff",

  "X-Frame-Options":
    "DENY",

  "Referrer-Policy":
    "no-referrer",

  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=()",

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

  async fetch(
    request,
    env
  ) {

    const url =
      new URL(
        request.url
      );


    if (
      request.method === "GET" &&
      url.pathname === "/"
    ) {

      return new Response(
        HTML(
          env.TURNSTILE_SITE_KEY ||
          ""
        ),
        {
          headers: {
            ...COMMON_HEADERS,

            "Content-Type":
              "text/html; charset=UTF-8"
          }
        }
      );
    }


    if (
      request.method === "GET" &&
      url.pathname === "/styles.css"
    ) {

      return new Response(
        CSS,
        {
          headers: {
            ...COMMON_HEADERS,

            "Content-Type":
              "text/css; charset=UTF-8"
          }
        }
      );
    }


    if (
      request.method === "GET" &&
      url.pathname === "/app.js"
    ) {

      return new Response(
        JS,
        {
          headers: {
            ...COMMON_HEADERS,

            "Content-Type":
              "application/javascript; charset=UTF-8"
          }
        }
      );
    }


    if (
      request.method === "POST" &&
      url.pathname === "/api/generate"
    ) {

      return handleGenerate(
        request,
        env
      );
    }


    return json(
      {
        error:
          "Not found."
      },
      404
    );
  }
};


async function handleGenerate(
  request,
  env
) {

  const requestOrigin =
    request.headers.get(
      "Origin"
    );

  const siteOrigin =
    new URL(
      request.url
    ).origin;


  if (
    requestOrigin &&
    requestOrigin !==
      siteOrigin
  ) {

    return json(
      {
        error:
          "Forbidden origin."
      },
      403
    );
  }


  const contentLength =
    Number(
      request.headers.get(
        "Content-Length"
      ) ||
      0
    );


  if (
    contentLength >
    10000
  ) {

    return json(
      {
        error:
          "Request is too large."
      },
      413
    );
  }


  const contentType =
    request.headers.get(
      "content-type"
    ) ||
    "";


  if (
    !contentType.includes(
      "application/json"
    )
  ) {

    return json(
      {
        error:
          "Content-Type must be application/json."
      },
      415
    );
  }


  let body;


  try {

    body =
      await request.json();

  } catch {

    return json(
      {
        error:
          "Invalid JSON body."
      },
      400
    );
  }


  const prompt =
    String(
      body?.prompt ||
      ""
    ).trim();


  const turnstileToken =
    String(
      body?.turnstileToken ||
      ""
    ).trim();


  const sizeKey =
    String(
      body?.size ||
      "square"
    );


  const quality =
    body?.quality ===
      "standard"
      ? "standard"
      : "best";


  const size =
    SIZES[
      sizeKey
    ];


  if (!size) {

    return json(
      {
        error:
          "Invalid image size."
      },
      400
    );
  }


  if (
    prompt.length < 3 ||
    prompt.length > 500
  ) {

    return json(
      {
        error:
          "Prompt must be between 3 and 500 characters."
      },
      400
    );
  }


  let seed;


  if (
    body?.seed === null ||
    body?.seed === undefined ||
    body?.seed === ""
  ) {

    seed =
      Math.floor(
        Math.random() *
        MAX_SEED
      );

  } else {

    seed =
      Number.parseInt(
        body.seed,
        10
      );


    if (
      !Number.isSafeInteger(
        seed
      ) ||
      seed < 0 ||
      seed > MAX_SEED
    ) {

      return json(
        {
          error:
            "Invalid seed."
        },
        400
      );
    }
  }


  if (!turnstileToken) {

    return json(
      {
        error:
          "Missing verification token."
      },
      400
    );
  }


  const remoteip =
    request.headers.get(
      "CF-Connecting-IP"
    ) ||
    "";


  const verification =
    await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
      remoteip,
      env.EXPECTED_HOSTNAME
    );


  if (
    !verification.success
  ) {

    console.error(
      "Turnstile verification failed:",
      verification
    );


    return json(
      {
        error:
          "Verification failed."
      },
      403
    );
  }


  const finalPrompt =
    buildPrompt(
      prompt,
      size
    );


  const negativePrompt =
    buildNegativePrompt();


  const results =
    await Promise.all(

      MODELS.map(
        (model) =>
          generateImageForModel(
            env,
            model,
            finalPrompt,
            negativePrompt,
            size,
            quality,
            seed
          )
      )
    );


  return json(
    {
      results
    }
  );
}


function buildPrompt(
  userPrompt,
  size
) {

  return `
USER REQUEST:
${userPrompt}

Create exactly what the user requested above.

IMAGE REQUIREMENTS:
- Photorealistic and believable
- Preserve the exact primary subject requested by the user
- Do not replace the requested subject with a different object
- True-to-life materials and textures
- Physically believable lighting
- Natural shadows and reflections
- Realistic proportions and geometry
- High detail
- Sharp focus on the primary subject
- Natural photographic depth and perspective
- No unnecessary objects added to the scene
- Keep the main subject fully visible inside the frame unless the user explicitly asks for a close-up
- Do not cut off important parts of the main subject
- Compose naturally for a ${size.width} by ${size.height} image
- Use the requested aspect ratio naturally
`;
}


function buildNegativePrompt() {

  return `
cartoon,
anime,
illustration,
painting,
drawing,
comic,
3d render,
cgi appearance,
plastic-looking materials,
unrealistic geometry,
distorted proportions,
duplicate main subject,
unwanted extra objects,
cropped main subject,
main subject cut off,
main subject outside frame,
blurry,
out of focus,
low detail,
low resolution,
overprocessed,
oversharpened,
watermark,
logo,
random text,
gibberish text
`;
}


async function generateImageForModel(
  env,
  model,
  prompt,
  negativePrompt,
  size,
  quality,
  seed
) {

  try {

    const steps =
      quality ===
        "best"
        ? model.bestSteps
        : model.standardSteps;


    const input = {
      prompt,

      width:
        size.width,

      height:
        size.height,

      num_steps:
        steps,

      guidance:
        model.guidance,

      seed
    };


    if (
      model.supportsNegativePrompt
    ) {

      input.negative_prompt =
        negativePrompt;
    }


    const output =
      await env.AI.run(
        model.id,
        input
      );


    const image =
      await normalizeImageOutput(
        output
      );


    return {
      label:
        model.label,

      model:
        model.id,

      width:
        size.width,

      height:
        size.height,

      qualityLabel:
        quality ===
          "best"
          ? "Best quality"
          : "Standard",

      steps,

      seed,

      mimeType:
        image.mimeType,

      dataURI:
        image.dataURI
    };

  } catch (error) {

    console.error(
      "Model failed:",
      model.label,
      error
    );


    return {
      label:
        model.label,

      model:
        model.id,

      error:
        "This model failed to generate an image."
    };
  }
}


async function normalizeImageOutput(
  output
) {

  if (
    output &&
    typeof output ===
      "object" &&
    typeof output.image ===
      "string"
  ) {

    const imageString =
      output.image;


    if (
      imageString.startsWith(
        "data:image/"
      )
    ) {

      const mimeEnd =
        imageString.indexOf(
          ";"
        );


      const mimeType =
        mimeEnd > 5
          ? imageString.slice(
              5,
              mimeEnd
            )
          : "image/jpeg";


      return {
        mimeType,
        dataURI:
          imageString
      };
    }


    const mimeType =
      detectMimeFromBase64(
        imageString
      );


    return {
      mimeType,

      dataURI:
        `data:${mimeType};base64,${imageString}`
    };
  }


  const arrayBuffer =
    await new Response(
      output
    ).arrayBuffer();


  const bytes =
    new Uint8Array(
      arrayBuffer
    );


  const mimeType =
    detectImageMime(
      bytes
    );


  const base64 =
    uint8ToBase64(
      bytes
    );


  return {
    mimeType,

    dataURI:
      `data:${mimeType};base64,${base64}`
  };
}


function detectMimeFromBase64(
  base64
) {

  try {

    const sample =
      atob(
        base64.slice(
          0,
          32
        )
      );


    const bytes =
      Uint8Array.from(
        sample,
        (character) =>
          character.charCodeAt(
            0
          )
      );


    return detectImageMime(
      bytes
    );

  } catch {

    return "image/jpeg";
  }
}


function detectImageMime(
  bytes
) {

  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {

    return "image/png";
  }


  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {

    return "image/jpeg";
  }


  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {

    return "image/webp";
  }


  if (
    bytes.length >= 6 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46
  ) {

    return "image/gif";
  }


  return "image/png";
}


function uint8ToBase64(
  bytes
) {

  let binary =
    "";


  const chunkSize =
    0x8000;


  for (
    let i = 0;
    i < bytes.length;
    i += chunkSize
  ) {

    const chunk =
      bytes.subarray(
        i,
        i + chunkSize
      );


    binary +=
      String.fromCharCode(
        ...chunk
      );
  }


  return btoa(
    binary
  );
}


async function verifyTurnstile(
  secret,
  token,
  remoteip,
  expectedHostname
) {

  if (
    !secret ||
    !expectedHostname
  ) {

    return {
      success: false,
      reason:
        "missing-configuration"
    };
  }


  const params =
    new URLSearchParams();


  params.set(
    "secret",
    secret
  );


  params.set(
    "response",
    token
  );


  if (remoteip) {

    params.set(
      "remoteip",
      remoteip
    );
  }


  try {

    const response =
      await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          },

          body:
            params.toString()
        }
      );


    if (
      !response.ok
    ) {

      return {
        success: false,
        reason:
          "siteverify-http-error"
      };
    }


    const data =
      await response.json();


    if (
      data.success !== true
    ) {

      return {
        success: false,
        reason:
          "siteverify-rejected",
        errorCodes:
          data["error-codes"] ||
          []
      };
    }


    if (
      data.hostname !==
      expectedHostname
    ) {

      return {
        success: false,
        reason:
          "hostname-mismatch",
        hostname:
          data.hostname
      };
    }


    return {
      success: true
    };

  } catch (error) {

    console.error(
      "Turnstile verify error:",
      error
    );


    return {
      success: false,
      reason:
        "siteverify-request-error"
    };
  }
}


function json(
  data,
  status = 200
) {

  return new Response(
    JSON.stringify(
      data
    ),
    {
      status,

      headers: {
        ...COMMON_HEADERS,

        "Content-Type":
          "application/json; charset=UTF-8"
      }
    }
  );
}