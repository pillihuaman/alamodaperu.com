import { Observable } from 'rxjs';
import { corouselImage } from 'src/app/@data/model/general/corouselImage';
import { User } from '../models/user';

export abstract class SupportRepository {
  abstract saveClickCountImagen(
    corouselImage: corouselImage
  ): Observable<corouselImage[]>;
}
