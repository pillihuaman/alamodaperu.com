import { ModalComponent } from './../../@presentation/@common-components/modal/modal.component';
import {
  NbComponentStatus,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { Const } from '../../utils/const';
import { User } from '../../@domain/repository/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';

@Injectable({
  providedIn: 'root',
})
export class ModalService extends ModalRepository {
  //private index: number = 0;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    super();
  }

  open(closeOnBackdropClick: boolean) {
    this.dialogService.open(ModalComponent, {
      closeOnBackdropClick,
    });
  }
  showToast(status: NbComponentStatus, index: string) {
    this.toastrService.show('Error Interno', `Error: ${index}`, { status });
  }
}
