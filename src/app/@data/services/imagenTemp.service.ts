import { Const } from '../../utils/const';
import { User } from '../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { UserRepository } from 'src/app/@domain/repository/repository/user.repository';
import { ImagenTempRepository } from 'src/app/@domain/repository/repository/imagenTemp.repository';
import { ImagenTemp } from '../model/imagen/imagenTemp';
import { Product } from '../model/product/product';
import { RequestBody } from '../model/general/requestBody';
import { ResponseBody } from '../model/general/responseBody';

@Injectable({
  providedIn: 'root',
})
export class ImagenTempService extends ImagenTempRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  getImagenTemp(): Observable<ImagenTemp[]> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCESS}` +
      `/v1/imagen/getImagenTemp`;
    return this.apiService.post(url, {});
  }
  registerImagenTemp(imagenTemp: ImagenTemp): Observable<ImagenTemp[]> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCESS}` +
      `/v1/imagen/saveImagenTemp`;
    return this.apiService.postToFile(url, imagenTemp);
  }
  listProdutByUser(product: Product): Observable<ResponseBody> {
    let req: RequestBody = {
      data: product,
    };

    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCESS}` +
      `/v1/listProductbyUser`;
    return this.apiService.post(url, req);
  }
}
