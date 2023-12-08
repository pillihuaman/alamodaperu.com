import { Component, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
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
  @Input("defaultColumns") defaultColumns: any = [];// = [ 'size', 'kind', 'items' ];
  @Input("datas") datas: any;
  allColumns = ['Nro','acciones', ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<any>;
  isRowHovered: boolean = false;
  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  pageSize = 50;
  currentPage = 1;
  paginator=1;
  paginatedData: TreeNode<any>[] = [];
  initialData: any[] = []; // Initial 350 rows
  additionalData: any[] = []; // Dynamically added rows
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.datas = [...this.initialData, ...this.additionalData];
    this.dataSource = this.dataSourceBuilder.create(this.datas);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customColumn'] || changes['defaultColumns'] || changes['datas']) {
      this.allColumns = [...this.defaultColumns];

      if (changes['datas'] && !changes['datas'].isFirstChange()) {
        // Append the new data to the additionalData array
        this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
      }

      // Concatenate both initial and additional data
      this.datas = [...this.initialData, ...this.additionalData];

      // Recreate the dataSource with the updated data
      this.dataSource = this.dataSourceBuilder.create(this.datas);
    }

    if (changes['datas']) {
      this.buildTable();
    }
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
    debugger;
    // Manually paginate the data
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datas.slice(startIndex, endIndex);

    // Assign incrementing 'Nro' values to the paginated data
    this.paginatedData.forEach((item, index) => {
      item.data['Nro'] = startIndex + index + 1;
    });
  
    
    // Recreate the dataSource with the updated paginated data
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);
  }
  onPageChange(page: number): void {
    debugger
    if (this.hasMorePages()) {
      this.currentPage = page;
      this.buildTable();
    }
    else {
      this.paginator++;
      this.pageChange.emit(this.paginator); // Emit the currentPage value
     // this.pageSizeChange.emit(this.pageSize); // Emit the pageSize valu
    }

  }
  onPageChangeBack(page: number): void {
    debugger
      this.currentPage = page;
      this.buildTable();
    
  }

  hasMorePages(): boolean {
    const totalItems = this.datas.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }
  onDelete(row: TreeNode<FSEntry>): void {
    // Implement your delete logic here
    console.log('Delete:', row.data);
    // Add your delete logic here, for example, show a confirmation dialog
  }
  getHeaderColumns(): string[] {
    return ['Nro',...this.defaultColumns, 'acciones',];
  }

  getRowColumns(): string[] {
    return ['Nro',...this.defaultColumns, 'acciones',];
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

