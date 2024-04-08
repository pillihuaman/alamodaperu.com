import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NbComponentStatus } from '@nebular/theme';
import { map } from 'rxjs';
import { EmployeeRequest } from 'src/app/@data/model/employee/employeRequest';
import { EmployeeResponse } from 'src/app/@data/model/employee/employeeResponse';
import { TreeNode } from 'src/app/@data/model/general/treeNode';
import { SpinnerService } from 'src/app/@data/services/spinner.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { ModalComponent } from 'src/app/@presentation/@common-components/modal/modal.component';
import { BaseImplementation } from 'src/app/utils/baseImplementation';
import { GeneralConstans } from 'src/app/utils/generalConstant';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseImplementation implements OnInit {
  employeRequestForm!: FormGroup;
  employeRequest?: EmployeeRequest;
  datas?: TreeNode<EmployeeResponse>[] = [];
  teestMod: string = "tees";
  page?: number = GeneralConstans.page
  pageSize?: number = GeneralConstans.perPage;
  isLoading = false;
  hasMorePagesT = false;
  searchButtonDisabled = true;
  typeOfSearch: any;
  listError: any;
  defaultColumnsInput: any = ['id', 'name', "lastName", "document", 
  "startDate","finishDate","totalHours","total"];
  columnMappin(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Name',
      lastName: 'Last Name',
      startDate: 'Start Date',
      finishDate: 'Finish Date',
      totalHours: 'Total Hours',
      total: 'Total',
      document: 'Document',

    };

  }
   processDataResult?:any;
  constructor(private fb: FormBuilder, private supportService: SupportRepository, private modalRepository: ModalRepository,
    public dialog: MatDialog, private spinnerService: SpinnerService,private datePipe: DatePipe) {
    super();
    this.employeRequest = {
      finishDateFormatted: '', // Initialize with an empty string
      startDateFormatted: '',
    };
  }
  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy HH:mm:ss');
    return formattedDate || ''; // Return the formatted date or an empty string if the input date is invalid
  }
  ngOnInit(): void {
    this.page=1;
    this.buildForm();
    this.findByDefualt()
  }



 
  handleActionClick(event: any) {
    
  
    const rowData = event;

    // Open a confirmation modal before proceeding with the delete action
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        code: GeneralConstans.warningCode,
        message: 'This is a warning message. Are you sure you want to delete the information?',
        lazyLoad: false,
      },
    });

    dialogRef.componentInstance.deleteConfirmed.subscribe(() => {
     
      // This block will be executed when the user confirms the delete action in the modal
      console.log('Row Data:', rowData);
  
      // Perform the delete action here
      this.handleDeleteAction(rowData);
    });

/*
    dialogRef.afterClosed().subscribe((result) => {
      // If the user confirms the action, result will be truthy
      if (result) {
        console.log('Action:', action);
        console.log('Row Data:', rowData);

        // Perform the delete action here
        this.handleDeleteAction(rowData);
      }
    });*/
  }
  isNewPage(): boolean {
    return !this.employeRequestForm.get('id')?.value;
  }

  buildForm() {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required], // Initialize the form control without accessing employeRequestForm.controls['name'].value
      lastName: [''], // Similarly for other form controls
      startDate: [''],
      finishDate: [''],
      document:  ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
      idToFind: [''],
      nameToFind: [''], 
      lastNameToFind: [''], 
      documentToFind:  [''],
    });
  }
  

  findEmproyeeProcess() {
    debugger

    this.spinnerService.show();
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';
   
    this.supportService.findEmployee(this.page, this.pageSize, id, name,
      lastName, document).pipe(
        map((value) => {
          let respo: EmployeeResponse[] = value.payload;
         /* let copyStock: TreeNode<EmployeeResponse>[] = [];
          respo.forEach((value, index) => {
            let transformedData: any = {
            };
            for (const key in value) {
              if (this.columnMappin()[key]) {
                transformedData[this.columnMappin()[key]] = value[key];
              } else {
                transformedData[key] = value[key];
              }
            }

            let costuItem: TreeNode<EmployeeResponse> = { data: transformedData }
            copyStock.push(costuItem);
          });*/


          return  this.customizePropertyNames(respo, this.columnMappin());;
        })
      ).subscribe(
        (data) => {
          this.datas = data;
          console.log("Data source page", this.datas);          
          if (this.datas && this.datas.length > 0) {
            console.log("Data" + Object.keys(this.datas[0].data))
            this.defaultColumnsInput = Object.keys(this.datas[0].data);
            this.hasMorePagesT = true;
          } else {
            this.hasMorePagesT = false;
          }
  
          this.spinnerService.hide();

        },
        (error) => {
          if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
            error.error.data.payload.forEach((errorItem: any) => {
              const controlName = errorItem.propertyPath;
              const errorMesagge = errorItem.valExceptionDescription;
              this.employeRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();

        }

      );
  }

  onSubmit() {
    if (this.employeRequestForm.valid) {
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
          setTimeout(() => {
            window.location.reload();
          }, 600);
          this.spinnerService.hide();
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
  }
  handleDeleteAction(row: TreeNode<any>): void {
    ;
  
    console.log('Deleting:', row.data);
    if (row.data.ID !== undefined) {
      const  id:String=row.data.ID;
    this.supportService.deletePages(id).subscribe(
      (value) => {
        // Handle success
        let nbComponentStatus: NbComponentStatus = 'success';
        this.modalRepository.showToast(nbComponentStatus, "delete Succes", "Succes");
        this.employeRequestForm.reset();
        setTimeout(() => {
          window.location.reload();
        }, 600);
        this.spinnerService.hide();
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
    }
    this.findEmproyeeProcess();
  }

  handleEditicionAction(row: TreeNode<any>): void {
    debugger
    const rowData = row.data;
    const revertedData = this.revertPropertyNames([row], this.columnMappin())[0];
    const startDate:any = this.datePipe.transform(revertedData.startDate, 'yyyy-MM-dd HH:mm:ss');
    const finishDate :any = this.datePipe.transform(revertedData.finishDate, 'yyyy-MM-dd HH:mm:ss');
    this.employeRequestForm.patchValue({
      id: revertedData.id,
      name: revertedData.name,
      lastName: revertedData.lastName, // Since the mapping has been reverted, use the original property name
      startDate: new Date(startDate),
      finishDate:new Date(finishDate) ,
      salaryHours: revertedData.salaryHours,
      document: revertedData.document,

      // Populate other form controls as needed
    });
  }



  override onPageChange(page: number): void {
    ;
    this.page = page;
    this.findByDefualt()
  }

  override onPageSizeChange(pageSize: number): void {
    ;
    //this.pageSize = pageSize;
    //this.findPages();
  }

  checkInputs() {
    //declare input to find 
    debugger;

    const idToFind = this.employeRequestForm.get('idToFind')?.value || '';
    const nameToFind = this.employeRequestForm.get('nameToFind')?.value || '';
    const lastNameToFind = this.employeRequestForm.get('lastNameToFind')?.value || '';
    const documentToFind = this.employeRequestForm.get('documentToFind')?.value || '';


    this.searchButtonDisabled = !(idToFind || nameToFind || lastNameToFind || documentToFind);
    if (this.searchButtonDisabled) {     
     this.page = GeneralConstans.page
      this.typeOfSearch = GeneralConstans.typeSearchDefault
      this.findEmproyeeProcess();
    }
   // this.validateObjectID();
  }

  override findByparameter() {
 debugger
    //  lista de errores
    this.listError = this.validateObjectID();
    if (this.listError.length === 0) {
      this.employeRequestForm.get('idToFind')?.markAsTouched();
      this.page = GeneralConstans.page
      this.pageSize = GeneralConstans.perPage;
      this.typeOfSearch = GeneralConstans.typeSearchEspecific
      this.findEmproyeeProcess();
    }
  }
  override findByDefualt() {

    this.typeOfSearch = GeneralConstans.typeSearchDefault
    this.findEmproyeeProcess();
  }

  validateObjectID(): string[] {
    const idToFind = this.employeRequestForm.get('idToFind')?.value || '';
    const errorMessages: string[] = [];
    // Validate the idToFind control
    const isIdValid = Utils.isValidObjectId(idToFind);
    if (!Utils.empty(idToFind)) {
      if (!isIdValid) {
        // Handle the case when validation fails, e.g., add an error message to the array
        errorMessages.push('ID is not valid.');
      }
    }
    // Add more validation logic and error messages as needed
    return errorMessages;
  }

}

