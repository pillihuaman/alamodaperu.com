import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus } from '@nebular/theme';
import { SystemRequest } from 'src/app/@data/model/general/systemRequest';
import { SupportService } from 'src/app/@data/services/support.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';

@Component({
  selector: 'app-register-system',
  templateUrl: './register-system.component.html',
  styleUrls: ['./register-system.component.scss']
})
export class RegisterSystemComponent implements OnInit {


  systemRequestForm!: FormGroup;

  constructor(private fb: FormBuilder, private supportService: SupportService, private modalRepository: ModalRepository) { }

  ngOnInit(): void {
    this.systemRequestForm = this.fb.group({
      name: ['', Validators.required],
      version: [''],
      mainMenu: [''],
      timezone: [''],
      isActive: [''],
      contactEmail: [''],
      supportPhone: [''],
    });
  }

  onSubmit(): void {
    // Check if the form is valid
    if (this.systemRequestForm.valid) {
      // Create a new instance of SystemRequest
      const systemRequest : SystemRequest={
  
      // Retrieve data from the form controls and assign it to the systemRequest object
      name : this.systemRequestForm.get('name')?.value,
      version :this.systemRequestForm.get('version')?.value,
      mainMenu : this.systemRequestForm.get('mainMenu')?.value,
      timezone :"" ,
      isActive : true,
      contactEmail : this.systemRequestForm.get('contactEmail')?.value,
      supportPhone : this.systemRequestForm.get('supportPhone')?.value
      }
  
      // Call the saveSystem method in your service to save the system request
      this.supportService.saveSystem(systemRequest).subscribe(
        (value) => {
          debugger;
          // Handle success
          console.log('System saved successfully:', value);
          // You can display a success message or redirect to another page here
        },
        (error) => {
          // Handle error
          console.error('Error saving system:', error);
          // You can display an error message or handle the error as needed
        }
      );
    }
  }
  
}
