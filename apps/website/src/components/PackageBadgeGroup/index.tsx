import Link from '@docusaurus/Link';
import IconExternalLink from '@theme/Icon/ExternalLink';
// import Badge from './Badge';
// import BadgeGroup from './BadgeGroup';
import styles from './styles.module.css';

export interface PackageBadgeGroupProps {
  apiHref?: string;
  // badges: string[];
}

export function PackageBadgeGroup({ apiHref }: PackageBadgeGroupProps) {
  return (
    <>
      {apiHref == null ? null : (
        <Link className={styles.apiLink} to={apiHref}>
          API <IconExternalLink />
        </Link>
      )}
      {/* <BadgeGroup>
      {badges.map((badge) => (
        <Badge>{badge}</Badge>
      ))}
    </BadgeGroup> */}
    </>
  );
}
