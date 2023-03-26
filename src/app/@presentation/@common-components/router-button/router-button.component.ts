import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Control } from 'src/app/@data/model/general/control';
import { AuthenticationService } from 'src/app/@data/services/authentication.service';
import { DataService } from 'src/app/@data/services/data.service';

@Component({
  selector: 'app-router-button',
  templateUrl: './router-button.component.html',
  styleUrls: ['./router-button.component.scss'],
})
export class RouterButtonComponent implements OnInit {
  //@Input() textButton: string = '';
  //@Input() typeButton: any;
  //@Input() class: any;
  //@Input() visible: boolean = false;
  @Input() idCode?: String;
  lstControl?: Control[];
  subscription?: Subscription;
  control?: Control;
  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    let us = this.authenticationService.getCurrentUserValue.control;
    us?.forEach((element) => {
      if (element.idCode === this.idCode) {
        this.control = element;
      }
    });
  }
}
