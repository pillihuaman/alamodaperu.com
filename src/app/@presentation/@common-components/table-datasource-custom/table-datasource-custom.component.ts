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
  selector: 'app-table-datasource-custom',
  templateUrl: './table-datasource-custom.component.html',
  styleUrls: ['./table-datasource-custom.component.scss']
})
export class TableDatasourceCustomComponent implements OnInit {
  ngOnInit(): void {
    this.buildTable();
    // You can leave it empty or remove it entirely
  }
  @Input() defaultColumnsBySearchType: any = [];// = [ 'size', 'kind', 'items' ];
  @Input() datasBySearchType: any;
  @Input() hasMorePagesTBySearchType: boolean = false;
  @Input() typeOfSearchBySearchType?: String;

  allColumns = ['acciones', ...this.defaultColumnsBySearchType];
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
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.datasBySearchType = [...this.initialData, ...this.additionalData];
    this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);

  }
  @Input()
  set tableData(data: any[]) {
    this.datasBySearchType = data;
    this.buildTable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.hasMorePagesTBySearchType;
    debugger;
    if (changes['customColumnBySearchType'] || changes['defaultColumnsBySearchType'] || changes['datasBySearchType']) {
      this.allColumns = [...this.defaultColumnsBySearchType];
    
        if (
          changes['datasBySearchType'].currentValue &&
          changes['datasBySearchType'].currentValue !== null &&
          changes['datasBySearchType'].currentValue !== undefined &&
          changes['datasBySearchType'].currentValue.length > 0
        ) {
          this.additionalData=[]
          this.additionalData = [...this.additionalData, ...changes['datasBySearchType'].currentValue];
          this.datasBySearchType = [...this.initialData, ...this.additionalData];
          this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);
          this.currentPage = GeneralConstans.currentPageTable;
          this.hasMorePagesTBySearchType = true;
          
          this.buildTable();

        }else{
          debugger;
          this.defaultColumnsBySearchType=this.defaultColumnsBySearchType
          this.datasBySearchType = this.datasBySearchType ;
          this.resetTable()
        }
      
    }
  }


  resetTable(): void {
    // Reset all relevant properties
    this.sortColumn = undefined;
    this.sortDirection = NbSortDirection.NONE;
    this.currentPage = GeneralConstans.currentPageTable;
    this.paginator = 1;
    this.paginatedData = [];
    this.initialData = [];
    this.additionalData = [];
    this.hasMorePagesTBySearchType = false;
    this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);

    // Rebuild the table
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
    // Implement your edit logic here
    console.log('Edit:', row.data);
    // Add your edit logic here, for example, open a modal or navigate to an edit page
  }

  buildTable() {
    ;
 
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datasBySearchType.slice(startIndex, endIndex);
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);
  }
  onPageChange(page: number): void {
    if (this.hasMorePages()) {
      this.currentPage = page;
      this.buildTable();
    }
    else {
      //this.paginator++;
     // this.pageChange.emit(this.paginator); // Emit the currentPage value
      //this.pageSizeChange.emit(this.pageSize); // Emit the pageSize valu
      this.currentPage = page;
      this.hasMorePagesTBySearchType = false;
    }

  }
  onPageChangeBack(page: number): void {
    debugger
    this.currentPage = page;
    this.buildTable();
    this.hasMorePagesTBySearchType = true;

  }

  hasMorePages(): boolean {
    const totalItems = this.datasBySearchType.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }
  onDelete(row: TreeNode<FSEntry>): void {
    // Implement your delete logic here
    console.log('Delete:', row.data);
    // Add your delete logic here, for example, show a confirmation dialog
  }
  getHeaderColumns(): string[] {
    return [...this.defaultColumnsBySearchType, 'acciones',];
  }

  getRowColumns(): string[] {
    return [...this.defaultColumnsBySearchType, 'acciones',];
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

