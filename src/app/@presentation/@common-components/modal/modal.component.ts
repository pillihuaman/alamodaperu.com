import { ModalModel } from './../../../@data/model/User/modalModel';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
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
  @Output() deleteConfirmed = new EventEmitter<void>();
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
  deleteInformation() {
    // Implement logic to delete information
    console.log('Deleting information...');
    // You can close the modal if needed
    this.deleteConfirmed.emit();
    this.dialogRef.close();
  }
}
