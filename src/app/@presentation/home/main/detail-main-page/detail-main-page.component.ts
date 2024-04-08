import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorouselImage } from 'src/app/@data/model/general/corouselImage';
import { listCorouseImages } from 'src/app/@data/model/general/listCorouseImages';
import { Imagen } from 'src/app/@data/model/imagen/imagen';
import { Const } from 'src/app/utils/const';

@Component({
  selector: 'app-detail-main-page',
  templateUrl: './detail-main-page.component.html',
  styleUrls: ['./detail-main-page.component.scss'],
})
export class DetailMainPageComponent implements OnInit {
  lstim?: listCorouseImages;
  colru?: CorouselImage;
  urlApiImagen: String =
    `${Const.API_IMAGEN}` + `/v1/imagen/getImagen?codImagen=`;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.lstim = history.state;
    if (this.lstim) {
      this.lstim?.lstCorouseImages?.forEach((x) => {
        this.colru = x;
      });
      console.log(JSON.stringify(this.lstim));
    }
  }
  concateInput(str1: any, str2: any) {
    //console.log(str1.concat(str2));
    return str1.concat(str2);
  }
  changeFothoDetail(image: any) {
    this.colru = image;
  }
}
