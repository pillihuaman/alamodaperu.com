import { Const } from './../../utils/const';
import { User } from './../../@domain/repository/models/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { CorouselImage } from '../model/general/corouselImage';
import { Control } from '../model/general/control';
import { RequestBody } from '../model/general/requestBody';
import { Product } from '../model/product/product';
import { Parameter } from '../model/general/parameter';
import { SystemRequest } from '../model/general/systemRequest';
import { SystemResponse } from '../model/general/systemResponse';
import { PageRequest } from '../model/general/pageRequest';
import { PageResponse } from '../model/general/pageResponse';
import { ResponseBody } from '../model/general/responseBody';

@Injectable({
  providedIn: 'root',
})
export class SupportService extends SupportRepository {
  override testListPage(): Observable<any> {
    const data: PageResponse[] = [
      { id: "1", title: 'John Doe', content: "30", url: 'USA' },
      { id: "2", title: 'zarrmir', content: "30", url: 'USA' },
      { id: "3", title: 'Mendel Doe', content: "30", url: 'USA' }
    ];

    return of(data);
  }
  override savePage(para: PageRequest): Observable<PageResponse> {
    debugger;
    const request: RequestBody = { data: para, trace: { traceId: '01' } };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/page`;
    return this.apiService.post(url, request);
  }
  override findPages(page:any,pagesize:any):Observable<ResponseBody>{
    const params: any = { page: page ,pagesize:pagesize};
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/page`;
    return this.apiService.get(url, params);
  }
  override getParameterbyIdCode(para: Parameter): Observable<Parameter[]> {
    debugger;
    const params: any = { "idCode": 1223 };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/getParameterbyIdCode`;
    return this.apiService.get(url, params);

  }
  saveProduct(product: Product): Observable<Product> {
    const request: RequestBody = { data: product, trace: { traceId: '01' } };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PRIVATE}` +
      `/v1/product/saveProduct`;
    return this.apiService.post(url, request);
  }
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  saveControl(control: Control): Observable<any> {
    const request: RequestBody = { data: control, trace: { traceId: '01' } };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PRIVATE}` +
      `/v1/support/control/saveControl`;
    return this.apiService.post(url, request);
  }
  listControl(control: Control): Observable<Control> {
    const request: RequestBody = { data: control, trace: { traceId: '01' } };
    const url =
      `${Const.API_SEGURIDAD}` +
      `/${Const.URL_TYPE_ACCES_PRIVATE}` +
      `/v1/control/listControl`;
    return this.apiService.get(url, request);
  }

  saveClickCountImagen(
    corouselImage: CorouselImage
  ): Observable<CorouselImage[]> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/save/saveClickCountImagen`;
    return this.apiService.post(url, corouselImage);
  }
  saveParameter(para: Parameter): Observable<Parameter> {
    const request: RequestBody = { data: para, trace: { traceId: '01' } };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/saveParameter`;
    return this.apiService.post(url, request);
  }
  listSystem(page: number, pageSize: number): Observable<SystemResponse> {
    throw new Error('Method not implemented.');
  }
  saveSystem(para: SystemRequest): Observable<SystemResponse> {
    debugger;
    const request: RequestBody = { data: para, trace: { traceId: '01' } };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/support/system`;
    return this.apiService.post(url, request);
  }
  systemById(para: String): Observable<SystemResponse> {
    throw new Error('Method not implemented.');
  }
  deleteSystem(para: String): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
