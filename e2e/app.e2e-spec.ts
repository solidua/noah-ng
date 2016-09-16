import { NoahNgPage } from './app.po';

describe('noah-ng App', function() {
  let page: NoahNgPage;

  beforeEach(() => {
    page = new NoahNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
