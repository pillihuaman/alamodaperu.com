import { Const } from './../../utils/const';
import { User } from './../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { UserRepository } from 'src/app/@domain/repository/repository/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserRepository {
  constructor(private http: HttpClient, private apiService: ApiService) {
    super();
  }
  getusers(): Observable<User[]> {
    const url =
      `${Const.API_PROCESS}` +
      `/${Const.URL_TYPE_ACCESS}` +
      `/v1/user/register`;
    return this.apiService.post(url, {});
  }
  registerUser(user: User): Observable<User[]> {
    const url =
      `${Const.API_PROCESS}` +
      `/${Const.URL_TYPE_ACCESS}` +
      `/v1/user/register`;
    return this.apiService.post(url, user);
  }
}
