import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private nbthemeservice: NbThemeService,) {
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
