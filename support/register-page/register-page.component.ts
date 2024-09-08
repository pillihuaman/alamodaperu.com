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
import { SpinnerService } from 'src/app/@data/services/spinner.service';
import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  pageRequestForm!: FormGroup;
  pageRequest?: PageRequest;
  datas?: TreeNode<PageResponse>[] = [];
  teestMod: string = "tees";
  defaultColumnsInput: any = ['id', 'title', "content", "isPublished", "metaKeywords", "metaDescription"];
  page?: number = GeneralConstans.page
  pageSize?: number = GeneralConstans.perPage;
  isLoading = false;
  hasMorePagesT = false;
  typeSearch: String = GeneralConstans.typeSearchDefault;
  constructor(private fb: FormBuilder, private supportService: SupportRepository, private modalRepository: ModalRepository,
    public dialog: MatDialog, private spinnerService: SpinnerService) {
    this.pageRequest = {};
  }

  ngOnInit(): void {
    this.buildForm();
  }
  
  onPageChange(page: number): void {
    ;
    this.page = page;
  }

  onPageSizeChange(pageSize: number): void {
    ;
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
    console.log('Action:', action);
    console.log('Row Data:', rowData);
  }

  buildForm() {
    this.pageRequestForm = this.fb.group({
      title: [this.pageRequest?.title, Validators.required],
      content: [this.pageRequest?.content],
      url: [this.pageRequest?.url],
      isPublished: [this.pageRequest?.isPublished],
      metaKeywords: [this.pageRequest?.metaKeywords],
      metaDescription: [this.pageRequest?.metaDescription],
      idToFind: '',
      titleToFind: '',
      contentToFind: '',
      urlToFind: '',
    });
  }

  findPagesProcess() {
    //debuger;
    this.spinnerService.show();
    const columnNamesMapping: { [key: string]: string } = {
      id: 'ID',
      title: 'Page Title',
      content: 'Page Content',
      isPublished: 'Published',
      metaKeywords: 'Keywords',
      metaDescription: 'Description'

    };
    const id = this.pageRequestForm.value.idToFind || '';
    const title = this.pageRequestForm.value.titleToFind || '';
    const content = this.pageRequestForm.value.contentToFind || '';
    const url = this.pageRequestForm.value.urlToFind || '';
    this.validateTypeFind();
    this.supportService.findPages(this.page, this.pageSize, id, title,
      content, url).pipe(
        map((value) => {
          let respo: PageResponse[] = value.payload;
          let copyStock: TreeNode<PageResponse>[] = [];
          respo.forEach((value, index) => {
            let transformedData: any = {};
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
          this.datas = data;
          console.log("Data source page", this.datas);
          //debuger;
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
              this.pageRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();

        }

      );
  }

  onSubmit() {
    if (this.pageRequestForm.valid) {
      const formValues = this.pageRequestForm.value;
      this.spinnerService.show();
      this.supportService.savePage(formValues).subscribe(
        (value) => {
          // Handle success
          let nbComponentStatus: NbComponentStatus = 'success';
          this.modalRepository.showToast(nbComponentStatus, "Save Succes", "Succes");
          this.pageRequestForm.reset();
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

              this.pageRequestForm.get(controlName)?.setErrors({ invalid: true, customError: errorMesagge });
            });
          }
          this.spinnerService.hide();
        }

      );
      console.log('Form values:', formValues);
    }
  }
  validateTypeFind() {
    //debuger
    const id = this.pageRequestForm.value.idToFind || '';
    const title = this.pageRequestForm.value.titleToFind || '';
    const content = this.pageRequestForm.value.contentToFind || '';
    const url = this.pageRequestForm.value.urlToFind || '';
  
    if (id || title || content || url) {
      this.typeSearch = GeneralConstans.typeSearchEspecific;
    } 
  }

  findByparameter() {
    //debuger
    this.typeSearch = GeneralConstans.typeSearchEspecific;
    this. findPagesProcess()
    
  }
  findByDefualt() {
    //debuger
      this.typeSearch = GeneralConstans.typeSearchDefault;
    this. findPagesProcess();
    
  }
}
