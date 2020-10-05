import { resizeImage } from './resize-image.util';

describe('ResizeImage', () => {
  let file: File;

  beforeEach(() => {
    file = new File(['123'], 'image/jpeg');
  });
  it('should create an instance', async () => {
    expect(file).toBeTruthy();
  });
});
