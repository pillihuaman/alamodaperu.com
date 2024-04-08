import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NbIconConfig, NbLayoutRulerService, NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';
import { ItemMenu } from 'src/app/@data/model/general/item-menu';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-serv-pillihuaman-header-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './serv-pillihuaman-header-home.component.html'
})
export class ServPillihuamanHeaderHomeComponent implements OnInit {
  contadoTaggle: number = 1;
  listThemes: any[] = [
    { description: 'corporate', value: 0, position: 1 },
    { description: 'default', value: 1, position: 2 },
    { description: 'dark', value: 2, position: 3 },
    { description: 'cosmic', value: 3, position: 4 },

  ];
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];


  disabledIconConfig: NbIconConfig = { icon: 'settings-2-outline', pack: 'eva' };

  constructor(private nbserviceThemes: NbThemeService, private sidebarService: NbSidebarService, private brakpointservice: BreakpointObserver,
    route: Router, private layoutService: NbLayoutRulerService
  ) { }

  ngOnInit(): void {


  }
  ChangeThemes(event: any) {
    this.nbserviceThemes.changeTheme(event);

  }
  home() {



  }

  toggle() {


    this.sidebarService.toggle(true, 'menu-barapp');
    console.log(this.layoutService.getDimensions());
    return false;
  }

}
