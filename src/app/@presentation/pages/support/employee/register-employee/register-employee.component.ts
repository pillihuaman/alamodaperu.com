import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NbComponentStatus, NbDialogRef } from '@nebular/theme';
import { SpinnerService } from 'src/app/@data/services/spinner.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {
  @Input() employeRequestForm!: FormGroup;


  constructor(private fb: FormBuilder, private spinnerService: SpinnerService, private datePipe: DatePipe, private supportService: SupportRepository,
    private modalRepository: ModalRepository,   
    @Optional() protected dialogRef: NbDialogRef<RegisterEmployeeComponent>  // Optional injection

  ) { 


    
  }

  ngOnInit(): void {
    this.buildForm();
    window.addEventListener('keydown', this.handleEscKey.bind(this));

  }



  buildForm() {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: [''],
      finishDate: [''],
      document: ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
      idToFind: [''],
      nameToFind: [''],
      lastNameToFind: [''],
      documentToFind: [''],
    });
  }

  onSubmit() {
    debugger
    const startDateFormatted = this.datePipe.transform(this.employeRequestForm.value.startDate, 'dd/MM/yyyy HH:mm:ss');
    const finishDateFormatted = this.datePipe.transform(this.employeRequestForm.value.finishDate, 'dd/MM/yyyy HH:mm:ss');

    // Assign the formatted dates and other form values to formValues
    const formValues = {
      ...this.employeRequestForm.value,
      startDate: startDateFormatted,
      finishDate: finishDateFormatted
    };

    this.spinnerService.show();
    this.supportService.saveEmployee(formValues).subscribe(
      (value) => {
        // Handle success
        let nbComponentStatus: NbComponentStatus = 'success';
        this.modalRepository.showToast(nbComponentStatus, "Save Succes", "Succes");
        this.employeRequestForm.reset();
        //this.findEmproyeeProcess()
        this.spinnerService.hide();
         window.location.reload();
        this.closeDialog();
      },
      (error) => {
        ;
        // Handle error

        if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
          // Map the errors to the form controls
          error.error.data.payload.forEach((errorItem: any) => {
            const controlName = errorItem.propertyPath;
            const errorMesagge = errorItem.valExceptionDescription;

            this.employeRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
          });
        }
        this.spinnerService.hide();
      }

    );
    console.log('Form values:', formValues);

  }

  closeDialog() {
    debugger
    this.employeRequestForm.reset(); // Optional: reset form when closing modal
    if (this.dialogRef) {
      this.dialogRef.close(); // Close the dialog using the dialog reference
    }
  }

  handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
  this.closeDialog();
    }
  }

}