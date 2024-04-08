import { NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NbComponentStatus } from '@nebular/theme';
import { SpinnerService } from 'src/app/@data/services/spinner.service';
import { ModalRepository } from 'src/app/@domain/repository/repository/modal.repository ';
import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';
import { BaseImplementation } from 'src/app/utils/baseImplementation';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagen } from 'src/app/@data/model/imagen/imagen';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-randon-imagen-color',
  templateUrl: './create-randon-imagen-color.component.html',
  styleUrls: ['./create-randon-imagen-color.component.scss']
})
export class CreateRandonImagenColorComponent extends BaseImplementation implements OnInit {
  pageRequestForm!: FormGroup;
  selectedFile: File | null = null;
  processDataResult?: any;
  imageUrl: SafeUrl | null = null;
  constructor(
    private fb: FormBuilder,
    private supportService: SupportRepository,
    private modalRepository: ModalRepository,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
    private http: HttpClient,  private sanitizer: DomSanitizer,
    private zone: NgZone
  ) {
    super();
  }
  responseBase64: string | null = null;
  imagen: Imagen = {};
  imagenResponse: string[] = [];
  base64Data: { base64String: string; contentType: string } = { base64String: '', contentType: '' };

  ngOnInit(): void {
    this.buildForm();
    this.findByDefualt();
  }

  buildForm() {
    this.pageRequestForm = this.fb.group({
      files: [''],
    });
  }

  fileUploaderConfig = {
    showUploadBtn: false,
    multiple: true,
    showLegend: false,
  };

  onFileSelected(event: any) {
    debugger;
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);

    if (this.selectedFile) {
      this.readFileContent(this.selectedFile).then((result) => {
        // Use the base64String and contentType as needed
        this.base64Data = result;
        console.log('File content as Base64:', this.base64Data.base64String);
      });
    }
  }
  readFileContent(file: File): Promise<{ base64String: string; contentType: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = reader.result as string;

        // Extract contentType from the Data URL
        const contentType = base64String.split(';')[0].split(':')[1];

        resolve({ base64String, contentType });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read the file as Data URL, which is a Base64-encoded string
      reader.readAsDataURL(file);
    });
  }

  private displayImage(base64String: string): void {
    debugger;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Sanitize the URL
    this.zone.run(() => {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    });
  }
  
  onSubmit() {
    debugger;
    if (this.pageRequestForm.valid) {
      const formValues = this.pageRequestForm.value;


      this.spinnerService.show();
      this.imagen.file = this.base64Data.base64String;
      this.imagen.contentType = this.base64Data.contentType;
      this.imagen.name = this.selectedFile?.name || "Untitled"; // Use the file name or a default value

      this.supportService.changeColorImagen(this.imagen).subscribe(
        (value) => {
          // Handle success
          let nbComponentStatus: NbComponentStatus = 'success';
          this.modalRepository.showToast(nbComponentStatus, "Save Succes", "Succes");
          this.pageRequestForm.reset();
         this.imagenResponse=value.payload.colorsCode
          this.displayImage(value.payload.base64Image);

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
      /*

        this.http.post('http://localhost:8099/private/v1/imagen/imagenChangeColor', this.imagen)
          .subscribe(
            (response: any) => {
              console.log('Upload successful', response);
              let nbComponentStatus: NbComponentStatus = 'success';
              this.modalRepository.showToast(nbComponentStatus, 'Save Success', 'Success');
              this.pageRequestForm.reset();
            },
            (error: any) => {
              console.error('Upload failed', error);
            }
          )
          .add(() => this.spinnerService.hide());*/
      
    
  }
}
}
