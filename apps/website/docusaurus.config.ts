/* eslint-disable ts/no-unsafe-call */
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type typedocPluginFunction from 'docusaurus-plugin-typedoc-api';

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { themes } from 'prism-react-renderer';

import packageJSON from './package.json';

export interface CustomFields {
  metaDescription?: string;
  metaTitle?: string;
}

type TypedocPluginOptions = Parameters<typeof typedocPluginFunction>[1];

const fileExists = (path: fs.PathLike) => {
  try {
    fs.accessSync(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const lightTheme = themes.github;
const darkTheme = themes.dracula;

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));

const githubHref = packageJSON.repository.url.replace('git@github.com:', 'https://github.com/');

const packageList = fs
  .readdirSync(`${projectRoot}/packages`)
  .map((entry) => {
    const path = `packages/${entry}`;
    const hasTesting = fileExists(`${projectRoot}/${path}/src/testing.ts`);
    return {
      entry: {
        index: { label: undefined as unknown as string, path: 'src/index.ts' },
        ...(hasTesting ? { testing: { label: 'Testing utilities', path: 'src/Testing.ts' } } : undefined),
      },
      package: JSON.parse(fs.readFileSync(`${projectRoot}/packages/${entry}/package.json`, 'utf8')),
      path,
    };
  })
  .filter((_) => _.package.private !== true);

const config: Config = (() => {
  const title = 'W5S Standard Library';
  const tagline = 'A collection of type safe, functional style packages for building great applications and libraries';
  const organizationName = 'w5s';
  return {
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    // baseUrl: '/',
    get baseUrl() {
      return `/${this.projectName}`;
    },
    customFields: {
      metaDescription: tagline,
      metaTitle: 'Build faster, cleaner and safer apps',
    } satisfies CustomFields,
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
      v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
    },

    markdown: {
      hooks: {
        onBrokenMarkdownLinks: 'warn',
      },
      mdx1Compat: {
        comments: true,
        headingIds: true,
      },
    },

    onBrokenLinks: 'throw',
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName, // Usually your GitHub org/user name.

    plugins: [
      [
        '@apify/docusaurus-plugin-typedoc-api',
        {
          gitRefName: 'main',
          minimal: true,
          packages: packageList.map(({ entry, path }) => ({
            entry,
            path,
          })),
          projectRoot,
          readmes: true,
          // debug: true,
          tsconfigName: 'tsconfig.json',
        } satisfies Partial<TypedocPluginOptions>,
      ],
    ],
    presets: [
      [
        'classic',
        {
          blog: {
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: `${githubHref}/tree/main/apps/website/blog/`,
            showReadingTime: true,
          },
          docs: {
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: `${githubHref}/tree/main/apps/website/`,
            sidebarPath: fileURLToPath(new URL('sidebars.js', import.meta.url)),
          },
          theme: {
            customCss: fileURLToPath(new URL('src/css/custom.css', import.meta.url)),
          },
        } satisfies Preset.Options,
      ],
    ],

    projectName: 'std', // Usually your repo name.

    tagline,

    themeConfig: {
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} Julien Polo. Built with Docusaurus.`,
        links: [
          {
            items: [
              {
                label: 'Tutorial',
                to: '/docs/getting-started/Introduction',
              },
            ],
            title: 'Docs',
          },
          {
            items: [
              {
                href: 'https://stackoverflow.com/questions/tagged/w5s',
                label: 'Stack Overflow',
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
            title: 'Community',
          },
          {
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                href: githubHref,
                label: 'GitHub',
              },
            ],
            title: 'More',
          },
        ],
        style: 'dark',
      },
      // Replace with your project's social card
      image: 'img/w5s_social_cover.png',
      metadata: [
        { content: 'functional, typescript, javascript, fp, rust, ocaml', name: 'keywords' },
        { content: '7 days', name: 'revisit-after' },
        { content: 'archive,follow,imageindex,index,odp,snippet,translate', name: 'robots' },
        { content: 'index,follow', name: 'googlebot' },
        { content: tagline, name: 'summary' },
        { content: 'all', name: 'target' },
        /* cspell:disable-next-line */
        { content: 'crTDqUN2i_LENrHWPhxylaLVKPZ8EdHYemMbluuGhIA', name: 'google-site-verification' },
      ],
      navbar: {
        items: [
          {
            items: packageList.map(({ package: _package }) => ({
              href: `https://www.npmjs.com/package/${_package.name}`,
              label: `v${_package.version} · ${_package.name.split('/')[1]}`,
            })),
            label: `v${packageList[0].package.version[0]}`,
            position: 'left',
          },
          {
            label: 'Docs',
            position: 'left',
            sidebarId: 'tutorialSidebar',
            type: 'docSidebar',
          },
          {
            label: 'API',
            position: 'left',
            to: 'api',
          },
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: githubHref,
            label: 'GitHub',
            position: 'right',
          },
        ],
        logo: {
          alt: 'W5S standard library',
          src: 'img/logo.svg',
        },
        title: 'Standard Library',
      },
      prism: {
        additionalLanguages: ['bash', 'diff', 'json'],
        darkTheme,
        theme: lightTheme,
      },
    } satisfies Preset.ThemeConfig,

    title,

    // Set the production url of your site here
    // url: 'https://your-docusaurus-test-site.com',
    url: `https://${organizationName}.github.io/`,
  };
})();

export default config;
