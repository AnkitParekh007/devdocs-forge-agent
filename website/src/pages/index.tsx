import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

/* ── 1. AI-native hero ─────────────────────────────────────── */
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      <div className={styles.gridBg} />
      <div className={styles.heroLayout}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBadge}>v0.1.0 · CLI MVP · MIT · Local-first</div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroGradient}>DevDocs Forge Agent</span>
          </h1>
          <p className={styles.heroTagline}>
            Turn tutorial transcripts into beautiful developer documentation.
          </p>
          <p className={styles.heroSubtext}>
            Local-first AI docs agent for developers, DevRel teams, and course creators.
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
        </div>

        <div className={styles.heroConsole}>
          <div className={styles.heroConsoleBar}>
            <span className={clsx(styles.consoleDot, styles.consoleDotRed)} />
            <span className={clsx(styles.consoleDot, styles.consoleDotYellow)} />
            <span className={clsx(styles.consoleDot, styles.consoleDotGreen)} />
            <span className={styles.heroConsoleTitle}>devdocs-forge-agent generate</span>
          </div>
          <div className={styles.heroConsoleBody}>
            <div className={styles.consoleSection}>
              <div className={styles.consoleSectionLabel}>INPUT</div>
              <div className={styles.consoleFile}>
                <span className={styles.consoleCheck}>📄</span>
                <span>angular-signals-tutorial.md</span>
              </div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleDim}>  mode: docusaurus · 2,841 words</span>
              </div>
            </div>
            <div className={styles.consoleDivider} />
            <div className={styles.consoleSection}>
              <div className={styles.consoleSectionLabel}>AGENT</div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleCheck}>✓</span>
                <span>Video Intake Guard: passed</span>
              </div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleCheck}>✓</span>
                <span>Prompt built for docusaurus</span>
              </div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleCheck}>✓</span>
                <span>Generating with claude-3.5-sonnet</span>
              </div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleCheck}>✓</span>
                <span>Writing output files</span>
              </div>
            </div>
            <div className={styles.consoleDivider} />
            <div className={styles.consoleSection}>
              <div className={styles.consoleSectionLabel}>OUTPUT</div>
              <div className={styles.consoleSuccess}>
                <span>✓</span>
                <span>Documentation generated!</span>
              </div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleDim}>  output/angular-signals-tutorial-2026-05-13/</span>
              </div>
              <div className={styles.consoleStep}>
                <span className={styles.consoleDim}>  5 files · ready to review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Trust strip ────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: '⚖️',  label: 'MIT License' },
  { icon: '✅',  label: '54 tests passing' },
  { icon: '🚫',  label: 'No YouTube scraping' },
  { icon: '🤖',  label: '4 AI providers' },
  { icon: '🖥️',  label: 'Local-first' },
  { icon: '📦',  label: 'TypeScript strict mode' },
];

function TrustStripSection() {
  return (
    <div className={styles.trustStrip}>
      <div className={styles.trustStripInner}>
        {TRUST_ITEMS.map((item) => (
          <div key={item.label} className={styles.trustItem}>
            <span className={styles.trustIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3. Terminal demo ──────────────────────────────────────── */
function TerminalSection() {
  return (
    <section className={styles.terminalSection}>
      <div className={styles.terminalSectionBg} />
      <div className={styles.terminalSectionInner}>
        <div className={styles.sectionCentered} style={{ marginBottom: '2.5rem' }}>
          <span className={styles.sectionLabel}>Try it now</span>
          <h2 className={styles.sectionTitle}>Up and running in 60 seconds.</h2>
          <p className={styles.sectionSubtitle} style={{ marginBottom: 0 }}>
            Mock mode ships built-in — no API key required to generate your first doc.
          </p>
        </div>
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
              <span className={styles.terminalCmd}>cd devdocs-forge-agent &amp;&amp; npm install &amp;&amp; cp .env.example .env</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.terminalCmd}>npm run demo</span>
            </div>
            <div className={styles.terminalSpacer} />
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
              <span className={styles.terminalGuard}>  🛡️</span>
              <span className={styles.terminalCmd}>&nbsp; Video Intake Guard: enabled</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalInfo}>  Generating with provider: mock · mode: docusaurus</span>
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

/* ── 4. Agent pipeline ─────────────────────────────────────── */
const PIPELINE_NODES = [
  { icon: '📄', label: 'Your Transcript', desc: '.md · .txt · .vtt', highlight: false },
  { icon: '🛡️', label: 'Intake Guard', desc: 'URL + tech classification', highlight: true },
  { icon: '⚡', label: 'Prompt Builder', desc: 'Mode-specific templates', highlight: false },
  { icon: '🤖', label: 'AI Provider', desc: 'OpenAI · Anthropic · Gemini', highlight: false },
  { icon: '📂', label: 'Output Writer', desc: '5 files per run', highlight: false },
];

function AgentPipelineSection() {
  return (
    <section className={styles.pipelineSection}>
      <div className={styles.pipelineSectionBg} />
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>How it works</span>
          <h2 className={styles.sectionTitle}>A five-stage documentation pipeline.</h2>
          <p className={styles.sectionSubtitle}>
            Each stage is independently testable. The Intake Guard blocks non-technical content before any tokens are consumed.
          </p>
        </div>
        <div className={styles.pipelineFlow}>
          {PIPELINE_NODES.map((node, i) => (
            <React.Fragment key={node.label}>
              <div className={clsx(styles.pipelineNode, node.highlight && styles.pipelineNodeHighlight)}>
                <span className={styles.pipelineIcon}>{node.icon}</span>
                <p className={styles.pipelineNodeLabel}>{node.label}</p>
                <p className={styles.pipelineNodeDesc}>{node.desc}</p>
              </div>
              {i < PIPELINE_NODES.length - 1 && (
                <div className={styles.pipelineArrow}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Before → After ─────────────────────────────────────── */
const BEFORE_ITEMS = [
  'Tutorial transcript',
  'Product demo notes',
  'Course lesson recording',
  'Internal walkthrough',
  'Raw technical notes',
];

const AFTER_ITEMS = [
  'Docusaurus documentation page',
  'GitBook-friendly guide',
  'README tutorial',
  'Blog post',
  'FAQ document',
  'Troubleshooting guide',
  'SEO metadata',
  'metadata.json + review-checklist.md',
];

function BeforeAfterSection() {
  return (
    <section className={styles.beforeAfterSection}>
      <div className={styles.gridBg} />
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>Transform</span>
          <h2 className={styles.sectionTitle}>Transcript in. Developer docs out.</h2>
          <p className={styles.sectionSubtitle}>
            Turn messy learning material into structured docs developers can search, review, commit, and improve.
          </p>
        </div>
        <div className={styles.beforeAfterGrid}>
          <div className={styles.beforeCard}>
            <p className={styles.beforeAfterLabel}>Before</p>
            <ul className={styles.beforeList}>
              {BEFORE_ITEMS.map((item) => (
                <li key={item} className={styles.beforeItem}>
                  <span className={styles.beforeDot}>●</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.beforeAfterArrow}>→</div>
          <div className={styles.afterCard}>
            <p className={styles.beforeAfterLabel}>After</p>
            <ul className={styles.afterList}>
              {AFTER_ITEMS.map((item) => (
                <li key={item} className={styles.afterItem}>
                  <span className={styles.afterCheck}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Why this exists ────────────────────────────────────── */
function WhySection() {
  return (
    <section className={styles.whySection}>
      <div className={styles.whySectionInner}>
        <p className={styles.whyQuote}>
          Videos are great for learning.{' '}
          <em>Docs are great for shipping.</em>
        </p>
        <p className={styles.whyText}>
          Most technical knowledge gets trapped inside tutorial videos, product demos, meeting
          recordings, and course lessons — making it hard to search, review, version, or reuse.
        </p>
        <p className={styles.whyText}>
          DevDocs Forge Agent converts that raw learning material into reviewable,
          version-controlled developer documentation. Source attribution, human review checklists,
          and safe local-first workflows built in. It creates a strong first draft. You review and publish.
        </p>
      </div>
    </section>
  );
}

/* ── 7. Feature grid ───────────────────────────────────────── */
const FEATURES = [
  { icon: '🖥️', title: 'Local-first', desc: 'Runs entirely on your machine. No cloud backend, no data leaving your environment.' },
  { icon: '🔑', title: 'Bring your own key', desc: 'OpenAI, Anthropic, or Gemini. Swap providers with one env var change.' },
  { icon: '🎭', title: 'Mock mode', desc: 'Full output in mock mode — no API key needed for development and demos.' },
  { icon: '📄', title: 'Markdown-first', desc: 'Every output is plain Markdown. Drop directly into any docs system.' },
  { icon: '🦕', title: 'Docusaurus-ready', desc: 'Generates correct YAML frontmatter, sidebar config, and admonition syntax.' },
  { icon: '📚', title: 'GitBook-ready', desc: 'GitBook hint blocks, page structure, and navigation hints included.' },
  { icon: '🛡️', title: 'Video Intake Guard', desc: 'Validates video URLs, classifies tech content, blocks non-technical or scraped content.' },
  { icon: '🚫', title: 'No scraping', desc: 'devdocs-forge-agent never scrapes YouTube. You always provide your own transcript.' },
  { icon: '✅', title: 'Human review checklist', desc: 'Every run generates a checklist to review before publishing.' },
  { icon: '🔌', title: 'Easy to extend', desc: 'Add a provider in ~60 lines. Add a mode with zero TypeScript.' },
];

function FeaturesSection() {
  return (
    <section className={styles.featureSection}>
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

/* ── 8. Provider cards ─────────────────────────────────────── */
const PROVIDERS = [
  {
    name: 'Mock',
    tag: 'Default · Free',
    tagClass: 'tagFree',
    color: 'providerMock',
    desc: 'Generates structured output with no API key.',
    useCase: 'Best for: development, CI/CD, demos.',
    env: 'DEVDOCS_PROVIDER=mock',
  },
  {
    name: 'OpenAI',
    tag: 'API key required',
    tagClass: 'tagPaid',
    color: 'providerOpenai',
    desc: 'GPT-4.1-mini for fast docs. GPT-4.1 for highest quality.',
    useCase: 'Best for: cost-efficient bulk generation.',
    env: 'DEVDOCS_PROVIDER=openai\nOPENAI_API_KEY=sk-...',
  },
  {
    name: 'Anthropic',
    tag: 'API key required',
    tagClass: 'tagPaid',
    color: 'providerAnthropic',
    desc: 'Claude 3.5 Sonnet for best-in-class technical writing.',
    useCase: 'Best for: high-quality, nuanced docs.',
    env: 'DEVDOCS_PROVIDER=anthropic\nANTHROPIC_API_KEY=sk-ant-...',
  },
  {
    name: 'Gemini',
    tag: 'API key required',
    tagClass: 'tagPaid',
    color: 'providerGemini',
    desc: 'Gemini 2.0 Flash for fast, cost-effective generation at scale.',
    useCase: 'Best for: large batches and multimodal inputs.',
    env: 'DEVDOCS_PROVIDER=gemini\nGEMINI_API_KEY=...',
  },
];

function ProvidersSection() {
  return (
    <section className={styles.providerSection}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>AI Providers</span>
          <h2 className={styles.sectionTitle}>Your model. Your API key.</h2>
          <p className={styles.sectionSubtitle}>
            Switch providers with one line. No SDK packages — pure native fetch throughout.
          </p>
        </div>
        <div className={styles.providerGrid}>
          {PROVIDERS.map((p) => (
            <div key={p.name} className={clsx(styles.providerCard, styles[p.color])}>
              <div className={styles.providerName}>{p.name}</div>
              <span className={clsx(styles.providerTag, styles[p.tagClass])}>{p.tag}</span>
              <p className={styles.providerDesc}>{p.desc}</p>
              <p className={styles.providerUseCase}>{p.useCase}</p>
              <div className={styles.providerEnv}>
                {p.env.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < p.env.split('\n').length - 1 ? <br /> : null}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Video Intake Guard ─────────────────────────────────── */
function IntakeGuardSection() {
  return (
    <section className={styles.intakeSection}>
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
            {[
              {
                title: 'URL Validation',
                desc: 'Only YouTube and Vimeo URLs are accepted. Malformed or unsupported URLs are rejected immediately.',
              },
              {
                title: 'Tech Video Classification',
                desc: 'Scores the video\'s title, description, tags, and category (0–100). Score < 35 blocks generation unless --force is set.',
              },
              {
                title: 'Transcript Requirement',
                desc: 'You must always provide --file with your own transcript. URL-only generation is blocked by design.',
              },
            ].map((step, i) => (
              <li key={step.title} className={styles.intakeStep}>
                <div className={styles.intakeStepNum}>{i + 1}</div>
                <div>
                  <p className={styles.intakeStepTitle}>{step.title}</p>
                  <p className={styles.intakeStepDesc}>{step.desc}</p>
                </div>
              </li>
            ))}
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

/* ── 10. Output preview ────────────────────────────────────── */
const OUTPUT_FILES = [
  { name: 'index.md',           desc: 'Main generated documentation — full content ready to review and publish.' },
  { name: 'metadata.json',      desc: 'Provider, model, word count, source URL, and generation timestamp.' },
  { name: 'review-checklist.md',desc: 'Human review checklist: verify facts, test code, check attribution.' },
  { name: 'source-summary.md',  desc: 'Source word count, slug, detected title, and source URL.' },
  { name: 'docs/{slug}.md',     desc: 'Docusaurus-ready copy with YAML frontmatter and sidebar config.' },
];

function OutputSection() {
  return (
    <section className={styles.outputSection}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>Output</span>
          <h2 className={styles.sectionTitle}>Every run. Five files.</h2>
          <p className={styles.sectionSubtitle}>
            Generated docs land in a timestamped folder — ready to review, commit, or publish.
          </p>
        </div>
        <div className={styles.outputGrid}>
          <div>
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
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.fileDim}>← Docusaurus-ready</span></div>
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              {OUTPUT_FILES.map((f) => (
                <div key={f.name} className={styles.outputFileCard}>
                  <p className={styles.outputFileCardName}>{f.name}</p>
                  <p className={styles.outputFileCardDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mdPreview}>
            <div className={styles.mdPreviewBar}>
              <div className={styles.mdPreviewDot} />
              <div className={styles.mdPreviewDot} />
              <div className={styles.mdPreviewDot} />
              <span className={styles.mdPreviewFile}>docs/angular-signals-tutorial.md</span>
            </div>
            <div className={styles.mdPreviewBody}>
              <div className={styles.mdFrontmatter}>
                <div className={styles.mdFmSep}>---</div>
                <div><span className={styles.mdFmKey}>id</span>: <span className={styles.mdFmValue}>angular-signals-tutorial</span></div>
                <div><span className={styles.mdFmKey}>title</span>: <span className={styles.mdFmValue}>Angular Signals Tutorial</span></div>
                <div><span className={styles.mdFmKey}>sidebar_label</span>: <span className={styles.mdFmValue}>Angular Signals</span></div>
                <div><span className={styles.mdFmKey}>sidebar_position</span>: <span className={styles.mdFmValue}>1</span></div>
                <div><span className={styles.mdFmKey}>description</span>: <span className={styles.mdFmValue}>A comprehensive guide to Angular's signals API...</span></div>
                <div className={styles.mdFmSep}>---</div>
              </div>
              <div style={{ height: '0.75rem' }} />
              <div className={styles.mdH1}># Angular Signals: Reactive State Without Complexity</div>
              <div style={{ height: '0.5rem' }} />
              <div className={styles.mdText}>Angular 16 introduced signals as a new reactive primitive. Unlike RxJS observables, signals are synchronous, fine-grained, and require no subscription management.</div>
              <div style={{ height: '0.75rem' }} />
              <div className={styles.mdH2}>## Prerequisites</div>
              <div style={{ height: '0.25rem' }} />
              <div className={styles.mdText}>- Angular 16+ project</div>
              <div className={styles.mdText}>- Basic TypeScript knowledge</div>
              <div style={{ height: '0.75rem' }} />
              <div className={styles.mdH2}>## Creating a signal</div>
              <div style={{ height: '0.25rem' }} />
              <div className={styles.mdCode}>{'```typescript'}</div>
              <div className={styles.mdCode}>{'import { signal } from \'@angular/core\';'}</div>
              <div className={styles.mdCode}>{'const count = signal(0);'}</div>
              <div className={styles.mdCode}>{'```'}</div>
              <div style={{ height: '0.5rem' }} />
              <div className={styles.mdEllipsis}>···</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 11. Built for ─────────────────────────────────────────── */
const AUDIENCE = [
  { icon: '🎬', title: 'Developer YouTubers',       desc: 'Turn tutorial recordings into Docusaurus sites.' },
  { icon: '📣', title: 'DevRel teams',              desc: 'Convert demo recordings into onboarding docs.' },
  { icon: '🎓', title: 'Course creators',           desc: 'Generate lesson pages from lecture notes.' },
  { icon: '🔧', title: 'Open-source maintainers',  desc: 'Create READMEs and guides from issue walkthroughs.' },
  { icon: '🏢', title: 'Engineering teams',         desc: 'Generate internal runbooks from Loom transcripts.' },
  { icon: '✍️', title: 'Technical bloggers',        desc: 'Draft dev.to posts from talk notes.' },
];

function BuiltForSection() {
  return (
    <section className={styles.builtForSection}>
      <div className={styles.sectionInner}>
        <div className={styles.sectionCentered}>
          <span className={styles.sectionLabel}>Who it's for</span>
          <h2 className={styles.sectionTitle}>Built for people who turn technical knowledge into reusable docs.</h2>
        </div>
        <div className={styles.audienceGrid}>
          {AUDIENCE.map((a) => (
            <div key={a.title} className={styles.audienceCard}>
              <span className={styles.audienceIcon}>{a.icon}</span>
              <p className={styles.audienceTitle}>{a.title}</p>
              <p className={styles.audienceDesc}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 12. Contributor CTA ───────────────────────────────────── */
function ContributingSection() {
  const ways = ['Add a provider', 'Add a mode', 'Improve prompts', 'Add examples', 'Improve docs', 'Build the UI'];
  return (
    <section className={styles.contributingSection}>
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

/* ── 13. Final Star CTA ────────────────────────────────────── */
function FinalStarCtaSection() {
  return (
    <section className={styles.starSection}>
      <div className={styles.starSectionBg} />
      <div className={styles.starSectionInner}>
        <span className={styles.starEmoji}>⭐</span>
        <h2 className={styles.starTitle}>
          If this saves you documentation time, star the repo.
        </h2>
        <p className={styles.starSubtext}>
          More stars help more developers find DevDocs Forge Agent. It takes 2 seconds
          and helps the project grow.
        </p>
        <Link
          to="https://github.com/AnkitParekh007/devdocs-forge-agent"
          className={styles.starButton}
        >
          ⭐ Star on GitHub
        </Link>
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
      <TrustStripSection />
      <TerminalSection />
      <AgentPipelineSection />
      <BeforeAfterSection />
      <WhySection />
      <FeaturesSection />
      <ProvidersSection />
      <IntakeGuardSection />
      <OutputSection />
      <BuiltForSection />
      <ContributingSection />
      <FinalStarCtaSection />
    </Layout>
  );
}
