const MODELS = [
  {
    key: "sdxl-lightning",
    label: "SDXL Lightning",
    id: "@cf/bytedance/stable-diffusion-xl-lightning",
    standardSteps: 10,
    bestSteps: 20,
    guidance: 7.5
  },
  {
    key: "sdxl-base",
    label: "SDXL Base",
    id: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    standardSteps: 12,
    bestSteps: 20,
    guidance: 7.5
  },
  {
    key: "lucid-origin",
    label: "Lucid Origin",
    id: "@cf/leonardo/lucid-origin",
    standardSteps: 20,
    bestSteps: 32,
    guidance: 5.5
  },
  {
    key: "phoenix",
    label: "Phoenix",
    id: "@cf/leonardo/phoenix-1.0",
    standardSteps: 20,
    bestSteps: 35,
    guidance: 7.5
  }
];

const MODELS_BY_KEY = Object.fromEntries(
  MODELS.map((model) => [model.key, model])
);

const SIZES = {
  "small-square": {
    label: "Small Square",
    width: 512,
    height: 512
  },

  "medium-square": {
    label: "Medium Square",
    width: 768,
    height: 768
  },

  square: {
    label: "Square",
    width: 1024,
    height: 1024
  },

  landscape: {
    label: "Landscape",
    width: 1024,
    height: 768
  },

  portrait: {
    label: "Portrait",
    width: 768,
    height: 1024
  },

  widescreen: {
    label: "Widescreen",
    width: 1024,
    height: 576
  },

  tall: {
    label: "Tall",
    width: 576,
    height: 1024
  },

  "large-landscape": {
    label: "Large Landscape",
    width: 1536,
    height: 1024
  },

  "large-portrait": {
    label: "Large Portrait",
    width: 1024,
    height: 1536
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
    >

      <div class="prompt-block">
        <label for="prompt">
          Describe the image you want
        </label>

        <textarea
          id="prompt"
          name="prompt"
          rows="6"
          maxlength="500"
          placeholder="Example: a photorealistic black sports car parked on a city street at night"
          required
        ></textarea>
      </div>


      <fieldset class="model-picker">

        <div class="section-heading">
          <div>
            <legend>
              Models
            </legend>

            <p class="helper">
              Choose one model, several models, or compare all four.
            </p>
          </div>

          <div class="model-actions">
            <button
              type="button"
              id="select-all-models"
              class="small-button"
            >
              Select all
            </button>

            <button
              type="button"
              id="clear-models"
              class="small-button secondary"
            >
              Clear
            </button>
          </div>
        </div>


        <div class="model-grid">

          <label class="model-option">
            <input
              type="checkbox"
              name="models"
              value="sdxl-lightning"
              checked
            />

            <span class="model-option-content">
              <strong>SDXL Lightning</strong>
              <small>Fast SDXL generation</small>
            </span>
          </label>


          <label class="model-option">
            <input
              type="checkbox"
              name="models"
              value="sdxl-base"
              checked
            />

            <span class="model-option-content">
              <strong>SDXL Base</strong>
              <small>Classic SDXL model</small>
            </span>
          </label>


          <label class="model-option">
            <input
              type="checkbox"
              name="models"
              value="lucid-origin"
              checked
            />

            <span class="model-option-content">
              <strong>Lucid Origin</strong>
              <small>High prompt responsiveness</small>
            </span>
          </label>


          <label class="model-option">
            <input
              type="checkbox"
              name="models"
              value="phoenix"
              checked
            />

            <span class="model-option-content">
              <strong>Phoenix</strong>
              <small>Strong prompt adherence</small>
            </span>
          </label>

        </div>
      </fieldset>


      <div class="controls">

        <div class="control">

          <label for="size">
            Image size
          </label>

          <select
            id="size"
            name="size"
          >

            <option value="small-square">
              Small Square — 512 × 512
            </option>

            <option value="medium-square">
              Medium Square — 768 × 768
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

            <option value="large-landscape">
              Large Landscape — 1536 × 1024
            </option>

            <option value="large-portrait">
              Large Portrait — 1024 × 1536
            </option>

            <option value="custom">
              Custom resolution
            </option>

          </select>

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


      <div
        id="custom-size-controls"
        class="custom-size-controls hidden"
      >

        <div class="control">

          <label for="custom-width">
            Width
          </label>

          <input
            id="custom-width"
            type="number"
            min="256"
            max="2048"
            step="64"
            value="1024"
          />

          <small class="field-help">
            256–2048 px
          </small>

        </div>


        <div class="size-separator">
          ×
        </div>


        <div class="control">

          <label for="custom-height">
            Height
          </label>

          <input
            id="custom-height"
            type="number"
            min="256"
            max="2048"
            step="64"
            value="1024"
          />

          <small class="field-help">
            256–2048 px
          </small>

        </div>

      </div>


      <p class="quota-note">
        Larger resolutions and using several models consume more
        of the daily AI allowance.
      </p>


      <div class="verification-area">

        <div
          class="cf-turnstile"
          data-sitekey="${siteKey}"
          data-error-callback="onTurnstileError"
        ></div>

      </div>


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
    ></section>

  </main>
</body>
</html>`;


const CSS = `
:root {
  --bg: #0b1020;
  --panel: #151b2f;
  --panel-2: #1c2540;
  --panel-3: #222c4b;

  --text: #f2f5ff;
  --muted: #b8c1e0;

  --border: #2c365f;
  --border-hover: #49608f;

  --accent: #6ea8fe;
  --accent-hover: #8abbff;

  --danger: #ff8d8d;
  --success: #8be3af;
}


* {
  box-sizing: border-box;
}


html,
body {
  margin: 0;
  padding: 0;

  background:
    linear-gradient(
      180deg,
      #0b1020 0%,
      #121933 100%
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
  width:
    min(
      1200px,
      calc(100% - 2rem)
    );

  margin: 0 auto;

  padding:
    2rem
    0
    4rem;
}


.hero {
  margin-bottom: 1.5rem;
}


h1 {
  font-size:
    clamp(
      2rem,
      4vw,
      4rem
    );

  margin:
    0
    0
    0.5rem;
}


.lead {
  color: var(--muted);

  margin:
    0
    0
    1.5rem;

  line-height: 1.6;
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

  border-radius: 18px;

  padding: 1rem;

  backdrop-filter:
    blur(12px);
}


label,
legend {
  font-weight: 700;

  font-size: 1.05rem;
}


.prompt-block > label {
  display: block;

  margin-bottom: 0.5rem;
}


textarea {
  width: 100%;

  resize: vertical;

  min-height: 180px;

  border:
    1px
    solid
    var(--border);

  background:
    var(--panel-2);

  color:
    var(--text);

  border-radius: 12px;

  padding:
    0.9rem
    1rem;

  font: inherit;

  line-height: 1.5;

  margin-bottom: 1.25rem;
}


textarea::placeholder,
input::placeholder {
  color:
    rgba(
      184,
      193,
      224,
      0.7
    );
}


textarea:focus,
select:focus,
input[type="number"]:focus {
  outline:
    2px
    solid
    var(--accent);

  outline-offset: 1px;
}


.model-picker {
  border:
    1px
    solid
    var(--border);

  border-radius: 14px;

  padding: 1rem;

  margin:
    0
    0
    1rem;
}


.model-picker legend {
  padding: 0;
}


.section-heading {
  display: flex;

  align-items: flex-start;

  justify-content:
    space-between;

  gap: 1rem;

  margin-bottom: 0.8rem;
}


.helper {
  margin:
    0.25rem
    0
    0;

  color:
    var(--muted);

  font-size: 0.9rem;
}


.model-actions {
  display: flex;

  gap: 0.5rem;

  flex-shrink: 0;
}


.small-button {
  margin: 0;

  padding:
    0.5rem
    0.8rem;

  font-size: 0.85rem;
}


.small-button.secondary {
  background:
    transparent;

  color:
    var(--text);

  border:
    1px
    solid
    var(--border);
}


.model-grid {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 0.75rem;
}


.model-option {
  display: flex;

  align-items: center;

  gap: 0.75rem;

  cursor: pointer;

  background:
    var(--panel-2);

  border:
    1px
    solid
    var(--border);

  border-radius: 12px;

  padding: 0.9rem;

  transition:
    border-color 120ms ease,
    background 120ms ease;
}


.model-option:hover {
  border-color:
    var(--border-hover);

  background:
    var(--panel-3);
}


.model-option input {
  width: 18px;
  height: 18px;

  flex:
    0
    0
    auto;

  accent-color:
    var(--accent);
}


.model-option-content {
  display: flex;

  flex-direction: column;

  gap: 0.2rem;
}


.model-option-content strong {
  font-size: 0.95rem;
}


.model-option-content small {
  color:
    var(--muted);

  font-weight: 400;
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
    1rem;
}


.control {
  display: flex;

  flex-direction: column;

  gap: 0.45rem;
}


.control label {
  margin: 0;

  font-size: 0.9rem;

  color:
    var(--muted);
}


.optional {
  font-weight: 400;

  opacity: 0.7;
}


select,
input[type="number"] {
  width: 100%;

  background:
    var(--panel-2);

  color:
    var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius: 10px;

  padding: 0.75rem;

  font: inherit;
}


.custom-size-controls {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto
    minmax(0, 1fr);

  align-items: center;

  gap: 1rem;

  max-width: 650px;

  margin-bottom: 1rem;

  padding: 1rem;

  background:
    rgba(
      11,
      16,
      32,
      0.45
    );

  border:
    1px
    solid
    var(--border);

  border-radius: 12px;
}


.size-separator {
  align-self: center;

  padding-top: 1.4rem;

  font-size: 1.4rem;

  color:
    var(--muted);
}


.field-help {
  color:
    var(--muted);

  font-size: 0.8rem;
}


.quota-note {
  color:
    var(--muted);

  font-size: 0.85rem;

  line-height: 1.5;

  margin:
    0
    0
    1rem;
}


.verification-area {
  margin-top: 0.5rem;
}


button {
  appearance: none;

  border: none;

  background:
    var(--accent);

  color:
    #08101f;

  font-weight: 800;

  border-radius: 999px;

  padding:
    0.95rem
    1.3rem;

  cursor: pointer;

  margin-top: 1rem;

  font-size: 1rem;
}


button:hover:not(:disabled) {
  background:
    var(--accent-hover);
}


button:disabled {
  opacity: 0.65;

  cursor: not-allowed;
}


.status {
  min-height: 1.5rem;

  margin:
    1rem
    0;

  color:
    var(--muted);

  font-size: 1.05rem;
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
      0.92
    );

  border:
    1px
    solid
    var(--border);

  border-radius: 18px;

  padding: 1rem;
}


.result-card h3 {
  margin:
    0
    0
    0.4rem;

  font-size: 1.05rem;
}


.result-meta {
  color:
    var(--muted);

  font-size: 0.82rem;

  margin:
    0
    0
    0.8rem;

  line-height: 1.4;

  overflow-wrap: anywhere;
}


.image-frame {
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  background: #070a12;

  border-radius: 14px;
}


.result-card img {
  display: block;

  width: 100%;

  height: auto;

  object-fit: contain;

  border-radius: 14px;
}


.result-actions {
  display: flex;

  flex-wrap: wrap;

  gap: 0.5rem;

  margin-top: 0.75rem;
}


.result-actions a {
  display: inline-block;

  text-decoration: none;

  color:
    var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius: 999px;

  padding:
    0.55rem
    0.9rem;

  font-size: 0.95rem;
}


.result-actions a:hover {
  border-color:
    var(--border-hover);
}


.error-card {
  border-color: #6a2d2d;
}


.error-card p {
  color:
    var(--danger);

  margin: 0;
}


.hidden {
  display: none !important;
}


@media (max-width: 900px) {

  .results {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 700px) {

  .controls {
    grid-template-columns: 1fr;
  }


  .model-grid {
    grid-template-columns: 1fr;
  }


  .section-heading {
    flex-direction: column;
  }


  .custom-size-controls {
    grid-template-columns: 1fr;
  }


  .size-separator {
    display: none;
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

const customSizeControls =
  document.getElementById(
    'custom-size-controls'
  );

const customWidthEl =
  document.getElementById(
    'custom-width'
  );

const customHeightEl =
  document.getElementById(
    'custom-height'
  );

const selectAllModelsButton =
  document.getElementById(
    'select-all-models'
  );

const clearModelsButton =
  document.getElementById(
    'clear-models'
  );


function getModelCheckboxes() {

  return Array.from(
    document.querySelectorAll(
      'input[name="models"]'
    )
  );

}


function getSelectedModelKeys() {

  return getModelCheckboxes()
    .filter(function(checkbox) {
      return checkbox.checked;
    })
    .map(function(checkbox) {
      return checkbox.value;
    });

}


function updateGenerateButton() {

  const count =
    getSelectedModelKeys().length;

  if (count === 0) {

    button.textContent =
      'Select a model';

    return;
  }

  if (count === 1) {

    button.textContent =
      'Generate 1 image';

    return;
  }

  button.textContent =
    'Generate ' +
    count +
    ' images';

}


function updateCustomSizeVisibility() {

  if (sizeEl.value === 'custom') {

    customSizeControls
      .classList
      .remove('hidden');

  } else {

    customSizeControls
      .classList
      .add('hidden');

  }

}


function setStatus(
  message,
  isError
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
      'Turnstile error: ' +
      errorCode,
      true
    );

  };


selectAllModelsButton
  .addEventListener(
    'click',
    function() {

      getModelCheckboxes()
        .forEach(
          function(checkbox) {

            checkbox.checked =
              true;

          }
        );

      updateGenerateButton();

    }
  );


clearModelsButton
  .addEventListener(
    'click',
    function() {

      getModelCheckboxes()
        .forEach(
          function(checkbox) {

            checkbox.checked =
              false;

          }
        );

      updateGenerateButton();

    }
  );


getModelCheckboxes()
  .forEach(
    function(checkbox) {

      checkbox.addEventListener(
        'change',
        updateGenerateButton
      );

    }
  );


sizeEl.addEventListener(
  'change',
  updateCustomSizeVisibility
);


function createResultCard(item) {

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
    item.label ||
    'Image';

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


  const meta =
    document.createElement(
      'p'
    );

  meta.className =
    'result-meta';

  meta.textContent =
    item.width +
    ' × ' +
    item.height +
    ' px · ' +
    item.steps +
    ' steps · seed ' +
    item.seed;

  card.appendChild(
    meta
  );


  const imageFrame =
    document.createElement(
      'div'
    );

  imageFrame.className =
    'image-frame';


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

  imageFrame.appendChild(
    image
  );

  card.appendChild(
    imageFrame
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

  const safeName =
    String(item.label)
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        '-'
      )
      .replace(
        /^-|-$/g,
        ''
      );

  download.href =
    item.dataURI;

  download.download =
    safeName +
    '-' +
    item.width +
    'x' +
    item.height +
    '.png';

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


function renderResults(results) {

  resultsEl.innerHTML =
    '';

  results.forEach(
    function(item) {

      resultsEl.appendChild(
        createResultCard(item)
      );

    }
  );

  resultsEl
    .classList
    .remove('hidden');

}


form.addEventListener(
  'submit',
  async function(event) {

    event.preventDefault();


    const prompt =
      promptEl
        .value
        .trim();


    const selectedModels =
      getSelectedModelKeys();


    const size =
      sizeEl.value;


    const quality =
      qualityEl.value;


    const seedValue =
      seedEl
        .value
        .trim();


    const seed =
      seedValue === ''
        ? null
        : Number.parseInt(
            seedValue,
            10
          );


    const customWidth =
      Number.parseInt(
        customWidthEl.value,
        10
      );


    const customHeight =
      Number.parseInt(
        customHeightEl.value,
        10
      );


    const turnstileToken =
      globalThis
        .turnstile
        ?.getResponse
        ?.();


    if (!prompt) {

      setStatus(
        'Please enter a prompt.',
        true
      );

      return;

    }


    if (
      selectedModels.length === 0
    ) {

      setStatus(
        'Please select at least one model.',
        true
      );

      return;

    }


    if (
      size === 'custom' &&
      (
        !Number.isInteger(
          customWidth
        ) ||
        !Number.isInteger(
          customHeight
        )
      )
    ) {

      setStatus(
        'Please enter a valid custom width and height.',
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


    resultsEl
      .classList
      .add('hidden');

    resultsEl.innerHTML =
      '';


    let sizeDescription =
      size;


    if (size === 'custom') {

      sizeDescription =
        customWidth +
        ' × ' +
        customHeight;

    }


    setStatus(
      'Generating ' +
      selectedModels.length +
      (
        selectedModels.length === 1
          ? ' image'
          : ' images'
      ) +
      ' at ' +
      sizeDescription +
      '...'
    );


    try {

      const response =
        await fetch(
          '/api/generate',
          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json'
            },

            body:
              JSON.stringify(
                {
                  prompt:
                    prompt,

                  models:
                    selectedModels,

                  size:
                    size,

                  customWidth:
                    customWidth,

                  customHeight:
                    customHeight,

                  quality:
                    quality,

                  seed:
                    seed,

                  turnstileToken:
                    turnstileToken
                }
              )
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data?.error ||
          'Generation failed.'
        );

      }


      renderResults(
        data.results || []
      );


      setStatus(
        'Done.'
      );

    } catch (error) {

      console.error(
        error
      );

      setStatus(
        error.message ||
        'Something went wrong.',
        true
      );

    } finally {

      globalThis
        .turnstile
        ?.reset
        ?.();


      button.disabled =
        false;


      updateGenerateButton();

    }

  }
);


updateCustomSizeVisibility();
updateGenerateButton();
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
    requestOrigin &&
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
    ) || "";


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


  const turnstileToken =
    String(
      body?.turnstileToken ||
      ""
    ).trim();


  if (
    !turnstileToken
  ) {

    return json(
      {
        error:
          "Missing verification token."
      },
      400
    );

  }


  const requestedModelKeys =
    Array.isArray(
      body?.models
    )
      ? body.models
          .map(
            function(value) {

              return String(
                value
              );

            }
          )
      : [];


  const uniqueModelKeys =
    Array.from(
      new Set(
        requestedModelKeys
      )
    ).slice(
      0,
      MODELS.length
    );


  const selectedModels =
    uniqueModelKeys
      .map(
        function(key) {

          return MODELS_BY_KEY[
            key
          ];

        }
      )
      .filter(Boolean);


  if (
    selectedModels.length === 0
  ) {

    return json(
      {
        error:
          "Please select at least one valid model."
      },
      400
    );

  }


  const quality =
    body?.quality ===
    "standard"
      ? "standard"
      : "best";


  const sizeKey =
    String(
      body?.size ||
      "square"
    );


  let width;
  let height;


  if (
    sizeKey === "custom"
  ) {

    width =
      Number.parseInt(
        body?.customWidth,
        10
      );


    height =
      Number.parseInt(
        body?.customHeight,
        10
      );


    if (
      !isValidDimension(
        width
      ) ||
      !isValidDimension(
        height
      )
    ) {

      return json(
        {
          error:
            "Custom dimensions must be between 256 and 2048 pixels and use increments of 64."
        },
        400
      );

    }

  } else {

    const preset =
      SIZES[
        sizeKey
      ];


    if (!preset) {

      return json(
        {
          error:
            "Invalid image size."
        },
        400
      );

    }


    width =
      preset.width;


    height =
      preset.height;

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
        2147483647
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
      seed > 2147483647
    ) {

      return json(
        {
          error:
            "Seed must be a whole number between 0 and 2147483647."
        },
        400
      );

    }

  }


  const remoteip =
    request.headers.get(
      "CF-Connecting-IP"
    ) || "";


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
      prompt
    );


  const negativePrompt =
    buildNegativePrompt();


  const results =
    await Promise.all(
      selectedModels.map(
        function(model) {

          return generateImageForModel(
            env,
            model,
            finalPrompt,
            negativePrompt,
            width,
            height,
            quality,
            seed
          );

        }
      )
    );


  return json(
    {
      results:
        results
    }
  );

}


function isValidDimension(
  value
) {

  return (
    Number.isInteger(
      value
    ) &&
    value >= 256 &&
    value <= 2048 &&
    value % 64 === 0
  );

}


function buildPrompt(
  userPrompt
) {

  return `
USER REQUEST:
${userPrompt}

Follow the user's request exactly.

IMAGE QUALITY:
Photorealistic unless the user explicitly requests another visual style.
High detail.
Natural realistic lighting.
Realistic materials.
Realistic textures.
Physically believable shadows and reflections.
Sharp subject detail.
Professional image quality.

COMPOSITION:
Respect any framing or camera-angle instructions supplied by the user.
Do not replace the requested subject with photography equipment or an unrelated object.
If the user does not specify framing, keep the main subject clearly visible and comfortably inside the frame.
Avoid accidentally cropping important parts of the primary subject.
`;

}


function buildNegativePrompt() {

  return `
wrong subject,
unrelated primary subject,
accidental crop,
important subject outside frame,
unintended extreme close-up,
bad anatomy,
deformed,
distorted,
duplicate body parts,
low quality,
low resolution,
blurry,
compression artifacts,
watermark,
unrequested text,
unrequested logo
`;

}


async function generateImageForModel(
  env,
  model,
  prompt,
  negativePrompt,
  width,
  height,
  quality,
  seed
) {

  const steps =
    quality === "best"
      ? model.bestSteps
      : model.standardSteps;


  try {

    const output =
      await env.AI.run(
        model.id,
        {
          prompt:
            prompt,

          negative_prompt:
            negativePrompt,

          width:
            width,

          height:
            height,

          num_steps:
            steps,

          guidance:
            model.guidance,

          seed:
            seed
        }
      );


    let dataURI;


    if (
      output &&
      typeof output === "object" &&
      typeof output.image === "string"
    ) {

      dataURI =
        base64ImageToDataURI(
          output.image
        );

    } else {

      dataURI =
        await streamToDataURI(
          output
        );

    }


    return {
      label:
        model.label,

      model:
        model.id,

      width:
        width,

      height:
        height,

      steps:
        steps,

      seed:
        seed,

      dataURI:
        dataURI
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


function base64ImageToDataURI(
  base64
) {

  const cleaned =
    String(
      base64
    ).replace(
      /^data:[^;]+;base64,/,
      ""
    );


  let mimeType =
    "image/jpeg";


  if (
    cleaned.startsWith(
      "iVBORw0KGgo"
    )
  ) {

    mimeType =
      "image/png";

  } else if (
    cleaned.startsWith(
      "UklGR"
    )
  ) {

    mimeType =
      "image/webp";

  } else if (
    cleaned.startsWith(
      "/9j/"
    )
  ) {

    mimeType =
      "image/jpeg";

  }


  return (
    "data:" +
    mimeType +
    ";base64," +
    cleaned
  );

}


async function streamToDataURI(
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


  const mimeType =
    detectImageMimeType(
      bytes
    );


  const base64 =
    uint8ToBase64(
      bytes
    );


  return (
    "data:" +
    mimeType +
    ";base64," +
    base64
  );

}


function detectImageMimeType(
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
      success:
        false
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


  if (
    remoteip
  ) {

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
        success:
          false
      };

    }


    const data =
      await response.json();


    return {
      success:
        data.success === true &&
        data.hostname === expectedHostname
    };


  } catch (error) {

    console.error(
      "Turnstile verify error:",
      error
    );


    return {
      success:
        false
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
      status:
        status,

      headers: {
        ...COMMON_HEADERS,

        "Content-Type":
          "application/json; charset=UTF-8"
      }
    }
  );

}