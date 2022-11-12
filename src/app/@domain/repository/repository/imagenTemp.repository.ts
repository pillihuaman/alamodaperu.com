import { Observable } from 'rxjs';
import { ImagenTemp } from 'src/app/@data/model/imagen/imagenTemp';
import { User } from '../models/user';

export abstract class ImagenTempRepository {
  abstract getImagenTemp(): Observable<ImagenTemp[]>;
  abstract registerImagenTemp(
    imagenTemp: ImagenTemp,
    file: File
  ): Observable<ImagenTemp[]>;
}
