import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'introduction',
        'quick-start',
        'installation',
        'configuration',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'providers',
        'modes',
        'video-intake-guard',
        'output-structure',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'cli-commands',
        'examples',
      ],
    },
    {
      type: 'category',
      label: 'Project',
      items: [
        'contributing',
        'safety',
        'roadmap',
      ],
    },
  ],
};

export default sidebars;
