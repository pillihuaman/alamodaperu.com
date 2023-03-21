import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Control } from 'src/app/@data/model/general/control';
import { SupportService } from 'src/app/@data/services/support.service';

@Component({
  selector: 'app-register-control',
  templateUrl: './register-control.component.html',
  styleUrls: ['./register-control.component.scss'],
})
export class RegisterControlComponent implements OnInit {
  myForm: FormGroup;
  listSystem: any = [{ idSystem: 1, description: 'support' }];
  listMenu: any = [{ idMenu: 1, idSystem: 1, description: 'support menu' }];
  listSubMenu: any = [
    { idSubMenu: 1, idMenu: 1, idSystem: 1, description: 'support product' },
  ];
  listPage: any = [{ idPage: 1, idSystem: 1, description: 'support controls' }];
  btn: any;
  constructor(public fb: FormBuilder, private supportService: SupportService) {
    this.myForm = this.fb.group({
      objectId: [null],
      idSystem: [''],
      idMenu: [''],
      idSubMenu: [''],
      idPage: [''],
      description: [''],
      icono: [''],
      iconClass: [''],
      status: [''],
      styleClass: [''],
      text: [''],
    });
  }
  ngOnInit(): void {}

  searchUser() {}
  save() {
    debugger;
    const control: Control = {
      description: this.myForm.get('description')?.value,
      iconClass: this.myForm.get('iconClass')?.value,
      icono: this.myForm.get('icono')?.value,
      idMenu: this.myForm.get('idMenu')?.value,
      idPage: this.myForm.get('idPage')?.value,
      idSystem: this.myForm.get('idSystem')?.value,
      status: 1,
      styleClass: this.myForm.get('styleClass')?.value,
      text: this.myForm.get('text')?.value,
      id_user: '63c88913c366138ea8c73635',
    };
    this.supportService.saveControl(control).subscribe(
      (value) => {},
      (error) => {}
    );
  }
  state(trues: any) {
    return trues;
  }
}
