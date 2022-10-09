import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  styleUrls: ['auth.component.scss'],
  template: `
    <nb-layout window>
      <nb-layout-header fixed>
        <a href="#" (click)="toggle()" class="content"
          ><span class="material-icons"> format_list_bulleted </span></a
        >
        <app-serv-pillihuaman-header-home
          class="mainrdHeader"
        ></app-serv-pillihuaman-header-home>
      </nb-layout-header>
      <nb-sidebar tag="menu-barapp" state="collapsed">
        <serv-pillihuaman-sidebar-home></serv-pillihuaman-sidebar-home>
      </nb-sidebar>
      <nb-layout-column class="colored-column-basic" (click)="toggleout()">
        <router-outlet></router-outlet> </nb-layout-column
    ></nb-layout>
  `,
})
export class AuthComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // document.getElementById(
    //   'panel'
    // ).style.background = `url("assets/images/bg.png")`;
  }
  constructor(
    private sidebarService: NbSidebarService,
    private nbthemeservice: NbThemeService
  ) {}

  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout() {
    this.sidebarService.collapse('menu-barapp');
  }
}
