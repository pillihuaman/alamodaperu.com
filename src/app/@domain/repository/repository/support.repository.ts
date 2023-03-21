import { Observable } from 'rxjs';
import { Control } from 'src/app/@data/model/general/control';
import { CorouselImage } from 'src/app/@data/model/general/corouselImage';
import { User } from '../models/user';

export abstract class SupportRepository {
  abstract saveClickCountImagen(
    corouselImage: CorouselImage
  ): Observable<CorouselImage[]>;
  abstract listControl(control: Control): Observable<Control>;
}
