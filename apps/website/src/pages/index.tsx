import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import type { CustomFields } from '@site/docusaurus.config';
import styles from './index.module.css';

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

          <iframe
            frameBorder="0"
            scrolling="0"
            src="https://ghbtns.com/github-btn.html?user=w5s&repo=std&type=star&count=true&size=large"
            title="GitHub Stars"
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { metaTitle = siteConfig.title, metaDescription = siteConfig.tagline } = (siteConfig.customFields ??
    {}) as CustomFields;
  return (
    <Layout title={metaTitle} description={metaDescription}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
