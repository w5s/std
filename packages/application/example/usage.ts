import { useConfiguration } from '@w5s/application';

const meta = { name: 'my-app' };

const configuration = useConfiguration(meta, {
  myVar: 1,
});
configuration.update({
  myVar: 2,
});
configuration.get('myVar'); // 2
