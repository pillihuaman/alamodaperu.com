import { Component, OnInit } from '@angular/core';
import {  Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}


@Component({
  selector: 'app-table-datasource',
  templateUrl: './table-datasource.component.html',
  styleUrls: ['./table-datasource.component.scss']
})
export class TableDatasourceComponent implements OnInit {

  @Input("customColumnInput") customColumnInput:any='';
  @Input("defaultColumnsInput") defaultColumnsInput?:[];
  @Input("datas") datas? :any;

  customColumn : any;//=this.customColumnInput;
  defaultColumns:any;//=this.defaultColumnsInput //= [ 'size', 'kind', 'items' ];
  allColumns:any;//=[ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<any> | undefined;



  

  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
   // debugger;
    //this.dataSource = this.dataSourceBuilder.create(this.datas);

  
  }
  ngOnInit(): void {
    debugger;

   //this.allColumns = [this.customColumn, ...this.defaultColumns];
   this.customColumn=this.customColumnInput;
   this.defaultColumns=this.defaultColumnsInput;
      this.allColumns = [this.customColumn, ...this.defaultColumns];
      
   this.dataSource = this.dataSourceBuilder.create(this.datas);

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


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

/*export class FsIconComponent {
  @Input() kind?: string;
  @Input() expanded?: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}*/