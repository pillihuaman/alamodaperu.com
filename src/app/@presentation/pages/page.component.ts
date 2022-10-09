import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit {

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
