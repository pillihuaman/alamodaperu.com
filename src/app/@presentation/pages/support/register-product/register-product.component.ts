import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.getParameter();

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
