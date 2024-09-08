
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output
} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';


/*
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';*/
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
  rowData: any;
//@ViewChild('dialog') dialog!: TemplateRef<any>; // Get a reference to the dialog template

  ///constructor(private dialogService: NbDialogService) {
  //}
  constructor(private dialogService: NbDialogService,@Inject(NbDialogRef) protected dialogRef: NbDialogRef<ModalComponent>) {
    // Assign the received data to the rowData property
   
  }
  
 /* constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalModel,
    public dialogs: MatDialog
  ) {
    this.dialogRef.disableClose = true;
  }*/


  ngOnInit(): void {
    //debuger
    console.log(this.dialogRef.componentRef.instance.rowData);

   // this.openModal()
    
   /* this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
        this.dialogs.closeAll();
      }
    });*/
  }
  openModal() {
  // Check if dialog is defined before opening
  this.dialogService.open(ModalComponent, {
    context: {
      // Optional data to pass to the modal component
    }
  });
}

cancelar() {
  // Close the modal without doing anything
  this.dialogRef.close();
}

deleteInformation() {
  this.deleteConfirmed.emit();
  // Implement logic to delete information
  console.log('Deleting information...');
  // You can close the modal if needed
  this.dialogRef.close();
}
getIconClass(typeDescription: string): string {
  switch (typeDescription) {
    case 'WARNING':
      return 'warning-icon';
    case 'INFO':
      return 'info-icon';
    case 'QUESTION':
      return 'question-icon';
    // Add cases for other types if needed
    default:
      return ''; // Default class
  }
}

}
