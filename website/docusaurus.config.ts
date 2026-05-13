import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DevDocs Forge Agent',
  tagline: 'Turn tutorial transcripts into beautiful developer documentation.',
  favicon: 'img/favicon.svg',

  url: 'https://ankitparekh007.github.io',
  baseUrl: '/devdocs-forge-agent/',

  organizationName: 'AnkitParekh007',
  projectName: 'devdocs-forge-agent',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/AnkitParekh007/devdocs-forge-agent/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: 'img/og-card.svg',
    metadata: [
      { name: 'keywords', content: 'documentation, ai, cli, docusaurus, transcript, developer-tools' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    navbar: {
      title: 'DevDocs Forge',
      logo: {
        alt: 'DevDocs Forge Agent',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/quick-start',
          label: 'Quick Start',
          position: 'left',
        },
        {
          to: '/docs/cli-commands',
          label: 'CLI',
          position: 'left',
        },
        {
          href: 'https://github.com/AnkitParekh007/devdocs-forge-agent',
          position: 'right',
          className: 'navbar-github-link',
          'aria-label': 'GitHub repository',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/docs/introduction' },
            { label: 'Quick Start', to: '/docs/quick-start' },
            { label: 'CLI Commands', to: '/docs/cli-commands' },
            { label: 'Modes', to: '/docs/modes' },
            { label: 'Providers', to: '/docs/providers' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/AnkitParekh007/devdocs-forge-agent/issues',
            },
            {
              label: 'Good First Issues',
              href: 'https://github.com/AnkitParekh007/devdocs-forge-agent/issues?q=label%3A%22good+first+issue%22',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/AnkitParekh007/devdocs-forge-agent',
            },
            {
              label: 'Releases',
              href: 'https://github.com/AnkitParekh007/devdocs-forge-agent/releases',
            },
            {
              label: 'License (MIT)',
              href: 'https://github.com/AnkitParekh007/devdocs-forge-agent/blob/main/LICENSE',
            },
            {
              label: 'Security',
              href: 'https://github.com/AnkitParekh007/devdocs-forge-agent/blob/main/SECURITY.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DevDocs Forge Agent Contributors. MIT License.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'typescript', 'json', 'yaml', 'markdown'],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
