import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbComponentStatus } from '@nebular/theme';
import { PageRequest } from 'src/app/@data/model/general/pageRequest';
import { PageResponse } from 'src/app/@data/model/general/pageResponse';
import { TreeNode } from 'src/app/@data/model/general/treeNode';
import { SupportService } from 'src/app/@data/services/support.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/@presentation/@common-components/modal/modal.component';
import { GeneralConstans } from 'src/app/utils/generalConstant';
import { ModalModel } from 'src/app/@data/model/User/modalModel';
import { HeaderTable } from 'src/app/@data/model/general/headerTable';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  pageRequestForm!: FormGroup; // Change to a non-nullable FormGroup
  pageRequest?: PageRequest;
  datas?: TreeNode<PageResponse>[] = [];
  teestMod:string="tees";
  //defaultColumnsInput: { name: string; controlType: string }[] = [];
  defaultColumnsInput: any = ['id', 'title',"content","isPublished","metaKeywords","metaDescription"];
  //defaultColumnsInput: HeaderTable[] = [];
 // customColumnInput: any = 'Nrodd';
 page?:number=0
 pageSize?:number=350;
  constructor(private fb: FormBuilder,private supportService: SupportService, private modalRepository: ModalRepository,
    public dialog: MatDialog) {
    this.pageRequest = {}; // Make sure to initialize pageRequest
  }

   ngOnInit(): void {
    this.buildForm();
    this.findPages();

  }
  onPageChange(page: number): void {
    debugger;
    this.page = page;
    this.findPages();
  }

  onPageSizeChange(pageSize: number): void {
    debugger;
    //this.pageSize = pageSize;
    //this.findPages();
  }

  handleActionClick(event: any) {
  
    const action = event.action;
    const rowData = event.row;
    
    const warningModalData: ModalModel = {
      code: GeneralConstans.warningCode,
      message: 'This is a warning message. Are you sure you want to delete the information?',
      lazyLoad: false,
    };
    
    this.dialog.open(ModalComponent, {
      data: warningModalData,
    });

  
    // Now, you have the action and row data in the RegisterPageComponent
    console.log('Action:', action);
    console.log('Row Data:', rowData);
  
    // Do whatever you need with the action and data
  }

  buildForm() {
    this.pageRequestForm = this.fb.group({
      title: [this.pageRequest?.title, Validators.required],
      content: [this.pageRequest?.content],
      url: [this.pageRequest?.url],
      isPublished: [this.pageRequest?.isPublished],
      metaKeywords: [this.pageRequest?.metaKeywords],
      metaDescription: [this.pageRequest?.metaDescription]
    });
  }

  findPages() {
    const columnNamesMapping: { [key: string]: string } = {
      id: 'ID',
      title: 'Page Title',
      content: 'Page Content',
      isPublished: 'Published',
      metaKeywords: 'Keywords',
      metaDescription: 'Description'

    };
    this.supportService.findPages(this.page, this.pageSize).pipe(
      map((value) => {
        let respo: PageResponse[] = value.payload;
        let copyStock: TreeNode<PageResponse>[] = [];
        respo.forEach((value, index) => {
          let transformedData: any = {};
          //transformedData['Nro'] = index + 1;
          // Map original column names to custom column names
          for (const key in value) {
            if (columnNamesMapping[key]) {
              transformedData[columnNamesMapping[key]] = value[key];
            } else {
              transformedData[key] = value[key];
            }
          }
  
          let costuItem: TreeNode<PageResponse> = { data: transformedData }
          copyStock.push(costuItem);
        });
  
        return copyStock;
      })
    ).subscribe(
      (data) => {
        debugger
        this.datas = data;
        console.log("Data source page", this.datas);
  
        // Update defaultColumnsInput based on the keys of the first item in datas
        if (this.datas && this.datas.length > 0) {
          console.log("Data"+ Object.keys(this.datas[0].data))
          this.defaultColumnsInput = Object.keys(this.datas[0].data);
         // this.defaultColumnsInput = Object.keys(this.datas[0].data).map(key => ({ id: key, name: key }));
        }
      },
      (error) => {
        if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
          error.error.data.payload.forEach((errorItem: any) => {
            const controlName = errorItem.propertyPath;
            const errorMesagge = errorItem.valExceptionDescription;
            this.pageRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
          });
        }
      }
    );
  }
  

  onSubmit() {
    if (this.pageRequestForm.valid) {
      // Get the form values
      const formValues = this.pageRequestForm.value;

        // Call the saveSystem method in your service to save the system request
        this.supportService.savePage(formValues).subscribe(
          (value) => {
            debugger;
            // Handle success
            let nbComponentStatus: NbComponentStatus = 'success';
            // this.router.navigate(['/auth/login']);
             this.modalRepository.showToast(nbComponentStatus,"Save Succes","Succes");
            this.pageRequestForm.reset();
      
          },
          (error) => {
            debugger;
            // Handle error
         
            if ((error.status === 422 || error.status === 500 )&& error.error && error.error.data && error.error.data.payload) {
              // Map the errors to the form controls
              error.error.data.payload.forEach((errorItem: any) => {
                const controlName = errorItem.propertyPath;
                const errorMesagge = errorItem.valExceptionDescription;
                //this.systemRequestForm.get(controlName)?.setErrors({ customError: errorMesagge });
  
                this.pageRequestForm.get(controlName)?.setErrors({ invalid: true ,customError: errorMesagge});
              });
            }
          }
        );

      console.log('Form values:', formValues);
    }
  }
}
