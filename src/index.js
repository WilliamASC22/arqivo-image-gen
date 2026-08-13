const MODELS = [
  {
    label: "SDXL Lightning",
    id: "@cf/bytedance/stable-diffusion-xl-lightning",
    standardSteps: 10,
    bestSteps: 20,
    guidance: 7.5
  },
  {
    label: "SDXL Base",
    id: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    standardSteps: 16,
    bestSteps: 20,
    guidance: 7.5
  },
  {
    label: "Lucid Origin",
    id: "@cf/leonardo/lucid-origin",
    standardSteps: 20,
    bestSteps: 32,
    guidance: 5.5
  },
  {
    label: "Phoenix",
    id: "@cf/leonardo/phoenix-1.0",
    standardSteps: 25,
    bestSteps: 35,
    guidance: 7.5
  }
];

const SIZES = {
  square: {
    label: "Square",
    width: 1024,
    height: 1024
  },
  landscape: {
    label: "Landscape 4:3",
    width: 1024,
    height: 768
  },
  portrait: {
    label: "Portrait 3:4",
    width: 768,
    height: 1024
  },
  widescreen: {
    label: "Widescreen 16:9",
    width: 1024,
    height: 576
  },
  tall: {
    label: "Tall 9:16",
    width: 576,
    height: 1024
  },
  economy: {
    label: "Economy Square",
    width: 512,
    height: 512
  }
};

const STYLES = {
  photorealistic: {
    label: "Photorealistic",
    instruction:
      "High-end photorealistic image with true-to-life materials, realistic lighting, realistic shadows, realistic reflections, natural depth, believable geometry, fine detail, and no illustrated or CGI appearance."
  },

  natural: {
    label: "Natural",
    instruction:
      "Natural realistic photograph with believable ambient light, restrained contrast, authentic colors, natural textures, realistic imperfections, and documentary-style realism."
  },

  cinematic: {
    label: "Cinematic",
    instruction:
      "Photorealistic cinematic still with realistic dramatic lighting, controlled contrast, natural depth of field, believable materials, film-like composition, and realistic color grading."
  },

  product: {
    label: "Product",
    instruction:
      "Premium commercial product photography with highly realistic materials, controlled professional lighting, accurate reflections, crisp details, clean composition, and realistic proportions."
  },

  editorial: {
    label: "Editorial",
    instruction:
      "Photorealistic editorial magazine photography with refined composition, realistic lighting, natural detail, sophisticated color treatment, and authentic materials."
  }
};

const FRAMING = {
  full_subject: {
    label: "Full subject",
    instruction:
      "The entire primary subject must be fully visible inside the frame. Pull the camera back enough to show the complete subject and leave comfortable visible margin around it. Do not cut off important parts."
  },

  auto: {
    label: "Automatic",
    instruction:
      "Choose the most appropriate professional composition for the user's request while keeping the main subject clear and visually dominant."
  },

  wide: {
    label: "Wide scene",
    instruction:
      "Use a wider composition that shows the primary subject clearly together with meaningful surrounding environment. Avoid placing important elements against the edges."
  },

  closeup: {
    label: "Close-up",
    instruction:
      "Use a deliberate close-up composition focused on the most important part of the requested subject while maintaining realistic perspective and clear visual intent."
  }
};

const HTML = (siteKey) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>Arqivo Image Gen</title>

  <link rel="stylesheet" href="/styles.css" />

  <script
    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
    async
    defer
  ></script>

  <script src="/app.js" defer></script>
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

    <form id="gen-form" novalidate>

      <div class="prompt-section">
        <label for="prompt">
          Describe the image you want
        </label>

        <textarea
          id="prompt"
          name="prompt"
          rows="6"
          maxlength="700"
          placeholder="Example: an all-black exotic sports car parked on a wet city street at night, photorealistic"
          required
        ></textarea>

        <div class="prompt-footer">
          <span>
            Describe the subject first. Arqivo adds the quality instructions automatically.
          </span>

          <span id="character-count">
            0 / 700
          </span>
        </div>
      </div>

      <div class="controls">

        <div class="control">
          <label for="size">
            Image size
          </label>

          <select id="size" name="size">
            <option value="square" selected>
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

            <option value="economy">
              Economy — 512 × 512
            </option>
          </select>
        </div>

        <div class="control">
          <label for="quality">
            Quality
          </label>

          <select id="quality" name="quality">
            <option value="best" selected>
              Best quality
            </option>

            <option value="standard">
              Standard
            </option>
          </select>
        </div>

        <div class="control">
          <label for="style">
            Visual style
          </label>

          <select id="style" name="style">
            <option value="photorealistic" selected>
              Photorealistic
            </option>

            <option value="natural">
              Natural
            </option>

            <option value="cinematic">
              Cinematic
            </option>

            <option value="product">
              Product photography
            </option>

            <option value="editorial">
              Editorial photography
            </option>
          </select>
        </div>

        <div class="control">
          <label for="framing">
            Framing
          </label>

          <select id="framing" name="framing">
            <option value="full_subject" selected>
              Full subject in frame
            </option>

            <option value="auto">
              Automatic
            </option>

            <option value="wide">
              Wide scene
            </option>

            <option value="closeup">
              Close-up
            </option>
          </select>
        </div>

        <div class="control">
          <label for="seed">
            Seed
            <span class="optional">
              (optional)
            </span>
          </label>

          <input
            id="seed"
            name="seed"
            type="number"
            min="0"
            max="2147483647"
            step="1"
            placeholder="Random"
          />
        </div>

      </div>

      <p class="quota-note">
        Larger images and Best quality use more of the daily free AI allowance.
      </p>

      <div
        class="cf-turnstile"
        data-sitekey="${siteKey}"
        data-error-callback="onTurnstileError"
      ></div>

      <button
        id="submit-btn"
        type="submit"
      >
        Generate 4 images
      </button>

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
  --bg-secondary: #111832;

  --panel: #151b2f;
  --panel-2: #1c2540;

  --text: #f2f5ff;
  --muted: #b8c1e0;

  --border: #2c365f;
  --border-bright: #405080;

  --accent: #6ea8fe;
  --accent-hover: #8ab8ff;

  --danger: #ff8d8d;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;

  min-height: 100%;

  background:
    linear-gradient(
      180deg,
      var(--bg) 0%,
      var(--bg-secondary) 100%
    );

  color: var(--text);

  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

body {
  min-height: 100vh;
}

.container {
  width: min(
    1200px,
    calc(100% - 2rem)
  );

  margin: 0 auto;

  padding:
    2rem
    0
    5rem;
}

.hero {
  margin-bottom: 1.5rem;
}

h1 {
  margin:
    0
    0
    0.5rem;

  font-size:
    clamp(
      2.4rem,
      5vw,
      4.25rem
    );

  letter-spacing: -0.04em;
}

.lead {
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
  background:
    rgba(
      21,
      27,
      47,
      0.92
    );

  border:
    1px
    solid
    var(--border);

  border-radius: 20px;

  padding: 1.25rem;

  backdrop-filter: blur(12px);
}

label {
  display: block;

  margin-bottom: 0.5rem;

  font-size: 1rem;

  font-weight: 700;
}

textarea {
  width: 100%;

  min-height: 190px;

  resize: vertical;

  background: var(--panel-2);

  color: var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius: 14px;

  padding: 1rem;

  font: inherit;

  line-height: 1.5;
}

textarea::placeholder,
input::placeholder {
  color: #9099b9;
}

textarea:focus,
select:focus,
input[type="number"]:focus {
  outline:
    2px
    solid
    var(--accent);

  outline-offset: 2px;
}

.prompt-footer {
  display: flex;

  justify-content: space-between;

  gap: 1rem;

  margin:
    0.55rem
    0
    1.25rem;

  color: var(--muted);

  font-size: 0.82rem;

  line-height: 1.4;
}

#character-count {
  white-space: nowrap;
}

.controls {
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 1rem;

  margin-bottom: 1rem;
}

.control {
  display: flex;

  flex-direction: column;

  gap: 0.4rem;
}

.control label {
  margin: 0;

  color: var(--muted);

  font-size: 0.88rem;
}

.optional {
  font-weight: 400;

  opacity: 0.7;
}

select,
input[type="number"] {
  width: 100%;

  background: var(--panel-2);

  color: var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius: 11px;

  padding: 0.8rem;

  font: inherit;
}

.quota-note {
  margin:
    0
    0
    1rem;

  color: var(--muted);

  font-size: 0.82rem;

  line-height: 1.4;
}

button {
  appearance: none;

  border: none;

  margin-top: 1rem;

  padding:
    0.95rem
    1.4rem;

  border-radius: 999px;

  background: var(--accent);

  color: #08101f;

  font-size: 1rem;

  font-weight: 800;

  cursor: pointer;

  transition:
    transform 120ms ease,
    background 120ms ease,
    opacity 120ms ease;
}

button:hover:not(:disabled) {
  background: var(--accent-hover);

  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}

.status {
  min-height: 1.5rem;

  margin:
    1rem
    0;

  color: var(--muted);

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

  border-radius: 20px;

  padding: 1rem;
}

.result-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 0.8rem;
}

.result-title {
  margin: 0;

  font-size: 1.05rem;
}

.result-meta {
  margin: 0.25rem 0 0;

  color: var(--muted);

  font-size: 0.78rem;

  line-height: 1.4;
}

.result-card img {
  display: block;

  width: 100%;

  height: auto;

  border-radius: 14px;

  background: #070a12;

  object-fit: contain;
}

.result-actions {
  display: flex;

  flex-wrap: wrap;

  gap: 0.6rem;

  margin-top: 0.8rem;
}

.result-actions a {
  display: inline-block;

  padding:
    0.55rem
    0.95rem;

  border:
    1px
    solid
    var(--border-bright);

  border-radius: 999px;

  color: var(--text);

  text-decoration: none;

  font-size: 0.9rem;
}

.result-actions a:hover {
  border-color: var(--accent);
}

.error-card {
  border-color: #6a2d2d;
}

.error-message {
  margin: 0;

  color: var(--danger);

  line-height: 1.5;
}

.hidden {
  display: none;
}

@media (max-width: 900px) {
  .results {
    grid-template-columns: 1fr;
  }

  .controls {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }
}

@media (max-width: 650px) {
  .container {
    width:
      min(
        100% - 1rem,
        1200px
      );
  }

  form {
    padding: 1rem;
  }

  .controls {
    grid-template-columns: 1fr;
  }

  .prompt-footer {
    flex-direction: column;

    gap: 0.3rem;
  }

  .result-header {
    flex-direction: column;
  }
}
`;

const JS = `
const form = document.getElementById('gen-form');

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

const styleEl =
  document.getElementById('style');

const framingEl =
  document.getElementById('framing');

const seedEl =
  document.getElementById('seed');

const characterCountEl =
  document.getElementById('character-count');


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


function updateCharacterCount() {
  characterCountEl.textContent =
    String(promptEl.value.length)
    + ' / 700';
}


promptEl.addEventListener(
  'input',
  updateCharacterCount
);


updateCharacterCount();


window.onTurnstileError =
  function(errorCode) {

    console.error(
      'Turnstile error:',
      errorCode
    );

    setStatus(
      'Turnstile error: '
      + errorCode,
      true
    );
  };


function clearResults() {
  resultsEl.innerHTML = '';

  resultsEl.classList.add(
    'hidden'
  );
}


function makeResultCard(item) {
  const card =
    document.createElement(
      'article'
    );

  card.className =
    'result-card';


  if (item.error) {
    card.classList.add(
      'error-card'
    );

    const title =
      document.createElement(
        'h3'
      );

    title.className =
      'result-title';

    title.textContent =
      item.label;


    const error =
      document.createElement(
        'p'
      );

    error.className =
      'error-message';

    error.textContent =
      item.error;


    card.appendChild(
      title
    );

    card.appendChild(
      error
    );

    return card;
  }


  const header =
    document.createElement(
      'div'
    );

  header.className =
    'result-header';


  const headingWrapper =
    document.createElement(
      'div'
    );


  const title =
    document.createElement(
      'h3'
    );

  title.className =
    'result-title';

  title.textContent =
    item.label;


  const meta =
    document.createElement(
      'p'
    );

  meta.className =
    'result-meta';

  meta.textContent =
    item.width
    + ' × '
    + item.height
    + ' • '
    + item.qualityLabel
    + ' • '
    + item.steps
    + ' steps • seed '
    + item.seed;


  headingWrapper.appendChild(
    title
  );

  headingWrapper.appendChild(
    meta
  );

  header.appendChild(
    headingWrapper
  );


  const image =
    document.createElement(
      'img'
    );

  image.src =
    item.dataURI;

  image.alt =
    item.label
    + ' generated image';


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

  download.href =
    item.dataURI;


  const safeName =
    item.label
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        '-'
      )
      .replace(
        /^-+|-+$/g,
        ''
      );


  download.download =
    'arqivo-'
    + safeName
    + '-'
    + item.width
    + 'x'
    + item.height
    + '-seed-'
    + item.seed
    + item.extension;


  download.textContent =
    'Download';


  actions.appendChild(
    download
  );


  card.appendChild(
    header
  );

  card.appendChild(
    image
  );

  card.appendChild(
    actions
  );


  return card;
}


function renderResults(results) {
  resultsEl.innerHTML = '';

  for (
    const item
    of results
  ) {
    resultsEl.appendChild(
      makeResultCard(item)
    );
  }

  resultsEl.classList.remove(
    'hidden'
  );
}


form.addEventListener(
  'submit',
  async function(event) {

    event.preventDefault();


    const prompt =
      promptEl.value.trim();

    const size =
      sizeEl.value;

    const quality =
      qualityEl.value;

    const style =
      styleEl.value;

    const framing =
      framingEl.value;


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
      seed !== null
      &&
      (
        !Number.isSafeInteger(
          seed
        )
        ||
        seed < 0
        ||
        seed > 2147483647
      )
    ) {
      setStatus(
        'Seed must be a whole number between 0 and 2147483647.',
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


    clearResults();


    const selectedSizeText =
      sizeEl.options[
        sizeEl.selectedIndex
      ].text;


    setStatus(
      'Generating 4 images at '
      + selectedSizeText
      + '. This may take a little while.'
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
                style,
                framing,
                seed,
                turnstileToken
              })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data?.error
          ||
          'Generation failed.'
        );
      }


      renderResults(
        data.results || []
      );


      const successCount =
        (
          data.results
          ||
          []
        )
        .filter(
          function(item) {
            return !item.error;
          }
        )
        .length;


      if (successCount === 4) {
        setStatus(
          'Done. All 4 models generated successfully.'
        );
      }
      else {
        setStatus(
          'Done. '
          + successCount
          + ' of 4 models generated successfully.'
        );
      }

    }
    catch (error) {

      console.error(
        error
      );

      setStatus(
        error.message
        ||
        'Something went wrong.',
        true
      );
    }
    finally {

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
      request.method === "GET"
      &&
      url.pathname === "/"
    ) {

      return new Response(
        HTML(
          env.TURNSTILE_SITE_KEY
          ||
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
      request.method === "GET"
      &&
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
      request.method === "GET"
      &&
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
      request.method === "POST"
      &&
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
          "Not found"
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
    requestOrigin
    &&
    requestOrigin !== siteOrigin
  ) {

    return json(
      {
        error:
          "Forbidden origin."
      },

      403
    );
  }


  const contentType =
    request.headers.get(
      "content-type"
    )
    ||
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


  const contentLength =
    Number(
      request.headers.get(
        "content-length"
      )
      ||
      0
    );


  if (
    contentLength
    &&
    contentLength > 20000
  ) {

    return json(
      {
        error:
          "Request is too large."
      },

      413
    );
  }


  let body;


  try {

    body =
      await request.json();

  }
  catch {

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
      body?.prompt
      ||
      ""
    ).trim();


  const turnstileToken =
    String(
      body?.turnstileToken
      ||
      ""
    ).trim();


  const sizeKey =
    String(
      body?.size
      ||
      "square"
    );


  const styleKey =
    String(
      body?.style
      ||
      "photorealistic"
    );


  const framingKey =
    String(
      body?.framing
      ||
      "full_subject"
    );


  const quality =
    body?.quality === "standard"
      ? "standard"
      : "best";


  const size =
    SIZES[
      sizeKey
    ];


  const style =
    STYLES[
      styleKey
    ];


  const framing =
    FRAMING[
      framingKey
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


  if (!style) {

    return json(
      {
        error:
          "Invalid visual style."
      },

      400
    );
  }


  if (!framing) {

    return json(
      {
        error:
          "Invalid framing option."
      },

      400
    );
  }


  let seed;


  if (
    body?.seed === null
    ||
    body?.seed === undefined
    ||
    body?.seed === ""
  ) {

    seed =
      Math.floor(
        Math.random()
        *
        1000000000
      );

  }
  else {

    seed =
      Number.parseInt(
        body.seed,
        10
      );


    if (
      !Number.isSafeInteger(
        seed
      )
      ||
      seed < 0
      ||
      seed > 2147483647
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


  if (
    prompt.length < 3
    ||
    prompt.length > 700
  ) {

    return json(
      {
        error:
          "Prompt must be between 3 and 700 characters."
      },

      400
    );
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
    )
    ||
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
      style.instruction,
      framing.instruction
    );


  const negativePrompt =
    buildNegativePrompt(
      framingKey
    );


  const results =
    await Promise.all(

      MODELS.map(
        function(model) {

          return generateImageForModel(
            env,
            model,
            finalPrompt,
            negativePrompt,
            size,
            quality,
            seed
          );
        }
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
  styleInstruction,
  framingInstruction
) {

  return [
    "PRIMARY USER REQUEST:",
    userPrompt,

    "",

    "IMPORTANT:",
    "Follow the user's requested subject literally.",
    "Do not replace the requested subject with photography equipment or unrelated objects.",
    "Do not invent a different primary subject.",

    "",

    "VISUAL STYLE:",
    styleInstruction,

    "",

    "COMPOSITION:",
    framingInstruction,

    "",

    "QUALITY REQUIREMENTS:",
    "Believable geometry and proportions.",
    "Accurate material appearance.",
    "Realistic lighting behavior.",
    "Realistic reflections and shadows.",
    "Clear intentional composition.",
    "High detail.",
    "Sharp primary subject.",
    "No accidental text, logos, borders, frames, or watermarks."
  ].join(
    "\\n"
  );
}


function buildNegativePrompt(
  framingKey
) {

  const negatives = [
    "wrong subject",
    "unrelated primary subject",
    "cartoon",
    "anime",
    "illustration",
    "painting",
    "drawing",
    "obvious CGI",
    "plastic-looking materials",
    "bad geometry",
    "deformed",
    "distorted",
    "duplicate subject",
    "blurry",
    "low resolution",
    "low detail",
    "watermark",
    "logo",
    "accidental text",
    "decorative frame",
    "image border"
  ];


  if (
    framingKey ===
    "full_subject"
  ) {

    negatives.push(
      "cropped primary subject",
      "cut off primary subject",
      "subject outside frame",
      "important parts outside frame",
      "extreme close-up"
    );
  }


  return negatives.join(
    ", "
  );
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
      quality === "best"
        ? model.bestSteps
        : model.standardSteps;


    const output =
      await env.AI.run(
        model.id,

        {
          prompt,

          negative_prompt:
            negativePrompt,

          width:
            size.width,

          height:
            size.height,

          num_steps:
            steps,

          guidance:
            model.guidance,

          seed
        }
      );


    let imageInfo;


    if (
      output
      &&
      typeof output === "object"
      &&
      typeof output.image === "string"
    ) {

      imageInfo =
        base64ImageToDataURI(
          output.image
        );

    }
    else {

      imageInfo =
        await streamToImageDataURI(
          output
        );
    }


    return {
      label:
        model.label,

      model:
        model.id,

      width:
        size.width,

      height:
        size.height,

      steps,

      seed,

      qualityLabel:
        quality === "best"
          ? "Best"
          : "Standard",

      dataURI:
        imageInfo.dataURI,

      extension:
        imageInfo.extension
    };

  }
  catch (error) {

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


function base64ImageToDataURI(
  imageBase64
) {

  if (
    imageBase64.startsWith(
      "data:image/"
    )
  ) {

    const extension =
      extensionFromDataURI(
        imageBase64
      );


    return {
      dataURI:
        imageBase64,

      extension
    };
  }


  let mimeType =
    "image/png";


  let extension =
    ".png";


  if (
    imageBase64.startsWith(
      "/9j/"
    )
  ) {

    mimeType =
      "image/jpeg";

    extension =
      ".jpg";
  }


  else if (
    imageBase64.startsWith(
      "iVBOR"
    )
  ) {

    mimeType =
      "image/png";

    extension =
      ".png";
  }


  else if (
    imageBase64.startsWith(
      "UklGR"
    )
  ) {

    mimeType =
      "image/webp";

    extension =
      ".webp";
  }


  return {
    dataURI:
      "data:"
      +
      mimeType
      +
      ";base64,"
      +
      imageBase64,

    extension
  };
}


async function streamToImageDataURI(
  stream
) {

  const arrayBuffer =
    await new Response(
      stream
    ).arrayBuffer();


  const bytes =
    new Uint8Array(
      arrayBuffer
    );


  const imageType =
    detectImageType(
      bytes
    );


  const base64 =
    uint8ToBase64(
      bytes
    );


  return {
    dataURI:
      "data:"
      +
      imageType.mimeType
      +
      ";base64,"
      +
      base64,

    extension:
      imageType.extension
  };
}


function detectImageType(
  bytes
) {

  if (
    bytes.length >= 8
    &&
    bytes[0] === 0x89
    &&
    bytes[1] === 0x50
    &&
    bytes[2] === 0x4e
    &&
    bytes[3] === 0x47
  ) {

    return {
      mimeType:
        "image/png",

      extension:
        ".png"
    };
  }


  if (
    bytes.length >= 3
    &&
    bytes[0] === 0xff
    &&
    bytes[1] === 0xd8
    &&
    bytes[2] === 0xff
  ) {

    return {
      mimeType:
        "image/jpeg",

      extension:
        ".jpg"
    };
  }


  if (
    bytes.length >= 12
    &&
    bytes[0] === 0x52
    &&
    bytes[1] === 0x49
    &&
    bytes[2] === 0x46
    &&
    bytes[3] === 0x46
    &&
    bytes[8] === 0x57
    &&
    bytes[9] === 0x45
    &&
    bytes[10] === 0x42
    &&
    bytes[11] === 0x50
  ) {

    return {
      mimeType:
        "image/webp",

      extension:
        ".webp"
    };
  }


  return {
    mimeType:
      "image/png",

    extension:
      ".png"
  };
}


function extensionFromDataURI(
  dataURI
) {

  if (
    dataURI.startsWith(
      "data:image/jpeg"
    )
  ) {

    return ".jpg";
  }


  if (
    dataURI.startsWith(
      "data:image/webp"
    )
  ) {

    return ".webp";
  }


  return ".png";
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
    !secret
    ||
    !expectedHostname
  ) {

    return {
      success: false,
      reason:
        "Missing server configuration."
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


    if (!response.ok) {

      return {
        success: false,
        reason:
          "Siteverify request failed."
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
          "Turnstile rejected token.",

        errorCodes:
          data["error-codes"]
          ||
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
          "Hostname mismatch.",

        hostname:
          data.hostname,

        expectedHostname
      };
    }


    return {
      success: true,

      hostname:
        data.hostname
    };

  }
  catch (error) {

    console.error(
      "Turnstile verify error:",
      error
    );


    return {
      success: false,

      reason:
        "Turnstile request error."
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