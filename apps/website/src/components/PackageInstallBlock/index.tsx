import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

export interface PackageInstallBlockProps {
  packageName: string;
}

export function PackageInstallBlock({ packageName }: PackageInstallBlockProps) {
  return (
    <Tabs
      groupId="package-manager"
      defaultValue="yarn"
      values={[
        { label: 'yarn', value: 'yarn' },
        { label: 'pnpm', value: 'pnpm' },
        { label: 'npm', value: 'npm' },
      ]}
    >
      <TabItem value="yarn">
        <CodeBlock language="bash">yarn add {packageName}</CodeBlock>
      </TabItem>
      <TabItem value="pnpm">
        <CodeBlock language="bash">pnpm add {packageName}</CodeBlock>
      </TabItem>
      <TabItem value="npm">
        <CodeBlock language="bash">npm install {packageName}</CodeBlock>
      </TabItem>
    </Tabs>
  );
}
