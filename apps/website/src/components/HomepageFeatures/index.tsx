import Circle from '@site/static/img/circle.svg';
import Feather from '@site/static/img/feather.svg';
import Infinity from '@site/static/img/infinity.svg';
import Jewel from '@site/static/img/jewel.svg';
import Stripes from '@site/static/img/stripes.svg';
import clsx from 'clsx';
import React from 'react';

import { Def } from '../Def';
import styles from './styles.module.css';

interface FeatureItem {
  description: React.ReactNode;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  title: string;
}

const FeatureList: Array<FeatureItem> = [
  {
    description: (
      <>
        Standardized code and conventions for high productivity
        {' '}
        <br />
        <em>
          ✓ Inspired by industry-grade technologies (Rust, Ocaml)
          {' '}
          <br />
          ✓ Self explanatory names, (almost) no abbreviations
          {' '}
          <br />
          ✓ Smooth tool integration and testability
          {' '}
          <br />
        </em>
      </>
    ),
    Svg: Stripes,
    title: 'Standardized',
  },
  {
    description: (
      <>
        Functional programming, done simple.
        {' '}
        <br />
        <em>
          ✓ No OOP : Plain Javascript object
          {' '}
          <br />
          ✓ Pragmatic
          {' '}
          <Def abbr="FP" />
          {' '}
          : pure but never obscure
          {' '}
          <br />
          ✓ Explicit and deterministic API
          {' '}
          <br />
        </em>
      </>
    ),
    Svg: Circle,
    title: 'Simple',
  },
  {
    description: (
      <>
        Fight framework obsolescence !
        {' '}
        <br />
        <em>
          ✓ Loose coupling between packages
          {' '}
          <br />
          ✓ Designed for maintainable applications
          {' '}
          <br />
          ✓ Harmonize frontend/backend practices
          {' '}
          <br />
        </em>
      </>
    ),
    Svg: Infinity,
    title: 'Stable',
  },
  {
    description: (
      <>
        One ambitious goal : 0 bug in production
        {' '}
        <br />
        <em>
          ✓ Strict and type safe
          {' '}
          <br />
          ✓ Battle tested
          {' '}
          <br />
          ✓ No external NPM runtime dependencies
          {' '}
          <br />
        </em>
      </>
    ),
    Svg: Jewel,
    title: 'Safe',
  },
  {
    description: (
      <>
        Because CI performances and environment matters
        {' '}
        <br />
        <em>
          ✓ Lean yet highly composable API
          {' '}
          <br />
          ✓ Low bundle size enforced by
          {' '}
          <a href="https://www.npmjs.com/package/size-limit" target="size-limit">
            size-limit
          </a>
          <br />
          ✓ No constraint to use all `@w5s` packages, pick only the needed ones.
          {' '}
          <br />
        </em>
      </>
    ),
    Svg: Feather,
    title: 'Slim',
  },
];

const renderTitle = (value: string) => (
  <>
    <span className="text--primary">{value.at(0)}</span>
    {value.slice(1)}
  </>
);

export function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{ justifyContent: 'center' }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({ description, Svg, title }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding--md">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{renderTitle(title)}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
