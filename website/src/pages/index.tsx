import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

/* ── Hero ─────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.heroBadge}>v0.1.0 — CLI MVP · MIT · Local-first</div>
      <h1 className={styles.heroTitle}>
        <span className={styles.heroGradient}>DevDocs Forge Agent</span>
      </h1>
      <p className={styles.heroTagline}>
        Turn tutorial transcripts into beautiful developer documentation.
      </p>
      <p className={styles.heroSubtext}>
        Local-first AI documentation agent for developers, DevRel teams,
        course creators, and open-source maintainers.
        No scraping. No lock-in. Bring your own model key.
      </p>
      <div className={styles.heroCtas}>
        <Link to="/docs/quick-start" className={styles.ctaPrimary}>
          Run it now →
        </Link>
        <Link
          to="https://github.com/AnkitParekh007/devdocs-forge-agent"
          className={styles.ctaSecondary}
        >
          View source
        </Link>
      </div>
    </section>
  );
}

/* ── Terminal demo ─────────────────────────────────────────── */
function TerminalSection() {
  return (
    <section className={styles.terminalSection}>
      <div className={styles.terminalWrap}>
        <div className={styles.terminalWindow}>
          <div className={styles.terminalBar}>
            <span className={clsx(styles.terminalDot, styles.terminalDotRed)} />
            <span className={clsx(styles.terminalDot, styles.terminalDotYellow)} />
            <span className={clsx(styles.terminalDot, styles.terminalDotGreen)} />
            <span className={styles.terminalTitle}>npm run demo</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.terminalCmd}>git clone https://github.com/AnkitParekh007/devdocs-forge-agent.git</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.terminalCmd}>cd devdocs-forge-agent &amp;&amp; npm install</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.terminalCmd}>cp .env.example .env</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.terminalCmd}>npm run demo</span>
            </div>
            <br />
            <div className={styles.terminalLine}>
              <span className={styles.terminalOk}>  OK</span>
              <span className={styles.terminalCmd}>&nbsp; Node.js v22</span>
              <span className={styles.terminalDim}>&nbsp;&nbsp;{'>'} 18 required</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalOk}>  OK</span>
              <span className={styles.terminalCmd}>&nbsp; provider: mock</span>
              <span className={styles.terminalDim}>&nbsp;&nbsp;no API key needed</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalInfo}>  Generating with provider: mock</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalSuccess}>  ✓ Documentation generated successfully!</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalInfo}>&nbsp; Output: output/angular-signals-tutorial-2026-05-13/</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Value prop ────────────────────────────────────────────── */
function ValuePropSection() {
  return (
    <section className={styles.valueProp}>
      <div className={styles.valuePropInner}>
        <p className={styles.valuePropQuote}>
          Videos are great for learning.{' '}
          <span>Docs are great for shipping.</span>
        </p>
        <p className={styles.valuePropSub}>
          DevDocs Forge Agent converts your tutorial transcripts, product demos, and lesson
          notes into structured developer documentation — locally, with your own model key.
        </p>
      </div>
    </section>
  );
}

/* ── Features ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🖥️',
    title: 'Local-first',
    desc: 'Runs entirely on your machine. No cloud backend, no data leaving your environment.',
  },
  {
    icon: '🔑',
    title: 'Bring your own key',
    desc: 'OpenAI, Anthropic, or Gemini. Swap providers with one env var change.',
  },
  {
    icon: '🎭',
    title: 'Mock mode',
    desc: 'Full output in mock mode — no API key needed for development and demos.',
  },
  {
    icon: '📄',
    title: 'Markdown-first',
    desc: 'Every output is plain Markdown. Drop directly into any docs system.',
  },
  {
    icon: '🦕',
    title: 'Docusaurus-ready',
    desc: 'Generates correct YAML frontmatter, sidebar config, and admonition syntax.',
  },
  {
    icon: '📚',
    title: 'GitBook-ready',
    desc: 'GitBook hint blocks, page structure, and navigation hints included.',
  },
  {
    icon: '🛡️',
    title: 'Video Intake Guard',
    desc: 'Validates video URLs, classifies tech content, blocks non-technical or scraped content.',
  },
  {
    icon: '🚫',
    title: 'No scraping',
    desc: 'devdocs-forge-agent never scrapes YouTube. You always provide your own transcript.',
  },
  {
    icon: '✅',
    title: 'Human review checklist',
    desc: 'Every run generates a checklist to review before publishing.',
  },
  {
    icon: '🔌',
    title: 'Easy to extend',
    desc: 'Add a provider in ~60 lines. Add a mode with zero TypeScript.',
  },
];

function FeaturesSection() {
  return (
    <section className={clsx(styles.section, styles.sectionDark)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>Features</span>
          <h2 className={styles.sectionTitle}>Everything you need. Nothing you don't.</h2>
          <p className={styles.sectionSubtitle}>
            Built for developers who want clean documentation tooling — local, fast, and fully controllable.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── What it generates ─────────────────────────────────────── */
const GENERATES = [
  { from: 'Tutorial transcript', to: 'Step-by-step developer guide' },
  { from: 'Product demo transcript', to: 'Help docs / onboarding page' },
  { from: 'Course lesson notes', to: 'Lesson page with objectives' },
  { from: 'Raw learning notes', to: 'Developer blog post' },
  { from: 'Bug walkthrough', to: 'Troubleshooting guide' },
  { from: 'API demo transcript', to: 'README tutorial' },
];

function GeneratesSection() {
  return (
    <section className={clsx(styles.section)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>What it generates</span>
          <h2 className={styles.sectionTitle}>Transcript in. Developer docs out.</h2>
          <p className={styles.sectionSubtitle}>
            11 output modes. One command.
          </p>
        </div>
        <div className={styles.generatesGrid}>
          {GENERATES.map((g) => (
            <div key={g.from} className={styles.generateCard}>
              <span className={styles.generateArrow}>→</span>
              <div>
                <p className={styles.generateFrom}>{g.from}</p>
                <p className={styles.generateTo}>{g.to}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Providers ─────────────────────────────────────────────── */
function ProvidersSection() {
  return (
    <section className={clsx(styles.section, styles.sectionDark)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>AI Providers</span>
          <h2 className={styles.sectionTitle}>Your model. Your API key.</h2>
          <p className={styles.sectionSubtitle}>
            Switch providers with one line. No SDK packages — pure native fetch throughout.
          </p>
        </div>
        <div className={styles.providerGrid}>
          <div className={clsx(styles.providerCard, styles.providerMock)}>
            <div className={styles.providerName}>Mock</div>
            <span className={clsx(styles.providerTag, styles.tagFree)}>Default · Free</span>
            <p className={styles.providerDesc}>
              Generates structured output with no API key. Perfect for development and demos.
            </p>
            <div className={styles.providerEnv}>
              DEVDOCS_PROVIDER=mock
            </div>
          </div>
          <div className={clsx(styles.providerCard, styles.providerOpenai)}>
            <div className={styles.providerName}>OpenAI</div>
            <span className={clsx(styles.providerTag, styles.tagPaid)}>API key required</span>
            <p className={styles.providerDesc}>
              GPT-4.1-mini for fast/cheap docs. GPT-4.1 for highest quality output.
            </p>
            <div className={styles.providerEnv}>
              DEVDOCS_PROVIDER=openai<br />
              OPENAI_API_KEY=sk-...
            </div>
          </div>
          <div className={clsx(styles.providerCard, styles.providerAnthropic)}>
            <div className={styles.providerName}>Anthropic</div>
            <span className={clsx(styles.providerTag, styles.tagPaid)}>API key required</span>
            <p className={styles.providerDesc}>
              Claude 3.5 Sonnet for best-in-class technical writing quality.
            </p>
            <div className={styles.providerEnv}>
              DEVDOCS_PROVIDER=anthropic<br />
              ANTHROPIC_API_KEY=sk-ant-...
            </div>
          </div>
          <div className={clsx(styles.providerCard, styles.providerGemini)}>
            <div className={styles.providerName}>Gemini</div>
            <span className={clsx(styles.providerTag, styles.tagPaid)}>API key required</span>
            <p className={styles.providerDesc}>
              Gemini 2.0 Flash for fast, cost-effective generation at scale.
            </p>
            <div className={styles.providerEnv}>
              DEVDOCS_PROVIDER=gemini<br />
              GEMINI_API_KEY=...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Video Intake Guard ─────────────────────────────────────── */
function IntakeGuardSection() {
  return (
    <section className={clsx(styles.section)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>Safety</span>
          <h2 className={styles.sectionTitle}>Video Intake Guard</h2>
          <p className={styles.sectionSubtitle}>
            When you provide a video URL, three checks run automatically before any generation starts.
          </p>
        </div>
        <div className={styles.intakeGrid}>
          <ul className={styles.intakeSteps}>
            <li className={styles.intakeStep}>
              <div className={styles.intakeStepNum}>1</div>
              <div className={styles.intakeStepText}>
                <p className={styles.intakeStepTitle}>URL Validation</p>
                <p className={styles.intakeStepDesc}>
                  Only YouTube and Vimeo URLs are accepted. Malformed or unsupported URLs are rejected immediately.
                </p>
              </div>
            </li>
            <li className={styles.intakeStep}>
              <div className={styles.intakeStepNum}>2</div>
              <div className={styles.intakeStepText}>
                <p className={styles.intakeStepTitle}>Tech Video Classification</p>
                <p className={styles.intakeStepDesc}>
                  Scores the video's title, description, tags, and category (0–100). Score &lt; 35 blocks generation unless <code>--force</code> is set.
                </p>
              </div>
            </li>
            <li className={styles.intakeStep}>
              <div className={styles.intakeStepNum}>3</div>
              <div className={styles.intakeStepText}>
                <p className={styles.intakeStepTitle}>Transcript Requirement</p>
                <p className={styles.intakeStepDesc}>
                  You must always provide <code>--file</code> with your own transcript. URL-only generation is blocked by design.
                </p>
              </div>
            </li>
          </ul>

          <div className={styles.intakeNeverBox}>
            <p className={styles.intakeNeverTitle}>devdocs-forge-agent never</p>
            <ul className={styles.intakeNeverList}>
              {[
                'Scrapes YouTube transcripts or captions',
                'Downloads video files or audio',
                'Accesses YouTube captions API',
                'Auto-fetches transcript text from any URL',
                'Generates docs without a user-provided file',
              ].map((item) => (
                <li key={item} className={styles.intakeNeverItem}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Output preview ────────────────────────────────────────── */
const OUTPUT_FILES = [
  {
    name: 'index.md',
    desc: 'Main generated documentation — full content ready to review and publish.',
  },
  {
    name: 'metadata.json',
    desc: 'Provider, model, word count, source URL, and generation timestamp.',
  },
  {
    name: 'review-checklist.md',
    desc: 'Human review checklist: verify facts, test code, check attribution.',
  },
  {
    name: 'source-summary.md',
    desc: 'Source word count, slug, detected title, and source URL.',
  },
  {
    name: 'docs/{slug}.md',
    desc: 'Docusaurus-ready copy with YAML frontmatter and sidebar config.',
  },
];

function OutputSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>Output</span>
          <h2 className={styles.sectionTitle}>Every run. Five files.</h2>
          <p className={styles.sectionSubtitle}>
            Generated docs land in a timestamped output folder — ready to review, commit, or publish.
          </p>
        </div>
        <div className={styles.outputGrid}>
          <div className={styles.fileTree}>
            <div className={styles.fileTreeBar}>output/angular-signals-tutorial-2026-05-13/</div>
            <div className={styles.fileTreeBody}>
              <div><span className={styles.fileDir}>output/</span></div>
              <div>&nbsp;&nbsp;<span className={styles.fileDir}>angular-signals-tutorial-2026-05-13/</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileItem}>index.md</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileItem}>metadata.json</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileItem}>review-checklist.md</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileItem}>source-summary.md</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileDir}>docs/</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileItem}>angular-signals-tutorial.md</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileDim}>← Docusaurus-ready with frontmatter</span></div>
            </div>
          </div>
          <div className={styles.fileCards}>
            {OUTPUT_FILES.map((f) => (
              <div key={f.name} className={styles.fileCard}>
                <p className={styles.fileCardName}>{f.name}</p>
                <p className={styles.fileCardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contributing ──────────────────────────────────────────── */
function ContributingSection() {
  const ways = [
    'Add a provider',
    'Add a mode',
    'Improve prompts',
    'Add examples',
    'Improve docs',
    'Build the UI',
  ];

  return (
    <section className={styles.contributing}>
      <div className={styles.contributingInner}>
        <h2 className={styles.contributingTitle}>Fork it. Make it yours.</h2>
        <p className={styles.contributingDesc}>
          devdocs-forge-agent is MIT licensed and designed to be extended.
          Add a provider in ~60 lines of TypeScript. Add a new output mode with zero TypeScript.
          5 good-first issues are open and waiting.
        </p>
        <div className={styles.contributingWays}>
          {ways.map((w) => (
            <span key={w} className={styles.contributingWay}>{w}</span>
          ))}
        </div>
        <div className={styles.contributingCtas}>
          <Link
            to="https://github.com/AnkitParekh007/devdocs-forge-agent/issues?q=label%3A%22good+first+issue%22"
            className={styles.ctaPrimary}
          >
            Good first issues →
          </Link>
          <Link to="/docs/contributing" className={styles.ctaSecondary}>
            Contributing guide
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Local-first AI documentation agent that turns tutorial transcripts into developer docs."
    >
      <HeroSection />
      <TerminalSection />
      <ValuePropSection />
      <FeaturesSection />
      <GeneratesSection />
      <ProvidersSection />
      <IntakeGuardSection />
      <OutputSection />
      <ContributingSection />
    </Layout>
  );
}
