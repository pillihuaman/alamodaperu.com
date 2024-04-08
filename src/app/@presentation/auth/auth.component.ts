import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class  AuthComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private nbthemeservice: NbThemeService) {
  }


  ngOnInit(): void {
    //this.nbthemeservice.changeTheme('neptuno');

  }


  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout() {
    this.sidebarService.collapse('menu-barapp');

  }

}
