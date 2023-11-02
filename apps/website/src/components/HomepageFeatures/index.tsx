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
    Svg: require('@site/static/img/logo-svgrepo-com.svg').default,
    description: (
      <>
        Standardized code and gestures for high productivity <br />
        <em>
          ✓ Industry proven patterns and concepts <br />
          ✓ Self explanatory names, avoid abbreviations <br />
          ✓ Smooth tool integration and testability <br />
        </em>
      </>
    ),
  },
  {
    title: 'Simple',
    Svg: require('@site/static/img/circle-svgrepo-com.svg').default,
    description: (
      <>
        Functional programming, done simple. <br />
        <em>
          ✓ No OOP : Plain Javascript object <br />
          ✓ Pragmatic FP : pure by default but never obscure <br />
          ✓ Explicit and deterministic API <br />
        </em>
      </>
    ),
  },
  {
    title: 'Stable',
    Svg: require('@site/static/img/infinity-svgrepo-com.svg').default,
    description: (
      <>
        Fight framework obsolescence ! <br />
        <em>
          ✓ Industry proven patterns and concepts <br />
          ✓ Loose coupling between packages <br />
          ✓ Designed for long-term maintainable applications <br />
        </em>
      </>
    ),
  },
  {
    title: 'Safe',
    Svg: require('@site/static/img/jewel-svgrepo-com.svg').default,
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
    Svg: require('@site/static/img/feather-svgrepo-com.svg').default,
    description: (
      <>
        Because environment matters... <br />
        <em>
          ✓ Restricted set of highly composable functions <br />
          ✓ No unused files and data in NPM package <br />
          ✓ Sparse small and independent modules <br />
        </em>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>
          <span className="text--primary">{title[0]}</span>
          {title.slice(1)}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
