import { Observable } from 'rxjs';
import { Control } from 'src/app/@data/model/general/control';
import { CorouselImage } from 'src/app/@data/model/general/corouselImage';
import { Product } from 'src/app/@data/model/product/product';
import { User } from '../models/user';
import { Parameter } from 'src/app/@data/model/general/parameter';

export abstract class SupportRepository {
  abstract saveClickCountImagen(
    corouselImage: CorouselImage
  ): Observable<CorouselImage[]>;
  abstract listControl(control: Control): Observable<Control>;
  abstract saveProduct(product: Product): Observable<Product>;
  abstract saveParameter(para: Parameter): Observable<Parameter>
  abstract getParameterbyIdCode(para: Parameter): Observable<Parameter[]>
}
