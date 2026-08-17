const MAX_IMAGES_PER_REQUEST = 8;
const MAX_TOTAL_PIXELS = 12 * 1024 * 1024;
const MAX_SEED = 2147483647;

const MODELS = [
  {
    key: "sdxl-lightning",
    label: "SDXL Lightning",
    description: "Fast SDXL generation",
    id: "@cf/bytedance/stable-diffusion-xl-lightning",
    standardSteps: 10,
    bestSteps: 20,
    guidance: 7.5,
    defaultSelected: true
  },
  {
    key: "sdxl-base",
    label: "SDXL Base",
    description: "Classic SDXL model",
    id: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    standardSteps: 12,
    bestSteps: 20,
    guidance: 7.5,
    defaultSelected: true
  },
  {
    key: "lucid-origin",
    label: "Lucid Origin",
    description: "High prompt responsiveness",
    id: "@cf/leonardo/lucid-origin",
    standardSteps: 20,
    bestSteps: 32,
    guidance: 5.5,
    defaultSelected: true
  },
  {
    key: "phoenix",
    label: "Phoenix",
    description: "Strong prompt adherence",
    id: "@cf/leonardo/phoenix-1.0",
    standardSteps: 20,
    bestSteps: 35,
    guidance: 7.5,
    defaultSelected: true
  }
];

const MODELS_BY_KEY = Object.fromEntries(
  MODELS.map((model) => [model.key, model])
);

const SIZES = {
  "square-512": {
    label: "512 × 512",
    width: 512,
    height: 512
  },

  "square-768": {
    label: "768 × 768",
    width: 768,
    height: 768
  },

  "square-1024": {
    label: "1024 × 1024",
    width: 1024,
    height: 1024
  },

  "square-1280": {
    label: "1280 × 1280",
    width: 1280,
    height: 1280
  },

  "square-1536": {
    label: "1536 × 1536",
    width: 1536,
    height: 1536
  },

  "square-2048": {
    label: "2048 × 2048",
    width: 2048,
    height: 2048
  },

  "landscape-1024x768": {
    label: "1024 × 768 · 4:3",
    width: 1024,
    height: 768
  },

  "landscape-1152x768": {
    label: "1152 × 768 · 3:2",
    width: 1152,
    height: 768
  },

  "landscape-1024x576": {
    label: "1024 × 576 · 16:9",
    width: 1024,
    height: 576
  },

  "landscape-1344x768": {
    label: "1344 × 768 · 7:4",
    width: 1344,
    height: 768
  },

  "landscape-1536x1024": {
    label: "1536 × 1024 · 3:2",
    width: 1536,
    height: 1024
  },

  "landscape-1536x640": {
    label: "1536 × 640 · cinematic",
    width: 1536,
    height: 640
  },

  "landscape-1792x1024": {
    label: "1792 × 1024 · wide",
    width: 1792,
    height: 1024
  },

  "landscape-2048x1152": {
    label: "2048 × 1152 · 16:9",
    width: 2048,
    height: 1152
  },

  "portrait-768x1024": {
    label: "768 × 1024 · 3:4",
    width: 768,
    height: 1024
  },

  "portrait-768x1152": {
    label: "768 × 1152 · 2:3",
    width: 768,
    height: 1152
  },

  "portrait-576x1024": {
    label: "576 × 1024 · 9:16",
    width: 576,
    height: 1024
  },

  "portrait-768x1344": {
    label: "768 × 1344 · 4:7",
    width: 768,
    height: 1344
  },

  "portrait-1024x1280": {
    label: "1024 × 1280 · 4:5",
    width: 1024,
    height: 1280
  },

  "portrait-1024x1536": {
    label: "1024 × 1536 · 2:3",
    width: 1024,
    height: 1536
  },

  "portrait-1024x1792": {
    label: "1024 × 1792 · 4:7",
    width: 1024,
    height: 1792
  },

  "portrait-1152x2048": {
    label: "1152 × 2048 · 9:16",
    width: 1152,
    height: 2048
  }
};

const SIZE_GROUPS = [
  {
    label: "Square",
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
    label: "Landscape",
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
    label: "Portrait",
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


class ModelOutputError extends Error {

  constructor(
    message,
    outputCode = "INVALID_OUTPUT"
  ) {

    super(message);

    this.name =
      "ModelOutputError";

    this.outputCode =
      outputCode;

  }

}


class ProviderResponseError extends Error {

  constructor(
    message,
    status
  ) {

    super(message);

    this.name =
      "ProviderResponseError";

    this.status =
      status;

  }

}


function buildModelOptions() {

  return MODELS.map(
    (model) => {

      const checked =
        model.defaultSelected
          ? " checked"
          : "";

      return `
        <label class="model-option">

          <input
            type="checkbox"
            name="models"
            value="${model.key}"
            ${checked}
          />

          <span class="model-option-content">

            <strong>
              ${model.label}
            </strong>

            <small>
              ${model.description}
            </small>

          </span>

        </label>
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
                SIZES[key];

              const selected =
                key === "square-1024"
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
          <optgroup label="${group.label}">
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
        Arqivo does not intentionally maintain a database
        of prompts or generated images.
      </p>

    </footer>
  `;

}


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
    content="Privacy-focused AI image generation with multiple selectable models."
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

          Want to know exactly how generation data is handled?

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
                Choose one model, several models,
                or compare all four.
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

            ${buildModelOptions()}

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
          variations use more AI capacity.

          A single request is limited to
          8 generated images.

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


    ${buildFooter()}

  </div>

</body>

</html>`;


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
          Arqivo Image Gen is designed to minimize
          the amount of information the application
          stores about the people who use it.
        </p>

        <p class="last-updated">
          Last updated: August 16, 2026
        </p>

      </header>


      <section class="privacy-summary">

        <div class="privacy-summary-card">

          <strong>
            No accounts
          </strong>

          <p>
            Arqivo does not require you to create
            a user account or profile.
          </p>

        </div>


        <div class="privacy-summary-card">

          <strong>
            No prompt-history database
          </strong>

          <p>
            Arqivo does not intentionally save your
            prompts in an application database.
          </p>

        </div>


        <div class="privacy-summary-card">

          <strong>
            No image gallery
          </strong>

          <p>
            Generated images are returned to your
            browser instead of being intentionally
            saved to an Arqivo image library.
          </p>

        </div>

      </section>


      <article class="privacy-document">

        <section class="privacy-section">

          <h2>
            1. The short version
          </h2>

          <p>
            Arqivo Image Gen is built to generate an
            image, return that image to your browser,
            and avoid creating an application-level
            history of your activity.
          </p>

          <p>
            Arqivo does not intentionally maintain a
            database containing your prompts, generated
            images, generation history, user profile,
            or account information.
          </p>

          <div class="privacy-callout">

            <strong>
              Important:
            </strong>

            Arqivo runs on third-party infrastructure.
            Cloudflare and AI model providers involved
            in processing a request may handle technical
            or operational data according to their own
            systems and policies.

          </div>

        </section>


        <section class="privacy-section">

          <h2>
            2. Prompts
          </h2>

          <p>
            When you enter an image prompt and click
            Generate, the prompt is sent to the Arqivo
            Cloudflare Worker so the requested AI model
            can process it.
          </p>

          <p>
            The application does not intentionally write
            that prompt to a database, KV store, R2 bucket,
            Durable Object, prompt-history system, or other
            persistent application storage.
          </p>

          <p>
            Your prompt must still be transmitted through
            the infrastructure required to perform the
            generation. That processing is necessary for
            the service to work.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            3. Generated images
          </h2>

          <p>
            AI-generated images are produced by the
            selected Workers AI model and returned to
            the browser that requested them.
          </p>

          <p>
            Arqivo does not intentionally save those
            generated images to an application database
            or permanent image gallery.
          </p>

          <p>
            The browser receives the generated image
            data so that it can display the result and
            allow you to download it.
          </p>

          <p>
            If you refresh or close the page, Arqivo
            does not provide an application-level image
            history from which those images can later
            be restored.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            4. AI models
          </h2>

          <p>
            Arqivo can currently send generation requests
            to multiple image models available through
            Cloudflare Workers AI.
          </p>

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

          <p>
            Some models are operated directly through
            Cloudflare-hosted Workers AI infrastructure,
            while some may involve partner model
            technology.
          </p>

          <p>
            The selected model receives the information
            necessary to perform the image-generation
            request.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            5. IP addresses and network information
          </h2>

          <p>
            When you connect to any public website,
            network information such as an IP address
            is necessarily involved in delivering the
            request.
          </p>

          <p>
            Arqivo receives the Cloudflare-provided
            connecting IP address during a generation
            request and can provide it to Cloudflare
            Turnstile's server-side verification service
            as part of abuse prevention.
          </p>

          <p>
            Arqivo does not intentionally store that IP
            address in an application database.
          </p>

          <p>
            Cloudflare infrastructure may independently
            process or retain network and operational
            information according to Cloudflare's own
            service, security, and logging practices.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            6. Cloudflare Turnstile
          </h2>

          <p>
            Arqivo uses Cloudflare Turnstile to reduce
            automated abuse and protect the limited AI
            generation capacity available to the site.
          </p>

          <p>
            Before an image is generated, the browser
            obtains a Turnstile verification token.
            Arqivo sends that token to Cloudflare for
            server-side verification.
          </p>

          <p>
            Turnstile may evaluate browser, network,
            and security signals as part of determining
            whether a request is legitimate.
          </p>

          <p>
            Arqivo does not use the Turnstile token to
            create a user account or advertising profile.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            7. Browser storage
          </h2>

          <p>
            Arqivo does not intentionally use browser
            localStorage to maintain prompt history,
            generated-image history, or a user profile.
          </p>

          <p>
            Generated image data exists in the browser
            while the page is displaying the results.
          </p>

          <p>
            Your browser, Cloudflare Turnstile, or other
            browser-level systems may independently use
            temporary storage, caches, cookies, or similar
            mechanisms where required for normal browser
            or security functionality.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            8. Caching
          </h2>

          <p>
            Arqivo sends no-store and no-cache response
            headers for its application responses.
          </p>

          <p>
            These headers are intended to discourage
            browsers and intermediaries from retaining
            dynamic Arqivo responses as normal cached
            content.
          </p>

          <p>
            No web application can guarantee that every
            device, browser, network tool, screenshot
            utility, or infrastructure system will never
            retain a copy of information.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            9. Application logs
          </h2>

          <p>
            The Arqivo application is designed not to
            intentionally log prompts, generated image
            contents, Turnstile tokens, or full request
            bodies.
          </p>

          <p>
            Server-side error messages may be written
            when a generation or verification operation
            fails so that technical problems can be
            diagnosed.
          </p>

          <p>
            Infrastructure providers may separately
            maintain operational or security logs.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            10. Data Arqivo does not require
          </h2>

          <p>
            Arqivo does not require you to provide:
          </p>

          <ul>

            <li>
              your name
            </li>

            <li>
              an email address
            </li>

            <li>
              a phone number
            </li>

            <li>
              a mailing address
            </li>

            <li>
              a password
            </li>

            <li>
              payment information
            </li>

            <li>
              a social-media account
            </li>

          </ul>

        </section>


        <section class="privacy-section">

          <h2>
            11. No advertising profile
          </h2>

          <p>
            Arqivo does not intentionally build an
            advertising profile from your prompts or
            generated images.
          </p>

          <p>
            The application does not include an Arqivo
            advertising database or user-targeting
            profile system.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            12. Downloads
          </h2>

          <p>
            When you choose Download, the generated
            image is downloaded through your browser.
          </p>

          <p>
            After that point, the copy saved on your
            device is controlled by you and by the
            software and storage systems on your device.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            13. Security
          </h2>

          <p>
            Arqivo attempts to minimize its attack
            surface by avoiding user accounts,
            application databases, prompt-history
            storage, and permanent generated-image
            storage.
          </p>

          <p>
            The application also uses measures such as
            Turnstile verification, same-origin request
            checks, server-side secrets, request limits,
            and restrictive browser security headers.
          </p>

          <p>
            No public internet service can truthfully
            guarantee that it is impossible to compromise.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            14. Third-party infrastructure
          </h2>

          <p>
            Arqivo currently relies on Cloudflare
            infrastructure to operate the website,
            execute the Worker, perform Turnstile
            verification, and provide access to
            Workers AI models.
          </p>

          <p>
            Because these systems are operated outside
            of Arqivo's application code, their own
            privacy, security, abuse-prevention, and
            operational practices may apply.
          </p>

          <p>
            This privacy page describes what the Arqivo
            application itself is intentionally designed
            to collect and retain. It should not be read
            as a claim that third-party infrastructure
            performs zero logging.
          </p>

        </section>


        <section class="privacy-section">

          <h2>
            15. Changes to this page
          </h2>

          <p>
            Arqivo may update this privacy page when the
            application's models, infrastructure, storage
            behavior, or features change.
          </p>

          <p>
            If a future feature begins storing information
            that is currently not stored, this page should
            be updated to describe that change.
          </p>

        </section>


        <section class="privacy-section privacy-final">

          <h2>
            Privacy by architecture
          </h2>

          <p>
            Arqivo's privacy approach is based primarily
            on avoiding unnecessary data collection in
            the first place.
          </p>

          <div class="privacy-flow">

            <span>
              Your prompt
            </span>

            <span class="privacy-arrow">
              →
            </span>

            <span>
              AI generation
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
  color: var(--accent-hover);
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

  margin: 0 auto;

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

  letter-spacing: -0.02em;
}


.brand:hover {
  color: var(--text);
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


.site-nav a:hover {
  color: var(--text);

  background:
    rgba(
      110,
      168,
      254,
      0.08
    );
}


.site-nav .nav-active {
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
  width:
    min(
      var(--max-width),
      calc(100% - 2rem)
    );

  margin: 0 auto;

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


.lead {
  color: var(--muted);

  margin:
    0
    0
    0.7rem;

  line-height: 1.6;

  max-width: 760px;
}


.privacy-shortcut {
  color: var(--muted);

  margin:
    0
    0
    1.5rem;

  font-size: 0.9rem;
}


.privacy-shortcut a {
  font-weight: 700;
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

  background: var(--panel-2);

  color: var(--text);

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

  justify-content: space-between;

  gap: 1rem;

  margin-bottom: 0.8rem;
}


.helper {
  margin:
    0.25rem
    0
    0;

  color: var(--muted);

  font-size: 0.9rem;
}


.model-actions {
  display: flex;

  gap: 0.5rem;

  flex-shrink: 0;
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
  background: var(--accent-hover);
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


.small-button.secondary {
  background: transparent;

  color: var(--text);

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

  background: var(--panel-2);

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
  border-color: var(--border-hover);

  background: var(--panel-3);
}


.model-option:has(input:checked) {
  border-color: var(--accent);
}


.model-option input {
  width: 18px;

  height: 18px;

  flex:
    0
    0
    auto;

  accent-color: var(--accent);
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
  color: var(--muted);

  font-weight: 400;
}


.controls {
  display: grid;

  grid-template-columns:
    repeat(
      4,
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

  color: var(--muted);
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

  color: var(--muted);
}


.field-help,
.quota-note {
  color: var(--muted);

  font-size: 0.82rem;

  line-height: 1.5;
}


.quota-note {
  margin:
    0
    0
    1rem;
}


.verification-area {
  margin-top: 0.5rem;
}


.status {
  min-height: 1.5rem;

  margin:
    1rem
    0;

  color: var(--muted);

  font-size: 1.05rem;
}


.status[data-tone="success"] {
  color: var(--success);
}


.status[data-tone="warning"] {
  color: var(--warning);
}


.status[data-tone="error"] {
  color: var(--danger);
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
  color: var(--muted);

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

  color: var(--text);

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
  border-color: var(--border-hover);
}


/* ----------------------------------
   BETTER MODEL ERROR CARDS
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
  display: inline-flex;

  align-items: center;

  gap: 0.35rem;

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

  border:
    1px
    solid
    rgba(
      255,
      141,
      141,
      0.22
    );

  font-size: 0.74rem;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.06em;
}


.error-title {
  margin:
    0
    0
    0.45rem;

  color: var(--text);

  font-size: 1rem;

  font-weight: 850;
}


.error-message {
  margin: 0;

  color: var(--muted);

  line-height: 1.6;

  font-size: 0.92rem;
}


.error-hint {
  margin:
    0.75rem
    0
    0;

  padding-top: 0.75rem;

  border-top:
    1px
    solid
    rgba(
      255,
      141,
      141,
      0.16
    );

  color: var(--muted);

  line-height: 1.55;

  font-size: 0.86rem;
}


.error-code {
  display: inline-block;

  margin-top: 0.75rem;

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

  font-size: 0.72rem;
}


.hidden {
  display: none !important;
}


/* ----------------------------------
   PRIVACY PAGE
---------------------------------- */


.privacy-container {
  max-width: 1000px;
}


.privacy-hero {
  padding:
    2rem
    0
    1.5rem;
}


.eyebrow {
  color: var(--accent);

  text-transform: uppercase;

  letter-spacing: 0.14em;

  font-size: 0.78rem;

  font-weight: 900;

  margin:
    0
    0
    0.8rem;
}


.privacy-hero h1 {
  max-width: 900px;

  font-size:
    clamp(
      2.3rem,
      5vw,
      4.5rem
    );
}


.privacy-lead {
  max-width: 800px;

  font-size:
    clamp(
      1rem,
      2vw,
      1.2rem
    );
}


.last-updated {
  color: var(--muted);

  font-size: 0.82rem;

  margin-top: 1rem;
}


.privacy-summary {
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

  border-radius: 16px;

  padding: 1.1rem;
}


.privacy-summary-card strong {
  display: block;

  margin-bottom: 0.45rem;

  font-size: 0.95rem;
}


.privacy-summary-card p {
  color: var(--muted);

  margin: 0;

  line-height: 1.55;

  font-size: 0.88rem;
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

  border-radius: 20px;

  overflow: hidden;
}


.privacy-section {
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


.privacy-section:last-child {
  border-bottom: 0;
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

  letter-spacing: -0.02em;
}


.privacy-section p {
  color: var(--muted);

  line-height: 1.75;

  margin:
    0
    0
    1rem;
}


.privacy-section p:last-child {
  margin-bottom: 0;
}


.privacy-section ul {
  color: var(--muted);

  line-height: 1.75;

  padding-left: 1.4rem;
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

  border-radius: 12px;

  padding: 1rem;

  color: var(--muted);

  line-height: 1.65;

  margin-top: 1rem;
}


.privacy-callout strong {
  color: var(--text);
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
  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 0.7rem;

  margin:
    1.2rem
    0;
}


.privacy-flow span:not(.privacy-arrow) {
  background: var(--panel-2);

  border:
    1px
    solid
    var(--border);

  border-radius: 999px;

  padding:
    0.55rem
    0.85rem;

  color: var(--text);

  font-size: 0.9rem;

  font-weight: 700;
}


.privacy-arrow {
  color: var(--accent);

  font-weight: 900;
}


.primary-link-button {
  display: inline-block;

  margin-top: 0.5rem;

  background: var(--accent);

  color: #08101f;

  text-decoration: none;

  font-weight: 800;

  border-radius: 999px;

  padding:
    0.85rem
    1.1rem;
}


.primary-link-button:hover {
  color: #08101f;

  background: var(--accent-hover);
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

  color: var(--muted);
}


.footer-inner {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;
}


.footer-inner p {
  margin: 0;

  font-weight: 800;

  color: var(--text);
}


.footer-links {
  display: flex;

  gap: 1rem;
}


.footer-links a {
  color: var(--muted);

  text-decoration: none;

  font-size: 0.9rem;

  font-weight: 700;
}


.footer-links a:hover {
  color: var(--text);
}


.footer-note {
  margin:
    0.8rem
    0
    0;

  color: var(--muted);

  font-size: 0.78rem;

  line-height: 1.5;
}


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
    grid-template-columns: 1fr;
  }


  .privacy-summary {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 700px) {

  .controls,
  .model-grid,
  .custom-size-controls {
    grid-template-columns: 1fr;
  }


  .section-heading {
    flex-direction: column;
  }


  .size-separator {
    display: none;
  }


  .topbar {
    align-items: flex-start;
  }


  .footer-inner {
    align-items: flex-start;

    flex-direction: column;
  }


  .privacy-section {
    padding:
      1.25rem
      1rem;
  }

}
`;


const JS = `
const MAX_IMAGES_PER_REQUEST = 8;
const MAX_TOTAL_PIXELS = 12582912;


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


const imagesPerModelEl =
  document.getElementById(
    'images-per-model'
  );


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


function getImagesPerModel() {

  const value =
    Number.parseInt(
      imagesPerModelEl.value,
      10
    );


  return [1, 2, 4].includes(value)
    ? value
    : 1;

}


function isValidCustomDimension(
  value
) {

  return (
    Number.isInteger(value) &&
    value >= 256 &&
    value <= 2048 &&
    value % 64 === 0
  );

}


function getChosenDimensions() {

  if (
    sizeEl.value === 'custom'
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
    summary.modelCount === 0
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
    sizeEl.value === 'custom'
  ) {

    customSizeControls
      .classList
      .remove('hidden');

  } else {

    customSizeControls
      .classList
      .add('hidden');

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


sizeEl
  .addEventListener(
    'change',
    updateCustomSizeVisibility
  );


imagesPerModelEl
  .addEventListener(
    'change',
    updateGenerateButton
  );


customWidthEl
  .addEventListener(
    'input',
    updateGenerateButton
  );


customHeightEl
  .addEventListener(
    'input',
    updateGenerateButton
  );


function extensionForDataURI(
  dataURI
) {

  const value =
    String(dataURI);


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


  card.appendChild(
    heading
  );


  if (
    item.error
  ) {

    card.classList.add(
      'error-card'
    );


    const errorInfo =
      typeof item.error === 'object' &&
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
      'Generation error'
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
    .remove('hidden');


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
    typeof data.error === 'string' &&
    data.error.trim()
  ) {

    return data.error;

  }


  if (
    response.status === 429
  ) {

    return 'Arqivo is receiving too many generation requests right now. Please try again shortly.';

  }


  if (
    response.status >= 500
  ) {

    return 'The generation service is temporarily unavailable. Please try again shortly.';

  }


  return 'Generation failed.';

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
      selectedModels.length === 0
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
      size === 'custom' &&
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
      .add('hidden');


    resultsEl.innerHTML =
      '';


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


      const summaryResult =
        renderResults(
          data.results ||
          []
        );


      if (
        summaryResult.failed === 0
      ) {

        setStatus(
          summaryResult.successful +
          (
            summaryResult.successful === 1
              ? ' image completed.'
              : ' images completed.'
          ),
          'success'
        );

      } else if (
        summaryResult.successful === 0
      ) {

        setStatus(
          'All selected generations failed. See each model card for the reason and what to try next.',
          'error'
        );

      } else {

        setStatus(
          summaryResult.successful +
          ' completed, ' +
          summaryResult.failed +
          ' failed. See the failed model cards for details.',
          'warning'
        );

      }

    } catch (
      error
    ) {

      console.error(
        'Generation request failed.'
      );


      setStatus(
        error &&
        error.message

          ? error.message

          : 'Something went wrong while contacting the generation service.',

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
      (
        url.pathname === "/privacy" ||
        url.pathname === "/privacy/"
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

      ? body.models.map(
          (value) =>
            String(value)
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
          MODELS_BY_KEY[key]
      )
      .filter(
        Boolean
      );


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


  const taskFactories =
    [];


  for (
    const model
    of selectedModels
  ) {

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


      taskFactories.push(
        () =>
          generateImageForModel(
            env,
            model,
            finalPrompt,
            negativePrompt,
            width,
            height,
            quality,
            variationSeed,
            variationIndex + 1,
            imagesPerModel
          )
      );

    }

  }


  const results =
    await runWithConcurrency(
      taskFactories,
      2
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


async function runWithConcurrency(
  taskFactories,
  limit
) {

  const results =
    new Array(
      taskFactories.length
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
        taskFactories.length
      ) {

        return;

      }


      results[index] =
        await taskFactories[
          index
        ]();

    }

  }


  const workers =
    Array.from(
      {
        length:
          Math.min(
            limit,
            taskFactories.length
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
   ERROR HELPERS
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
      typeof value === "string" &&
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

        error?.code,

        error?.errorCode,

        error?.cause?.code,

        error?.cause?.errorCode

      ]
    );


  const messageParts =
    [

      error?.message,

      error?.cause?.message,

      error?.response?.statusText,

      typeof error?.error === "string"
        ? error.error
        : ""

    ].filter(
      (value) =>
        typeof value === "string" &&
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
        typeof item?.message === "string" &&
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
    ModelOutputError
  ) {

    return {

      code:
        "INVALID_MODEL_OUTPUT",

      title:
        "The model returned an unusable image",

      message:
        "The model finished, but Arqivo could not read the image data it returned.",

      hint:
        "Try this model again. If it keeps happening, use another model while the output format issue is investigated.",

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


  const isQuota =
    /quota|daily limit|usage limit|neurons|allocation|exceeded.*limit|limit.*exceeded|insufficient.*quota/.test(
      haystack
    );


  const isRateLimited =
    info.status === 429 ||
    /rate limit|too many requests|throttl|temporarily busy|capacity/.test(
      haystack
    );


  /*
   * Daily / account usage exhausted
   */

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
        "Try again after the AI allowance resets, or reduce the number of models, variations, resolution, or quality settings.",

      retryable:
        false

    };

  }


  /*
   * Temporary rate limiting / capacity
   */

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
        "Wait a short time and try again. You can also generate with fewer models or fewer variations.",

      retryable:
        true

    };

  }


  /*
   * Billing requirement
   */

  if (
    /billing|payment|paid plan|subscription|credit balance|insufficient balance|requires.*paid/.test(
      haystack
    )
  ) {

    return {

      code:
        "MODEL_REQUIRES_BILLING",

      title:
        "This model is not available on the current account setup",

      message:
        context.model.label +
        " appears to require billing or account access that is not currently enabled.",

      hint:
        "Use another model. Do not add billing just to clear this message unless you intentionally want to change the project's cost policy.",

      retryable:
        false

    };

  }


  /*
   * Permissions / authentication
   */

  if (
    info.status === 401 ||
    info.status === 403 ||
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
        " rejected the request because the Worker account or AI binding does not have the required access.",

      hint:
        "Use another model and check the Workers AI model availability and account permissions before changing credentials.",

      retryable:
        false

    };

  }


  /*
   * Model ID missing / retired / unavailable
   */

  if (
    info.status === 404 ||
    /model.*not found|not found.*model|unknown model|does not exist|model unavailable/.test(
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
        " could not be found or is not currently available through Workers AI.",

      hint:
        "Use another model. If this persists, verify the model ID in the MODELS configuration.",

      retryable:
        false

    };

  }


  /*
   * Resolution / parameter problems
   */

  if (
    /width|height|dimension|resolution|image size|multiple of|invalid parameter|validation|out of range|must be between|unsupported.*size/.test(
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
        "Try 1024 × 1024 first. If that works, use a smaller or more standard resolution for this model.",

      retryable:
        true

    };

  }


  /*
   * Timeout
   */

  if (
    /timeout|timed out|deadline|execution time/.test(
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
        " did not finish the image before the generation request timed out.",

      hint:
        "Try again with fewer variations, a smaller resolution, or Standard quality.",

      retryable:
        true

    };

  }


  /*
   * Content / moderation rejection
   */

  if (
    /safety|moderation|content policy|policy violation|blocked prompt|unsafe|content blocked/.test(
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
        " did not generate an image because the request was rejected by the model or its safety system.",

      hint:
        "Revise the prompt and try again. Different models can apply different request filters.",

      retryable:
        false

    };

  }


  /*
   * Provider outage / 5xx
   */

  if (
    info.status >= 500 ||
    /internal server error|service unavailable|bad gateway|gateway timeout|upstream|overloaded|temporary failure/.test(
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
        " encountered a temporary provider-side error while generating the image.",

      hint:
        "Try again shortly. If only this model keeps failing, use another model until it recovers.",

      retryable:
        true

    };

  }


  /*
   * Network / connection problems
   */

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
        "Try again shortly. If other models work, the issue is probably isolated to this model or provider path.",

      retryable:
        true

    };

  }


  /*
   * Unknown fallback
   */

  return {

    code:
      "MODEL_GENERATION_FAILED",

    title:
      "This model could not complete the image",

    message:
      context.model.label +
      " encountered an unexpected generation error.",

    hint:
      "Try the same prompt again. If it repeatedly fails, try another model, a smaller resolution, or Standard quality.",

    retryable:
      true

  };

}


/*
 * Privacy-conscious logging.
 *
 * Notice that this intentionally does NOT log:
 *
 * - prompt
 * - negative prompt
 * - image bytes
 * - base64 image
 * - Turnstile token
 * - IP address
 * - full request body
 */

function logModelFailure(
  model,
  publicError,
  error
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

      modelId:
        model.id,

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


async function generateImageForModel(
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


    const dataURI =
      await outputToDataURI(
        output
      );


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
      error
    );


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

      variation:
        variation,

      totalVariations:
        totalVariations,

      error:
        publicError

    };

  }

}


async function outputToDataURI(
  output
) {

  /*
   * Base64 object output
   */

  if (
    output &&
    typeof output === "object" &&
    typeof output.image === "string"
  ) {

    return base64ImageToDataURI(
      output.image
    );

  }


  /*
   * Response object output
   */

  if (
    output instanceof Response
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
         * Keep generic error.
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
      ) || "";


    const arrayBuffer =
      await output.arrayBuffer();


    return arrayBufferToDataURI(
      arrayBuffer,
      contentType
    );

  }


  /*
   * ArrayBuffer output
   */

  if (
    output instanceof ArrayBuffer
  ) {

    return arrayBufferToDataURI(
      output,
      ""
    );

  }


  /*
   * Uint8Array or another ArrayBuffer view
   */

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


  /*
   * Empty result
   */

  if (
    !output
  ) {

    throw new ModelOutputError(
      "The model returned no image data.",
      "EMPTY_OUTPUT"
    );

  }


  /*
   * ReadableStream output
   */

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
    bytes.length < 8
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

  /*
   * PNG
   */

  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {

    return "image/png";

  }


  /*
   * JPEG
   */

  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {

    return "image/jpeg";

  }


  /*
   * WebP
   */

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