import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Parameter } from 'src/app/@data/model/general/parameter';
import { SupportService } from 'src/app/@data/services/support.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  myForm: FormGroup;
  btn: any;
  constructor(public fb: FormBuilder, private supportService: SupportService) {
    this.myForm = this.fb.group({
      id: [null],
      idCode: [''],
      name: [''],
      Description: ['']
    });
  }
  ngOnInit(): void {}

  save() {

    const control: Parameter = {
      description: this.myForm.get('description')?.value,
      idCode: this.myForm.get('idCode')?.value,
      name: this.myForm.get('name')?.value,
      id: this.myForm.get('id')?.value,
    };
    this.supportService.saveControl(control).subscribe(
      (value) => {},
      (error) => {}
    );
  }
  state(trues: any) {
    return trues;
  }
}
