import { Const } from '../../utils/const';
import { User } from '../../@domain/repository/models/user';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { UserRepository } from 'src/app/@domain/repository/repository/user.repository';
import { corouselImage } from '../model/general/corouselImage';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _imagenSource = new Subject<corouselImage>();
  corouseObject$ = this._imagenSource.asObservable();
  constructor() {}
  SendCorousel(img: corouselImage) {
    this._imagenSource.next(img);
  }
}
