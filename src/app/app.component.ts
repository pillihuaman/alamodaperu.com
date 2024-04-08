import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { Observable, timer } from 'rxjs';
import { User } from '../app/@data/model/User/user';
import { Control } from './@data/model/general/control';
@Component({
  selector: 'serv-pillihuaman-app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  cantidadUsuario: number = 3;
  user: User | undefined;
  listaUsuario: Array<User> = [];
  lstControlVariable?: Control[];
  everySecond$: Observable<number> = timer(0, 100);
  AppComponent() {}
  constructor(
    private sidebarService: NbSidebarService,
    private nbthemeservice: NbThemeService
  ) {}

  ngOnInit() {
    this.nombreEmpresa = 'Gamachicas.com';
    this.user = {
      name: 'zarmir',
      lastName: 'pillihuaman',
      code: 1,
      estatus: false,
      password: '',
      numTypeDocument: '46178209',
    };
    this.listaUsuario.push(this.user);
    console.log(this.listaUsuario);
    if (this.cantidadUsuario !== 1) {
      this.estado = false;
    }
  }

  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout() {
    this.sidebarService.collapse('menu-barapp');
  }
}
