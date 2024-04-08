import { Component, OnInit } from '@angular/core';
import { NbTreeGridDataSource, NbSortDirection, NbTreeGridSortService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';
import { Person } from './person';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface PersonNode extends TreeNode<Person> {}

@Component({
  selector: 'app-person-datatable',
  templateUrl: './person-datatable.component.html',
  styleUrls: ['./person-datatable.component.scss']
})
export class PersonDatatableComponent implements OnInit {

 
  dataSource: NbTreeGridDataSource<PersonNode>;

  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  private data: PersonNode[] = [
    {
      data: { name: 'John', lastName: 'Doe' },
      children: [
        { data: { name: 'Alice', lastName: 'Doe' } },
        { data: { name: 'Bob', lastName: 'Doe' } },
      ],
    },
    {
      data: { name: 'Jane', lastName: 'Doe' },
      children: [
        { data: { name: 'Eve', lastName: 'Doe' } },
      ],
    },
  ];
  sortRequestBuilder?: NbTreeGridSortService<PersonNode>;

  constructor() {
    this.dataSource = this.createDataSource();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  private createDataSource(): NbTreeGridDataSource<PersonNode> {
    const dataSource = new NbTreeGridDataSource<PersonNode>(
      this.sortRequestBuilder,
      this.treeNode$,
      'expanded',
      { keepExpanded: true },
    );
  
    dataSource.setData(this.data);
  
    return dataSource;
  }

  private treeNode$ = new BehaviorSubject<PersonNode[]>([]);


 

  get allColumns(): string[] {
    return ['name', 'lastName'];
  }

  get actionsColumn(): string {
    return 'Actions';
  }

  get customColumn(): { id: string, properties: { label: string } } {
    return {
      id: 'customColumn',
      properties: { label: 'Custom Column' },
    };
  }
}