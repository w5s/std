import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

export interface PackageInstallBlockProps {
  packageName: string;
}

export function PackageInstallBlock({ packageName }: PackageInstallBlockProps) {
  return (
    <Tabs
      defaultValue="yarn"
      groupId="package-manager"
      values={[
        { label: 'yarn', value: 'yarn' },
        { label: 'pnpm', value: 'pnpm' },
        { label: 'npm', value: 'npm' },
      ]}
    >
      <TabItem value="yarn">
        <CodeBlock language="bash">
          yarn add
          {' '}
          {packageName}
        </CodeBlock>
      </TabItem>
      <TabItem value="pnpm">
        <CodeBlock language="bash">
          pnpm add
          {packageName}
        </CodeBlock>
      </TabItem>
      <TabItem value="npm">
        <CodeBlock language="bash">
          npm install
          {packageName}
        </CodeBlock>
      </TabItem>
    </Tabs>
  );
}
