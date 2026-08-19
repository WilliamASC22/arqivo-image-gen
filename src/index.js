const MAX_IMAGES_PER_REQUEST = 8;
const MAX_TOTAL_PIXELS = 12 * 1024 * 1024;
const MAX_SEED = 2147483647;

const CLOUDFLARE_CONCURRENCY = 2;
const HORDE_SUBMIT_CONCURRENCY = 1;

const AI_HORDE_API_BASE =
  "https://aihorde.net/api/v2";

const AI_HORDE_CLIENT_AGENT =
  "ArqivoImageGen:1.2:https://github.com/arqivo/arqivo-image-gen";


/* ----------------------------------
   PROVIDERS
---------------------------------- */


const PROVIDERS = [

  {
    key:
      "cloudflare",

    label:
      "Cloudflare Workers AI",

    description:
      "Runs through Arqivo's Cloudflare Workers AI binding."
  },

  {
    key:
      "horde",

    label:
      "AI Horde",

    description:
      "Community-powered generation using volunteer workers."
  }

];


const PROVIDERS_BY_KEY =
  Object.fromEntries(
    PROVIDERS.map(
      (provider) => [
        provider.key,
        provider
      ]
    )
  );


/* ----------------------------------
   MODELS
---------------------------------- */


const MODELS = [

  {
    key:
      "sdxl-lightning",

    provider:
      "cloudflare",

    label:
      "SDXL Lightning",

    description:
      "Fast SDXL generation",

    id:
      "@cf/bytedance/stable-diffusion-xl-lightning",

    standardSteps:
      10,

    bestSteps:
      20,

    guidance:
      7.5,

    defaultSelected:
      false
  },


  {
    key:
      "sdxl-base",

    provider:
      "cloudflare",

    label:
      "SDXL Base",

    description:
      "Classic SDXL model",

    id:
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",

    standardSteps:
      12,

    bestSteps:
      20,

    guidance:
      7.5,

    defaultSelected:
      false
  },


  {
    key:
      "lucid-origin",

    provider:
      "cloudflare",

    label:
      "Lucid Origin",

    description:
      "High prompt responsiveness",

    id:
      "@cf/leonardo/lucid-origin",

    standardSteps:
      20,

    bestSteps:
      32,

    guidance:
      5.5,

    defaultSelected:
      false
  },


  {
    key:
      "phoenix",

    provider:
      "cloudflare",

    label:
      "Phoenix",

    description:
      "Strong prompt adherence",

    id:
      "@cf/leonardo/phoenix-1.0",

    standardSteps:
      20,

    bestSteps:
      35,

    guidance:
      7.5,

    defaultSelected:
      false
  },


  {
    key:
      "horde-a",

    provider:
      "horde",

    label:
      "Horde Model A",

    description:
      "AI Horde model slot A",

    hordeModelEnv:
      "AI_HORDE_MODEL_A",

    hordeDefaultModel:
      "AlbedoBase XL 3.1",

    standardSteps:
      18,

    bestSteps:
      24,

    guidance:
      7,

    defaultSelected:
      true
  },


  {
    key:
      "horde-b",

    provider:
      "horde",

    label:
      "Horde Model B",

    description:
      "AI Horde model slot B",

    hordeModelEnv:
      "AI_HORDE_MODEL_B",

    hordeDefaultModel:
      "AbsoluteReality",

    standardSteps:
      16,

    bestSteps:
      22,

    guidance:
      7,

    defaultSelected:
      false
  },


  {
    key:
      "horde-c",

    provider:
      "horde",

    label:
      "Horde Model C",

    description:
      "AI Horde model slot C",

    hordeModelEnv:
      "AI_HORDE_MODEL_C",

    hordeDefaultModel:
      "Realistic Vision",

    standardSteps:
      16,

    bestSteps:
      22,

    guidance:
      7,

    defaultSelected:
      false
  },


  {
    key:
      "horde-d",

    provider:
      "horde",

    label:
      "Horde Model D",

    description:
      "AI Horde model slot D",

    hordeModelEnv:
      "AI_HORDE_MODEL_D",

    hordeDefaultModel:
      "Deliberate 3.0",

    standardSteps:
      16,

    bestSteps:
      22,

    guidance:
      7,

    defaultSelected:
      false
  }

];


const MODELS_BY_KEY =
  Object.fromEntries(
    MODELS.map(
      (model) => [
        model.key,
        model
      ]
    )
  );


/* ----------------------------------
   IMAGE SIZES
---------------------------------- */


const SIZES = {

  "square-512": {
    label:
      "512 × 512",

    width:
      512,

    height:
      512
  },


  "square-768": {
    label:
      "768 × 768",

    width:
      768,

    height:
      768
  },


  "square-1024": {
    label:
      "1024 × 1024",

    width:
      1024,

    height:
      1024
  },


  "square-1280": {
    label:
      "1280 × 1280",

    width:
      1280,

    height:
      1280
  },


  "square-1536": {
    label:
      "1536 × 1536",

    width:
      1536,

    height:
      1536
  },


  "square-2048": {
    label:
      "2048 × 2048",

    width:
      2048,

    height:
      2048
  },


  "landscape-1024x768": {
    label:
      "1024 × 768 · 4:3",

    width:
      1024,

    height:
      768
  },


  "landscape-1152x768": {
    label:
      "1152 × 768 · 3:2",

    width:
      1152,

    height:
      768
  },


  "landscape-1024x576": {
    label:
      "1024 × 576 · 16:9",

    width:
      1024,

    height:
      576
  },


  "landscape-1344x768": {
    label:
      "1344 × 768 · 7:4",

    width:
      1344,

    height:
      768
  },


  "landscape-1536x1024": {
    label:
      "1536 × 1024 · 3:2",

    width:
      1536,

    height:
      1024
  },


  "landscape-1536x640": {
    label:
      "1536 × 640 · cinematic",

    width:
      1536,

    height:
      640
  },


  "landscape-1792x1024": {
    label:
      "1792 × 1024 · wide",

    width:
      1792,

    height:
      1024
  },


  "landscape-2048x1152": {
    label:
      "2048 × 1152 · 16:9",

    width:
      2048,

    height:
      1152
  },


  "portrait-768x1024": {
    label:
      "768 × 1024 · 3:4",

    width:
      768,

    height:
      1024
  },


  "portrait-768x1152": {
    label:
      "768 × 1152 · 2:3",

    width:
      768,

    height:
      1152
  },


  "portrait-576x1024": {
    label:
      "576 × 1024 · 9:16",

    width:
      576,

    height:
      1024
  },


  "portrait-768x1344": {
    label:
      "768 × 1344 · 4:7",

    width:
      768,

    height:
      1344
  },


  "portrait-1024x1280": {
    label:
      "1024 × 1280 · 4:5",

    width:
      1024,

    height:
      1280
  },


  "portrait-1024x1536": {
    label:
      "1024 × 1536 · 2:3",

    width:
      1024,

    height:
      1536
  },


  "portrait-1024x1792": {
    label:
      "1024 × 1792 · 4:7",

    width:
      1024,

    height:
      1792
  },


  "portrait-1152x2048": {
    label:
      "1152 × 2048 · 9:16",

    width:
      1152,

    height:
      2048
  }

};


const SIZE_GROUPS = [

  {
    label:
      "Square",

    keys: [
      "square-512",
      "square-768",
      "square-1024",
      "square-1280",
      "square-1536",
      "square-2048"
    ]
  },


  {
    label:
      "Landscape",

    keys: [
      "landscape-1024x768",
      "landscape-1152x768",
      "landscape-1024x576",
      "landscape-1344x768",
      "landscape-1536x1024",
      "landscape-1536x640",
      "landscape-1792x1024",
      "landscape-2048x1152"
    ]
  },


  {
    label:
      "Portrait",

    keys: [
      "portrait-768x1024",
      "portrait-768x1152",
      "portrait-576x1024",
      "portrait-768x1344",
      "portrait-1024x1280",
      "portrait-1024x1536",
      "portrait-1024x1792",
      "portrait-1152x2048"
    ]
  }

];


/* ----------------------------------
   ERROR CLASSES
---------------------------------- */


class ModelOutputError extends Error {

  constructor(
    message,
    outputCode = "INVALID_OUTPUT"
  ) {

    super(
      message
    );


    this.name =
      "ModelOutputError";


    this.outputCode =
      outputCode;

  }

}


class ProviderResponseError extends Error {

  constructor(
    message,
    status,
    providerCode = ""
  ) {

    super(
      message
    );


    this.name =
      "ProviderResponseError";


    this.status =
      status;


    this.providerCode =
      providerCode;

  }

}


/* ----------------------------------
   GENERAL HELPERS
---------------------------------- */


function escapeHTML(
  value
) {

  return String(
    value
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function providerLabelForModel(
  model
) {

  return (
    PROVIDERS_BY_KEY[
      model.provider
    ]?.label ||
    model.provider
  );

}


function resolveHordeModelName(
  env,
  model
) {

  const configured =
    model.hordeModelEnv

      ? String(
          env?.[
            model.hordeModelEnv
          ] ||
          ""
        ).trim()

      : "";


  return (
    configured ||
    model.hordeDefaultModel ||
    ""
  );

}


function modelDescription(
  model,
  env
) {

  if (
    model.provider ===
    "horde"
  ) {

    return (
      "Uses " +
      resolveHordeModelName(
        env,
        model
      )
    );

  }


  return model.description;

}


/* ----------------------------------
   HTML BUILDERS
---------------------------------- */


function buildModelOption(
  model,
  env
) {

  const checked =
    model.defaultSelected

      ? " checked"

      : "";


  return `
    <label class="model-option">

      <input
        type="checkbox"
        name="models"
        value="${escapeHTML(model.key)}"
        data-model-label="${escapeHTML(model.label)}"
        data-provider-label="${escapeHTML(providerLabelForModel(model))}"
        ${checked}
      />

      <span class="model-option-content">

        <span class="model-option-heading">

          <strong>
            ${escapeHTML(model.label)}
          </strong>

          <span
            class="model-inline-status"
            data-model-status-for="${escapeHTML(model.key)}"
            data-tone="ready"
          >
            Ready
          </span>

        </span>

        <small>
          ${escapeHTML(
            modelDescription(
              model,
              env
            )
          )}
        </small>

      </span>

    </label>
  `;

}


function buildProviderGroups(
  env
) {

  return PROVIDERS.map(
    (provider) => {

      const models =
        MODELS.filter(
          (model) =>
            model.provider ===
            provider.key
        );


      let note =
        "";


      if (
        provider.key ===
        "horde"
      ) {

        note = `
          <p class="provider-note">
            AI Horde is volunteer-run.
            Jobs can remain queued for a long time.

            Arqivo will keep checking a submitted
            Horde job for up to one hour while
            this browser tab remains open.

            A priority rejection happens before
            queueing and cannot be fixed by
            waiting longer.

            Do not send sensitive prompts
            through AI Horde.
          </p>
        `;

      }


      return `
        <section class="provider-group">

          <div class="provider-head">

            <div>

              <h3>
                ${escapeHTML(provider.label)}
              </h3>

              <p>
                ${escapeHTML(provider.description)}
              </p>

            </div>

            <span>
              ${models.length} models
            </span>

          </div>

          ${note}

          <div class="model-grid">

            ${
              models
                .map(
                  (model) =>
                    buildModelOption(
                      model,
                      env
                    )
                )
                .join("")
            }

          </div>

        </section>
      `;

    }
  ).join("");

}


function buildSizeOptions() {

  const groups =
    SIZE_GROUPS.map(
      (group) => {

        const options =
          group.keys.map(
            (key) => {

              const size =
                SIZES[
                  key
                ];


              const selected =
                key ===
                "square-1024"

                  ? " selected"

                  : "";


              return `
                <option
                  value="${key}"
                  data-width="${size.width}"
                  data-height="${size.height}"
                  ${selected}
                >
                  ${size.label}
                </option>
              `;

            }
          ).join("");


        return `
          <optgroup
            label="${escapeHTML(group.label)}"
          >
            ${options}
          </optgroup>
        `;

      }
    ).join("");


  return groups + `
    <optgroup label="Other">

      <option value="custom">
        Custom resolution
      </option>

    </optgroup>
  `;

}


function buildNav(
  active
) {

  return `
    <nav
      class="site-nav"
      aria-label="Main navigation"
    >

      <a
        href="/"
        class="${active === "generate" ? "active" : ""}"
      >
        Generate
      </a>

      <a
        href="/privacy"
        class="${active === "privacy" ? "active" : ""}"
      >
        Privacy
      </a>

    </nav>
  `;

}


function buildFooter() {

  return `
    <footer>

      <div>

        <strong>
          Arqivo Image Gen
        </strong>

        <span>

          <a href="/">
            Generate
          </a>

          <a href="/privacy">
            Privacy
          </a>

        </span>

      </div>

      <p>
        Arqivo does not intentionally maintain
        a database of prompts or generated images.
      </p>

    </footer>
  `;

}


/* ----------------------------------
   GENERATE PAGE
---------------------------------- */


const HTML = (
  siteKey,
  env
) => `<!doctype html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="description"
    content="Privacy-focused AI image generation with Cloudflare Workers AI and AI Horde."
  />

  <title>
    Arqivo Image Gen
  </title>

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

  <div class="page-shell">

    <header class="topbar">

      <a
        href="/"
        class="brand"
      >
        Arqivo
      </a>

      ${buildNav("generate")}

    </header>


    <main class="container">

      <header class="hero">

        <h1>
          Arqivo Image Gen
        </h1>

        <p class="lead">
          Private-by-default text-to-image generation.
          No accounts. No prompt history.
          No application database.
        </p>

        <p class="small-copy">

          Provider privacy differs.

          <a href="/privacy">
            Read the privacy page.
          </a>

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

              <p>
                Choose from Cloudflare Workers AI,
                AI Horde,
                or a mixture of both providers.

                Maximum 8 total images per request.
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


          <div class="provider-groups">

            ${buildProviderGroups(env)}

          </div>

        </fieldset>


        <div class="controls">

          <div class="control">

            <label for="size">
              Image size
            </label>

            <select id="size">
              ${buildSizeOptions()}
            </select>

          </div>


          <div class="control">

            <label for="quality">
              Quality
            </label>

            <select id="quality">

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

            <label for="images-per-model">
              Images per model
            </label>

            <select id="images-per-model">

              <option
                value="1"
                selected
              >
                1 image
              </option>

              <option value="2">
                2 variations
              </option>

              <option value="4">
                4 variations
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

            <small>
              256–2048 px, multiples of 64
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

            <small>
              256–2048 px, multiples of 64
            </small>

          </div>

        </div>


        <p class="quota-note">

          AI Horde is asynchronous.

          Leave this tab open for queued Horde jobs;
          Arqivo will poll for up to one hour.

          Cloudflare Workers AI results can finish
          while Horde jobs remain queued.

        </p>


        <div class="verification-area">

          <div
            class="cf-turnstile"
            data-sitekey="${escapeHTML(siteKey)}"
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
        id="model-status-panel"
        class="model-status-panel hidden"
        aria-live="polite"
      >

        <div class="model-status-header">

          <div>

            <h2>
              Model status
            </h2>

            <p>
              Providers are isolated.
              Cloudflare results can finish while
              AI Horde remains queued.
            </p>

          </div>

          <span
            id="model-status-summary"
          ></span>

        </div>


        <div
          id="model-status-list"
          class="model-status-list"
        ></div>

      </section>


      <section
        id="results"
        class="results hidden"
      ></section>

    </main>


    ${buildFooter()}

  </div>

</body>

</html>`;


/* ----------------------------------
   PRIVACY PAGE
---------------------------------- */


const PRIVACY_HTML = `<!doctype html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />

  <title>
    Privacy — Arqivo Image Gen
  </title>

  <link
    rel="stylesheet"
    href="/styles.css"
  />

</head>


<body>

  <div class="page-shell">

    <header class="topbar">

      <a
        href="/"
        class="brand"
      >
        Arqivo
      </a>

      ${buildNav("privacy")}

    </header>


    <main class="container privacy-container">

      <header class="privacy-hero">

        <p class="eyebrow">
          Privacy
        </p>

        <h1>
          Privacy by architecture
        </h1>

        <p class="lead">
          Arqivo minimizes application-level storage,
          but the provider you select changes
          where your prompt is processed.
        </p>

        <p class="small-copy">
          Last updated: August 18, 2026
        </p>

      </header>


      <article class="privacy-document">

        <section>

          <h2>
            What Arqivo stores
          </h2>

          <p>
            Arqivo does not intentionally maintain
            a prompt-history database,
            generated-image gallery,
            visitor account system,
            or visitor profile.

            Prompts and image data are handled
            in memory as needed to complete requests.
          </p>

        </section>


        <section>

          <h2>
            Cloudflare Workers AI
          </h2>

          <p>
            When you choose a Cloudflare model,
            the prompt and generation settings
            are processed through Cloudflare Workers
            and Workers AI.
          </p>

        </section>


        <section>

          <h2>
            AI Horde
          </h2>

          <p>
            When you choose a Horde model,
            the prompt and settings are sent
            from Arqivo's Worker to AI Horde.

            AI Horde is a distributed
            volunteer network.

            Arqivo allows a broader set of workers
            to improve availability,
            so do not use AI Horde
            for sensitive or private prompts.
          </p>

          <p>
            Horde jobs are asynchronous.

            Your browser asks Arqivo
            for status updates;
            Arqivo then asks AI Horde.

            The current UI will keep checking
            for up to one hour while
            the browser tab remains open.
          </p>

        </section>


        <section>

          <h2>
            Generated images
          </h2>

          <p>
            Completed images are returned
            to your browser.

            Arqivo does not intentionally save them
            to R2, KV, Durable Objects,
            or an application database.
          </p>

        </section>


        <section>

          <h2>
            Turnstile and network data
          </h2>

          <p>
            Cloudflare Turnstile is used
            for abuse prevention.

            The server may send the Cloudflare-provided
            connecting IP to Turnstile verification.

            Arqivo does not intentionally store
            that IP in an application database.
          </p>

        </section>


        <section>

          <h2>
            Logs and caching
          </h2>

          <p>
            Arqivo's application code does not
            intentionally log prompts,
            generated image contents,
            Turnstile tokens,
            AI Horde API keys,
            or full request bodies.

            Technical error metadata may be logged.

            Responses use no-store/no-cache headers,
            although infrastructure providers
            can maintain their own operational
            or security logs.
          </p>

        </section>


        <section>

          <h2>
            No absolute guarantee
          </h2>

          <p>
            No public internet service can guarantee
            zero logging or zero compromise.

            This page describes the behavior
            intentionally implemented by Arqivo's code.
          </p>

        </section>


        <section class="privacy-final">

          <a
            class="primary-link-button"
            href="/"
          >
            Back to image generation
          </a>

        </section>

      </article>

    </main>


    ${buildFooter()}

  </div>

</body>

</html>`;


/* ----------------------------------
   CSS
---------------------------------- */


const CSS = `
:root {
  --bg: #0b1020;
  --panel: #151b2f;
  --panel2: #1c2540;
  --panel3: #222c4b;

  --text: #f2f5ff;
  --muted: #b8c1e0;

  --border: #2c365f;
  --border2: #49608f;

  --accent: #6ea8fe;
  --accent2: #8abbff;

  --danger: #ff8d8d;
  --warning: #ffd479;
  --success: #8be3af;

  --max: 1200px;
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

  background:
    linear-gradient(
      180deg,
      #0b1020,
      #121933
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


a {
  color: var(--accent);
}


a:hover {
  color: var(--accent2);
}


.page-shell {
  min-height: 100vh;

  display: flex;

  flex-direction: column;
}


.topbar,
.container,
footer {
  width:
    min(
      var(--max),
      calc(100% - 2rem)
    );

  margin-left: auto;
  margin-right: auto;
}


.topbar {
  padding:
    1.2rem
    0;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  border-bottom:
    1px
    solid
    rgba(
      44,
      54,
      95,
      0.7
    );
}


.brand {
  color: var(--text);

  text-decoration: none;

  font-size: 1.1rem;

  font-weight: 900;
}


.site-nav {
  display: flex;

  gap: 0.4rem;
}


.site-nav a {
  color: var(--muted);

  text-decoration: none;

  border-radius: 999px;

  padding:
    0.55rem
    0.9rem;

  font-size: 0.92rem;

  font-weight: 700;
}


.site-nav a.active {
  color: var(--text);

  background:
    rgba(
      110,
      168,
      254,
      0.14
    );

  border:
    1px
    solid
    rgba(
      110,
      168,
      254,
      0.35
    );
}


.container {
  padding:
    2rem
    0
    4rem;

  flex: 1;
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

  line-height: 1.05;

  letter-spacing: -0.04em;

  margin:
    0
    0
    0.5rem;
}


.lead,
.small-copy,
.section-heading p,
.provider-head p,
.quota-note,
.control small {
  color: var(--muted);

  line-height: 1.55;
}


.lead {
  max-width: 760px;
}


.small-copy {
  font-size: 0.9rem;
}


form,
.model-status-panel,
.result-card,
.privacy-document {
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
}


form {
  padding: 1rem;
}


label,
legend,
.prompt-block > label {
  font-weight: 700;
}


.prompt-block > label {
  display: block;

  margin-bottom: 0.5rem;
}


textarea,
select,
input[type="number"] {
  width: 100%;

  background: var(--panel2);

  color: var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius: 10px;

  padding: 0.8rem;

  font: inherit;
}


textarea {
  min-height: 180px;

  resize: vertical;

  margin-bottom: 1.25rem;

  line-height: 1.5;
}


textarea:focus,
select:focus,
input:focus {
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


.section-heading,
.provider-head,
.model-status-header,
.result-heading-row,
footer > div {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 1rem;
}


.section-heading {
  margin-bottom: 1rem;
}


.section-heading p,
.provider-head p {
  margin:
    0.25rem
    0
    0;

  font-size: 0.85rem;
}


.model-actions {
  display: flex;

  gap: 0.5rem;
}


.provider-groups {
  display: grid;

  gap: 1rem;
}


.provider-group {
  padding: 1rem;

  border:
    1px
    solid
    var(--border);

  border-radius: 14px;

  background:
    rgba(
      11,
      16,
      32,
      0.28
    );
}


.provider-head h3 {
  margin:
    0
    0
    0.2rem;
}


.provider-head > span,
.model-inline-status,
.model-status-badge,
.result-state {
  flex-shrink: 0;

  border:
    1px
    solid
    var(--border);

  border-radius: 999px;

  padding:
    0.28rem
    0.52rem;

  font-size: 0.7rem;

  font-weight: 850;

  color: var(--muted);
}


.provider-note {
  margin:
    0
    0
    0.85rem;

  padding:
    0.75rem
    0.85rem;

  color: var(--warning);

  background:
    rgba(
      255,
      212,
      121,
      0.06
    );

  border:
    1px
    solid
    rgba(
      255,
      212,
      121,
      0.22
    );

  border-radius: 10px;

  font-size: 0.8rem;

  line-height: 1.5;
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

  background: var(--panel2);

  border:
    1px
    solid
    var(--border);

  border-radius: 12px;

  padding: 0.9rem;

  cursor: pointer;
}


.model-option:hover {
  background: var(--panel3);

  border-color: var(--border2);
}


.model-option:has(input:checked) {
  border-color: var(--accent);
}


.model-option input {
  width: 18px;

  height: 18px;

  accent-color: var(--accent);
}


.model-option-content {
  display: flex;

  flex-direction: column;

  gap: 0.25rem;

  flex: 1;

  min-width: 0;
}


.model-option-heading {
  display: flex;

  justify-content: space-between;

  gap: 0.5rem;
}


.model-option-content small {
  color: var(--muted);
}


[data-tone="processing"] {
  color:
    var(--accent)
    !important;
}


[data-tone="success"] {
  color:
    var(--success)
    !important;
}


[data-tone="warning"] {
  color:
    var(--warning)
    !important;
}


[data-tone="error"] {
  color:
    var(--danger)
    !important;
}


.controls {
  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  gap: 1rem;

  margin-bottom: 1rem;
}


.control {
  display: flex;

  flex-direction: column;

  gap: 0.45rem;
}


.control label {
  font-size: 0.9rem;

  color: var(--muted);
}


.optional {
  font-weight: 400;

  opacity: 0.7;
}


.custom-size-controls {
  display: grid;

  grid-template-columns:
    1fr
    auto
    1fr;

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
  padding-top: 1.4rem;

  color: var(--muted);

  font-size: 1.4rem;
}


.quota-note {
  font-size: 0.82rem;
}


.verification-area {
  margin-top: 0.5rem;
}


button {
  appearance: none;

  border: none;

  background: var(--accent);

  color: #08101f;

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
  background: var(--accent2);
}


button:disabled {
  opacity: 0.55;

  cursor: not-allowed;
}


.small-button {
  margin: 0;

  padding:
    0.5rem
    0.8rem;

  font-size: 0.85rem;
}


.secondary {
  background: transparent;

  color: var(--text);

  border:
    1px
    solid
    var(--border);
}


.status {
  min-height: 1.5rem;

  margin:
    1rem
    0;

  color: var(--muted);

  font-size: 1.05rem;
}


.model-status-panel {
  padding: 1rem;

  margin:
    1rem
    0;
}


.model-status-header h2 {
  margin:
    0
    0
    0.25rem;

  font-size: 1rem;
}


.model-status-header p {
  margin: 0;

  color: var(--muted);

  font-size: 0.82rem;
}


.model-status-list {
  display: grid;

  gap: 0.6rem;

  margin-top: 0.85rem;
}


.model-status-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  padding:
    0.75rem
    0.8rem;

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

  border-radius: 11px;
}


.model-status-name {
  display: block;

  font-weight: 800;
}


.model-status-detail {
  display: block;

  margin-top: 0.2rem;

  color: var(--muted);

  font-size: 0.78rem;

  line-height: 1.4;
}


.results {
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 1rem;
}


.result-card {
  padding: 1rem;

  min-width: 0;
}


.result-card h3 {
  margin: 0;
}


.result-meta {
  color: var(--muted);

  font-size: 0.82rem;

  line-height: 1.5;
}


.image-frame {
  background: #070a12;

  border-radius: 14px;

  overflow: hidden;
}


.result-card img {
  display: block;

  width: 100%;

  height: auto;
}


.result-actions {
  margin-top: 0.75rem;
}


.result-actions a {
  display: inline-block;

  color: var(--text);

  text-decoration: none;

  border:
    1px
    solid
    var(--border);

  border-radius: 999px;

  padding:
    0.55rem
    0.9rem;
}


.error-card {
  border-color:
    rgba(
      255,
      141,
      141,
      0.45
    );

  background:
    linear-gradient(
      180deg,
      rgba(
        80,
        28,
        37,
        0.28
      ),
      rgba(
        21,
        27,
        47,
        0.92
      )
    );
}


.error-kicker {
  display: inline-block;

  margin:
    0.35rem
    0
    0.65rem;

  padding:
    0.3rem
    0.55rem;

  border-radius: 999px;

  color: var(--danger);

  background:
    rgba(
      255,
      141,
      141,
      0.08
    );

  font-size: 0.74rem;

  font-weight: 800;

  text-transform: uppercase;
}


.error-title {
  font-weight: 850;
}


.error-message,
.error-hint {
  color: var(--muted);

  line-height: 1.55;
}


.error-hint {
  padding-top: 0.7rem;

  border-top:
    1px
    solid
    rgba(
      255,
      141,
      141,
      0.16
    );
}


.error-code {
  color: var(--muted);

  font-family:
    ui-monospace,
    monospace;

  font-size: 0.72rem;
}


.hidden {
  display: none !important;
}


.privacy-container {
  max-width: 1000px;
}


.privacy-hero {
  padding:
    2rem
    0;
}


.eyebrow {
  color: var(--accent);

  font-weight: 900;

  text-transform: uppercase;

  letter-spacing: 0.14em;
}


.privacy-document {
  overflow: hidden;
}


.privacy-document section {
  padding: 1.6rem;

  border-bottom:
    1px
    solid
    rgba(
      44,
      54,
      95,
      0.65
    );
}


.privacy-document section:last-child {
  border: 0;
}


.privacy-document p {
  color: var(--muted);

  line-height: 1.75;
}


.privacy-final {
  background:
    rgba(
      110,
      168,
      254,
      0.06
    );
}


.primary-link-button {
  display: inline-block;

  background: var(--accent);

  color: #08101f;

  text-decoration: none;

  font-weight: 800;

  border-radius: 999px;

  padding:
    0.85rem
    1.1rem;
}


footer {
  padding:
    1.6rem
    0
    2rem;

  border-top:
    1px
    solid
    rgba(
      44,
      54,
      95,
      0.7
    );

  color: var(--muted);
}


footer > div {
  align-items: center;
}


footer span {
  display: flex;

  gap: 1rem;
}


footer a {
  color: var(--muted);

  text-decoration: none;
}


footer p {
  font-size: 0.78rem;
}


@media (
  max-width: 950px
) {

  .controls {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

}


@media (
  max-width: 900px
) {

  .results {
    grid-template-columns:
      1fr;
  }

}


@media (
  max-width: 700px
) {

  .controls,
  .model-grid,
  .custom-size-controls {
    grid-template-columns:
      1fr;
  }


  .section-heading,
  .provider-head,
  .model-status-header,
  footer > div {
    flex-direction:
      column;
  }


  .size-separator {
    display: none;
  }


  .model-status-row {
    align-items: flex-start;

    flex-direction:
      column;
  }

}
`;


/* ----------------------------------
   BROWSER JAVASCRIPT
---------------------------------- */


const JS = `
const MAX_IMAGES_PER_REQUEST =
  8;

const MAX_TOTAL_PIXELS =
  12582912;


/*
 * AI Horde:
 *
 * Check every 15 seconds
 * for up to one hour.
 *
 * The browser does the waiting.
 * A Worker request is NOT held open
 * for an hour.
 */

const HORDE_POLL_INTERVAL_MS =
  15000;

const HORDE_MAX_WAIT_MS =
  60 * 60 * 1000;


const form =
  document.getElementById(
    'gen-form'
  );


const promptEl =
  document.getElementById(
    'prompt'
  );


const button =
  document.getElementById(
    'submit-btn'
  );


const statusEl =
  document.getElementById(
    'status'
  );


const resultsEl =
  document.getElementById(
    'results'
  );


const modelStatusPanel =
  document.getElementById(
    'model-status-panel'
  );


const modelStatusList =
  document.getElementById(
    'model-status-list'
  );


const modelStatusSummary =
  document.getElementById(
    'model-status-summary'
  );


const sizeEl =
  document.getElementById(
    'size'
  );


const qualityEl =
  document.getElementById(
    'quality'
  );


const imagesPerModelEl =
  document.getElementById(
    'images-per-model'
  );


const seedEl =
  document.getElementById(
    'seed'
  );


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


let latestResults =
  [];


/* ----------------------------------
   MODEL SELECTION
---------------------------------- */


function getModelCheckboxes() {

  return Array.from(
    document.querySelectorAll(
      'input[name="models"]'
    )
  );

}


function getSelectedModelKeys() {

  return getModelCheckboxes()
    .filter(
      function(checkbox) {

        return checkbox.checked;

      }
    )
    .map(
      function(checkbox) {

        return checkbox.value;

      }
    );

}


function modelLabelForKey(
  key
) {

  const checkbox =
    getModelCheckboxes()
      .find(
        function(item) {

          return (
            item.value ===
            key
          );

        }
      );


  return (
    checkbox &&
    checkbox.dataset.modelLabel

      ? checkbox.dataset.modelLabel

      : key
  );

}


function providerLabelForKey(
  key
) {

  const checkbox =
    getModelCheckboxes()
      .find(
        function(item) {

          return (
            item.value ===
            key
          );

        }
      );


  return (
    checkbox &&
    checkbox.dataset.providerLabel

      ? checkbox.dataset.providerLabel

      : ''
  );

}


/* ----------------------------------
   REQUEST SETTINGS
---------------------------------- */


function getImagesPerModel() {

  const value =
    Number.parseInt(
      imagesPerModelEl.value,
      10
    );


  return (
    [1, 2, 4].includes(
      value
    )

      ? value

      : 1
  );

}


function isValidCustomDimension(
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


function getChosenDimensions() {

  if (
    sizeEl.value ===
    'custom'
  ) {

    return {

      width:
        Number.parseInt(
          customWidthEl.value,
          10
        ),

      height:
        Number.parseInt(
          customHeightEl.value,
          10
        )

    };

  }


  const option =
    sizeEl.options[
      sizeEl.selectedIndex
    ];


  return {

    width:
      Number.parseInt(
        option.dataset.width,
        10
      ),

    height:
      Number.parseInt(
        option.dataset.height,
        10
      )

  };

}


function getRequestSummary() {

  const modelCount =
    getSelectedModelKeys()
      .length;


  const imagesPerModel =
    getImagesPerModel();


  const dimensions =
    getChosenDimensions();


  const totalImages =
    modelCount *
    imagesPerModel;


  return {

    modelCount:
      modelCount,

    imagesPerModel:
      imagesPerModel,

    totalImages:
      totalImages,

    width:
      dimensions.width,

    height:
      dimensions.height,

    totalPixels:
      dimensions.width *
      dimensions.height *
      totalImages

  };

}


function setStatus(
  message,
  tone
) {

  statusEl.textContent =
    message;


  statusEl.dataset.tone =
    tone ||
    'neutral';

}


function updateGenerateButton() {

  const summary =
    getRequestSummary();


  if (
    !summary.modelCount
  ) {

    button.disabled =
      true;


    button.textContent =
      'Select a model';


    return;

  }


  if (
    summary.totalImages >
    MAX_IMAGES_PER_REQUEST
  ) {

    button.disabled =
      true;


    button.textContent =
      'Maximum 8 images';


    return;

  }


  if (
    Number.isFinite(
      summary.totalPixels
    ) &&
    summary.totalPixels >
    MAX_TOTAL_PIXELS
  ) {

    button.disabled =
      true;


    button.textContent =
      'Reduce size or image count';


    return;

  }


  button.disabled =
    false;


  button.textContent =
    'Generate ' +
    summary.totalImages +
    (
      summary.totalImages === 1

        ? ' image'

        : ' images'
    );

}


function updateCustomSizeVisibility() {

  customSizeControls
    .classList
    .toggle(
      'hidden',
      sizeEl.value !==
      'custom'
    );


  updateGenerateButton();

}


/* ----------------------------------
   INLINE MODEL STATUS
---------------------------------- */


function findInlineStatus(
  key
) {

  return Array.from(
    document.querySelectorAll(
      '[data-model-status-for]'
    )
  ).find(
    function(element) {

      return (
        element.dataset.modelStatusFor ===
        key
      );

    }
  );

}


function setInlineModelStatus(
  key,
  text,
  tone
) {

  const element =
    findInlineStatus(
      key
    );


  if (
    !element
  ) {

    return;

  }


  element.textContent =
    text;


  element.dataset.tone =
    tone ||
    'ready';

}


/* ----------------------------------
   MODEL STATUS PANEL
---------------------------------- */


function startStatuses(
  keys
) {

  modelStatusList.innerHTML =
    '';


  keys.forEach(
    function(key) {

      const row =
        document.createElement(
          'div'
        );


      row.className =
        'model-status-row';


      row.dataset.modelStatusKey =
        key;


      const left =
        document.createElement(
          'div'
        );


      const name =
        document.createElement(
          'span'
        );


      name.className =
        'model-status-name';


      name.textContent =
        modelLabelForKey(
          key
        );


      const detail =
        document.createElement(
          'span'
        );


      detail.className =
        'model-status-detail';


      detail.textContent =
        providerLabelForKey(
          key
        ) +
        ' · submitted';


      left.appendChild(
        name
      );


      left.appendChild(
        detail
      );


      const badge =
        document.createElement(
          'span'
        );


      badge.className =
        'model-status-badge';


      badge.dataset.tone =
        'processing';


      badge.textContent =
        'Processing';


      row.appendChild(
        left
      );


      row.appendChild(
        badge
      );


      modelStatusList.appendChild(
        row
      );


      setInlineModelStatus(
        key,
        'Processing',
        'processing'
      );

    }
  );


  modelStatusSummary.textContent =
    keys.length +
    ' model' +
    (
      keys.length === 1

        ? ''

        : 's'
    ) +
    ' processing';


  modelStatusPanel
    .classList
    .remove(
      'hidden'
    );

}


function statusRow(
  key
) {

  return Array.from(
    modelStatusList.children
  ).find(
    function(row) {

      return (
        row.dataset.modelStatusKey ===
        key
      );

    }
  );

}


function setModelStatus(
  key,
  state,
  detail
) {

  const row =
    statusRow(
      key
    );


  if (
    !row
  ) {

    return;

  }


  const badge =
    row.querySelector(
      '.model-status-badge'
    );


  const detailElement =
    row.querySelector(
      '.model-status-detail'
    );


  let tone =
    'processing';


  let text =
    'Processing';


  if (
    state ===
    'completed'
  ) {

    tone =
      'success';


    text =
      'Completed';

  } else if (
    state ===
    'partial'
  ) {

    tone =
      'warning';


    text =
      'Partial';

  } else if (
    state ===
    'queued'
  ) {

    tone =
      'warning';


    text =
      'Queued';

  } else if (
    state ===
    'generating'
  ) {

    tone =
      'warning';


    text =
      'Generating';

  } else if (
    state ===
    'failed'
  ) {

    tone =
      'error';


    text =
      'Failed';

  }


  badge.dataset.tone =
    tone;


  badge.textContent =
    text;


  if (
    detailElement &&
    detail
  ) {

    detailElement.textContent =
      detail;

  }


  setInlineModelStatus(
    key,
    text,
    tone
  );


  refreshStatusSummary();

}


function refreshStatusSummary() {

  let done =
    0;


  let pending =
    0;


  let failed =
    0;


  Array.from(
    modelStatusList.children
  ).forEach(
    function(row) {

      const text =
        row.querySelector(
          '.model-status-badge'
        )?.textContent ||
        '';


      if (
        text ===
          'Completed' ||
        text ===
          'Partial'
      ) {

        done +=
          1;

      } else if (
        text ===
        'Failed'
      ) {

        failed +=
          1;

      } else {

        pending +=
          1;

      }

    }
  );


  const parts =
    [];


  if (
    done
  ) {

    parts.push(
      done +
      ' finished'
    );

  }


  if (
    pending
  ) {

    parts.push(
      pending +
      ' pending'
    );

  }


  if (
    failed
  ) {

    parts.push(
      failed +
      ' failed'
    );

  }


  modelStatusSummary.textContent =
    parts.join(
      ' · '
    );

}


/* ----------------------------------
   TURNSTILE
---------------------------------- */


window.onTurnstileError =
  function(errorCode) {

    console.error(
      'Turnstile error:',
      errorCode
    );


    setStatus(
      'Verification could not load. Please refresh and try again.',
      'error'
    );

  };


/* ----------------------------------
   CONTROL EVENTS
---------------------------------- */


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


imagesPerModelEl.addEventListener(
  'change',
  updateGenerateButton
);


customWidthEl.addEventListener(
  'input',
  updateGenerateButton
);


customHeightEl.addEventListener(
  'input',
  updateGenerateButton
);


/* ----------------------------------
   RESULT RENDERING
---------------------------------- */


function extensionForDataURI(
  uri
) {

  const value =
    String(
      uri
    );


  if (
    value.startsWith(
      'data:image/jpeg'
    )
  ) {

    return 'jpg';

  }


  if (
    value.startsWith(
      'data:image/webp'
    )
  ) {

    return 'webp';

  }


  if (
    value.startsWith(
      'data:image/svg+xml'
    )
  ) {

    return 'svg';

  }


  return 'png';

}


function addText(
  parent,
  tag,
  className,
  text
) {

  const element =
    document.createElement(
      tag
    );


  element.className =
    className;


  element.textContent =
    text;


  parent.appendChild(
    element
  );


  return element;

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


  const headingRow =
    document.createElement(
      'div'
    );


  headingRow.className =
    'result-heading-row';


  const heading =
    document.createElement(
      'h3'
    );


  heading.textContent =
    (
      item.label ||
      'Image'
    ) +
    (
      item.totalVariations > 1

        ? ' · Variation ' +
          item.variation

        : ''
    );


  const state =
    document.createElement(
      'span'
    );


  state.className =
    'result-state';


  state.dataset.tone =
    item.error

      ? 'error'

      : 'success';


  state.textContent =
    item.error

      ? 'Failed'

      : 'Completed';


  headingRow.appendChild(
    heading
  );


  headingRow.appendChild(
    state
  );


  card.appendChild(
    headingRow
  );


  if (
    item.error
  ) {

    card.classList.add(
      'error-card'
    );


    const errorInfo =
      typeof item.error ===
        'object' &&
      item.error

        ? item.error

        : {

            code:
              'GENERATION_FAILED',

            title:
              'Generation failed',

            message:
              String(
                item.error ||
                'This model could not generate an image.'
              ),

            hint:
              'Try again or use another model.'

          };


    addText(
      card,
      'div',
      'error-kicker',
      item.providerLabel ||
      'Model unavailable'
    );


    addText(
      card,
      'p',
      'error-title',
      errorInfo.title ||
      'Generation failed'
    );


    addText(
      card,
      'p',
      'error-message',
      errorInfo.message ||
      'Generation failed.'
    );


    if (
      errorInfo.hint
    ) {

      addText(
        card,
        'p',
        'error-hint',
        errorInfo.hint
      );

    }


    if (
      errorInfo.code
    ) {

      addText(
        card,
        'code',
        'error-code',
        errorInfo.code
      );

    }


    return card;

  }


  const parts =
    [];


  if (
    item.providerLabel
  ) {

    parts.push(
      item.providerLabel
    );

  }


  if (
    item.runtimeModel
  ) {

    parts.push(
      item.runtimeModel
    );

  }


  parts.push(
    item.width +
    ' × ' +
    item.height +
    ' px'
  );


  if (
    Number.isInteger(
      item.steps
    )
  ) {

    parts.push(
      item.steps +
      ' steps'
    );

  }


  parts.push(
    'seed ' +
    item.seed
  );


  addText(
    card,
    'p',
    'result-meta',
    parts.join(
      ' · '
    )
  );


  const frame =
    document.createElement(
      'div'
    );


  frame.className =
    'image-frame';


  const image =
    document.createElement(
      'img'
    );


  image.src =
    item.dataURI;


  image.alt =
    (
      item.label ||
      'AI'
    ) +
    ' generated image';


  frame.appendChild(
    image
  );


  card.appendChild(
    frame
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
    String(
      item.label ||
      'image'
    )
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
    '-v' +
    item.variation +
    '.' +
    extensionForDataURI(
      item.dataURI
    );


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


function renderResults() {

  resultsEl.innerHTML =
    '';


  latestResults.forEach(
    function(item) {

      resultsEl.appendChild(
        createResultCard(
          item
        )
      );

    }
  );


  resultsEl
    .classList
    .toggle(
      'hidden',
      latestResults.length ===
      0
    );

}


function addResults(
  items
) {

  if (
    !Array.isArray(
      items
    )
  ) {

    return;

  }


  items.forEach(
    function(item) {

      const index =
        latestResults.findIndex(
          function(oldItem) {

            return (
              oldItem.modelKey ===
                item.modelKey &&
              oldItem.variation ===
                item.variation
            );

          }
        );


      if (
        index >= 0
      ) {

        latestResults[
          index
        ] =
          item;

      } else {

        latestResults.push(
          item
        );

      }

    }
  );


  renderResults();

}


/* ----------------------------------
   HORDE ONE-HOUR POLLING
---------------------------------- */


function sleep(
  milliseconds
) {

  return new Promise(
    function(resolve) {

      setTimeout(
        resolve,
        milliseconds
      );

    }
  );

}


function timeoutResult(
  job,
  index
) {

  return {

    modelKey:
      job.modelKey,

    provider:
      'horde',

    providerLabel:
      'AI Horde',

    label:
      job.label,

    runtimeModel:
      job.runtimeModel,

    width:
      job.width,

    height:
      job.height,

    steps:
      job.steps,

    seed:
      (
        job.baseSeed +
        index
      ) %
      2147483648,

    variation:
      index +
      1,

    totalVariations:
      job.totalVariations,

    error:
      {

        code:
          'HORDE_QUEUE_TIMEOUT',

        title:
          'AI Horde is still queued after one hour',

        message:
          'This job did not finish within Arqivo\\'s one-hour browser polling window.',

        hint:
          'The volunteer network may be busy. Try again later, use 512 × 512, or choose fewer Horde models.'

      }

  };

}


async function pollHordeJobs(
  initialJobs
) {

  let jobs =
    initialJobs.slice();


  const startedAt =
    Date.now();


  let firstRound =
    true;


  while (
    jobs.length &&
    Date.now() -
      startedAt <
      HORDE_MAX_WAIT_MS
  ) {

    if (
      !firstRound
    ) {

      await sleep(
        HORDE_POLL_INTERVAL_MS
      );

    }


    firstRound =
      false;


    let response;


    try {

      response =
        await fetch(
          '/api/horde/status',
          {

            method:
              'POST',

            headers:
              {

                'Content-Type':
                  'application/json'

              },

            body:
              JSON.stringify(
                {

                  jobs:
                    jobs

                }
              )

          }
        );

    } catch {

      setStatus(
        'AI Horde status check had a network problem; retrying...',
        'warning'
      );


      continue;

    }


    let data =
      {};


    try {

      data =
        await response.json();

    } catch {

      data =
        {};

    }


    if (
      !response.ok
    ) {

      setStatus(
        data.error ||
        'AI Horde status check failed; retrying...',
        'warning'
      );


      continue;

    }


    const updates =
      Array.isArray(
        data.updates
      )

        ? data.updates

        : [];


    const remaining =
      [];


    updates.forEach(
      function(update) {

        const job =
          jobs.find(
            function(item) {

              return (
                item.requestId ===
                update.requestId
              );

            }
          );


        if (
          !job
        ) {

          return;

        }


        if (
          update.done
        ) {

          addResults(
            update.results ||
            []
          );


          const successful =
            (
              update.results ||
              []
            )
              .filter(
                function(item) {

                  return !item.error;

                }
              )
              .length;


          if (
            successful ===
            job.totalVariations
          ) {

            setModelStatus(
              job.modelKey,
              'completed',
              successful +
              ' image' +
              (
                successful === 1

                  ? ''

                  : 's'
              ) +
              ' completed'
            );

          } else if (
            successful > 0
          ) {

            setModelStatus(
              job.modelKey,
              'partial',
              successful +
              ' completed; some failed'
            );

          } else {

            setModelStatus(
              job.modelKey,
              'failed',
              update.error?.title ||
              'AI Horde generation failed'
            );

          }

        } else {

          setModelStatus(
            job.modelKey,
            update.processing > 0

              ? 'generating'

              : 'queued',

            update.detail ||
            'Waiting for a volunteer worker.'
          );


          remaining.push(
            job
          );

        }

      }
    );


    const returnedIds =
      new Set(
        updates.map(
          function(update) {

            return update.requestId;

          }
        )
      );


    jobs.forEach(
      function(job) {

        if (
          !returnedIds.has(
            job.requestId
          )
        ) {

          remaining.push(
            job
          );

        }

      }
    );


    jobs =
      Array.from(
        new Map(
          remaining.map(
            function(job) {

              return [
                job.requestId,
                job
              ];

            }
          )
        ).values()
      );


    if (
      jobs.length
    ) {

      const elapsedMinutes =
        Math.floor(
          (
            Date.now() -
            startedAt
          ) /
          60000
        );


      setStatus(
        'Waiting for ' +
        jobs.length +
        ' AI Horde job' +
        (
          jobs.length === 1

            ? ''

            : 's'
        ) +
        ' · ' +
        elapsedMinutes +
        ' minute' +
        (
          elapsedMinutes === 1

            ? ''

            : 's'
        ) +
        ' elapsed...',
        'warning'
      );

    }

  }


  if (
    jobs.length
  ) {

    jobs.forEach(
      function(job) {

        const failures =
          Array.from(
            {
              length:
                job.totalVariations
            },

            function(
              _,
              index
            ) {

              return timeoutResult(
                job,
                index
              );

            }
          );


        addResults(
          failures
        );


        setModelStatus(
          job.modelKey,
          'failed',
          'Still queued after one hour'
        );

      }
    );

  }

}


/* ----------------------------------
   SUBMIT FORM
---------------------------------- */


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


    const quality =
      qualityEl.value;


    const imagesPerModel =
      getImagesPerModel();


    const size =
      sizeEl.value;


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


    const summary =
      getRequestSummary();


    const token =
      globalThis
        .turnstile
        ?.getResponse
        ?.();


    if (
      !prompt
    ) {

      setStatus(
        'Please enter a prompt.',
        'error'
      );


      return;

    }


    if (
      !selectedModels.length
    ) {

      setStatus(
        'Please select at least one model.',
        'error'
      );


      return;

    }


    if (
      summary.totalImages >
      MAX_IMAGES_PER_REQUEST
    ) {

      setStatus(
        'Maximum 8 images per request.',
        'error'
      );


      return;

    }


    if (
      size ===
        'custom' &&
      (
        !isValidCustomDimension(
          customWidth
        ) ||
        !isValidCustomDimension(
          customHeight
        )
      )
    ) {

      setStatus(
        'Custom dimensions must be 256–2048 and multiples of 64.',
        'error'
      );


      return;

    }


    if (
      summary.totalPixels >
      MAX_TOTAL_PIXELS
    ) {

      setStatus(
        'That combination is too large. Reduce size, models, or variations.',
        'error'
      );


      return;

    }


    if (
      !token
    ) {

      setStatus(
        'Please complete the verification first.',
        'error'
      );


      return;

    }


    button.disabled =
      true;


    button.textContent =
      'Generating...';


    latestResults =
      [];


    renderResults();


    startStatuses(
      selectedModels
    );


    setStatus(
      'Starting ' +
      summary.totalImages +
      ' image' +
      (
        summary.totalImages === 1

          ? ''

          : 's'
      ) +
      '...',
      'neutral'
    );


    try {

      const response =
        await fetch(
          '/api/generate',
          {

            method:
              'POST',

            headers:
              {

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

                  imagesPerModel:
                    imagesPerModel,

                  seed:
                    seed,

                  turnstileToken:
                    token

                }
              )

          }
        );


      let data =
        {};


      try {

        data =
          await response.json();

      } catch {

        data =
          {};

      }


      if (
        !response.ok
      ) {

        throw new Error(
          data.error ||
          'Generation failed.'
        );

      }


      addResults(
        data.results ||
        []
      );


      (
        data.modelStatuses ||
        []
      ).forEach(
        function(modelStatus) {

          if (
            modelStatus.status ===
            'completed'
          ) {

            setModelStatus(
              modelStatus.key,
              'completed',
              modelStatus.successful +
              ' completed'
            );

          } else if (
            modelStatus.status ===
            'partial'
          ) {

            setModelStatus(
              modelStatus.key,
              'partial',
              modelStatus.successful +
              ' completed · ' +
              modelStatus.failed +
              ' failed'
            );

          } else if (
            modelStatus.status ===
            'failed'
          ) {

            setModelStatus(
              modelStatus.key,
              'failed',
              modelStatus.error?.title ||
              'Failed'
            );

          }

        }
      );


      const pending =
        Array.isArray(
          data.pendingHorde
        )

          ? data.pendingHorde

          : [];


      pending.forEach(
        function(job) {

          setModelStatus(
            job.modelKey,
            'queued',
            'Submitted to AI Horde · waiting for a volunteer worker'
          );

        }
      );


      if (
        pending.length
      ) {

        setStatus(
          'Cloudflare results are shown as they finish. Waiting for AI Horde for up to one hour...',
          'warning'
        );


        await pollHordeJobs(
          pending
        );

      }


      const successful =
        latestResults
          .filter(
            function(item) {

              return !item.error;

            }
          )
          .length;


      const failed =
        latestResults
          .filter(
            function(item) {

              return Boolean(
                item.error
              );

            }
          )
          .length;


      if (
        successful &&
        failed
      ) {

        setStatus(
          successful +
          ' completed, ' +
          failed +
          ' failed.',
          'warning'
        );

      } else if (
        successful
      ) {

        setStatus(
          successful +
          ' image' +
          (
            successful === 1

              ? ''

              : 's'
          ) +
          ' completed.',
          'success'
        );

      } else {

        setStatus(
          'No images completed. See the model errors below.',
          'error'
        );

      }

    } catch (
      error
    ) {

      const message =
        error?.message ||
        'Something went wrong.';


      selectedModels
        .forEach(
          function(key) {

            setModelStatus(
              key,
              'failed',
              message
            );

          }
        );


      setStatus(
        message,
        'error'
      );

    } finally {

      globalThis
        .turnstile
        ?.reset
        ?.();


      updateGenerateButton();

    }

  }
);


updateCustomSizeVisibility();
updateGenerateButton();
`;


/* ----------------------------------
   SECURITY HEADERS
---------------------------------- */


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

  "Cross-Origin-Opener-Policy":
    "same-origin",

  "Cross-Origin-Resource-Policy":
    "same-origin",

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


/* ----------------------------------
   WORKER ROUTER
---------------------------------- */


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
      request.method ===
        "GET" &&
      url.pathname ===
        "/"
    ) {

      return new Response(
        HTML(
          env.TURNSTILE_SITE_KEY ||
          "",
          env
        ),
        {

          headers:
            {

              ...COMMON_HEADERS,

              "Content-Type":
                "text/html; charset=UTF-8"

            }

        }
      );

    }


    if (
      request.method ===
        "GET" &&
      (
        url.pathname ===
          "/privacy" ||
        url.pathname ===
          "/privacy/"
      )
    ) {

      return new Response(
        PRIVACY_HTML,
        {

          headers:
            {

              ...COMMON_HEADERS,

              "Content-Type":
                "text/html; charset=UTF-8"

            }

        }
      );

    }


    if (
      request.method ===
        "GET" &&
      url.pathname ===
        "/styles.css"
    ) {

      return new Response(
        CSS,
        {

          headers:
            {

              ...COMMON_HEADERS,

              "Content-Type":
                "text/css; charset=UTF-8"

            }

        }
      );

    }


    if (
      request.method ===
        "GET" &&
      url.pathname ===
        "/app.js"
    ) {

      return new Response(
        JS,
        {

          headers:
            {

              ...COMMON_HEADERS,

              "Content-Type":
                "application/javascript; charset=UTF-8"

            }

        }
      );

    }


    if (
      request.method ===
        "POST" &&
      url.pathname ===
        "/api/generate"
    ) {

      return handleGenerate(
        request,
        env
      );

    }


    if (
      request.method ===
        "POST" &&
      url.pathname ===
        "/api/horde/status"
    ) {

      return handleHordeStatus(
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


/* ----------------------------------
   BASIC REQUEST HELPERS
---------------------------------- */


function sameOrigin(
  request
) {

  const origin =
    request.headers.get(
      "Origin"
    );


  return (
    !origin ||
    origin ===
      new URL(
        request.url
      ).origin
  );

}


async function readJSONRequest(
  request
) {

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

    throw new ProviderResponseError(
      "Content-Type must be application/json.",
      415,
      "BAD_CONTENT_TYPE"
    );

  }


  try {

    return await request.json();

  } catch {

    throw new ProviderResponseError(
      "Invalid JSON body.",
      400,
      "INVALID_JSON"
    );

  }

}


/* ----------------------------------
   GENERATION ENDPOINT
---------------------------------- */


async function handleGenerate(
  request,
  env
) {

  if (
    !sameOrigin(
      request
    )
  ) {

    return json(
      {
        error:
          "Forbidden origin."
      },
      403
    );

  }


  let body;


  try {

    body =
      await readJSONRequest(
        request
      );

  } catch (
    error
  ) {

    return json(
      {
        error:
          error.message
      },
      error.status ||
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


  const requestedKeys =
    Array.isArray(
      body?.models
    )

      ? body.models.map(
          String
        )

      : [];


  const selectedModels =
    Array.from(
      new Set(
        requestedKeys
      )
    )
      .slice(
        0,
        MODELS.length
      )
      .map(
        (key) =>
          MODELS_BY_KEY[
            key
          ]
      )
      .filter(
        Boolean
      );


  if (
    !selectedModels.length
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


  const requestedImagesPerModel =
    Number.parseInt(
      body?.imagesPerModel,
      10
    );


  const imagesPerModel =
    [1, 2, 4].includes(
      requestedImagesPerModel
    )

      ? requestedImagesPerModel

      : 1;


  const totalImages =
    selectedModels.length *
    imagesPerModel;


  if (
    totalImages >
    MAX_IMAGES_PER_REQUEST
  ) {

    return json(
      {
        error:
          "A request can generate at most 8 images."
      },
      400
    );

  }


  const dimensions =
    resolveDimensions(
      body
    );


  if (
    dimensions.error
  ) {

    return json(
      {
        error:
          dimensions.error
      },
      400
    );

  }


  const width =
    dimensions.width;


  const height =
    dimensions.height;


  if (
    width *
    height *
    totalImages >
    MAX_TOTAL_PIXELS
  ) {

    return json(
      {
        error:
          "That request is too large. Reduce the resolution, number of models, or variations."
      },
      400
    );

  }


  const baseSeedResult =
    resolveSeed(
      body?.seed
    );


  if (
    baseSeedResult.error
  ) {

    return json(
      {
        error:
          baseSeedResult.error
      },
      400
    );

  }


  const baseSeed =
    baseSeedResult.seed;


  const verification =
    await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
      request.headers.get(
        "CF-Connecting-IP"
      ) ||
      "",
      env.EXPECTED_HOSTNAME
    );


  if (
    !verification.success
  ) {

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


  const cloudflareModels =
    selectedModels.filter(
      (model) =>
        model.provider ===
        "cloudflare"
    );


  const hordeModels =
    selectedModels.filter(
      (model) =>
        model.provider ===
        "horde"
    );


  const cloudflareTasks =
    [];


  for (
    const model
    of cloudflareModels
  ) {

    for (
      let index = 0;
      index < imagesPerModel;
      index += 1
    ) {

      const seed =
        (
          baseSeed +
          index
        ) %
        (
          MAX_SEED +
          1
        );


      cloudflareTasks.push(
        () =>
          generateCloudflareImage(
            env,
            model,
            finalPrompt,
            negativePrompt,
            width,
            height,
            quality,
            seed,
            index + 1,
            imagesPerModel
          )
      );

    }

  }


  const hordeTasks =
    hordeModels.map(
      (model) =>
        () =>
          submitHordeModel(
            env,
            model,
            finalPrompt,
            negativePrompt,
            width,
            height,
            quality,
            baseSeed,
            imagesPerModel
          )
    );


  const [
    cloudflareResults,
    hordeSubmissions
  ] =
    await Promise.all(
      [

        runWithConcurrency(
          cloudflareTasks,
          CLOUDFLARE_CONCURRENCY
        ),

        runWithConcurrency(
          hordeTasks,
          HORDE_SUBMIT_CONCURRENCY
        )

      ]
    );


  const results =
    [
      ...cloudflareResults
    ];


  const pendingHorde =
    [];


  for (
    const submission
    of hordeSubmissions
  ) {

    if (
      submission.pending
    ) {

      pendingHorde.push(
        submission.pending
      );

    }


    if (
      submission.results
    ) {

      results.push(
        ...submission.results
      );

    }

  }


  const modelStatuses =
    summarizeInitialStatuses(
      selectedModels,
      results,
      pendingHorde,
      imagesPerModel
    );


  return json(
    {

      results:
        results,

      pendingHorde:
        pendingHorde,

      modelStatuses:
        modelStatuses

    }
  );

}


/* ----------------------------------
   HORDE STATUS ENDPOINT
---------------------------------- */


async function handleHordeStatus(
  request,
  env
) {

  if (
    !sameOrigin(
      request
    )
  ) {

    return json(
      {
        error:
          "Forbidden origin."
      },
      403
    );

  }


  let body;


  try {

    body =
      await readJSONRequest(
        request
      );

  } catch (
    error
  ) {

    return json(
      {
        error:
          error.message
      },
      error.status ||
      400
    );

  }


  const jobs =
    Array.isArray(
      body?.jobs
    )

      ? body.jobs.slice(
          0,
          4
        )

      : [];


  if (
    !jobs.length
  ) {

    return json(
      {
        error:
          "No Horde jobs supplied."
      },
      400
    );

  }


  const apiKey =
    String(
      env.AI_HORDE_API_KEY ||
      ""
    ).trim();


  if (
    !apiKey
  ) {

    return json(
      {
        error:
          "AI Horde API key is not configured."
      },
      500
    );

  }


  const validJobs =
    jobs
      .map(
        validatePendingHordeJob
      )
      .filter(
        Boolean
      );


  if (
    !validJobs.length
  ) {

    return json(
      {
        error:
          "No valid Horde jobs supplied."
      },
      400
    );

  }


  const updates =
    await runWithConcurrency(
      validJobs.map(
        (job) =>
          () =>
            checkHordeJob(
              apiKey,
              job
            )
      ),
      2
    );


  return json(
    {
      updates:
        updates
    }
  );

}


/* ----------------------------------
   VALIDATION
---------------------------------- */


function validatePendingHordeJob(
  job
) {

  const requestId =
    String(
      job?.requestId ||
      ""
    ).trim();


  const model =
    MODELS_BY_KEY[
      String(
        job?.modelKey ||
        ""
      )
    ];


  const totalVariations =
    Number.parseInt(
      job?.totalVariations,
      10
    );


  const width =
    Number.parseInt(
      job?.width,
      10
    );


  const height =
    Number.parseInt(
      job?.height,
      10
    );


  const steps =
    Number.parseInt(
      job?.steps,
      10
    );


  const baseSeed =
    Number.parseInt(
      job?.baseSeed,
      10
    );


  if (
    !/^[0-9a-f-]{36}$/i.test(
      requestId
    ) ||
    !model ||
    model.provider !==
      "horde" ||
    ![1, 2, 4].includes(
      totalVariations
    ) ||
    !isValidDimension(
      width
    ) ||
    !isValidDimension(
      height
    ) ||
    !Number.isInteger(
      steps
    ) ||
    !Number.isSafeInteger(
      baseSeed
    )
  ) {

    return null;

  }


  return {

    requestId:
      requestId,

    modelKey:
      model.key,

    label:
      model.label,

    runtimeModel:
      String(
        job?.runtimeModel ||
        model.hordeDefaultModel ||
        ""
      ),

    width:
      width,

    height:
      height,

    steps:
      steps,

    baseSeed:
      baseSeed,

    totalVariations:
      totalVariations

  };

}


function resolveDimensions(
  body
) {

  const sizeKey =
    String(
      body?.size ||
      "square-1024"
    );


  if (
    sizeKey ===
    "custom"
  ) {

    const width =
      Number.parseInt(
        body?.customWidth,
        10
      );


    const height =
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

      return {

        error:
          "Custom dimensions must be between 256 and 2048 pixels and use increments of 64."

      };

    }


    return {

      width:
        width,

      height:
        height

    };

  }


  const preset =
    SIZES[
      sizeKey
    ];


  if (
    !preset
  ) {

    return {
      error:
        "Invalid image size."
    };

  }


  return {

    width:
      preset.width,

    height:
      preset.height

  };

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


function resolveSeed(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return {

      seed:
        Math.floor(
          Math.random() *
          (
            MAX_SEED +
            1
          )
        )

    };

  }


  const seed =
    Number.parseInt(
      value,
      10
    );


  if (
    !Number.isSafeInteger(
      seed
    ) ||
    seed < 0 ||
    seed >
      MAX_SEED
  ) {

    return {

      error:
        "Seed must be a whole number between 0 and 2147483647."

    };

  }


  return {
    seed:
      seed
  };

}


/* ----------------------------------
   PROMPT HELPERS
---------------------------------- */


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
Realistic materials and textures.
Physically believable shadows and reflections.
Sharp subject detail.
Professional image quality.

COMPOSITION:
Respect framing, camera angle, lens, distance, and aspect-ratio intent in the user's request.
Do not replace the requested subject with photography equipment or an unrelated object.
If framing is unspecified, keep the main subject clearly visible and comfortably inside the frame.
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


function buildHordePrompt(
  prompt,
  negativePrompt
) {

  return (
    String(
      prompt
    ).trim() +
    " ### " +
    String(
      negativePrompt
    ).trim()
  );

}


/* ----------------------------------
   CONCURRENCY
---------------------------------- */


async function runWithConcurrency(
  tasks,
  limit
) {

  if (
    !tasks.length
  ) {

    return [];

  }


  const results =
    new Array(
      tasks.length
    );


  let nextIndex =
    0;


  async function worker() {

    while (
      true
    ) {

      const index =
        nextIndex;


      nextIndex +=
        1;


      if (
        index >=
        tasks.length
      ) {

        return;

      }


      try {

        results[
          index
        ] =
          await tasks[
            index
          ]();

      } catch {

        results[
          index
        ] =
          null;

      }

    }

  }


  await Promise.all(
    Array.from(
      {

        length:
          Math.min(
            limit,
            tasks.length
          )

      },

      () =>
        worker()
    )
  );


  return results.filter(
    (result) =>
      result !== null
  );

}


/* ----------------------------------
   STATUS SUMMARY
---------------------------------- */


function summarizeInitialStatuses(
  selectedModels,
  results,
  pendingHorde,
  imagesPerModel
) {

  return selectedModels.map(
    (model) => {

      if (
        pendingHorde.some(
          (job) =>
            job.modelKey ===
            model.key
        )
      ) {

        return {

          key:
            model.key,

          status:
            "queued",

          expected:
            imagesPerModel,

          successful:
            0,

          failed:
            0

        };

      }


      const items =
        results.filter(
          (item) =>
            item.modelKey ===
            model.key
        );


      const successful =
        items.filter(
          (item) =>
            !item.error
        ).length;


      const failed =
        Math.max(
          0,
          imagesPerModel -
          successful
        );


      const firstFailure =
        items.find(
          (item) =>
            item.error
        );


      return {

        key:
          model.key,

        status:
          successful ===
            imagesPerModel

            ? "completed"

            : successful > 0

              ? "partial"

              : "failed",

        expected:
          imagesPerModel,

        successful:
          successful,

        failed:
          failed,

        error:
          firstFailure?.error ||
          null

      };

    }
  );

}


/* ----------------------------------
   CLOUDFLARE GENERATION
---------------------------------- */


async function generateCloudflareImage(
  env,
  model,
  prompt,
  negativePrompt,
  width,
  height,
  quality,
  seed,
  variation,
  totalVariations
) {

  const steps =
    quality ===
      "best"

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


    const dataURI =
      await outputToDataURI(
        output
      );


    return {

      modelKey:
        model.key,

      provider:
        model.provider,

      providerLabel:
        providerLabelForModel(
          model
        ),

      label:
        model.label,

      model:
        model.id,

      runtimeModel:
        model.id,

      width:
        width,

      height:
        height,

      steps:
        steps,

      seed:
        seed,

      variation:
        variation,

      totalVariations:
        totalVariations,

      dataURI:
        dataURI

    };

  } catch (
    error
  ) {

    const publicError =
      classifyModelError(
        error,
        model,
        width,
        height
      );


    logModelFailure(
      model,
      publicError,
      error,
      model.id
    );


    return {

      modelKey:
        model.key,

      provider:
        model.provider,

      providerLabel:
        providerLabelForModel(
          model
        ),

      label:
        model.label,

      model:
        model.id,

      runtimeModel:
        model.id,

      width:
        width,

      height:
        height,

      steps:
        steps,

      seed:
        seed,

      variation:
        variation,

      totalVariations:
        totalVariations,

      error:
        publicError

    };

  }

}


/* ----------------------------------
   HORDE SUBMISSION
---------------------------------- */


async function submitHordeModel(
  env,
  model,
  prompt,
  negativePrompt,
  width,
  height,
  quality,
  baseSeed,
  totalVariations
) {

  const steps =
    quality ===
      "best"

      ? model.bestSteps

      : model.standardSteps;


  const runtimeModel =
    resolveHordeModelName(
      env,
      model
    );


  const apiKey =
    String(
      env.AI_HORDE_API_KEY ||
      ""
    ).trim();


  if (
    !apiKey
  ) {

    return {

      results:
        makeHordeFailures(
          model,
          runtimeModel,
          width,
          height,
          steps,
          baseSeed,
          totalVariations,
          {

            code:
              "HORDE_API_KEY_NOT_CONFIGURED",

            title:
              "AI Horde is not configured",

            message:
              "AI_HORDE_API_KEY is missing.",

            hint:
              "Add the AI_HORDE_API_KEY Worker secret and deploy again."

          }
        )

    };

  }


  try {

    const data =
      await hordeRequest(
        AI_HORDE_API_BASE +
        "/generate/async",
        {

          method:
            "POST",

          headers:
            hordeHeaders(
              apiKey
            ),

          body:
            JSON.stringify(
              {

                prompt:
                  buildHordePrompt(
                    prompt,
                    negativePrompt
                  ),

                params:
                  {

                    width:
                      width,

                    height:
                      height,

                    steps:
                      steps,

                    cfg_scale:
                      model.guidance,

                    n:
                      totalVariations,

                    seed:
                      String(
                        baseSeed
                      ),

                    seed_variation:
                      1,

                    sampler_name:
                      "k_euler_a"

                  },

                models:
                  [
                    runtimeModel
                  ],

                nsfw:
                  true,

                censor_nsfw:
                  false,

                replacement_filter:
                  true,

                trusted_workers:
                  false,

                validated_backends:
                  true,

                slow_workers:
                  true,

                extra_slow_workers:
                  true,

                allow_downgrade:
                  true,

                shared:
                  false,

                r2:
                  true

              }
            )

        }
      );


    const requestId =
      String(
        data?.id ||
        ""
      ).trim();


    if (
      !requestId
    ) {

      throw new ModelOutputError(
        "AI Horde did not return a request ID.",
        "HORDE_MISSING_REQUEST_ID"
      );

    }


    return {

      pending:
        {

          requestId:
            requestId,

          modelKey:
            model.key,

          label:
            model.label,

          runtimeModel:
            runtimeModel,

          width:
            width,

          height:
            height,

          steps:
            steps,

          baseSeed:
            baseSeed,

          totalVariations:
            totalVariations

        }

    };

  } catch (
    error
  ) {

    const publicError =
      classifyModelError(
        error,
        model,
        width,
        height
      );


    logModelFailure(
      model,
      publicError,
      error,
      runtimeModel
    );


    return {

      results:
        makeHordeFailures(
          model,
          runtimeModel,
          width,
          height,
          steps,
          baseSeed,
          totalVariations,
          publicError
        )

    };

  }

}


/* ----------------------------------
   HORDE STATUS
---------------------------------- */


async function checkHordeJob(
  apiKey,
  job
) {

  try {

    const check =
      await hordeRequest(
        AI_HORDE_API_BASE +
        "/generate/check/" +
        encodeURIComponent(
          job.requestId
        ),
        {

          method:
            "GET",

          headers:
            hordeHeaders(
              apiKey
            )

        }
      );


    if (
      check?.faulted ===
      true
    ) {

      const publicError =
        {

          code:
            "HORDE_REQUEST_FAULTED",

          title:
            "AI Horde stopped this request",

          message:
            "The AI Horde request faulted before all images completed.",

          hint:
            "Try this model again with 512 × 512, Standard quality, and one image."

        };


      return {

        requestId:
          job.requestId,

        done:
          true,

        error:
          publicError,

        results:
          makeHordeFailures(
            MODELS_BY_KEY[
              job.modelKey
            ],
            job.runtimeModel,
            job.width,
            job.height,
            job.steps,
            job.baseSeed,
            job.totalVariations,
            publicError
          )

      };

    }


    if (
      check?.done !==
      true
    ) {

      const processing =
        Number.parseInt(
          check?.processing,
          10
        ) ||
        0;


      const waiting =
        Number.parseInt(
          check?.waiting,
          10
        ) ||
        0;


      const queuePosition =
        Number.parseInt(
          check?.queue_position,
          10
        );


      const waitTime =
        Number.parseInt(
          check?.wait_time,
          10
        );


      const parts =
        [];


      if (
        processing > 0
      ) {

        parts.push(
          processing +
          " generating"
        );

      }


      if (
        waiting > 0
      ) {

        parts.push(
          waiting +
          " waiting"
        );

      }


      if (
        Number.isInteger(
          queuePosition
        ) &&
        queuePosition >= 0
      ) {

        parts.push(
          "queue position " +
          queuePosition
        );

      }


      if (
        Number.isInteger(
          waitTime
        ) &&
        waitTime >= 0
      ) {

        parts.push(
          "estimated wait " +
          waitTime +
          "s"
        );

      }


      return {

        requestId:
          job.requestId,

        done:
          false,

        processing:
          processing,

        waiting:
          waiting,

        detail:
          parts.join(
            " · "
          ) ||
          "Waiting for an AI Horde worker."

      };

    }


    const status =
      await hordeRequest(
        AI_HORDE_API_BASE +
        "/generate/status/" +
        encodeURIComponent(
          job.requestId
        ),
        {

          method:
            "GET",

          headers:
            hordeHeaders(
              apiKey
            )

        }
      );


    const generations =
      Array.isArray(
        status?.generations
      )

        ? status.generations.slice(
            0,
            job.totalVariations
          )

        : [];


    const results =
      [];


    for (
      let index = 0;
      index < generations.length;
      index += 1
    ) {

      const generation =
        generations[
          index
        ];


      const dataURI =
        await hordeGenerationToDataURI(
          generation
        );


      results.push(
        {

          modelKey:
            job.modelKey,

          provider:
            "horde",

          providerLabel:
            "AI Horde",

          label:
            job.label,

          model:
            job.runtimeModel,

          runtimeModel:
            String(
              generation?.model ||
              job.runtimeModel
            ),

          width:
            job.width,

          height:
            job.height,

          steps:
            job.steps,

          seed:
            safeSeed(
              generation?.seed,
              (
                job.baseSeed +
                index
              ) %
              (
                MAX_SEED +
                1
              )
            ),

          variation:
            index +
            1,

          totalVariations:
            job.totalVariations,

          dataURI:
            dataURI

        }
      );

    }


    while (
      results.length <
      job.totalVariations
    ) {

      const index =
        results.length;


      results.push(
        {

          modelKey:
            job.modelKey,

          provider:
            "horde",

          providerLabel:
            "AI Horde",

          label:
            job.label,

          runtimeModel:
            job.runtimeModel,

          width:
            job.width,

          height:
            job.height,

          steps:
            job.steps,

          seed:
            (
              job.baseSeed +
              index
            ) %
            (
              MAX_SEED +
              1
            ),

          variation:
            index +
            1,

          totalVariations:
            job.totalVariations,

          error:
            {

              code:
                "HORDE_RESULT_MISSING",

              title:
                "AI Horde returned fewer images than requested",

              message:
                "The request completed, but not every expected image was returned.",

              hint:
                "Try one image at a time."

            }

        }
      );

    }


    return {

      requestId:
        job.requestId,

      done:
        true,

      results:
        results

    };

  } catch (
    error
  ) {

    const info =
      extractProviderErrorInfo(
        error
      );


    if (
      (
        info.status !==
          null &&
        info.status >=
          500
      ) ||
      info.status ===
        429 ||
      /network|temporary|timeout|busy/i.test(
        info.message
      )
    ) {

      return {

        requestId:
          job.requestId,

        done:
          false,

        processing:
          0,

        waiting:
          1,

        detail:
          "Temporary Horde status error; Arqivo will keep checking."

      };

    }


    const model =
      MODELS_BY_KEY[
        job.modelKey
      ];


    const publicError =
      classifyModelError(
        error,
        model,
        job.width,
        job.height
      );


    return {

      requestId:
        job.requestId,

      done:
        true,

      error:
        publicError,

      results:
        makeHordeFailures(
          model,
          job.runtimeModel,
          job.width,
          job.height,
          job.steps,
          job.baseSeed,
          job.totalVariations,
          publicError
        )

    };

  }

}


/* ----------------------------------
   HORDE HELPERS
---------------------------------- */


function makeHordeFailures(
  model,
  runtimeModel,
  width,
  height,
  steps,
  baseSeed,
  totalVariations,
  error
) {

  return Array.from(
    {
      length:
        totalVariations
    },

    (
      _,
      index
    ) => ({

      modelKey:
        model.key,

      provider:
        "horde",

      providerLabel:
        "AI Horde",

      label:
        model.label,

      model:
        runtimeModel,

      runtimeModel:
        runtimeModel,

      width:
        width,

      height:
        height,

      steps:
        steps,

      seed:
        (
          baseSeed +
          index
        ) %
        (
          MAX_SEED +
          1
        ),

      variation:
        index +
        1,

      totalVariations:
        totalVariations,

      error:
        error

    })
  );

}


function hordeHeaders(
  apiKey
) {

  return {

    "Accept":
      "application/json",

    "Content-Type":
      "application/json",

    "apikey":
      apiKey,

    "Client-Agent":
      AI_HORDE_CLIENT_AGENT

  };

}


async function hordeRequest(
  url,
  options
) {

  let response;


  try {

    response =
      await fetch(
        url,
        options
      );

  } catch (
    error
  ) {

    throw new ProviderResponseError(
      error?.message ||
      "AI Horde network request failed.",
      503,
      "HORDE_NETWORK_ERROR"
    );

  }


  let data =
    {};


  try {

    data =
      await response.json();

  } catch {

    data =
      {};

  }


  if (
    !response.ok
  ) {

    throw new ProviderResponseError(
      String(
        data?.message ||
        data?.error ||
        response.statusText ||
        "AI Horde returned an unsuccessful response."
      ),
      response.status,
      String(
        data?.rc ||
        data?.code ||
        ""
      )
    );

  }


  return data;

}


async function hordeGenerationToDataURI(
  generation
) {

  const value =
    String(
      generation?.img ||
      ""
    ).trim();


  if (
    !value
  ) {

    throw new ModelOutputError(
      "AI Horde returned no image data.",
      "HORDE_EMPTY_IMAGE"
    );

  }


  if (
    value.startsWith(
      "data:image/"
    )
  ) {

    return value;

  }


  if (
    /^https:\/\//i.test(
      value
    )
  ) {

    const response =
      await fetch(
        value,
        {

          headers:
            {

              "Accept":
                "image/*"

            }

        }
      );


    if (
      !response.ok
    ) {

      throw new ProviderResponseError(
        "AI Horde image download failed.",
        response.status,
        "HORDE_IMAGE_DOWNLOAD_FAILED"
      );

    }


    return arrayBufferToDataURI(
      await response.arrayBuffer(),
      response.headers.get(
        "content-type"
      ) ||
      ""
    );

  }


  return base64ImageToDataURI(
    value
  );

}


function safeSeed(
  value,
  fallback
) {

  const seed =
    Number.parseInt(
      value,
      10
    );


  return (
    Number.isSafeInteger(
      seed
    ) &&
    seed >= 0 &&
    seed <= MAX_SEED

      ? seed

      : fallback
  );

}


/* ----------------------------------
   ERROR EXTRACTION
---------------------------------- */


function extractProviderErrorInfo(
  error
) {

  const statusCandidates =
    [

      error?.status,

      error?.statusCode,

      error?.response?.status,

      error?.cause?.status

    ];


  let status =
    null;


  for (
    const value
    of statusCandidates
  ) {

    const parsed =
      Number.parseInt(
        value,
        10
      );


    if (
      Number.isInteger(
        parsed
      )
    ) {

      status =
        parsed;


      break;

    }

  }


  const providerCode =
    String(
      error?.providerCode ||
      error?.rc ||
      error?.code ||
      error?.cause?.code ||
      ""
    ).trim();


  const message =
    [

      error?.message,

      error?.cause?.message,

      error?.response?.statusText

    ]
      .filter(
        (value) =>
          typeof value ===
            "string" &&
          value.trim()
      )
      .join(
        " | "
      )
      .slice(
        0,
        1000
      );


  return {

    status:
      status,

    providerCode:
      providerCode,

    message:
      message,

    name:
      String(
        error?.name ||
        ""
      )

  };

}


/* ----------------------------------
   ERROR CLASSIFIER
---------------------------------- */


function classifyModelError(
  error,
  model,
  width,
  height
) {

  if (
    error instanceof
    ModelOutputError
  ) {

    return {

      code:
        "INVALID_MODEL_OUTPUT",

      title:
        "The model returned an unusable image",

      message:
        "Arqivo could not read the image data returned by the provider.",

      hint:
        "Try this model again."

    };

  }


  const info =
    extractProviderErrorInfo(
      error
    );


  const providerCode =
    info.providerCode
      .toLowerCase();


  const text =
    (
      info.message +
      " " +
      providerCode +
      " " +
      info.name
    ).toLowerCase();


  /* --------------------------------
     HORDE PRIORITY
  -------------------------------- */


  if (
    model?.provider ===
      "horde" &&
    (
      providerCode ===
        "kudosupfront" ||
      providerCode ===
        "sharedkeyinsufficientkudos" ||
      /upfront kudos/.test(
        text
      )
    )
  ) {

    return {

      code:
        "HORDE_PRIORITY_REQUIRED",

      title:
        "AI Horde cannot accept this request with the current priority",

      message:
        model.label +
        " was rejected before it entered the queue because the request requires more Horde priority.",

      hint:
        "Waiting longer will not fix this error. Try 512 × 512, Standard quality, one image, another Horde model, or build more Horde kudos."

    };

  }


  if (
    model?.provider ===
      "horde" &&
    (
      providerCode ===
        "novalidworkers" ||
      /no valid workers/.test(
        text
      )
    )
  ) {

    return {

      code:
        "HORDE_NO_VALID_WORKERS",

      title:
        "No compatible AI Horde worker is available",

      message:
        "No volunteer worker can currently run " +
        model.label +
        " with these settings.",

      hint:
        "Try 512 × 512, Standard quality, or another Horde model."

    };

  }


  if (
    model?.provider ===
      "horde" &&
    (
      providerCode ===
        "toomanyprompts" ||
      /too many prompts/.test(
        text
      )
    )
  ) {

    return {

      code:
        "HORDE_TOO_MANY_REQUESTS",

      title:
        "Too many AI Horde jobs are already active",

      message:
        "The Horde account has reached its active request limit.",

      hint:
        "Wait for existing jobs to finish and try again."

    };

  }


  if (
    model?.provider ===
      "horde" &&
    (
      providerCode ===
        "invalidapikey" ||
      /invalid api key/.test(
        text
      )
    )
  ) {

    return {

      code:
        "HORDE_API_KEY_INVALID",

      title:
        "AI Horde API key was rejected",

      message:
        "The saved AI_HORDE_API_KEY is invalid.",

      hint:
        "Replace the Worker secret with your current AI Horde key."

    };

  }


  /* --------------------------------
     GENERAL ERRORS
  -------------------------------- */


  if (
    info.status ===
      429 ||
    /rate limit|too many requests|throttl|capacity/.test(
      text
    )
  ) {

    return {

      code:
        "MODEL_BUSY",

      title:
        "The provider is busy",

      message:
        model.label +
        " cannot accept the request right now.",

      hint:
        "Wait a little and try again."

    };

  }


  if (
    /quota|daily limit|neurons|allocation/.test(
      text
    )
  ) {

    return {

      code:
        "AI_DAILY_LIMIT_REACHED",

      title:
        "Daily AI capacity has been reached",

      message:
        model.label +
        " could not run because available AI capacity appears exhausted.",

      hint:
        "Try again after the allowance resets."

    };

  }


  if (
    info.status ===
      401 ||
    info.status ===
      403 ||
    /forbidden|unauthori|permission/.test(
      text
    )
  ) {

    return {

      code:
        "MODEL_ACCESS_DENIED",

      title:
        "Provider access was denied",

      message:
        model.label +
        " rejected the request because access was denied.",

      hint:
        "Verify provider credentials or use another model."

    };

  }


  if (
    info.status ===
      404 ||
    /not found|unsupportedmodel|unexpectedmodelname/.test(
      text
    )
  ) {

    return {

      code:
        "MODEL_UNAVAILABLE",

      title:
        "This model is unavailable",

      message:
        model.label +
        " is not currently available under the configured model name.",

      hint:
        "Try another model or update the configured model ID."

    };

  }


  if (
    /invalidsize|width|height|dimension|resolution|toomanysteps|unsupported sampler/.test(
      text
    )
  ) {

    return {

      code:
        "UNSUPPORTED_MODEL_SETTINGS",

      title:
        "The model rejected these settings",

      message:
        model.label +
        " rejected " +
        width +
        " × " +
        height +
        " or the selected generation settings.",

      hint:
        "Try 512 × 512 or 1024 × 1024 with Standard quality."

    };

  }


  if (
    info.status !==
      null &&
    info.status >=
      500
  ) {

    return {

      code:
        "MODEL_TEMPORARILY_UNAVAILABLE",

      title:
        "The provider is temporarily unavailable",

      message:
        model.label +
        " encountered a provider-side error.",

      hint:
        "Try again shortly."

    };

  }


  return {

    code:
      "MODEL_GENERATION_FAILED",

    title:
      "This model could not complete the image",

    message:
      model.label +
      " encountered an unexpected generation error.",

    hint:
      "Try again with a smaller size, Standard quality, or another model."

  };

}


/* ----------------------------------
   PRIVACY-CONSCIOUS LOGGING
---------------------------------- */


function logModelFailure(
  model,
  publicError,
  error,
  runtimeModel
) {

  const info =
    extractProviderErrorInfo(
      error
    );


  console.error(
    "Model generation failed",
    {

      model:
        model.label,

      provider:
        model.provider,

      runtimeModel:
        runtimeModel,

      errorCode:
        publicError.code,

      providerStatus:
        info.status,

      providerCode:
        info.providerCode ||
        null,

      errorName:
        info.name ||
        null

    }
  );

}


/* ----------------------------------
   IMAGE OUTPUT HANDLING
---------------------------------- */


async function outputToDataURI(
  output
) {

  if (
    output &&
    typeof output ===
      "object" &&
    typeof output.image ===
      "string"
  ) {

    return base64ImageToDataURI(
      output.image
    );

  }


  if (
    output instanceof
    Response
  ) {

    if (
      !output.ok
    ) {

      throw new ProviderResponseError(
        "Provider returned an unsuccessful response.",
        output.status
      );

    }


    return arrayBufferToDataURI(
      await output.arrayBuffer(),
      output.headers.get(
        "content-type"
      ) ||
      ""
    );

  }


  if (
    output instanceof
    ArrayBuffer
  ) {

    return arrayBufferToDataURI(
      output,
      ""
    );

  }


  if (
    ArrayBuffer.isView(
      output
    )
  ) {

    return arrayBufferToDataURI(
      output.buffer.slice(
        output.byteOffset,
        output.byteOffset +
        output.byteLength
      ),
      ""
    );

  }


  if (
    !output
  ) {

    throw new ModelOutputError(
      "The model returned no image data.",
      "EMPTY_OUTPUT"
    );

  }


  try {

    return arrayBufferToDataURI(
      await new Response(
        output
      ).arrayBuffer(),
      ""
    );

  } catch {

    throw new ModelOutputError(
      "Arqivo could not read the model image stream.",
      "STREAM_READ_FAILED"
    );

  }

}


function base64ImageToDataURI(
  base64
) {

  const cleaned =
    String(
      base64
    )
      .replace(
        /^data:[^;]+;base64,/,
        ""
      )
      .trim();


  if (
    !cleaned
  ) {

    throw new ModelOutputError(
      "The model returned an empty Base64 image.",
      "EMPTY_BASE64"
    );

  }


  let mimeType =
    "";


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

  } else if (
    cleaned.startsWith(
      "PHN2Zy"
    ) ||
    cleaned.startsWith(
      "PD94bW"
    )
  ) {

    mimeType =
      "image/svg+xml";

  }


  if (
    !mimeType
  ) {

    throw new ModelOutputError(
      "Unknown Base64 image format.",
      "UNKNOWN_BASE64_FORMAT"
    );

  }


  return (
    "data:" +
    mimeType +
    ";base64," +
    cleaned
  );

}


function arrayBufferToDataURI(
  arrayBuffer,
  contentType
) {

  const bytes =
    new Uint8Array(
      arrayBuffer
    );


  if (
    bytes.length < 8
  ) {

    throw new ModelOutputError(
      "Image data was empty or incomplete.",
      "IMAGE_DATA_TOO_SMALL"
    );

  }


  const detectedMimeType =
    detectImageMimeType(
      bytes
    );


  const headerMimeType =
    contentType &&
    contentType.startsWith(
      "image/"
    )

      ? contentType.split(
          ";"
        )[0]

      : "";


  const mimeType =
    detectedMimeType ||
    headerMimeType;


  if (
    !mimeType
  ) {

    throw new ModelOutputError(
      "Unsupported image format.",
      "UNKNOWN_BINARY_FORMAT"
    );

  }


  return (
    "data:" +
    mimeType +
    ";base64," +
    uint8ToBase64(
      bytes
    )
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


  const prefix =
    new TextDecoder()
      .decode(
        bytes.subarray(
          0,
          Math.min(
            bytes.length,
            256
          )
        )
      )
      .trimStart();


  if (
    prefix.startsWith(
      "<svg"
    ) ||
    prefix.startsWith(
      "<?xml"
    )
  ) {

    return "image/svg+xml";

  }


  return "";

}


function uint8ToBase64(
  bytes
) {

  let binary =
    "";


  const chunkSize =
    0x8000;


  for (
    let index = 0;
    index < bytes.length;
    index += chunkSize
  ) {

    binary +=
      String.fromCharCode(
        ...bytes.subarray(
          index,
          index +
          chunkSize
        )
      );

  }


  return btoa(
    binary
  );

}


/* ----------------------------------
   TURNSTILE
---------------------------------- */


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

          headers:
            {

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
        data.success ===
          true &&
        data.hostname ===
          expectedHostname

    };

  } catch {

    return {
      success:
        false
    };

  }

}


/* ----------------------------------
   JSON RESPONSE
---------------------------------- */


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

      headers:
        {

          ...COMMON_HEADERS,

          "Content-Type":
            "application/json; charset=UTF-8"

        }

    }
  );

}