import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Imagen } from 'src/app/@data/model/imagen/imagen';
import { UUID } from 'angular2-uuid';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImagenTempService } from 'src/app/@data/services/imagenTemp.service';
import { ImagenTemp } from 'src/app/@data/model/imagen/imagenTemp';
import { ImagenTempFile } from 'src/app/@data/model/imagen/imagenTemFile';
import { fileToBase64 } from 'src/app/utils/converterFile';
import { ImagenDetail } from 'src/app/@data/model/imagen/imagenDetail';
import { Product } from 'src/app/@data/model/product/product';
@Component({
  selector: 'app-register-image-by-product',
  templateUrl: './register-image-by-product.component.html',
  styleUrls: ['./register-image-by-product.component.scss'],
})
export class RegisterImageByProductComponent implements OnInit {
  listProductByUser?: Product[] = [];
  listImagenTemp?: Imagen[] = [
    {
      urlImagen:
        'http://localhost:8087/v1/imagen/getImagen?codImagen=6342acc01413e6298e29ef98',
    },
  ];
  idTempUnique: string = UUID.UUID();
  imagenTem?: any;
  uuidValue?: any;
  count?: any = 0;
  base64File?: String;
  selectImagen?: File;
  filePath1?: String;
  filePath2?: String;
  filePath3?: String;
  filePath4?: String;
  img1?: ImagenDetail;
  img2?: ImagenDetail;
  img3?: ImagenDetail;
  img4?: ImagenDetail;
  myForm: FormGroup;
  lstfilePath?: ImagenDetail[] = [];
  @ViewChild('inputFile') inputFile: ElementRef = {} as ElementRef;
  constructor(
    private imagenTempService: ImagenTempService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
    });
  }
  ngOnInit(): void {
    let prod: Product = { idUser: 12 };
    this.imagenTempService.listProdutByUser(prod).subscribe(
      (value) => {
        this.listProductByUser = value.payload;
      },
      (error) => {}
    );
  }

  loadFile(event: any) {
    // debugger;
    this.count++;
    const file: File[] = event.target.files;
    this.selectImagen = event.target.files[0];
    let imaFile: ImagenTempFile = { file: this.selectImagen };
    this.myForm?.patchValue({
      img: file,
    });
    this.myForm?.get('img')?.updateValueAndValidity();
    if (this.filePath1 === undefined) {
      const readers = new FileReader();
      readers.onload = () => {
        //debugger;
        this.filePath1 = readers.result as string;
        this.img1 = {
          name: this.selectImagen?.name,
          value:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
        };
      };
      readers.readAsDataURL(this.selectImagen!);
    } else if (this.filePath2 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        //debugger;
        this.filePath2 = readers1.result as string;
        this.img2 = {
          name: this.selectImagen?.name,
          value: this.filePath2,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    } else if (this.filePath3 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        //debugger;
        this.filePath3 = readers1.result as string;
        this.img3 = {
          name: this.selectImagen?.name,
          value: this.filePath3,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    } else if (this.filePath4 === undefined) {
      const readers1 = new FileReader();
      readers1.onload = () => {
        //debugger;
        this.filePath4 = readers1.result as string;
        this.img4 = {
          name: this.selectImagen?.name,
          value: this.filePath4,
        };
      };
      readers1.readAsDataURL(this.selectImagen!);
    }
  }
  close(close: any) {
    //debugger;
    if (close === 1) {
      this.filePath1 = undefined;
    } else if (close === 2) {
      this.filePath2 = undefined;
    }
    if (close === 3) {
      this.filePath3 = undefined;
    }
    if (close === 4) {
      this.filePath4 = undefined;
    }
    this.inputFile.nativeElement.value = null;
  }
  save() {
    //debugger;
    if (this.filePath1 && this.filePath1 !== '') {
      this.lstfilePath?.push(this.img1!);
    }
    if (this.filePath2 && this.filePath2 !== '') {
      this.lstfilePath?.push(this.img2!);
    }
    if (this.filePath3 && this.filePath3 !== '') {
      this.lstfilePath?.push(this.img3!);
    }
    if (this.filePath4 && this.filePath4 !== '') {
      this.lstfilePath?.push(this.img4!);
    }

    if (this.lstfilePath && this.lstfilePath.length > 0) {
      let imageTem: ImagenTemp = {
        count: this.count,
        name: '',
        uniqueKeyHash: UUID.UUID(),
        listImagen: this.lstfilePath,
      };

      this.imagenTempService.registerImagenTemp(imageTem).subscribe(
        (value) => {},
        (error) => {}
      );
    }
  }
}
