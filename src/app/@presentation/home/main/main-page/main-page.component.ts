import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listCorouseImages } from 'src/app/@data/model/general/listCorouseImages';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/@data/services/data.service';
import { Utils } from 'src/app/utils/utils';
import { GuidGenerator } from 'src/app/@data/model/general/guid-generator';
import { ImagenTempService } from 'src/app/@data/services/imagenTemp.service';
import { GeneralConstans } from 'src/app/utils/generalConstant';
import { ImagenTemp } from 'src/app/@data/model/imagen/imagenTemp';
import { Const } from 'src/app/utils/const';
import { Subject } from 'rxjs';
import { CorouselImage } from 'src/app/@data/model/general/corouselImage';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(
    private imagenData: DataService,
    private imagenTempService: ImagenTempService
  ) {}
  @Input() images: Array<CorouselImage> = [
    {
      imageSrc:
        'https://tse1.mm.bing.net/th?id=OIP.PDYintG-XVq9UVFkSi3zIQHaES&pid=Api&P=0',
      imageAlt: 'natural 1',
      imagetoken: '8C4148BA0659547583297B45F3134F07ED831F7E',
      firstObject: 'primer',
      index: 0,
      imageCountainerToken: '8C4148BA0659547583297B45F3134F07ED831F7E',
    },
    {
      imageSrc:
        'https://cdn.pixabay.com/photo/2014/08/06/15/34/mushroom-411729_960_720.jpg',
      imageAlt: 'natural 2',
      imagetoken: 'F468C5FD8444F80FE9B4A8A8C53BFCF7E026A2FB',
      index: 1,
      imageCountainerToken: '8C4148BA0659547583297B45F3134F07ED831F7Efdf',
    },
    {
      imageSrc:
        'https://tse3.mm.bing.net/th?id=OIP.4lbR46ux7chIOJakGToRIwHaEo&pid=Api&P=0',
      imageAlt: 'natural 3',
      imagetoken: 'B152BE905DF822BEE673360DC91D66A295D8F655',
      index: 2,
      imageCountainerToken: '8C4148BA0659547583297B45F3134F07ED831F7Ebfdgfgdf',
    },
    {
      imageSrc:
        'https://tse3.mm.bing.net/th?id=OIP.BN0ItP-Qphmj8-j5W_AAtwHaEk&pid=Api&P=0',
      imageAlt: 'natural 4',
      imagetoken: '6F9CE6F1E4AEAB5453E260F39DF753D70E70376C',
      index: 3,
      imageCountainerToken: 'ss8C4148BA0659547583297B45F3134F07ED831F7Eddd',
    },
  ];
  @Input() images2: Array<CorouselImage> = [
    {
      imageSrc:
        'https://tse3.mm.bing.net/th?id=OIP.N1SmDulpcXID9SwcQY1PgQHaEK&pid=Api&P=0',
      imageAlt: 'natural 8',
      imagetoken: '1069D1ADD8C3FA9768265382DCD3F25D5EEA1C21',
      firstObject: 'primer',
      index: 0,
      imageCountainerToken: 'FFF8C4148BA0659547583297B45F3134F07ED831F7EBBB',
    },
    {
      imageSrc:
        'https://tse3.mm.bing.net/th?id=OIP.J9QPuuUJ2cBfCdksiD1iFQHaEK&pid=Api&P=0',
      imageAlt: 'natural 5',
      imagetoken: '7E45E589F694B88928B53505C1EC5ACD7CEFFBDA',
      index: 1,
      imageCountainerToken: 'AAA8C4148BA0659547583297B45F3134F07ED831F7ENNNN',
    },
    {
      imageSrc:
        'https://i.pinimg.com/736x/e9/05/a4/e905a494c728fee6ea51fa13aebe6f58--peru-google-google-search.jpg',
      imageAlt: 'natural 6',
      imagetoken: 'C7DCC08721AD31C1478C30FA4B76EFFC39B76C32',
      index: 2,
      imageCountainerToken: 'FFF8C4148BA0659547583297B45F3134F07ED831F7EBB',
    },
  ];

  @Input() images3: Array<CorouselImage> = [
    {
      imageSrc:
        'https://tse1.mm.bing.net/th?id=OIP.2ND5DCR0oExmLBURf9p_ywHaEx&pid=Api&P=0',
      imageAlt: 'natural 9',
      imagetoken: '10ff69D1ADD8C3FA9768265382DCD3F25D5EEA1C21',
      firstObject: 'primer',
      index: 0,
      imageCountainerToken: 'FFF8C4148BA0659547583297B45F3134F07ED831F7ESS',
    },
    {
      imageSrc:
        'https://tse2.mm.bing.net/th?id=OIP.G5FKqiAjEeeeJOBH6qgiQQHaEK&pid=Api&P=0',
      imageAlt: 'natural 10',
      imagetoken: '7E45E589F694B88928B53505C1EC5ACD7CEFFBfDA',
      index: 1,
      imageCountainerToken: 'SS8C4148BA0659547583297B45F3134F07ED831F7EDDD',
    },
    {
      imageSrc:
        'https://tse4.mm.bing.net/th?id=OIP.Mfb-sgxHvfueKdQLcvdycQHaEK&pid=Api&P=0',
      imageAlt: 'natural 11',
      imagetoken: 'C7DCC08721AD31C1478C30FA4B76ffEFFC39B76C32',
      index: 2,
      imageCountainerToken: 'DD8C4148BA0659547583297B45F3134F07ED831F7ED',
    },
  ];

  @Input() listArrayImages?: listCorouseImages;
  @Input() listArrayImages2?: listCorouseImages;
  @Input() listArrayImages3?: listCorouseImages;
  lstIMf: listCorouseImages[] = [];
  @Input() maincou?: listCorouseImages;
  imagenSelected: CorouselImage = {};
  cont = 0;
  selectIndex = 0;
  selectToken?: string = '';
  selectCol?: string = '';
  @Input() indicators = true;
  hiddenInput?: string;
  nextRowImagen: any;
  selectCountainerToken: any;
  urlApiImagen: String =
    `${Const.URL_IMAGEN}` + `/v1/imagen/getImagen?codImagen=`;
  countImagen?: any;
  eventsSubject: Subject<void> = new Subject<void>();

  @Output() updateImagen = new EventEmitter<CorouselImage>();
  ngOnInit(): void {
    //debugger;
    this.imagenTempService
      .listMainTopImagen(GeneralConstans.page, GeneralConstans.perPage)
      .subscribe(
        (value) => {
          let lstCorouse: listCorouseImages[] = [];
          if (value) {
            if (value.payload) {
              this.lstIMf = value.payload;
              // //console.log(JSON.stringify(value));
              ////console.log(JSON.stringify(this.lstIMf));
            }
          }
        },
        (error) => {}
      );
    /*
    this.listArrayImages = {
      lstCorouseImages: this.images,
      tokenCol: '3C363836CF4E16666669A25DA280A1865C2D2874',
    };
    this.listArrayImages2 = {
      lstCorouseImages: this.images2,
      tokenCol: '4A8A9FC31DC15A4B87BB145B05DB3AE0BF2333E4',
    };
    this.listArrayImages3 = {
      lstCorouseImages: this.images3,
      tokenCol: '4A8A9FC31DC15A4B87BB145B05DB3AE0BF2333E455',
    };
    this.listarArrayImages2.push(this.listArrayImages);
    this.listarArrayImages2.push(this.listArrayImages2);
    this.listarArrayImages2.push(this.listArrayImages3);

    this.listarArrayImages2.forEach((element) => {
      ////console.log(element.lstCorouseImages);
    });*/
  }

  selectImagen(CorouselImage: any, indice: number, listImagenes: any): void {
    this.selectToken = CorouselImage.imagetoken;
    this.selectCol = listImagenes.tokenCol;
    //this.hiddenInput = this.selectToken;
    //console.log('Toke seleccionado', this.selectToken);
    //console.log('Entidad seleccianda', CorouselImage);
    //console.log('indice seleccianda', indice);
    //console.log('main anterior', this.selectCol);
  }
  changeImage(listImagenes: any, image: any) {
    this.selectCol = listImagenes.tokenCol;
    this.nextRowImagen = GuidGenerator.newGuid();
    this.selectToken = image.imagetoken;
    this.selectCountainerToken = image.imageCountainerToken;
    ////console.log(this.nextRowImagen);
  }

  changeImageNext(image: any, listImagenes: listCorouseImages) {
    // this.updateImagen.emit(image);
    this.cont++;
    //this.imagenSelected = image;
    // this.imagenData.SendCorousel(this.imagenSelected);
    ////console.log(image, 'Privios');
    let inde = image.index;
    let count = 0;
    let newImage: any;
    let newInndex = 0;
    //debugger;
    if (
      !Utils.empty(listImagenes) &&
      !Utils.empty(listImagenes.lstCorouseImages)
    ) {
      if (listImagenes.lstCorouseImages !== undefined) {
        count = listImagenes.lstCorouseImages.length;
        if (inde >= count - 1) {
          newInndex = 0;
        } else {
          newInndex = inde + 1;
        }
        newImage = listImagenes.lstCorouseImages[newInndex];
      }
    }

    let elementPre = document.getElementById(image.imagetoken);
    let elementPost = document.getElementById(newImage.imagetoken);
    let elementDot = document.getElementById(image.imageCountainerToken);
    if (elementPre === null || elementPost === null || elementDot === null) {
      alert('oops');
    } else {
      //element.style.display = 'none';
      elementPre.className = 'image-active-off';
      elementPost.className = 'image-active';
      elementDot.className = 'row-right-off';
      // this.indicators = true;
    }
    ////console.log(newImage, 'New');
    // //console.log(elementPre);
    ////console.log(image);
    ////console.log(listImagenes);
  }

  changeImageBack(image: any, listImagenes: listCorouseImages) {
    this.cont++;
    ////console.log(image, 'Privios');
    let inde = image.index;
    let count = 0;
    let newImage: any;
    let newInndex = 0;

    if (
      !Utils.empty(listImagenes) &&
      !Utils.empty(listImagenes.lstCorouseImages)
    ) {
      if (listImagenes.lstCorouseImages !== undefined) {
        count = listImagenes.lstCorouseImages.length;
        if (inde === 0) {
          newInndex = count - 1;
        } else {
          newInndex = inde - 1;
        }
        newImage = listImagenes.lstCorouseImages[newInndex];
      }
    }

    let elementPre = document.getElementById(image.imagetoken);
    let elementPost = document.getElementById(newImage.imagetoken);
    let elementDot = document.getElementById(image.imageCountainerToken);
    if (elementPre === null || elementPost === null || elementDot === null) {
      alert('oops');
    } else {
      elementPre.className = 'image-active-off';
      elementPost.className = 'image-active';
      elementDot.className = 'row-right-off';
    }
    //console.log(newImage, 'New');
  }
  addImagen(image: any) {
    //console.log('Init add Evente');
    this.updateImagen.emit(image);
    //console.log(image);
  }
  findClass(img: any) {}

  concateInput(str1: any, str2: any) {
    //console.log(str1.concat(str2));
    return str1.concat(str2);
  }

  enviarData(image: any) {
    this.countImagen = image;
  }
  detalleImage(image: any) {
    //  this.router.navigate(['form', '0001']);
  }
}
