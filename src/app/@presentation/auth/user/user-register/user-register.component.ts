import { GeneralConstans } from '../../../../utils/generalConstant';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { User } from 'src/app/@data/model/User/user';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserRepository } from 'src/app/@domain/repository/repository/user.repository';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { ModalComponent } from 'src/app/@presentation/@common-components/modal/modal.component';
import { ModalModel } from 'src/app/@data/model/User/modalModel';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  loginForm!: FormGroup;
  selectedItemType: any;
  user!: User;
  selectedItem: any;
  consoles: String = 'exit';

  constructor(
    private formBuilder: FormBuilder,
    private userRepository: UserRepository,
    private modalRepository: ModalRepository,
    private dialogService: NbDialogService,
    public dialog: MatDialog
  ) {}
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      lastName: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      numTypeDocument: [''],
      typeDocument: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      repeatpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      phoneNumber: [''],
    });
  }
  submit() {

    let data: User = {
      name: this.f['name'].value,
      lastName: this.f['lastName'].value,
      password: this.f['password'].value,
      numTypeDocument: this.f['numTypeDocument'].value,
      email: this.f['email'].value,
      mobilPhone: this.f['phoneNumber'].value,
      userName: this.f['name'].value,
      typeDocument: this.f['typeDocument'].value,
    };

    this.userRepository.registerUser(data).subscribe(
      (value) => {
        this.dialog.open(ModalComponent, {
          data: GeneralConstans.datamodelSucess,
        });
      },
      (error) => {
        this.dialog.open(ModalComponent, {
          data: GeneralConstans.datamodelError,
        });
      }
    );
  }
}
