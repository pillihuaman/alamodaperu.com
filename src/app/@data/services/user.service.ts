import { Const } from './../../utils/const';
import { User } from './../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { UserRepository } from 'src/app/@domain/repository/repository/user.repository';
import { RequestBody } from '../model/general/requestBody';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  getusers(): Observable<User[]> {
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/user/register`;
    return this.apiService.post(url, {});
  }
  registerUser(user: User): Observable<User[]> {
    debugger;
    const request: RequestBody = {
      data: user,
      trace: { traceId: '01' },
    };
    const url =
      `${Const.API_SUPPORT}` +
      `/${Const.URL_TYPE_ACCES_PUBLIC}` +
      `/v1/user/register`;
    return this.apiService.post(url, request);
  }
}
