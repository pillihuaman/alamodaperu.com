import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NbComponentStatus, NbDialogService } from '@nebular/theme';
import { map } from 'rxjs';
import { EmployeeRequest } from 'src/app/@data/model/employee/employeRequest';
import { EmployeeResponse } from 'src/app/@data/model/employee/employeeResponse';
import { ModalType } from 'src/app/@data/model/general/enumModal';
import { Modal } from 'src/app/@data/model/general/modal';
import { TreeNode } from 'src/app/@data/model/general/treeNode';
import { EmployeeService } from 'src/app/@data/services/employee.service';
import { SpinnerService } from 'src/app/@data/services/spinner.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { ModalComponent } from 'src/app/@presentation/@common-components/modal/modal.component';
import { BaseImplementation } from 'src/app/utils/baseImplementation';
import { GeneralConstans } from 'src/app/utils/generalConstant';
import { Utils } from 'src/app/utils/utils';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';

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
  isModalVisible: boolean = false;
  //page?: number = GeneralConstans.page
  //pageSize?: number = GeneralConstans.perPage;
  isLoading = false;
   isdelelete : any;
  searchButtonDisabled = true;
  typeOfSearch: any;
  listError: any;
  @Output() deleteAction = new EventEmitter<TreeNode<any>>();
  defaultColumnsInput: any = ['id', 'name', "lastName", "document",
    "startDate", "finishDate", "totalHours", "total"];
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
  isRegisterEmployeeExpanded: boolean = false; // Set to true to initially expand the section
  hasMorePagesT: boolean = true;
  processDataResult?: any;
  constructor(private fb: FormBuilder, private supportService: SupportRepository, private modalRepository: ModalRepository,
    private dialogService: NbDialogService, private spinnerService: SpinnerService, private datePipe: DatePipe, 
    private employeeService: EmployeeService) {
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
    this.page = 1;
    this.buildForm();
    this. findEmproyeeProcess()
 
    this.employeeService.employees$.subscribe((employees) => {
      
      this.datas = this.customizePropertyNames(employees, this.columnMappin());
      if (this.datas && this.datas.length > 0) {
        this.defaultColumnsInput = Object.keys(this.datas[0].data);
        this.updateHasMorePagesT(true);
      } else {
        this.updateHasMorePagesT(false);
        
      }
      this.spinnerService.hide();
    });
  }
  findByDefualtg() {
    //;
    const id = this.employeRequestForm.value.idToFind || '';
    const name = this.employeRequestForm.value.nameToFind || '';
    const lastName = this.employeRequestForm.value.lastNameToFind || '';
    const document = this.employeRequestForm.value.documentToFind || '';
    this.employeeService.fetchEmployees(this.page ?? GeneralConstans.page, this.pageSize ?? GeneralConstans.perPage, id, name, lastName, document);

  }

  deleting(event: any) {
   const modal: Modal = {
      data: event.data,
      description: event.data.Name,
      typeDescription:ModalType.QUESTION.toString()
    };
    
    const dialogRef = this.dialogService.open(ModalComponent, {
      context: {
        rowData: modal // Pass the data to the modal
      } as any

    });
    //debuger
    dialogRef.componentRef.instance.deleteConfirmed.subscribe(() => {
      this.handleDeleteAction(event); // Implement logic to delete data
    });
  }
  isNewPage(): boolean {
    return !this.employeRequestForm.get('id')?.value;
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


  findEmproyeeProcess() {
    ////////debuger;
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


          return this.customizePropertyNames(respo, this.columnMappin());;
        })
      ).subscribe(
        (data) => {
          this.datas = data;
          
          console.log("Data source page", this.datas);
          if (this.datas && this.datas.length > 0) {
            console.log("Data" + Object.keys(this.datas[0].data))
            this.defaultColumnsInput = Object.keys(this.datas[0].data);
            this.updateHasMorePagesT(true);

          } else {
            this.updateHasMorePagesT(false);

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


  handleDeleteAction(row: TreeNode<any>): void {
    console.log('Deleting:', row);
    if (row.data.ID !== undefined) {
      const id: String = row.data.ID;
      this.supportService.deleteEmployee(id).subscribe(
        (value) => {
          // Handl.e success
          let nbComponentStatus: NbComponentStatus = 'success';
          this.modalRepository.showToast(nbComponentStatus, "delete Succes", "Succes");
          //this.employeRequestForm.reset();
        // this.employeeService.reloadEmployees();
          this.spinnerService.hide();
          this.isdelelete=row;
          //this.findEmproyeeProcess()
         //this.findByDefualtg();
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

  }
  handleEditicionAction(row: TreeNode<any>): void {
    ////////debuger;
    const rowData = row.data;
    const revertedData = this.revertPropertyNames([row], this.columnMappin())[0];
//const startDate: any = this.datePipe.transform(revertedData.startDate, 'dd/MM/yyyy HH:mm:ss');
//const finishDate: any = this.datePipe.transform(revertedData.finishDate, 'dd/MM/yyyy HH:mm:ss');
    this.employeRequestForm.patchValue({
      id: revertedData.id,
      name: revertedData.name,
      lastName: revertedData.lastName, // Since the mapping has been reverted, use the original property name
      startDate:Utils.convertStringToDate(revertedData.startDate),
      finishDate: Utils.convertStringToDate(revertedData.finishDate),
      salaryHours: revertedData.salaryHours,
      document: revertedData.document,

      // Populate other form controls as needed
    });
    this.isRegisterEmployeeExpanded = true;
  }



  override onPageChange(page: number): void {
    super.onPageChange(page); // Call the implementation in BaseImplementation
    console.log("EmployeeComponent onPageChange called with page:", page);
  }

  override onPageSizeChange(pageSize: number): void {
    
  }

  checkInputs() {
    //declare input to find 
    //////////////debuger;
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
    ////////debuger;
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
  updateHasMorePagesT(value: boolean): void {
    this.hasMorePagesT = value;
   // this.hasMorePagesT = value;
    //this.hasMorePagesTChange.emit(this.hasMorePagesT);
  }
  onHasMorePagesTChange(hasMorePages: boolean): void {
    ;
   // this.hasMorePagesT = hasMorePages;

  }


  onNewClick(): void {
    this.dialogService.open(RegisterEmployeeComponent, {
      context: {
        // Optional: Pass any data you need for the modal (context)
      },
      closeOnBackdropClick: false, // Prevent closing on clicking outside the modal
      hasBackdrop: true,           // Ensure the backdrop is enabled
      backdropClass: 'custom-backdrop', // Optionally, customize the backdrop class
      dialogClass: 'custom-dialog'  // Customize the dialog class for the entire modal
    }).onClose.subscribe(result => {
      // Actions to take after the modal is closed, if necessary
      console.log('Dialog closed', result);
    });
  }
  
  }



function getIndexForModalType(WARNING: ModalType): ModalType | undefined {
  throw new Error('Function not implemented.');
}

