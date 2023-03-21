import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Control } from 'src/app/@data/model/general/control';
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
  constructor(private dataService: DataService) {
    this.subscription = this.dataService.getData().subscribe((data) => {
      this.lstControl = data;
    });
  }

  ngOnInit(): void {
    debugger;
    // this.lstControl =
    if (this.lstControl) {
      if (this.lstControl.length > 0) {
        this.lstControl.forEach((element) => {
          if (element.idCode === this.idCode) {
            this.control = element;
          }
        });
      }
    }
  }
}
