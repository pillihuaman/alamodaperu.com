import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-router-button',
  templateUrl: './router-button.component.html',
  styleUrls: ['./router-button.component.scss'],
})
export class RouterButtonComponent implements OnInit {
  @Input() textButton: any;
  @Input() typeButton: any;

  constructor() {}

  ngOnInit(): void {}
}
