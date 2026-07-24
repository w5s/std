import type { CustomFields } from '@site/docusaurus.config';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageFeatures } from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { metaDescription = siteConfig.tagline, metaTitle = siteConfig.title } = (siteConfig.customFields ??
    {}) as CustomFields;
  return (
    <Layout description={metaDescription} title={metaTitle}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', /* 'hero--primary', */ styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.getStarted)}
            to={useBaseUrl('docs/category/getting-started/')}
          >
            Get started ➔
          </Link>

          {/* <iframe
            frameBorder="0"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=w5s&repo=std&type=star&count=true&size=large"
            title="GitHub Stars"
          /> */}
        </div>
      </div>
    </header>
  );
}
