import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { GeneralConstans } from 'src/app/utils/generalConstant';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}
interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}
@Component({
  selector: 'app-table-datasource',
  templateUrl: './table-datasource.component.html',
  styleUrls: ['./table-datasource.component.scss']
})
export class TableDatasourceComponent implements OnInit {
  ngOnInit(): void {
    this.buildTable();
    // You can leave it empty or remove it entirely
  }
  @Input() defaultColumns: any = [];// = [ 'size', 'kind', 'items' ];
  @Input() datas: any;
  allColumns = ['acciones', ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<any>;
  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  pageSize = GeneralConstans.pageSizeTable;
  currentPage = GeneralConstans.currentPageTable;
  paginator = 1;
  paginatedData: TreeNode<any>[] = [];
  initialData: any[] = []; // Initial 350 rows
  additionalData: any[] = []; // Dynamically added rows
  @Input() hasMorePagesT: boolean = false;
  @Input() typeOfSearch?: String;
  showTable = false;
  showTableCustom = false;
  defaultColumnsBySearchType: any = [];
  datasBySearchType: any;
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.datas = [...this.initialData, ...this.additionalData];
    this.dataSource = this.dataSourceBuilder.create(this.datas);

  }
  @Input()
  set tableData(data: any[]) {
    this.datas = data;
    this.buildTable();
  }
  @Output() deleteAction: EventEmitter<TreeNode<any>> = new EventEmitter<TreeNode<any>>();
  @Output() editAction: EventEmitter<TreeNode<any>> = new EventEmitter<TreeNode<any>>();
  ngOnChanges(changes: SimpleChanges): void {
   
    if (changes['customColumn'] || changes['defaultColumns'] || changes['datas']) {
      this.allColumns = [...this.defaultColumns];
  
      if (!changes['datas'].isFirstChange()) {
        if (
          changes['datas'].currentValue &&
          changes['datas'].currentValue !== null &&
          changes['datas'].currentValue !== undefined &&
          changes['datas'].currentValue.length > 0
        ) {
          if (this.typeOfSearch === GeneralConstans.typeSearchEspecific) {
            this.showTableCustom = true;
            this.showTable = false;
            this.additionalData = [];
            this.defaultColumnsBySearchType=this.defaultColumns
            if(this.datas.length>0){
              this.hasMorePagesT=true;
            }else{
              this.hasMorePagesT=false;
            }
            this.datasBySearchType = this.datas ;
          } else {

            this.showTableCustom = false;
            this.showTable = true;
            this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
            this.datas = [...this.initialData, ...this.additionalData];
            this.dataSource = this.dataSourceBuilder.create(this.datas);
            this.buildTable();
          }
        } else {
          if (this.typeOfSearch === GeneralConstans.typeSearchDefault) {
            this.showTableCustom = false;
            this.showTable = true;
            this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
            this.datas = [...this.initialData, ...this.additionalData];
            this.dataSource = this.dataSourceBuilder.create(this.datas);
            this.buildTable();
          }else{
            this.defaultColumnsBySearchType=this.defaultColumns
            this.datasBySearchType = this.datas ;
            this.hasMorePagesT=false;
            this.resetTable()
          }
        }
      }
    }
  }


  resetTable(): void {
    this.initialData = [];
    this.additionalData = [];
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.buildTable();

    // Clear the 'Nro' values

  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  onEdit(row: TreeNode<any>): void {
    debugger;
    // Implement your edit logic here
    console.log('Edit:', row.data);
    this.editAction.emit(row);
    // Add your edit logic here, for example, open a modal or navigate to an edit page
  }

  buildTable() {
    ;
    // Manually paginate the data
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datas.slice(startIndex, endIndex);


    // Assign incrementing 'Nro' values to the paginated data

    /* this.paginatedData.forEach((item, index) => {
       item.data['Nro'] = startIndex + index + 1;
     });*/

    // Recreate the dataSource with the updated paginated data
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);
  }
  onPageChange(page: number): void {
    if (this.hasMorePages()) {
      this.currentPage = page;
      this.buildTable();
    }
    else {
      this.paginator++;
      
      this.pageChange.emit(this.paginator); // Emit the currentPage value
      //this.pageSizeChange.emit(this.pageSize); // Emit the pageSize valu
      this.currentPage = page;
    }

  }
  onPageChangeBack(page: number): void {
    
    this.currentPage = page;
    this.buildTable();
    this.hasMorePagesT = true;

  }

  hasMorePages(): boolean {
    const totalItems = this.datas.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }
  onDelete(row: TreeNode<FSEntry>): void {
    ;
    // Emit the delete action to the parent component
    this.deleteAction.emit(row);
  }

  getHeaderColumns(): string[] {
    return [...this.defaultColumns, 'acciones',];
  }

  getRowColumns(): string[] {
    return [...this.defaultColumns, 'acciones',];
  }

  handleDeleteAction(row: TreeNode<FSEntry>): void {
    // Perform the delete action here
    console.log('Deleting information from parent:', row.data);
    this.deleteAction.emit(row);
    // Implement your deletion logic
  }

  /*
   private data: TreeNode<FSEntry>[] = [
     {
       data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
       children: [
         { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
         { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
         {
           data: { name: 'project-3', kind: 'dir', size: '466 KB', items: 3 },
           children: [
             { data: { name: 'project-3A.doc', kind: 'doc', size: '200 KB' } },
             { data: { name: 'project-3B.doc', kind: 'doc', size: '266 KB' } },
             { data: { name: 'project-3C.doc', kind: 'doc', size: '0' } },
           ],
         },
         { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
       ],
     },
     {
       data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
       children: [
         {
           data: { name: 'Report 1', kind: 'dir', size: '100 KB', items: 1 },
           children: [
             { data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } },
           ],
         },
         {
           data: { name: 'Report 2', kind: 'dir', size: '300 KB', items: 2 },
           children: [
             { data: { name: 'report-2.doc', kind: 'doc', size: '290 KB' } },
             { data: { name: 'report-2-note.txt', kind: 'txt', size: '10 KB' } },
           ],
         },
       ],
     },
     {
       data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
       children: [
         { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
         { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
       ],
     },
   ];*/

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

