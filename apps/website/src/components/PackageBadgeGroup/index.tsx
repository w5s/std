import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconExternalLink from '@theme/Icon/ExternalLink';

import styles from './styles.module.css';

export type BadgeStyle = 'flat' | 'flat-square' | 'for-the-badge' | 'plastic' | 'social';

export type BadgeType = 'bundle-size' | 'npm-license' | 'npm-version';

const renderBadge = (
  _context: ReturnType<typeof useDocusaurusContext>,
  props: PackageBadgeGroupProps,
  badgeProps: {
    badgeStyle?: BadgeStyle;
    badgeType: BadgeType;
  },
) => {
  const defaultBadgeProps = {
    className: styles.badge,
    key: badgeProps.badgeType,
  };
  const defaultBadgeStyle = badgeProps.badgeStyle ?? 'flat-square';

  if (props.packageName != null) {
    switch (badgeProps.badgeType) {
      case 'bundle-size': {
        return (
          <img
            {...defaultBadgeProps}
            alt="Bundle size"
            src={`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(props.packageName)}?style=${defaultBadgeStyle}`}
          />
        );
      }
      case 'npm-license': {
        return (
          <img
            {...defaultBadgeProps}
            alt="NPM License"
            src={`https://img.shields.io/npm/l/${encodeURIComponent(props.packageName)}?style=${defaultBadgeStyle}`}
          />
        );
      }
      case 'npm-version': {
        return (
          <img
            {...defaultBadgeProps}
            alt="Github version"
            src={`https://img.shields.io/npm/v/${encodeURIComponent(props.packageName)}?style=${defaultBadgeStyle}`}
          />
        );
      }
    }
  }
  return '';
};

export interface PackageBadgeGroupProps {
  apiHref?: string;
  packageName?: string;
}

export function PackageBadgeGroup(props: PackageBadgeGroupProps) {
  const docusaurusContext = useDocusaurusContext();
  const { siteConfig } = docusaurusContext;
  return (
    <>
      {props.apiHref == null
        ? null
        : (
            <Link
              className={styles.apiLink}
              to={`${siteConfig.url}${siteConfig.baseUrl.replace(/\/$/, '')}${props.apiHref}`}
            >
              API
              {' '}
              <IconExternalLink />
            </Link>
          )}
      {(['npm-version', 'npm-license', 'bundle-size'] as const).map((badgeType) =>
        renderBadge(docusaurusContext, props, { badgeType }),
      )}
    </>
  );
}
