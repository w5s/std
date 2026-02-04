import { Application } from '@w5s/application';

const app = Application('my-app', {
  myVar: 1,
});
app.configure({
  myVar: 2,
});
app.get('myVar'); // 2
