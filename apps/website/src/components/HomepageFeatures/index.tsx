import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Standardized',
    Svg: require('@site/static/img/stripes.svg').default,
    description: (
      <>
        Standardized code and conventions for high productivity <br />
        <em>
          ✓ Inspired by industry-grade technologies (Rust, Ocaml) <br />
          ✓ Self explanatory names, (almost) no abbreviations <br />
          ✓ Smooth tool integration and testability <br />
        </em>
      </>
    ),
  },
  {
    title: 'Simple',
    Svg: require('@site/static/img/circle.svg').default,
    description: (
      <>
        Functional programming, done simple. <br />
        <em>
          ✓ No OOP : Plain Javascript object <br />
          ✓ Pragmatic FP : pure but never obscure <br />
          ✓ Explicit and deterministic API <br />
        </em>
      </>
    ),
  },
  {
    title: 'Stable',
    Svg: require('@site/static/img/infinity.svg').default,
    description: (
      <>
        Fight framework obsolescence ! <br />
        <em>
          ✓ Loose coupling between packages <br />
          ✓ Designed for maintainable applications <br />
          ✓ Harmonize frontend/backend practices <br />
        </em>
      </>
    ),
  },
  {
    title: 'Safe',
    Svg: require('@site/static/img/jewel.svg').default,
    description: (
      <>
        One ambitious goal : 0 bug in production <br />
        <em>
          ✓ Strict and type safe <br />
          ✓ Battle tested <br />
          ✓ No external NPM runtime dependencies <br />
        </em>
      </>
    ),
  },
  {
    title: 'Slim',
    Svg: require('@site/static/img/feather.svg').default,
    description: (
      <>
        Because CI performances and environment matters <br />
        <em>
          ✓ Lean yet highly composable API <br />✓ Strong package size constraint with{' '}
          <a href="https://www.npmjs.com/package/size-limit">size-limit</a>
          <br />
          ✓ No constraint to use all `@w5s` packages, pick only the needed ones. <br />
        </em>
      </>
    ),
  },
];

const renderTitle = (value: string) => (
  <>
    <span className="text--primary">{value[0]}</span>
    {value.slice(1)}
  </>
);

function Feature({ title, Svg, description }: FeatureItem) {
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

export function HomepageFeatures(): JSX.Element {
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
