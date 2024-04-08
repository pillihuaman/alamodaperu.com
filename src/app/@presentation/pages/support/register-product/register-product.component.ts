import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Parameter } from 'src/app/@data/model/general/parameter';
import { Product } from 'src/app/@data/model/product/product';
import { AuthenticationRepository } from 'src/app/@domain/repository/repository/authentication.repository';
import { SupportRepository } from 'src/app/@domain/repository/repository/support.repository';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent implements OnInit {
  myForm: FormGroup;
  lisParameter?: Parameter[];
  selectedTypeProduct:any;
  options?: string[]=[];
  filteredOptions$?: Observable<string[]>;
  @ViewChild('autoInput') input: any;
  itemList: any[] = [
    { value: 'Item 1' },
    { value: 'Item 2' },
    { value: 'Item 3' },
    // add more items as needed
  ];
  constructor(
    public fb: FormBuilder,
    private re: SupportRepository,
    private authenticationService: AuthenticationRepository
  ) {
    this.myForm = this.fb.group({
      description: [''],
      name: [''],
      type: [''],
    });
  }

  
  ngOnInit(): void {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
    this.getParameter();

  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event: string) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    return this.options?.filter(optionValue =>
      optionValue.toLowerCase().includes(filterValue)
    ) ?? [];
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map((filterString: string) => this.filter(filterString)),
    );
  }
  save() {

    const currentUser = this.authenticationService.getCurrentUserValue;
    let product: Product = {
      name: this.myForm.get('name')?.value,
      description: this.myForm.get('description')?.value,
      idUser: currentUser.id_user,
    };
    this.re.saveProduct(product).subscribe(
      (value) => { },
      (error) => { }
    );
  }
  getParameter() {

    const currentUser = this.authenticationService.getCurrentUserValue;
    let parame: Parameter = {
      idCode: ""
    };
    this.re.getParameterbyIdCode(parame).subscribe(
      (value) => {
        debugger;
        this.lisParameter = value;

      },
      (error) => { }
    );
  }
}
