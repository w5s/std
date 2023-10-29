// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require('node:path');
const fs = require('node:fs');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const packageJSON = require('./package.json');

const projectRoot = path.dirname(path.dirname(path.join(__dirname)));

const githubHref = packageJSON.repository?.url.replace('git@github.com:', 'https://github.com/');
const packageList = fs
  .readdirSync('../../packages')
  // eslint-disable-next-line import/no-dynamic-require
  .map((entry) => require(`../../packages/${entry}/package.json`))
  .filter((_) => !_.private);

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'W5s Standard Library',
  tagline:
    'A collection of type safe, functional programming oriented packages for building great applications and libraries',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',
  get baseUrl() {
    // return `/${this.projectName}`;
    return '/';
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'w5s', // Usually your GitHub org/user name.
  projectName: 'std', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${githubHref}/tree/main/apps/website/`,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${githubHref}/tree/main/apps/website/blog/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'W5s std',
        logo: {
          alt: 'W5s std',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: `v${packageList[0].version[0]}`,
            position: 'left',
            items: packageList.map((_packageJSON) => ({
              label: `v${_packageJSON.version} · ${_packageJSON.name.split('/')[1]}`,
              href: `https://www.npmjs.com/package/${_packageJSON.name}`,
            })),
          },
          {
            to: 'docs',
            activeBasePath: 'docs',
            label: 'Docs',
            position: 'left',
          },
          {
            to: 'api',
            label: 'API',
            position: 'left',
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: githubHref,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/w5s',
              },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/docusaurus',
              // },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: githubHref,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Julien Polo. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [
      'docusaurus-plugin-typedoc-api',
      {
        projectRoot,
        packages: [
          // ...packageList.map((pkg) => `packages/${pkg}`),
          {
            path: 'packages/invariant',
            entry: {
              index: 'src/index.ts',
            },
          },
          {
            path: 'packages/core',
            entry: {
              index: 'src/index.ts',
            },
          },
        ],
        minimal: true,
        readmes: true,
        debug: true,
        tsconfigName: 'tsconfig.json',
      },
    ],
  ],
};

module.exports = config;
