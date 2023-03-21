import { Const } from './../../utils/const';
import { User } from './../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { CorouselImage } from '../model/general/corouselImage';
import { Control } from '../model/general/control';
import { RequestBody } from '../model/general/requestBody';

@Injectable({
  providedIn: 'root',
})
export class SupportService extends SupportRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
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
  saveControl(control: Control): Observable<Control> {
    const request: RequestBody = { data: control, trace: { traceId: '01' } };
    const url =
      `${Const.API_SEGURIDAD}` +
      `/${Const.URL_TYPE_ACCES_PRIVATE}` +
      `/v1/control/saveControl`;
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
}
