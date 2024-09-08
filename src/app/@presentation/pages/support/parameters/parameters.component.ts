import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Parameter } from 'src/app/@data/model/general/parameter';

import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { GuidGenerator } from 'src/app/@data/model/general/guid-generator';
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
  timeFormControl:any
  event:any;
  myForm: FormGroup;
  btn: any;
  controlType: any;
  flag=false;
  cantidadForm:any;
  controlName:any;
  booleanContro:any=false;
  booleanControSelect:any=false;

 // hobbiesArray = new FormArray([new FormControl('', Validators.required)]);
  constructor(public fb: FormBuilder, private supportService: SupportRepository) {
    this.myForm =new FormGroup({
      parameterItems: new FormArray([
        new FormControl('')
      ]),
      id: new FormControl(''),
      name: new FormControl(''),
      idCode: new FormControl(''),
      description: new FormControl(''),
    });

    this.myForm.get('name')?.valueChanges.subscribe((newValue) => {
      this.updateIdCode(newValue);
    });


    
  }
  ngOnInit(): void {
    this.booleanControSelect=true;

   }
  get parameterItems(): FormArray {
    return this.myForm.get('parameterItems') as FormArray;
  }



  save() {

    let array=this.parameterItems.getRawValue();

    const control: Parameter = {
      description: this.myForm.get('description')?.value,
      idCode: this.myForm.get('idCode')?.value,
      name: this.myForm.get('name')?.value,
      parameterItems:array
    };
    this.supportService.saveParameter(control).subscribe(
      (value) => {
      //debuger;

       },
      (error) => { }
    );
    this.controlType = "text";
  }
  state(trues: any) {
    return trues;
  }
  createControl() {
    //debuger
    this.controlName = 'dynamicControl' + GuidGenerator.newGuid();
    const newControl = new FormControl('', Validators.required);
    this.myForm.addControl(this.controlName, newControl);
    this.cantidadForm=Object.keys(this.myForm.controls).length;
    console.log(this.cantidadForm);
  }
  addInputControl() {
    //debuger;
    this.controlName = 'dynamicControl' + GuidGenerator.newGuid();
    const newControl = new FormControl('', Validators.required);
    this.myForm.addControl(this.controlName, newControl);
    this.parameterItems.push(new FormControl('', Validators.required));
  }

  removeInputControl(idx: number) {
    //debuger;
    this.myForm;
    this.parameterItems.removeAt(idx);
  }
  disableControl(){

    this.myForm.get('name')?.disable();
    this.myForm.get('idCode')?.disable();
    this.myForm.get('description')?.disable();

  }
  clearControl(){
 
    this.myForm.get('name')?.enable();
    this.myForm.get('idCode')?.enable();
    this.myForm.get('description')?.enable();
  
    for (let index = 0; index <   this.parameterItems.length; index++) {
       if(index!=0){
      this.parameterItems.removeAt(index );
    }
      
    }
    this.myForm.reset();

  }
  onKeyUp(event:any){
    //debuger;
    this.booleanContro=true;
    this.booleanControSelect=false;
    return true;

  }
  updateIdCode(newValue: string) {
    this.myForm.get('idCode')?.setValue(newValue);
  }
}
