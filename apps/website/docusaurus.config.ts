/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'node:fs';
import nodePath from 'node:path';
import packageJSON from './package.json';

export interface CustomFields {
  metaTitle?: string;
  metaDescription?: string;
}

const fileExists = (path: fs.PathLike) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const { themes } = require('prism-react-renderer');

const lightTheme = themes.github;
const darkTheme = themes.dracula;

const projectRoot = nodePath.dirname(nodePath.dirname(nodePath.join(__dirname)));

const githubHref = packageJSON.repository.url.replace('git@github.com:', 'https://github.com/');
const packageList = fs
  .readdirSync(`${projectRoot}/packages`)
  .map((entry) => {
    const path = `packages/${entry}`;
    const hasTesting = fileExists(`${projectRoot}/${path}/src/testing.ts`);
    return {
      path,
      // eslint-disable-next-line import/no-dynamic-require
      package: require(`${projectRoot}/packages/${entry}/package.json`),
      entry: {
        index: { path: 'src/index.ts' },
        ...(hasTesting ? { testing: { path: 'src/testing.ts', label: 'Testing utilities' } } : undefined),
      },
    };
  })
  .filter((_) => _.package.private !== true);

const config: Config = (() => {
  const title = 'W5S Standard Library';
  const tagline = 'A collection of type safe, functional style packages for building great applications and libraries';
  const organizationName = 'w5s';
  return {
    title,
    tagline,
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    // url: 'https://your-docusaurus-test-site.com',
    url: `https://${organizationName}.github.io/`,

    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    // baseUrl: '/',
    get baseUrl() {
      return `/${this.projectName}`;
    },

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName, // Usually your GitHub org/user name.
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

    customFields: {
      metaTitle: title,
      metaDescription: tagline,
    } satisfies CustomFields,

    presets: [
      [
        'classic',
        {
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
        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'W5S std',
        logo: {
          alt: 'W5S std',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: `v${packageList[0].package.version[0]}`,
            position: 'left',
            items: packageList.map(({ package: _package }) => ({
              label: `v${_package.version} · ${_package.name.split('/')[1]}`,
              href: `https://www.npmjs.com/package/${_package.name}`,
            })),
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: 'api',
            label: 'API',
            position: 'left',
          },
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
                to: '/docs/getting-started/Introduction',
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
        theme: lightTheme,
        darkTheme,
        additionalLanguages: ['bash', 'diff', 'json'],
      },
    } satisfies Preset.ThemeConfig,

    plugins: [
      [
        'docusaurus-plugin-typedoc-api',
        {
          projectRoot,
          packages: packageList.map(({ path, entry }) => ({
            path,
            entry,
          })),
          minimal: true,
          readmes: true,
          // debug: true,
          tsconfigName: 'tsconfig.json',
        },
      ],
    ],
  };
})();

export default config;
