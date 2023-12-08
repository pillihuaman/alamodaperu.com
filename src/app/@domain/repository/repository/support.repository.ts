import { Observable } from 'rxjs';
import { Control } from 'src/app/@data/model/general/control';
import { CorouselImage } from 'src/app/@data/model/general/corouselImage';
import { Product } from 'src/app/@data/model/product/product';
import { User } from '../models/user';
import { Parameter } from 'src/app/@data/model/general/parameter';
import { SystemRequest } from 'src/app/@data/model/general/systemRequest';
import { SystemResponse } from 'src/app/@data/model/general/systemResponse';
import { PageRequest } from 'src/app/@data/model/general/pageRequest';
import { PageResponse } from 'src/app/@data/model/general/pageResponse';
import { ResponseBody } from 'src/app/@data/model/general/responseBody';

export abstract class SupportRepository {
  abstract saveClickCountImagen(
    corouselImage: CorouselImage
  ): Observable<CorouselImage[]>;
  abstract listControl(control: Control): Observable<Control>;
  abstract saveProduct(product: Product): Observable<Product>;
  abstract saveParameter(para: Parameter): Observable<Parameter>
  abstract getParameterbyIdCode(para: Parameter): Observable<Parameter[]>
  //system
  abstract listSystem(page:number, pageSize:number): Observable<SystemResponse>
  abstract saveSystem(para: SystemRequest): Observable<SystemResponse>
  abstract savePage(para: PageRequest): Observable<PageResponse>
  abstract findPages(page:any,pagesize:any):Observable<ResponseBody>
  abstract testListPage(): Observable<any>
  abstract  systemById(para: String): Observable<SystemResponse>
  abstract deleteSystem(para: String): Observable<boolean>
}
