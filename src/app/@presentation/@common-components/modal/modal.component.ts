import { ModalModel } from './../../../@data/model/User/modalModel';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  Inject,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
//import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  //uploading: boolean = false;
  //@ContentChild('dialog') dialog: TemplateRef<any>;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalModel,
    public dialogs: MatDialog
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        this.dialogs.closeAll();
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
    this.dialogs.closeAll();
  }
}
