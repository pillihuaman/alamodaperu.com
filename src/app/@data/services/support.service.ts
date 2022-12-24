import { Const } from './../../utils/const';
import { User } from './../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { corouselImage } from '../model/general/corouselImage';

@Injectable({
  providedIn: 'root',
})
export class SupportService extends SupportRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  saveClickCountImagen(
    corouselImage: corouselImage
  ): Observable<corouselImage[]> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCESS}` +
      `/v1/save/saveClickCountImagen`;
    return this.apiService.post(url, corouselImage);
  }
}
