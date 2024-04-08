import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MatIconModule } from '@angular/material/icon';
import { MenuLeft } from 'src/app/@data/model/general/menu-left';

@Component({
  selector: 'serv-pillihuaman-sidebar-home',
  templateUrl: './serv-pillihuaman-sidebar-home.component.html',
  styleUrls: ['./serv-pillihuaman-sidebar-home.component.scss']
})
export class ServPillihuamanSidebarHomeComponent implements OnInit {



  listMenuLeft: MenuLeft[] = [];
  constructor() {

    let menuLeft: MenuLeft = {
      idMenu: 1,
      description: 'Home',
      icono: 'house',
      iconClass: 'material-icons-outlined',
      url: '/'
    }

    let menuLeft1: MenuLeft = {
      idMenu: 2,
      description: 'Video',
      icono: 'play_circle_outline',
      iconClass: 'material-icons-outlined',
      url: '/user'
    }
    this.listMenuLeft.push(menuLeft);
    this.listMenuLeft.push(menuLeft1);

  }

  ngOnInit(): void {
  }

  HideMenu(): void {

  }

}
