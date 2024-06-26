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
import { EmployeeRequest } from 'src/app/@data/model/employee/employeRequest';

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
  abstract deletePages(id: String): Observable<PageResponse>
  abstract findPages(page:any,pagesize:any,id:any,title:any,content:any,url:any):Observable<ResponseBody>
  abstract testListPage(): Observable<any>
  abstract  systemById(para: String): Observable<SystemResponse>
  abstract deleteSystem(para: String): Observable<boolean>
  abstract changeColorImagen(para: any): Observable<any> 
  abstract  findEmployee(page:any,pagesize:any,id:any,name:any,lastName:any,document:any):Observable<ResponseBody>
  abstract saveEmployee(para: EmployeeRequest): Observable<ResponseBody> 
  abstract deleteEmployee(id: String): Observable<ResponseBody> 

}