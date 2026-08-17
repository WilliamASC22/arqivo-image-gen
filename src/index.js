const MAX_IMAGES_PER_REQUEST = 8;
const MAX_TOTAL_PIXELS = 12 * 1024 * 1024;
const MAX_SEED = 2147483647;
const MODEL_CONCURRENCY = 2;

const AI_HORDE_API_BASE =
  "https://aihorde.net/api/v2";

const AI_HORDE_CLIENT_AGENT =
  "ArqivoImageGen:1.0:https://github.com/arqivo/arqivo-image-gen";

const AI_HORDE_POLL_INTERVAL_MS =
  20000;

const AI_HORDE_MAX_POLLS =
  8;

const AI_HORDE_ANONYMOUS_KEY =
  "0000000000";


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
      "Community-powered generation. Prompts selected here are sent to AI Horde volunteer workers."
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
      15,

    guidance:
      7.5,

    defaultSelected:
      true
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
      18,

    guidance:
      7.5,

    defaultSelected:
      true
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
      12,

    bestSteps:
      18,

    guidance:
      5.5,

    defaultSelected:
      true
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
      12,

    bestSteps:
      18,

    guidance:
      7.5,

    defaultSelected:
      true
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
      12,

    bestSteps:
      18,

    guidance:
      7,

    defaultSelected:
      false
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
      12,

    bestSteps:
      18,

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
      12,

    bestSteps:
      18,

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
      12,

    bestSteps:
      18,

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


    this.rc =
      providerCode;

  }

}


class HordeTimeoutError extends Error {

  constructor(
    message
  ) {

    super(
      message
    );


    this.name =
      "HordeTimeoutError";


    this.code =
      "HORDE_TIMEOUT";

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


  const providerLabel =
    providerLabelForModel(
      model
    );


  let description =
    model.description;


  if (
    model.provider ===
    "horde"
  ) {

    const runtimeModel =
      resolveHordeModelName(
        env,
        model
      );


    description =
      runtimeModel

        ? "Uses " +
          runtimeModel

        : "Configure " +
          model.hordeModelEnv;

  }


  return `
    <label
      class="model-option"
      data-model-option="${escapeHTML(model.key)}"
    >

      <input
        type="checkbox"
        name="models"
        value="${escapeHTML(model.key)}"
        data-model-label="${escapeHTML(model.label)}"
        data-provider-label="${escapeHTML(providerLabel)}"
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
          ${escapeHTML(description)}
        </small>

      </span>

    </label>
  `;

}


function buildProviderModelGroups(
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


      const note =
        provider.key ===
        "horde"

          ? `
            <p class="provider-privacy-note">
              Privacy note: AI Horde is volunteer-run.
              Prompts selected for this group leave Cloudflare
              and are processed by AI Horde workers.
              Do not use sensitive or private prompts
              with this provider.
            </p>
          `

          : "";


      return `
        <section
          class="provider-group"
          data-provider-group="${escapeHTML(provider.key)}"
        >

          <div class="provider-group-header">

            <div>

              <h3>
                ${escapeHTML(provider.label)}
              </h3>

              <p>
                ${escapeHTML(provider.description)}
              </p>

            </div>

            <span class="provider-count">
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
            label="${group.label}"
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
  activePage
) {

  return `
    <nav
      class="site-nav"
      aria-label="Main navigation"
    >

      <a
        href="/"
        class="${activePage === "generate" ? "nav-active" : ""}"
      >
        Generate
      </a>

      <a
        href="/privacy"
        class="${activePage === "privacy" ? "nav-active" : ""}"
      >
        Privacy
      </a>

    </nav>
  `;

}


function buildFooter() {

  return `
    <footer class="site-footer">

      <div class="footer-inner">

        <p>
          Arqivo Image Gen
        </p>

        <div class="footer-links">

          <a href="/">
            Generate
          </a>

          <a href="/privacy">
            Privacy
          </a>

        </div>

      </div>

      <p class="footer-note">
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
        aria-label="Arqivo Image Gen home"
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
          No accounts. No prompt history. No database.
        </p>

        <p class="privacy-shortcut">

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
                Choose models from Cloudflare Workers AI,
                AI Horde, or both.
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

            ${buildProviderModelGroups(env)}

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
              ${buildSizeOptions()}
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

            <label for="images-per-model">
              Images per model
            </label>

            <select
              id="images-per-model"
              name="images-per-model"
            >

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

            <small class="field-help">
              256–2048 px, multiples of 64
            </small>

          </div>

        </div>


        <p class="quota-note">

          Larger resolutions, more models, and more
          variations use more capacity.

          A single request is limited to
          8 generated images.

          AI Horde availability and wait times
          depend on volunteer workers.

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
              Each model is isolated.
              If one provider or model fails,
              successful results remain available.
            </p>

          </div>

          <span
            id="model-status-summary"
            class="model-status-summary"
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
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="description"
    content="Privacy information for Arqivo Image Gen."
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
        aria-label="Arqivo Image Gen home"
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
          Your images should not require
          building a profile about you.
        </h1>

        <p class="lead privacy-lead">
          Arqivo is designed to minimize
          application-level storage,
          but the provider you select changes
          where your prompt is processed.
        </p>

        <p class="last-updated">
          Last updated: August 17, 2026
        </p>

      </header>


      <section class="privacy-summary">

        <div class="privacy-summary-card">

          <strong>
            No accounts
          </strong>

          <p>
            Arqivo does not require visitors
            to create a user account or profile.
          </p>

        </div>


        <div class="privacy-summary-card">

          <strong>
            No prompt-history database
          </strong>

          <p>
            Arqivo does not intentionally save
            prompts in an application database.
          </p>

        </div>


        <div class="privacy-summary-card">

          <strong>
            No image gallery
          </strong>

          <p>
            Generated images are returned to
            the browser instead of being saved
            to an Arqivo gallery.
          </p>

        </div>

      </section>


      <article class="privacy-document">

        <section class="privacy-section">

          <h2>
            1. The short version
          </h2>

          <p>
            Arqivo does not intentionally maintain a
            database containing your prompts,
            generated images, generation history,
            profile, or account information.
          </p>

          <div class="privacy-callout">

            <strong>
              Provider difference:
            </strong>

            Cloudflare Workers AI requests are
            processed through Cloudflare.

            AI Horde requests are sent to AI Horde's
            distributed network and can be processed
            by volunteer-operated workers.

            Do not use AI Horde for prompts you
            consider sensitive or private.

          </div>

        </section>


        <section class="privacy-section">

          <h2>
            2. Prompts
          </h2>

          <p>
            Prompts are sent to the Arqivo
            Cloudflare Worker so the selected provider
            can perform the generation.

            Arqivo does not intentionally write
            the prompt to KV, R2, Durable Objects,
            a database, or a prompt-history system.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            3. Generated images
          </h2>

          <p>
            Generated images are returned to the
            requesting browser.

            Arqivo does not intentionally save them
            to a permanent application image library.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            4. Providers and models
          </h2>

          <p>
            Arqivo currently exposes two provider groups:
          </p>


          <h3>
            Cloudflare Workers AI
          </h3>

          <ul>

            <li>
              SDXL Lightning
            </li>

            <li>
              SDXL Base
            </li>

            <li>
              Lucid Origin
            </li>

            <li>
              Phoenix
            </li>

          </ul>


          <h3>
            AI Horde
          </h3>

          <ul>

            <li>
              Horde Model A
            </li>

            <li>
              Horde Model B
            </li>

            <li>
              Horde Model C
            </li>

            <li>
              Horde Model D
            </li>

          </ul>


          <p>
            AI Horde is community-powered.

            Requests can be processed on
            volunteer-operated computers.

            The AI Horde project states that
            workers do not receive requestor IDs
            or IP addresses, but workers technically
            control the machines performing the
            generation.

            Treat AI Horde prompts as non-sensitive.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            5. IP addresses and network information
          </h2>

          <p>
            Network information such as an IP address
            is necessarily involved when using a
            public website.

            Arqivo can provide the Cloudflare
            connecting IP to Turnstile's verification
            service.

            Arqivo does not intentionally save that
            IP in an application database.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            6. Cloudflare Turnstile
          </h2>

          <p>
            Arqivo uses Cloudflare Turnstile to reduce
            automated abuse.

            The browser obtains a verification token,
            and the Worker verifies it server-side
            before generation begins.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            7. AI Horde
          </h2>

          <p>
            If you select a Horde model, Arqivo sends
            the prompt and generation settings to
            AI Horde.

            AI Horde then assigns the job to a
            compatible worker in its distributed
            network.
          </p>

          <p>
            Arqivo requests non-shared generation
            where the account and provider support
            that option, and the integration requests
            trusted workers.

            Those settings reduce exposure but cannot
            make a volunteer-run distributed system
            equivalent to processing entirely inside
            Arqivo's Cloudflare Worker.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            8. Browser storage and caching
          </h2>

          <p>
            Arqivo does not intentionally use
            localStorage for prompt or generated-image
            history.

            Application responses use no-store and
            no-cache headers.

            Browser and infrastructure behavior outside
            Arqivo's code may still involve temporary
            caches or security storage.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            9. Application logs
          </h2>

          <p>
            Arqivo is designed not to intentionally log
            prompts, generated image contents,
            Turnstile tokens, or full request bodies.

            Technical error metadata may be logged
            without the prompt so failures can be
            diagnosed.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            10. Security
          </h2>

          <p>
            Arqivo reduces its attack surface by
            avoiding visitor accounts,
            application databases,
            prompt-history storage,
            and permanent generated-image storage.

            It also uses Turnstile,
            same-origin checks,
            server-side secrets,
            request limits,
            and restrictive browser security headers.
          </p>

        </section>


        <section class="privacy-section privacy-final">

          <h2>
            Privacy by architecture
          </h2>

          <div class="privacy-flow">

            <span>
              Your prompt
            </span>

            <span class="privacy-arrow">
              →
            </span>

            <span>
              Selected provider
            </span>

            <span class="privacy-arrow">
              →
            </span>

            <span>
              Your browser
            </span>

          </div>


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
  --panel-2: #1c2540;
  --panel-3: #222c4b;

  --text: #f2f5ff;
  --muted: #b8c1e0;

  --border: #2c365f;
  --border-hover: #49608f;

  --accent: #6ea8fe;
  --accent-hover: #8abbff;

  --danger: #ff8d8d;
  --warning: #ffd479;
  --success: #8be3af;

  --max-width: 1200px;
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

  background:
    linear-gradient(
      180deg,
      #0b1020 0%,
      #121933 100%
    );

  color:
    var(--text);

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
  color:
    var(--accent);
}


a:hover {
  color:
    var(--accent-hover);
}


.page-shell {
  min-height: 100vh;

  display: flex;

  flex-direction: column;
}


.topbar {
  width:
    min(
      var(--max-width),
      calc(100% - 2rem)
    );

  margin:
    0 auto;

  padding:
    1.2rem
    0;

  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;

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
  color:
    var(--text);

  text-decoration:
    none;

  font-size:
    1.1rem;

  font-weight:
    900;

  letter-spacing:
    -0.02em;
}


.brand:hover {
  color:
    var(--text);
}


.site-nav {
  display:
    flex;

  gap:
    0.4rem;
}


.site-nav a {
  color:
    var(--muted);

  text-decoration:
    none;

  border-radius:
    999px;

  padding:
    0.55rem
    0.9rem;

  font-size:
    0.92rem;

  font-weight:
    700;
}


.site-nav a:hover {
  color:
    var(--text);

  background:
    rgba(
      110,
      168,
      254,
      0.08
    );
}


.site-nav .nav-active {
  color:
    var(--text);

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
  width:
    min(
      var(--max-width),
      calc(100% - 2rem)
    );

  margin:
    0 auto;

  padding:
    2rem
    0
    4rem;

  flex:
    1;
}


.hero {
  margin-bottom:
    1.5rem;
}


h1 {
  font-size:
    clamp(
      2rem,
      4vw,
      4rem
    );

  line-height:
    1.05;

  letter-spacing:
    -0.04em;

  margin:
    0
    0
    0.5rem;
}


.lead {
  color:
    var(--muted);

  margin:
    0
    0
    0.7rem;

  line-height:
    1.6;

  max-width:
    760px;
}


.privacy-shortcut {
  color:
    var(--muted);

  margin:
    0
    0
    1.5rem;

  font-size:
    0.9rem;
}


.privacy-shortcut a {
  font-weight:
    700;
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

  border-radius:
    18px;

  padding:
    1rem;

  backdrop-filter:
    blur(12px);
}


label,
legend {
  font-weight:
    700;

  font-size:
    1.05rem;
}


.prompt-block > label {
  display:
    block;

  margin-bottom:
    0.5rem;
}


textarea {
  width:
    100%;

  resize:
    vertical;

  min-height:
    180px;

  border:
    1px
    solid
    var(--border);

  background:
    var(--panel-2);

  color:
    var(--text);

  border-radius:
    12px;

  padding:
    0.9rem
    1rem;

  font:
    inherit;

  line-height:
    1.5;

  margin-bottom:
    1.25rem;
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

  outline-offset:
    1px;
}


/* ----------------------------------
   PROVIDER / MODEL UI
---------------------------------- */


.model-picker {
  border:
    1px
    solid
    var(--border);

  border-radius:
    14px;

  padding:
    1rem;

  margin:
    0
    0
    1rem;
}


.model-picker legend {
  padding:
    0;
}


.section-heading {
  display:
    flex;

  align-items:
    flex-start;

  justify-content:
    space-between;

  gap:
    1rem;

  margin-bottom:
    1rem;
}


.helper {
  margin:
    0.25rem
    0
    0;

  color:
    var(--muted);

  font-size:
    0.9rem;
}


.model-actions {
  display:
    flex;

  gap:
    0.5rem;

  flex-shrink:
    0;
}


.provider-groups {
  display:
    grid;

  gap:
    1rem;
}


.provider-group {
  padding:
    1rem;

  border:
    1px
    solid
    var(--border);

  border-radius:
    14px;

  background:
    rgba(
      11,
      16,
      32,
      0.28
    );
}


.provider-group-header {
  display:
    flex;

  justify-content:
    space-between;

  align-items:
    flex-start;

  gap:
    1rem;

  margin-bottom:
    0.85rem;
}


.provider-group-header h3 {
  margin:
    0
    0
    0.25rem;

  font-size:
    1.08rem;
}


.provider-group-header p {
  margin:
    0;

  color:
    var(--muted);

  font-size:
    0.82rem;

  line-height:
    1.45;
}


.provider-count {
  flex-shrink:
    0;

  border:
    1px
    solid
    var(--border);

  border-radius:
    999px;

  padding:
    0.28rem
    0.55rem;

  color:
    var(--muted);

  font-size:
    0.7rem;

  font-weight:
    800;
}


.provider-privacy-note {
  margin:
    0
    0
    0.85rem;

  padding:
    0.75rem
    0.85rem;

  color:
    var(--warning);

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

  border-radius:
    10px;

  font-size:
    0.8rem;

  line-height:
    1.5;
}


button {
  appearance:
    none;

  border:
    none;

  background:
    var(--accent);

  color:
    #08101f;

  font-weight:
    800;

  border-radius:
    999px;

  padding:
    0.95rem
    1.3rem;

  cursor:
    pointer;

  margin-top:
    1rem;

  font-size:
    1rem;
}


button:hover:not(:disabled) {
  background:
    var(--accent-hover);
}


button:disabled {
  opacity:
    0.55;

  cursor:
    not-allowed;
}


.small-button {
  margin:
    0;

  padding:
    0.5rem
    0.8rem;

  font-size:
    0.85rem;
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
  display:
    grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    0.75rem;
}


.model-option {
  display:
    flex;

  align-items:
    center;

  gap:
    0.75rem;

  cursor:
    pointer;

  background:
    var(--panel-2);

  border:
    1px
    solid
    var(--border);

  border-radius:
    12px;

  padding:
    0.9rem;

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


.model-option:has(input:checked) {
  border-color:
    var(--accent);
}


.model-option input {
  width:
    18px;

  height:
    18px;

  flex:
    0
    0
    auto;

  accent-color:
    var(--accent);
}


.model-option-content {
  display:
    flex;

  flex-direction:
    column;

  gap:
    0.25rem;

  flex:
    1;

  min-width:
    0;
}


.model-option-heading {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    0.6rem;
}


.model-option-content strong {
  font-size:
    0.95rem;
}


.model-option-content small {
  color:
    var(--muted);

  font-weight:
    400;

  overflow-wrap:
    anywhere;
}


.model-inline-status {
  flex-shrink:
    0;

  padding:
    0.22rem
    0.48rem;

  border-radius:
    999px;

  border:
    1px
    solid
    var(--border);

  color:
    var(--muted);

  font-size:
    0.68rem;

  font-weight:
    850;

  line-height:
    1;
}


.model-inline-status[data-tone="processing"] {
  color:
    var(--accent);

  border-color:
    rgba(
      110,
      168,
      254,
      0.4
    );

  background:
    rgba(
      110,
      168,
      254,
      0.08
    );
}


.model-inline-status[data-tone="success"] {
  color:
    var(--success);

  border-color:
    rgba(
      139,
      227,
      175,
      0.35
    );

  background:
    rgba(
      139,
      227,
      175,
      0.07
    );
}


.model-inline-status[data-tone="warning"] {
  color:
    var(--warning);

  border-color:
    rgba(
      255,
      212,
      121,
      0.35
    );

  background:
    rgba(
      255,
      212,
      121,
      0.07
    );
}


.model-inline-status[data-tone="error"] {
  color:
    var(--danger);

  border-color:
    rgba(
      255,
      141,
      141,
      0.35
    );

  background:
    rgba(
      255,
      141,
      141,
      0.07
    );
}


/* ----------------------------------
   GENERATION CONTROLS
---------------------------------- */


.controls {
  display:
    grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  gap:
    1rem;

  margin:
    0
    0
    1rem;
}


.control {
  display:
    flex;

  flex-direction:
    column;

  gap:
    0.45rem;
}


.control label {
  margin:
    0;

  font-size:
    0.9rem;

  color:
    var(--muted);
}


.optional {
  font-weight:
    400;

  opacity:
    0.7;
}


select,
input[type="number"] {
  width:
    100%;

  background:
    var(--panel-2);

  color:
    var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius:
    10px;

  padding:
    0.75rem;

  font:
    inherit;
}


.custom-size-controls {
  display:
    grid;

  grid-template-columns:
    minmax(0, 1fr)
    auto
    minmax(0, 1fr);

  align-items:
    center;

  gap:
    1rem;

  max-width:
    650px;

  margin-bottom:
    1rem;

  padding:
    1rem;

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

  border-radius:
    12px;
}


.size-separator {
  align-self:
    center;

  padding-top:
    1.4rem;

  font-size:
    1.4rem;

  color:
    var(--muted);
}


.field-help,
.quota-note {
  color:
    var(--muted);

  font-size:
    0.82rem;

  line-height:
    1.5;
}


.quota-note {
  margin:
    0
    0
    1rem;
}


.verification-area {
  margin-top:
    0.5rem;
}


.status {
  min-height:
    1.5rem;

  margin:
    1rem
    0;

  color:
    var(--muted);

  font-size:
    1.05rem;
}


.status[data-tone="success"] {
  color:
    var(--success);
}


.status[data-tone="warning"] {
  color:
    var(--warning);
}


.status[data-tone="error"] {
  color:
    var(--danger);
}


/* ----------------------------------
   MODEL STATUS PANEL
---------------------------------- */


.model-status-panel {
  margin:
    1rem
    0;

  padding:
    1rem;

  background:
    rgba(
      21,
      27,
      47,
      0.88
    );

  border:
    1px
    solid
    var(--border);

  border-radius:
    16px;
}


.model-status-header {
  display:
    flex;

  align-items:
    flex-start;

  justify-content:
    space-between;

  gap:
    1rem;

  margin-bottom:
    0.85rem;
}


.model-status-header h2 {
  margin:
    0
    0
    0.25rem;

  font-size:
    1rem;
}


.model-status-header p {
  margin:
    0;

  color:
    var(--muted);

  font-size:
    0.82rem;

  line-height:
    1.45;
}


.model-status-summary {
  flex-shrink:
    0;

  color:
    var(--muted);

  font-size:
    0.78rem;

  font-weight:
    750;
}


.model-status-list {
  display:
    grid;

  gap:
    0.6rem;
}


.model-status-row {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;

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

  border-radius:
    11px;
}


.model-status-row[data-tone="success"] {
  border-color:
    rgba(
      139,
      227,
      175,
      0.28
    );
}


.model-status-row[data-tone="warning"] {
  border-color:
    rgba(
      255,
      212,
      121,
      0.3
    );
}


.model-status-row[data-tone="error"] {
  border-color:
    rgba(
      255,
      141,
      141,
      0.3
    );
}


.model-status-left {
  min-width:
    0;
}


.model-status-name {
  display:
    block;

  color:
    var(--text);

  font-size:
    0.9rem;

  font-weight:
    800;
}


.model-status-detail {
  display:
    block;

  margin-top:
    0.2rem;

  color:
    var(--muted);

  font-size:
    0.78rem;

  line-height:
    1.4;
}


.model-status-badge {
  flex-shrink:
    0;

  border:
    1px
    solid
    var(--border);

  border-radius:
    999px;

  padding:
    0.3rem
    0.55rem;

  color:
    var(--muted);

  font-size:
    0.7rem;

  font-weight:
    850;
}


.model-status-badge[data-tone="processing"] {
  color:
    var(--accent);

  border-color:
    rgba(
      110,
      168,
      254,
      0.35
    );

  background:
    rgba(
      110,
      168,
      254,
      0.07
    );
}


.model-status-badge[data-tone="success"] {
  color:
    var(--success);

  border-color:
    rgba(
      139,
      227,
      175,
      0.35
    );

  background:
    rgba(
      139,
      227,
      175,
      0.07
    );
}


.model-status-badge[data-tone="warning"] {
  color:
    var(--warning);

  border-color:
    rgba(
      255,
      212,
      121,
      0.35
    );

  background:
    rgba(
      255,
      212,
      121,
      0.07
    );
}


.model-status-badge[data-tone="error"] {
  color:
    var(--danger);

  border-color:
    rgba(
      255,
      141,
      141,
      0.35
    );

  background:
    rgba(
      255,
      141,
      141,
      0.07
    );
}


/* ----------------------------------
   RESULTS
---------------------------------- */


.results {
  display:
    grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap:
    1rem;

  margin-top:
    1rem;
}


.result-card {
  min-width:
    0;

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

  border-radius:
    18px;

  padding:
    1rem;
}


.result-heading-row {
  display:
    flex;

  align-items:
    flex-start;

  justify-content:
    space-between;

  gap:
    0.75rem;

  margin-bottom:
    0.4rem;
}


.result-card h3 {
  margin:
    0;

  font-size:
    1.05rem;
}


.result-state {
  flex-shrink:
    0;

  border-radius:
    999px;

  padding:
    0.28rem
    0.5rem;

  font-size:
    0.68rem;

  font-weight:
    850;
}


.result-state.success {
  color:
    var(--success);

  border:
    1px
    solid
    rgba(
      139,
      227,
      175,
      0.3
    );
}


.result-state.error {
  color:
    var(--danger);

  border:
    1px
    solid
    rgba(
      255,
      141,
      141,
      0.3
    );
}


.result-meta {
  color:
    var(--muted);

  font-size:
    0.82rem;

  margin:
    0
    0
    0.8rem;

  line-height:
    1.5;

  overflow-wrap:
    anywhere;
}


.image-frame {
  width:
    100%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  overflow:
    hidden;

  background:
    #070a12;

  border-radius:
    14px;
}


.result-card img {
  display:
    block;

  width:
    100%;

  height:
    auto;

  object-fit:
    contain;

  border-radius:
    14px;
}


.result-actions {
  display:
    flex;

  flex-wrap:
    wrap;

  gap:
    0.5rem;

  margin-top:
    0.75rem;
}


.result-actions a {
  display:
    inline-block;

  text-decoration:
    none;

  color:
    var(--text);

  border:
    1px
    solid
    var(--border);

  border-radius:
    999px;

  padding:
    0.55rem
    0.9rem;

  font-size:
    0.95rem;
}


.result-actions a:hover {
  border-color:
    var(--border-hover);
}


/* ----------------------------------
   ERRORS
---------------------------------- */


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
  display:
    inline-flex;

  align-items:
    center;

  margin:
    0.35rem
    0
    0.65rem;

  padding:
    0.3rem
    0.55rem;

  border-radius:
    999px;

  color:
    var(--danger);

  background:
    rgba(
      255,
      141,
      141,
      0.08
    );

  border:
    1px
    solid
    rgba(
      255,
      141,
      141,
      0.22
    );

  font-size:
    0.74rem;

  font-weight:
    800;

  text-transform:
    uppercase;

  letter-spacing:
    0.06em;
}


.error-title {
  margin:
    0
    0
    0.45rem;

  color:
    var(--text);

  font-size:
    1rem;

  font-weight:
    850;
}


.error-message {
  margin:
    0;

  color:
    var(--muted);

  line-height:
    1.6;

  font-size:
    0.92rem;
}


.error-hint {
  margin:
    0.75rem
    0
    0;

  padding-top:
    0.75rem;

  border-top:
    1px
    solid
    rgba(
      255,
      141,
      141,
      0.16
    );

  color:
    var(--muted);

  line-height:
    1.55;

  font-size:
    0.86rem;
}


.error-code {
  display:
    inline-block;

  margin-top:
    0.75rem;

  color:
    rgba(
      184,
      193,
      224,
      0.78
    );

  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace;

  font-size:
    0.72rem;
}


.hidden {
  display:
    none !important;
}


/* ----------------------------------
   PRIVACY
---------------------------------- */


.privacy-container {
  max-width:
    1000px;
}


.privacy-hero {
  padding:
    2rem
    0
    1.5rem;
}


.eyebrow {
  color:
    var(--accent);

  text-transform:
    uppercase;

  letter-spacing:
    0.14em;

  font-size:
    0.78rem;

  font-weight:
    900;

  margin:
    0
    0
    0.8rem;
}


.privacy-hero h1 {
  max-width:
    900px;

  font-size:
    clamp(
      2.3rem,
      5vw,
      4.5rem
    );
}


.privacy-lead {
  max-width:
    800px;

  font-size:
    clamp(
      1rem,
      2vw,
      1.2rem
    );
}


.last-updated {
  color:
    var(--muted);

  font-size:
    0.82rem;

  margin-top:
    1rem;
}


.privacy-summary {
  display:
    grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap:
    1rem;

  margin:
    0
    0
    2rem;
}


.privacy-summary-card {
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

  border-radius:
    16px;

  padding:
    1.1rem;
}


.privacy-summary-card strong {
  display:
    block;

  margin-bottom:
    0.45rem;

  font-size:
    0.95rem;
}


.privacy-summary-card p {
  color:
    var(--muted);

  margin:
    0;

  line-height:
    1.55;

  font-size:
    0.88rem;
}


.privacy-document {
  background:
    rgba(
      21,
      27,
      47,
      0.7
    );

  border:
    1px
    solid
    var(--border);

  border-radius:
    20px;

  overflow:
    hidden;
}


.privacy-section {
  padding:
    1.6rem;

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


.privacy-section:last-child {
  border-bottom:
    0;
}


.privacy-section h2 {
  margin:
    0
    0
    0.85rem;

  font-size:
    clamp(
      1.2rem,
      2vw,
      1.5rem
    );

  letter-spacing:
    -0.02em;
}


.privacy-section h3 {
  margin:
    1.2rem
    0
    0.45rem;

  font-size:
    1rem;
}


.privacy-section p {
  color:
    var(--muted);

  line-height:
    1.75;

  margin:
    0
    0
    1rem;
}


.privacy-section p:last-child {
  margin-bottom:
    0;
}


.privacy-section ul {
  color:
    var(--muted);

  line-height:
    1.75;

  padding-left:
    1.4rem;
}


.privacy-callout {
  background:
    rgba(
      110,
      168,
      254,
      0.08
    );

  border:
    1px
    solid
    rgba(
      110,
      168,
      254,
      0.3
    );

  border-radius:
    12px;

  padding:
    1rem;

  color:
    var(--muted);

  line-height:
    1.65;

  margin-top:
    1rem;
}


.privacy-callout strong {
  color:
    var(--text);
}


.privacy-final {
  background:
    linear-gradient(
      135deg,
      rgba(
        110,
        168,
        254,
        0.08
      ),
      rgba(
        110,
        168,
        254,
        0.02
      )
    );
}


.privacy-flow {
  display:
    flex;

  align-items:
    center;

  flex-wrap:
    wrap;

  gap:
    0.7rem;

  margin:
    1.2rem
    0;
}


.privacy-flow span:not(.privacy-arrow) {
  background:
    var(--panel-2);

  border:
    1px
    solid
    var(--border);

  border-radius:
    999px;

  padding:
    0.55rem
    0.85rem;

  color:
    var(--text);

  font-size:
    0.9rem;

  font-weight:
    700;
}


.privacy-arrow {
  color:
    var(--accent);

  font-weight:
    900;
}


.primary-link-button {
  display:
    inline-block;

  margin-top:
    0.5rem;

  background:
    var(--accent);

  color:
    #08101f;

  text-decoration:
    none;

  font-weight:
    800;

  border-radius:
    999px;

  padding:
    0.85rem
    1.1rem;
}


.primary-link-button:hover {
  color:
    #08101f;

  background:
    var(--accent-hover);
}


/* ----------------------------------
   FOOTER
---------------------------------- */


.site-footer {
  width:
    min(
      var(--max-width),
      calc(100% - 2rem)
    );

  margin:
    auto
    auto
    0;

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

  color:
    var(--muted);
}


.footer-inner {
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    1rem;
}


.footer-inner p {
  margin:
    0;

  font-weight:
    800;

  color:
    var(--text);
}


.footer-links {
  display:
    flex;

  gap:
    1rem;
}


.footer-links a {
  color:
    var(--muted);

  text-decoration:
    none;

  font-size:
    0.9rem;

  font-weight:
    700;
}


.footer-links a:hover {
  color:
    var(--text);
}


.footer-note {
  margin:
    0.8rem
    0
    0;

  color:
    var(--muted);

  font-size:
    0.78rem;

  line-height:
    1.5;
}


/* ----------------------------------
   RESPONSIVE
---------------------------------- */


@media (max-width: 950px) {

  .controls {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

}


@media (max-width: 900px) {

  .results {
    grid-template-columns:
      1fr;
  }


  .privacy-summary {
    grid-template-columns:
      1fr;
  }

}


@media (max-width: 700px) {

  .controls,
  .model-grid,
  .custom-size-controls {
    grid-template-columns:
      1fr;
  }


  .section-heading,
  .model-status-header,
  .provider-group-header {
    flex-direction:
      column;
  }


  .size-separator {
    display:
      none;
  }


  .topbar {
    align-items:
      flex-start;
  }


  .footer-inner {
    align-items:
      flex-start;

    flex-direction:
      column;
  }


  .privacy-section {
    padding:
      1.25rem
      1rem;
  }


  .model-status-row {
    align-items:
      flex-start;

    flex-direction:
      column;
  }


  .model-option-heading {
    align-items:
      flex-start;
  }

}
`;


/* ----------------------------------
   BROWSER JAVASCRIPT
---------------------------------- */


const JS = `
const MAX_IMAGES_PER_REQUEST = 8;
const MAX_TOTAL_PIXELS = 12582912;


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


  const totalImages =
    modelCount *
    imagesPerModel;


  const dimensions =
    getChosenDimensions();


  const totalPixels =
    dimensions.width *
    dimensions.height *
    totalImages;


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
      totalPixels

  };

}


function updateGenerateButton() {

  const summary =
    getRequestSummary();


  if (
    summary.modelCount ===
    0
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

  if (
    sizeEl.value ===
    'custom'
  ) {

    customSizeControls
      .classList
      .remove(
        'hidden'
      );

  } else {

    customSizeControls
      .classList
      .add(
        'hidden'
      );

  }


  updateGenerateButton();

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


/* ----------------------------------
   INLINE MODEL STATUS
---------------------------------- */


function findInlineStatus(
  modelKey
) {

  return Array.from(
    document.querySelectorAll(
      '[data-model-status-for]'
    )
  ).find(
    function(element) {

      return (
        element.dataset.modelStatusFor ===
        modelKey
      );

    }
  );

}


function setInlineModelStatus(
  modelKey,
  text,
  tone
) {

  const element =
    findInlineStatus(
      modelKey
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


function clearModelStatusPanel() {

  modelStatusList.innerHTML =
    '';


  modelStatusSummary.textContent =
    '';

}


function createModelStatusRow(
  modelKey,
  label,
  expectedImages
) {

  const row =
    document.createElement(
      'div'
    );


  row.className =
    'model-status-row';


  row.dataset.modelStatusKey =
    modelKey;


  row.dataset.tone =
    'processing';


  const left =
    document.createElement(
      'div'
    );


  left.className =
    'model-status-left';


  const name =
    document.createElement(
      'span'
    );


  name.className =
    'model-status-name';


  name.textContent =
    label;


  const detail =
    document.createElement(
      'span'
    );


  detail.className =
    'model-status-detail';


  const providerLabel =
    providerLabelForKey(
      modelKey
    );


  detail.textContent =
    providerLabel +
    ' · ' +
    (
      expectedImages === 1

        ? '1 image submitted for generation'

        : expectedImages +
          ' variations submitted for generation'
    );


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


  return row;

}


function findModelStatusRow(
  modelKey
) {

  return Array.from(
    modelStatusList.children
  ).find(
    function(row) {

      return (
        row.dataset.modelStatusKey ===
        modelKey
      );

    }
  );

}


function startModelStatuses(
  modelKeys,
  imagesPerModel
) {

  clearModelStatusPanel();


  modelKeys.forEach(
    function(modelKey) {

      modelStatusList
        .appendChild(
          createModelStatusRow(
            modelKey,
            modelLabelForKey(
              modelKey
            ),
            imagesPerModel
          )
        );


      setInlineModelStatus(
        modelKey,
        'Processing',
        'processing'
      );

    }
  );


  modelStatusSummary.textContent =
    modelKeys.length === 1

      ? '1 model processing'

      : modelKeys.length +
        ' models processing';


  modelStatusPanel
    .classList
    .remove(
      'hidden'
    );

}


function updateModelStatusRow(
  status
) {

  const row =
    findModelStatusRow(
      status.key
    );


  if (
    !row
  ) {

    return;

  }


  const detail =
    row.querySelector(
      '.model-status-detail'
    );


  const badge =
    row.querySelector(
      '.model-status-badge'
    );


  let tone =
    'error';


  let badgeText =
    'Failed';


  let detailText =
    'No images completed.';


  if (
    status.status ===
    'completed'
  ) {

    tone =
      'success';


    badgeText =
      'Completed';


    detailText =
      status.successful +
      ' of ' +
      status.expected +
      (
        status.expected === 1

          ? ' image completed'

          : ' images completed'
      );


    setInlineModelStatus(
      status.key,
      'Completed',
      'success'
    );

  } else if (
    status.status ===
    'partial'
  ) {

    tone =
      'warning';


    badgeText =
      'Partial';


    detailText =
      status.successful +
      ' completed · ' +
      status.failed +
      ' failed';


    if (
      status.error &&
      status.error.title
    ) {

      detailText +=
        ' · ' +
        status.error.title;

    }


    setInlineModelStatus(
      status.key,
      'Partial',
      'warning'
    );

  } else {

    if (
      status.error &&
      status.error.title
    ) {

      detailText =
        status.error.title;

    }


    setInlineModelStatus(
      status.key,
      'Failed',
      'error'
    );

  }


  row.dataset.tone =
    tone;


  if (
    detail
  ) {

    detail.textContent =
      detailText;

  }


  if (
    badge
  ) {

    badge.dataset.tone =
      tone;


    badge.textContent =
      badgeText;

  }

}


function applyModelStatuses(
  statuses
) {

  let completedModels =
    0;


  let partialModels =
    0;


  let failedModels =
    0;


  statuses.forEach(
    function(status) {

      updateModelStatusRow(
        status
      );


      if (
        status.status ===
        'completed'
      ) {

        completedModels +=
          1;

      } else if (
        status.status ===
        'partial'
      ) {

        partialModels +=
          1;

      } else {

        failedModels +=
          1;

      }

    }
  );


  const parts =
    [];


  if (
    completedModels > 0
  ) {

    parts.push(
      completedModels +
      ' completed'
    );

  }


  if (
    partialModels > 0
  ) {

    parts.push(
      partialModels +
      ' partial'
    );

  }


  if (
    failedModels > 0
  ) {

    parts.push(
      failedModels +
      ' failed'
    );

  }


  modelStatusSummary.textContent =
    parts.join(
      ' · '
    );

}


function deriveModelStatuses(
  results,
  selectedModelKeys,
  imagesPerModel
) {

  return selectedModelKeys.map(
    function(modelKey) {

      const items =
        results.filter(
          function(item) {

            return (
              item.modelKey ===
              modelKey
            );

          }
        );


      const successful =
        items.filter(
          function(item) {

            return !item.error;

          }
        ).length;


      const failed =
        Math.max(
          0,
          imagesPerModel -
          successful
        );


      const firstFailure =
        items.find(
          function(item) {

            return Boolean(
              item.error
            );

          }
        );


      let status =
        'failed';


      if (
        successful ===
        imagesPerModel
      ) {

        status =
          'completed';

      } else if (
        successful > 0
      ) {

        status =
          'partial';

      }


      return {

        key:
          modelKey,

        label:
          items[0]?.label ||
          modelLabelForKey(
            modelKey
          ),

        status:
          status,

        successful:
          successful,

        failed:
          failed,

        expected:
          imagesPerModel,

        error:
          firstFailure?.error ||
          null

      };

    }
  );

}


function stopModelStatuses(
  modelKeys,
  message
) {

  modelKeys.forEach(
    function(modelKey) {

      const row =
        findModelStatusRow(
          modelKey
        );


      if (
        row
      ) {

        row.dataset.tone =
          'error';


        const detail =
          row.querySelector(
            '.model-status-detail'
          );


        const badge =
          row.querySelector(
            '.model-status-badge'
          );


        if (
          detail
        ) {

          detail.textContent =
            message;

        }


        if (
          badge
        ) {

          badge.dataset.tone =
            'error';


          badge.textContent =
            'Stopped';

        }

      }


      setInlineModelStatus(
        modelKey,
        'Stopped',
        'error'
      );

    }
  );


  modelStatusSummary.textContent =
    'Request stopped';

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
   CONTROLS
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
   RESULTS
---------------------------------- */


function extensionForDataURI(
  dataURI
) {

  const value =
    String(
      dataURI
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


  return 'png';

}


function appendTextElement(
  parent,
  tagName,
  className,
  text
) {

  const element =
    document.createElement(
      tagName
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
    item.error

      ? 'result-state error'

      : 'result-state success';


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
      item.error !== null

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
              'Try again, or use another model.'

          };


    appendTextElement(
      card,
      'div',
      'error-kicker',
      item.providerLabel ||
      'Model unavailable'
    );


    appendTextElement(
      card,
      'p',
      'error-title',
      errorInfo.title ||
      'Generation failed'
    );


    appendTextElement(
      card,
      'p',
      'error-message',
      errorInfo.message ||
      'This model could not generate an image.'
    );


    if (
      errorInfo.hint
    ) {

      appendTextElement(
        card,
        'p',
        'error-hint',
        errorInfo.hint
      );

    }


    if (
      errorInfo.code
    ) {

      appendTextElement(
        card,
        'code',
        'error-code',
        errorInfo.code
      );

    }


    return card;

  }


  const metaParts =
    [];


  if (
    item.providerLabel
  ) {

    metaParts.push(
      item.providerLabel
    );

  }


  if (
    item.runtimeModel &&
    item.provider ===
    'horde'
  ) {

    metaParts.push(
      item.runtimeModel
    );

  }


  metaParts.push(
    item.width +
    ' × ' +
    item.height +
    ' px'
  );


  metaParts.push(
    item.steps +
    ' steps'
  );


  metaParts.push(
    'seed ' +
    item.seed
  );


  const meta =
    document.createElement(
      'p'
    );


  meta.className =
    'result-meta';


  meta.textContent =
    metaParts.join(
      ' · '
    );


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
    (
      item.label ||
      'AI'
    ) +
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


  const extension =
    extensionForDataURI(
      item.dataURI
    );


  download.href =
    item.dataURI;


  download.download =
    safeName +
    '-v' +
    item.variation +
    '-' +
    item.width +
    'x' +
    item.height +
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

  resultsEl.innerHTML =
    '';


  let successful =
    0;


  let failed =
    0;


  results.forEach(
    function(item) {

      if (
        item.error
      ) {

        failed +=
          1;

      } else {

        successful +=
          1;

      }


      resultsEl.appendChild(
        createResultCard(
          item
        )
      );

    }
  );


  resultsEl
    .classList
    .remove(
      'hidden'
    );


  return {

    successful:
      successful,

    failed:
      failed,

    total:
      results.length

  };

}


function requestErrorMessage(
  response,
  data
) {

  if (
    data &&
    typeof data.error ===
      'string' &&
    data.error.trim()
  ) {

    return data.error;

  }


  if (
    response.status ===
    429
  ) {

    return 'Arqivo is receiving too many generation requests right now. Please try again shortly.';

  }


  if (
    response.status >=
    500
  ) {

    return 'The generation service is temporarily unavailable. Please try again shortly.';

  }


  return 'Generation failed.';

}


/* ----------------------------------
   SUBMIT
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


    const size =
      sizeEl.value;


    const quality =
      qualityEl.value;


    const imagesPerModel =
      getImagesPerModel();


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


    const summary =
      getRequestSummary();


    const turnstileToken =
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
      selectedModels.length ===
      0
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
        'Choose fewer models or fewer variations. Maximum: 8 images per request.',
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
        'Custom width and height must be 256–2048 and multiples of 64.',
        'error'
      );


      return;

    }


    if (
      summary.totalPixels >
      MAX_TOTAL_PIXELS
    ) {

      setStatus(
        'That combination is too large. Reduce the resolution, model count, or variations.',
        'error'
      );


      return;

    }


    if (
      !turnstileToken
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


    resultsEl
      .classList
      .add(
        'hidden'
      );


    resultsEl.innerHTML =
      '';


    startModelStatuses(
      selectedModels,
      imagesPerModel
    );


    setStatus(
      'Generating ' +
      summary.totalImages +
      (
        summary.totalImages === 1

          ? ' image'

          : ' images'
      ) +
      ' at ' +
      summary.width +
      ' × ' +
      summary.height +
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

                  imagesPerModel:
                    imagesPerModel,

                  seed:
                    seed,

                  turnstileToken:
                    turnstileToken

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
          requestErrorMessage(
            response,
            data
          )
        );

      }


      const results =
        Array.isArray(
          data.results
        )

          ? data.results

          : [];


      const resultSummary =
        renderResults(
          results
        );


      const serverStatuses =
        Array.isArray(
          data.modelStatuses
        )

          ? data.modelStatuses

          : deriveModelStatuses(
              results,
              selectedModels,
              imagesPerModel
            );


      applyModelStatuses(
        serverStatuses
      );


      if (
        resultSummary.failed ===
        0
      ) {

        setStatus(
          resultSummary.successful +
          (
            resultSummary.successful === 1

              ? ' image completed.'

              : ' images completed.'
          ),
          'success'
        );

      } else if (
        resultSummary.successful ===
        0
      ) {

        setStatus(
          'All selected generations failed. See the model status and error cards for details.',
          'error'
        );

      } else {

        setStatus(
          resultSummary.successful +
          ' completed, ' +
          resultSummary.failed +
          ' failed. Successful images are still available below.',
          'warning'
        );

      }

    } catch (
      error
    ) {

      console.error(
        'Generation request failed.'
      );


      const message =
        error &&
        error.message

          ? error.message

          : 'Something went wrong while contacting the generation service.';


      stopModelStatuses(
        selectedModels,
        message
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

          headers: {

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

          headers: {

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

          headers: {

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

          headers: {

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
   GENERATION ENDPOINT
---------------------------------- */


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

      ? body.models.map(
          (value) =>
            String(
              value
            )
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
        (key) =>
          MODELS_BY_KEY[
            key
          ]
      )
      .filter(
        Boolean
      );


  if (
    selectedModels.length ===
    0
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


  const sizeKey =
    String(
      body?.size ||
      "square-1024"
    );


  let width;
  let height;


  if (
    sizeKey ===
    "custom"
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


    if (
      !preset
    ) {

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


  const totalPixels =
    width *
    height *
    totalImages;


  if (
    totalPixels >
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


  let baseSeed;


  if (
    body?.seed === null ||
    body?.seed === undefined ||
    body?.seed === ""
  ) {

    baseSeed =
      Math.floor(
        Math.random() *
        (
          MAX_SEED +
          1
        )
      );

  } else {

    baseSeed =
      Number.parseInt(
        body.seed,
        10
      );


    if (
      !Number.isSafeInteger(
        baseSeed
      ) ||
      baseSeed < 0 ||
      baseSeed >
        MAX_SEED
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
      "Turnstile verification failed."
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


  const tasks =
    [];


  for (
    const model
    of selectedModels
  ) {

    /*
     * Horde variations are batched into one
     * Horde request per model.
     */

    if (
      model.provider ===
      "horde"
    ) {

      tasks.push(
        {

          run:
            () =>
              generateImagesForHordeModel(
                env,
                model,
                finalPrompt,
                negativePrompt,
                width,
                height,
                quality,
                baseSeed,
                imagesPerModel
              ),

          fallback:
            () =>
              createUnexpectedTaskFailures(
                model,
                env,
                width,
                height,
                quality,
                baseSeed,
                imagesPerModel
              )

        }
      );


      continue;

    }


    /*
     * Cloudflare generations remain one task
     * per variation.
     */

    for (
      let variationIndex = 0;
      variationIndex < imagesPerModel;
      variationIndex += 1
    ) {

      const variationSeed =
        (
          baseSeed +
          variationIndex
        ) %
        (
          MAX_SEED +
          1
        );


      const variation =
        variationIndex +
        1;


      tasks.push(
        {

          run:
            () =>
              generateCloudflareImage(
                env,
                model,
                finalPrompt,
                negativePrompt,
                width,
                height,
                quality,
                variationSeed,
                variation,
                imagesPerModel
              ),

          fallback:
            () =>
              createUnexpectedTaskFailure(
                model,
                env,
                width,
                height,
                quality,
                variationSeed,
                variation,
                imagesPerModel
              )

        }
      );

    }

  }


  const taskResults =
    await runWithConcurrency(
      tasks,
      MODEL_CONCURRENCY
    );


  /*
   * Horde tasks return arrays because one Horde
   * submission can contain multiple variations.
   */

  const results =
    taskResults.flatMap(
      (item) =>
        Array.isArray(
          item
        )

          ? item

          : [
              item
            ]
    );


  const modelStatuses =
    summarizeModelStatuses(
      selectedModels,
      results,
      imagesPerModel
    );


  return json(
    {

      results:
        results,

      modelStatuses:
        modelStatuses

    }
  );

}


/* ----------------------------------
   VALIDATION
---------------------------------- */


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


function buildHordePrompt(
  prompt,
  negativePrompt
) {

  const positive =
    String(
      prompt ||
      ""
    ).trim();


  const negative =
    String(
      negativePrompt ||
      ""
    ).trim();


  return negative

    ? positive +
      " ### " +
      negative

    : positive;

}


/* ----------------------------------
   GRACEFUL CONCURRENCY
---------------------------------- */


async function runWithConcurrency(
  tasks,
  limit
) {

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


      const task =
        tasks[
          index
        ];


      try {

        results[
          index
        ] =
          await task.run();

      } catch {

        console.error(
          "Unexpected isolated generation task failure."
        );


        results[
          index
        ] =
          task.fallback();

      }

    }

  }


  const workers =
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
    );


  await Promise.all(
    workers
  );


  return results;

}


/* ----------------------------------
   MODEL STATUS SUMMARY
---------------------------------- */


function summarizeModelStatuses(
  selectedModels,
  results,
  imagesPerModel
) {

  return selectedModels.map(
    (model) => {

      const modelResults =
        results.filter(
          (item) =>
            item.modelKey ===
            model.key
        );


      const successful =
        modelResults.filter(
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
        modelResults.find(
          (item) =>
            Boolean(
              item.error
            )
        );


      let status =
        "failed";


      if (
        successful ===
        imagesPerModel
      ) {

        status =
          "completed";

      } else if (
        successful > 0
      ) {

        status =
          "partial";

      }


      let publicError =
        firstFailure?.error ||
        null;


      if (
        status !==
          "completed" &&
        !publicError
      ) {

        publicError =
          {

            code:
              "MODEL_RESULT_MISSING",

            title:
              "The model did not return every expected result",

            message:
              model.label +
              " did not return every requested image.",

            hint:
              "Try this model again with fewer variations.",

            retryable:
              true

          };

      }


      return {

        key:
          model.key,

        label:
          model.label,

        provider:
          model.provider,

        providerLabel:
          providerLabelForModel(
            model
          ),

        status:
          status,

        successful:
          successful,

        failed:
          failed,

        expected:
          imagesPerModel,

        error:
          publicError

      };

    }
  );

}


/* ----------------------------------
   ERROR EXTRACTION
---------------------------------- */


function firstInteger(
  values
) {

  for (
    const value
    of values
  ) {

    if (
      Number.isInteger(
        value
      )
    ) {

      return value;

    }


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

      return parsed;

    }

  }


  return null;

}


function firstNonEmptyString(
  values
) {

  for (
    const value
    of values
  ) {

    if (
      typeof value ===
        "string" &&
      value.trim()
    ) {

      return value.trim();

    }

  }


  return "";

}


function extractProviderErrorInfo(
  error
) {

  const status =
    firstInteger(
      [

        error?.status,

        error?.statusCode,

        error?.response?.status,

        error?.cause?.status,

        error?.cause?.statusCode

      ]
    );


  const providerCode =
    firstNonEmptyString(
      [

        error?.providerCode,

        error?.rc,

        error?.code,

        error?.errorCode,

        error?.cause?.providerCode,

        error?.cause?.rc,

        error?.cause?.code,

        error?.cause?.errorCode

      ]
    );


  const messageParts =
    [

      error?.message,

      error?.cause?.message,

      error?.response?.statusText,

      typeof error?.error ===
        "string"

        ? error.error

        : ""

    ].filter(
      (value) =>
        typeof value ===
          "string" &&
        value.trim()
    );


  if (
    Array.isArray(
      error?.errors
    )
  ) {

    for (
      const item
      of error.errors
    ) {

      if (
        typeof item?.message ===
          "string" &&
        item.message.trim()
      ) {

        messageParts.push(
          item.message.trim()
        );

      }

    }

  }


  return {

    status:
      status,

    providerCode:
      providerCode,

    name:
      firstNonEmptyString(
        [
          error?.name
        ]
      ),

    message:
      messageParts
        .join(
          " | "
        )
        .slice(
          0,
          1000
        )

  };

}


/* ----------------------------------
   MODEL ERROR CLASSIFIER
---------------------------------- */


function classifyModelError(
  error,
  context
) {

  if (
	error instanceof
	HordeTimeoutError
	) {

	return {

		code:
		"HORDE_QUEUE_TIMEOUT",

		title:
		"AI Horde is still queued",

		message:
		error.message ||
		(
			context.model.label +
			" is still waiting for a volunteer worker."
		),

		hint:
		"AI Horde is volunteer-powered and can be much slower than Cloudflare. Try again later, use one Horde model at a time, or use 512 × 512 / 768 × 768 for faster results.",

		retryable:
		true

	};

	}


  if (
    error instanceof
    HordeTimeoutError
  ) {

    return {

      code:
        "HORDE_QUEUE_TIMEOUT",

      title:
        "AI Horde is taking too long",

      message:
        context.model.label +
        " did not finish before Arqivo stopped waiting for the volunteer queue.",

      hint:
        "Try again later, use a smaller resolution, or use a Cloudflare Workers AI model for faster completion.",

      retryable:
        true

    };

  }


  const info =
    extractProviderErrorInfo(
      error
    );


  const haystack =
    (
      info.message +
      " " +
      info.providerCode +
      " " +
      info.name
    ).toLowerCase();


  const providerCode =
    info.providerCode
      .toLowerCase();


  if (
    context.model.provider ===
      "horde" &&
    (
      providerCode ===
        "novalidworkers" ||
      /no valid workers/.test(
        haystack
      )
    )
  ) {

    return {

      code:
        "HORDE_NO_VALID_WORKERS",

      title:
        "No AI Horde worker can run this request right now",

      message:
        context.model.label +
        " could not find a compatible volunteer worker for the selected model and settings.",

      hint:
        "Try 1024 × 1024, Standard quality, another Horde model, or try again later.",

      retryable:
        true

    };

  }


  if (
    context.model.provider ===
      "horde" &&
    (
      providerCode ===
        "invalidapikey" ||
      /invalid api key/.test(
        haystack
      )
    )
  ) {

    return {

      code:
        "HORDE_API_KEY_INVALID",

      title:
        "AI Horde authentication is not configured correctly",

      message:
        "The AI Horde API key stored by Arqivo was rejected.",

      hint:
        "Update the AI_HORDE_API_KEY Worker secret, then deploy again.",

      retryable:
        false

    };

  }


  if (
    context.model.provider ===
      "horde" &&
    (
      providerCode ===
        "toomanyprompts" ||
      /too many prompts/.test(
        haystack
      )
    )
  ) {

    return {

      code:
        "HORDE_TOO_MANY_REQUESTS",

      title:
        "AI Horde has too many active requests for this account",

      message:
        "The shared Arqivo AI Horde account has reached its current request concurrency.",

      hint:
        "Wait for existing Horde jobs to finish, then try again.",

      retryable:
        true

    };

  }


  if (
    context.model.provider ===
      "horde" &&
    /kudosupfront|sharedkeyempty|sharedkeyinsufficientkudos|requires upfront kudos/.test(
      providerCode +
      " " +
      haystack
    )
  ) {

    return {

      code:
        "HORDE_PRIORITY_REQUIRED",

      title:
        "AI Horde cannot accept this request with the current priority",

      message:
        context.model.label +
        " requires more available Horde priority or a different worker at the moment.",

      hint:
        "Try another Horde model, a smaller request, or a Cloudflare Workers AI model.",

      retryable:
        true

    };

  }


  const isQuota =
    /quota|daily limit|usage limit|neurons|allocation|exceeded.*limit|limit.*exceeded|insufficient.*quota/.test(
      haystack
    );


  const isRateLimited =
    info.status ===
      429 ||
    /rate limit|too many requests|throttl|temporarily busy|capacity/.test(
      haystack
    );


  if (
    isQuota
  ) {

    return {

      code:
        "AI_DAILY_LIMIT_REACHED",

      title:
        "Daily AI capacity has been reached",

      message:
        context.model.label +
        " could not run because the available AI usage allocation appears to be exhausted.",

      hint:
        "Try again after the allowance resets, or reduce models, variations, size, or quality.",

      retryable:
        false

    };

  }


  if (
    isRateLimited
  ) {

    return {

      code:
        "MODEL_BUSY",

      title:
        "The model is busy right now",

      message:
        context.model.label +
        " could not accept this generation request at the moment.",

      hint:
        "Wait a short time and try again.",

      retryable:
        true

    };

  }


  if (
    /billing|payment|paid plan|subscription|credit balance|requires.*paid/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_REQUIRES_BILLING",

      title:
        "This model is unavailable on the current account setup",

      message:
        context.model.label +
        " appears to require billing or account access that is not enabled.",

      hint:
        "Use another available model.",

      retryable:
        false

    };

  }


  if (
    info.status ===
      401 ||
    info.status ===
      403 ||
    /unauthori|forbidden|permission|access denied|not allowed|authentication/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_ACCESS_DENIED",

      title:
        "Arqivo does not currently have access to this model",

      message:
        context.model.label +
        " rejected the request because access was denied.",

      hint:
        "Use another model and verify provider credentials and permissions.",

      retryable:
        false

    };

  }


  if (
    info.status ===
      404 ||
    /model.*not found|not found.*model|unknown model|does not exist|model unavailable|unsupportedmodel|unexpectedmodelname/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_UNAVAILABLE",

      title:
        "This model is unavailable",

      message:
        context.model.label +
        " could not be found or is not currently available.",

      hint:
        "Use another model or update the configured model name.",

      retryable:
        false

    };

  }


  if (
    /width|height|dimension|resolution|image size|multiple of|invalid parameter|validation|out of range|must be between|unsupported.*size|invalidsize|toomanysteps/.test(
      haystack
    )
  ) {

    return {

      code:
        "UNSUPPORTED_MODEL_SETTINGS",

      title:
        "This model rejected the selected settings",

      message:
        context.model.label +
        " could not generate at " +
        context.width +
        " × " +
        context.height +
        " with the current quality settings.",

      hint:
        "Try 1024 × 1024 first, then use a smaller or more standard resolution.",

      retryable:
        true

    };

  }


  if (
    /timeout|timed out|deadline|execution time|requestexpired/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_TIMEOUT",

      title:
        "The model took too long to respond",

      message:
        context.model.label +
        " did not finish before the request timed out.",

      hint:
        "Try fewer variations, a smaller resolution, or Standard quality.",

      retryable:
        true

    };

  }


  if (
    /safety|moderation|content policy|policy violation|blocked prompt|unsafe|content blocked|corruptprompt/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_REQUEST_REJECTED",

      title:
        "The model rejected this request",

      message:
        context.model.label +
        " did not generate an image because the request was rejected.",

      hint:
        "Revise the prompt and try again.",

      retryable:
        false

    };

  }


  if (
    (
      info.status !== null &&
      info.status >=
        500
    ) ||
    /internal server error|service unavailable|bad gateway|gateway timeout|upstream|overloaded|temporary failure|maintenance/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_TEMPORARILY_UNAVAILABLE",

      title:
        "The model service is temporarily unavailable",

      message:
        context.model.label +
        " encountered a temporary provider-side error.",

      hint:
        "Try again shortly. If only this model keeps failing, use another model.",

      retryable:
        true

    };

  }


  if (
    /network|connection|fetch failed|socket|econn|dns/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_CONNECTION_ERROR",

      title:
        "The model connection failed",

      message:
        "Arqivo could not complete the connection needed to run " +
        context.model.label +
        ".",

      hint:
        "Try again shortly.",

      retryable:
        true

    };

  }


  return {

    code:
      "MODEL_GENERATION_FAILED",

    title:
      "This model could not complete the image",

    message:
      context.model.label +
      " encountered an unexpected generation error.",

    hint:
      "Try again, use another model, a smaller resolution, or Standard quality.",

    retryable:
      true

  };

}


/* ----------------------------------
   PRIVACY-CONSCIOUS LOGGING
---------------------------------- */


function logModelFailure(
  model,
  publicError,
  error,
  env
) {

  const info =
    extractProviderErrorInfo(
      error
    );


  const runtimeModel =
    model.provider ===
      "horde"

      ? resolveHordeModelName(
          env,
          model
        )

      : model.id;


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
        null,

      outputCode:
        error instanceof
          ModelOutputError

          ? error.outputCode

          : null

    }
  );

}


/* ----------------------------------
   TASK FALLBACKS
---------------------------------- */


function createUnexpectedTaskFailure(
  model,
  env,
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


  const providerLabel =
    providerLabelForModel(
      model
    );


  const runtimeModel =
    model.provider ===
      "horde"

      ? resolveHordeModelName(
          env,
          model
        )

      : model.id;


  return {

    modelKey:
      model.key,

    provider:
      model.provider,

    providerLabel:
      providerLabel,

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
      seed,

    variation:
      variation,

    totalVariations:
      totalVariations,

    error:
      {

        code:
          "ISOLATED_TASK_FAILURE",

        title:
          "This generation task stopped unexpectedly",

        message:
          model.label +
          " encountered an isolated processing error.",

        hint:
          "Other selected models were allowed to continue. Try this model again separately.",

        retryable:
          true

      }

  };

}


function createUnexpectedTaskFailures(
  model,
  env,
  width,
  height,
  quality,
  baseSeed,
  totalVariations
) {

  return Array.from(
    {
      length:
        totalVariations
    },
    (
      _,
      index
    ) =>
      createUnexpectedTaskFailure(
        model,
        env,
        width,
        height,
        quality,
        (
          baseSeed +
          index
        ) %
        (
          MAX_SEED +
          1
        ),
        index +
        1,
        totalVariations
      )
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
        {

          model:
            model,

          width:
            width,

          height:
            height,

          steps:
            steps,

          quality:
            quality

        }
      );


    logModelFailure(
      model,
      publicError,
      error,
      env
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
   AI HORDE GENERATION
---------------------------------- */


async function generateImagesForHordeModel(
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
    quality === "best"

      ? model.bestSteps

      : model.standardSteps;


  const runtimeModel =
    resolveHordeModelName(
      env,
      model
    );


  const providerLabel =
    providerLabelForModel(
      model
    );


  if (
    !runtimeModel
  ) {

    const configError =
      {

        code:
          "HORDE_MODEL_NOT_CONFIGURED",

        title:
          "This AI Horde model slot is not configured",

        message:
          model.label +
          " has no AI Horde model name configured.",

        hint:
          "Set " +
          model.hordeModelEnv +
          " or use the default model configured in the Worker.",

        retryable:
          false

      };


    return createHordeFailureResults(
      model,
      runtimeModel,
      providerLabel,
      width,
      height,
      steps,
      baseSeed,
      totalVariations,
      configError
    );

  }


  const configuredApiKey =
    String(
      env.AI_HORDE_API_KEY ||
      ""
    ).trim();


  const primaryApiKey =
    configuredApiKey ||
    AI_HORDE_ANONYMOUS_KEY;


  try {

    let submitData;


    try {

      submitData =
        await submitHordeGeneration(
          primaryApiKey,
          runtimeModel,
          prompt,
          negativePrompt,
          width,
          height,
          steps,
          model.guidance,
          baseSeed,
          totalVariations
        );

    } catch (
      firstError
    ) {

      /*
       * A public Arqivo installation can eventually
       * exhaust the priority available on its shared
       * Horde account.
       *
       * If AI Horde rejects the registered key only
       * because of kudos/upfront-priority rules,
       * retry using AI Horde's official anonymous key.
       *
       * Anonymous requests have lower priority, but
       * this is preferable to immediately failing.
       */

      if (
        primaryApiKey !==
          AI_HORDE_ANONYMOUS_KEY &&
        isHordePriorityError(
          firstError
        )
      ) {

        console.error(
          "AI Horde priority fallback activated.",
          {
            model:
              model.label
          }
        );


        submitData =
          await submitHordeGeneration(
            AI_HORDE_ANONYMOUS_KEY,
            runtimeModel,
            prompt,
            negativePrompt,
            width,
            height,
            steps,
            model.guidance,
            baseSeed,
            totalVariations
          );

      } else {

        throw firstError;

      }

    }


    const requestId =
      String(
        submitData?.id ||
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


    let done =
      false;


    let lastCheck =
      null;


    for (
      let attempt = 0;
      attempt <
        AI_HORDE_MAX_POLLS;
      attempt += 1
    ) {

      /*
       * Check once immediately.
       * After that, wait between checks.
       */

      if (
        attempt > 0
      ) {

        await sleep(
          AI_HORDE_POLL_INTERVAL_MS
        );

      }


      lastCheck =
        await hordeRequest(
          AI_HORDE_API_BASE +
          "/generate/check/" +
          encodeURIComponent(
            requestId
          ),
          {

            method:
              "GET",

            headers:
              hordeHeaders(
                primaryApiKey
              )

          }
        );


      if (
        lastCheck?.faulted ===
        true
      ) {

        throw new ProviderResponseError(
          "AI Horde marked the generation request as faulted.",
          502,
          "AbortedGen"
        );

      }


      if (
        lastCheck?.done ===
        true
      ) {

        done =
          true;


        break;

      }


      /*
       * If Horde says the request has become
       * impossible, don't spend several minutes
       * polling something that cannot finish.
       */

      if (
        lastCheck?.is_possible ===
        false
      ) {

        throw new ProviderResponseError(
          "No compatible AI Horde workers are currently able to complete this request.",
          503,
          "NoValidWorkers"
        );

      }

    }


    if (
      !done
    ) {

      const queuePosition =
        Number.parseInt(
          lastCheck?.queue_position,
          10
        );


      const waitTime =
        Number.parseInt(
          lastCheck?.wait_time,
          10
        );


      let extra =
        "";


      if (
        Number.isInteger(
          queuePosition
        ) &&
        queuePosition > 0
      ) {

        extra +=
          " Queue position: " +
          queuePosition +
          ".";

      }


      if (
        Number.isInteger(
          waitTime
        ) &&
        waitTime > 0
      ) {

        extra +=
          " Horde estimated wait: about " +
          waitTime +
          " seconds.";

      }


      throw new HordeTimeoutError(
        "AI Horde is still processing this request." +
        extra
      );

    }


    const statusData =
      await hordeRequest(
        AI_HORDE_API_BASE +
        "/generate/status/" +
        encodeURIComponent(
          requestId
        ),
        {

          method:
            "GET",

          headers:
            hordeHeaders(
              primaryApiKey
            )

        }
      );


    const generations =
      Array.isArray(
        statusData?.generations
      )

        ? statusData.generations
            .slice(
              0,
              totalVariations
            )

        : [];


    if (
      generations.length ===
      0
    ) {

      throw new ModelOutputError(
        "AI Horde completed the request but returned no generations.",
        "HORDE_NO_GENERATIONS"
      );

    }


    const results =
      [];


    for (
      let index = 0;
      index <
        generations.length;
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


      const returnedSeed =
        safeSeed(
          generation?.seed,
          (
            baseSeed +
            index
          ) %
          (
            MAX_SEED +
            1
          )
        );


      results.push(
        {

          modelKey:
            model.key,

          provider:
            model.provider,

          providerLabel:
            providerLabel,

          label:
            model.label,

          model:
            runtimeModel,

          runtimeModel:
            String(
              generation?.model ||
              runtimeModel
            ),

          width:
            width,

          height:
            height,

          steps:
            steps,

          seed:
            returnedSeed,

          variation:
            index +
            1,

          totalVariations:
            totalVariations,

          dataURI:
            dataURI

        }
      );

    }


    while (
      results.length <
      totalVariations
    ) {

      const index =
        results.length;


      results.push(
        {

          modelKey:
            model.key,

          provider:
            model.provider,

          providerLabel:
            providerLabel,

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
            {

              code:
                "HORDE_RESULT_MISSING",

              title:
                "AI Horde returned fewer images than requested",

              message:
                model.label +
                " completed without every requested variation.",

              hint:
                "Try this Horde model again with one image per model.",

              retryable:
                true

            }

        }
      );

    }


    return results;

  } catch (
    error
  ) {

    const publicError =
      classifyModelError(
        error,
        {

          model:
            model,

          width:
            width,

          height:
            height,

          steps:
            steps,

          quality:
            quality

        }
      );


    logModelFailure(
      model,
      publicError,
      error,
      env
    );


    return createHordeFailureResults(
      model,
      runtimeModel,
      providerLabel,
      width,
      height,
      steps,
      baseSeed,
      totalVariations,
      publicError
    );

  }

}

/* ----------------------------------
   AI HORDE REQUEST HELPERS
---------------------------------- */


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

    const message =
      firstNonEmptyString(
        [

          data?.message,

          data?.error,

          response.statusText,

          "AI Horde returned an unsuccessful response."

        ]
      );


    const providerCode =
      firstNonEmptyString(
        [

          data?.rc,

          data?.code

        ]
      );


    throw new ProviderResponseError(
      message,
      response.status,
      providerCode
    );

  }


  return data;

}


function safeSeed(
  value,
  fallback
) {

  const parsed =
    Number.parseInt(
      value,
      10
    );


  return (
    Number.isSafeInteger(
      parsed
    ) &&
    parsed >= 0 &&
    parsed <= MAX_SEED

      ? parsed

      : fallback
  );

}


function sleep(
  milliseconds
) {

  return new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        milliseconds
      )
  );

}


/* ----------------------------------
   AI HORDE IMAGE HANDLING
---------------------------------- */


async function hordeGenerationToDataURI(
  generation
) {

  const imageValue =
    String(
      generation?.img ||
      ""
    ).trim();


  if (
    !imageValue
  ) {

    throw new ModelOutputError(
      "AI Horde returned a generation without image data.",
      "HORDE_EMPTY_IMAGE"
    );

  }


  /*
   * Already a data URI.
   */

  if (
    imageValue.startsWith(
      "data:image/"
    )
  ) {

    return imageValue;

  }


  /*
   * AI Horde can return a temporary hosted URL.
   *
   * Fetch it inside the Worker so the visitor's
   * browser never needs to contact that image
   * host directly.
   */

  if (
    /^https:\/\//i.test(
      imageValue
    )
  ) {

    const imageResponse =
      await fetch(
        imageValue,
        {

          method:
            "GET",

          headers:
            {

              "Accept":
                "image/*"

            }

        }
      );


    if (
      !imageResponse.ok
    ) {

      throw new ProviderResponseError(
        "AI Horde image download failed.",
        imageResponse.status,
        "HORDE_IMAGE_DOWNLOAD_FAILED"
      );

    }


    const contentType =
      imageResponse.headers.get(
        "content-type"
      ) ||
      "";


    const arrayBuffer =
      await imageResponse.arrayBuffer();


    return arrayBufferToDataURI(
      arrayBuffer,
      contentType
    );

  }


  /*
   * Otherwise treat it as raw Base64.
   */

  return base64ImageToDataURI(
    imageValue
  );

}


/* ----------------------------------
   MODEL OUTPUT HANDLING
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

      let responseMessage =
        "Provider returned an unsuccessful response.";


      try {

        const text =
          await output.text();


        if (
          text.trim()
        ) {

          responseMessage =
            text.slice(
              0,
              500
            );

        }

      } catch {

        /*
         * Keep generic response message.
         */

      }


      throw new ProviderResponseError(
        responseMessage,
        output.status
      );

    }


    const contentType =
      output.headers.get(
        "content-type"
      ) ||
      "";


    const arrayBuffer =
      await output.arrayBuffer();


    return arrayBufferToDataURI(
      arrayBuffer,
      contentType
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


  return streamToDataURI(
    output
  );

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


  let mimeType;


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

  } else {

    throw new ModelOutputError(
      "The model returned an image format Arqivo could not identify.",
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


async function streamToDataURI(
  stream
) {

  let arrayBuffer;


  try {

    arrayBuffer =
      await new Response(
        stream
      ).arrayBuffer();

  } catch {

    throw new ModelOutputError(
      "Arqivo could not read the model's image stream.",
      "STREAM_READ_FAILED"
    );

  }


  return arrayBufferToDataURI(
    arrayBuffer,
    ""
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
    bytes.length <
    8
  ) {

    throw new ModelOutputError(
      "The model returned empty or incomplete image data.",
      "IMAGE_DATA_TOO_SMALL"
    );

  }


  const headerMimeType =
    contentType &&
    contentType.startsWith(
      "image/"
    )

      ? contentType.split(
          ";"
        )[0]

      : "";


  const detectedMimeType =
    detectImageMimeType(
      bytes
    );


  const mimeType =
    detectedMimeType ||
    headerMimeType;


  if (
    !mimeType
  ) {

    throw new ModelOutputError(
      "The model returned data that is not a supported image format.",
      "UNKNOWN_BINARY_FORMAT"
    );

  }


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
    bytes.length >=
      8 &&
    bytes[0] ===
      0x89 &&
    bytes[1] ===
      0x50 &&
    bytes[2] ===
      0x4e &&
    bytes[3] ===
      0x47
  ) {

    return "image/png";

  }


  if (
    bytes.length >=
      3 &&
    bytes[0] ===
      0xff &&
    bytes[1] ===
      0xd8 &&
    bytes[2] ===
      0xff
  ) {

    return "image/jpeg";

  }


  if (
    bytes.length >=
      12 &&
    bytes[0] ===
      0x52 &&
    bytes[1] ===
      0x49 &&
    bytes[2] ===
      0x46 &&
    bytes[3] ===
      0x46 &&
    bytes[8] ===
      0x57 &&
    bytes[9] ===
      0x45 &&
    bytes[10] ===
      0x42 &&
    bytes[11] ===
      0x50
  ) {

    return "image/webp";

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
    let i = 0;
    i < bytes.length;
    i += chunkSize
  ) {

    const chunk =
      bytes.subarray(
        i,
        i +
        chunkSize
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

    console.error(
      "Turnstile verification request failed."
    );


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