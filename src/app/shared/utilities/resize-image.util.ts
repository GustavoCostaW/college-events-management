import { fromEvent, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface ImageFileData {
  file: File;
  data: string;
}

type EventResult<R = any> = Event & {
  target: R;
};

function getImageByFileResult({
  result,
}: Pick<FileReader, 'result'>): HTMLImageElement {
  const image = new Image();
  image.src = String(result);
  return image;
}

function drawImageInCanvasContext(
  target: HTMLImageElement,
  width: number
): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas');
  const scale = width / target.width;
  const height = target.height * scale;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.drawImage(target, 0, 0, width, height);
  return context;
}

/**
 * Gera um novo arquivo
 */
function toFile(
  canvas: HTMLCanvasElement,
  name: string,
  type: string
): Promise<File> {
  const options = { type, lastModified: Date.now() };
  return new Promise((result, reject) => {
    try {
      canvas.toBlob((blob) => result(new File([blob], name, options)));
    } catch ({ message }) {
      reject(message);
    }
  });
}

/**
 * Image redizer
 */
export const resizeImage = (
  item: File,
  width = 320
): Observable<ImageFileData> => {
  const reader = new FileReader();

  reader.readAsDataURL(item);

  return fromEvent(reader, 'load').pipe(
    map(({ target }: EventResult<FileReader>) => {
      return getImageByFileResult(target);
    }),
    switchMap((img) => fromEvent(img, 'load')),
    map(({ target }: EventResult<HTMLImageElement>) => {
      return drawImageInCanvasContext(target, width);
    }),
    switchMap(async ({ canvas }: CanvasRenderingContext2D) => {
      try {
        const file = await toFile(canvas, item.name, item.type);
        return { file, data: canvas.toDataURL() };
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
