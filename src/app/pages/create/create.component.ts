import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public form: FormGroup;
  public productList: FormArray;
  productSaved:boolean = false;

  // returns all form groups under products
  get productFormGroup() {
    return this.form.get('products') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      //name: [null, Validators.compose([Validators.required])],
      //organization: [null],
      products: this.fb.array([this.createProduct()])
    });

    // set product to this field
    this.productList = this.form.get('products') as FormArray;

  }

  // product formgroup
  createProduct(): FormGroup {
    return this.fb.group({
      Name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^$|^[A-Za-z0-9]+')])],
      Description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^$|^[A-Za-z0-9]+')])],
      Price: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)])],
      Category: ['Electronics'],
      ImageURL: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)])],
      PhoneNumber: [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('^$|^[0-9]+')])],
      SelectType: ['Mobile']
    });
  }

  
  // add a contact form group
  addProduct() {
    this.productList.push(this.createProduct());
  }

  // remove product from group
  removeProduct(index) {
    // this.productList = this.form.get('products') as FormArray;
    debugger;
    this.productList.removeAt(index);
  }

   // get the formgroup under contacts form array
   getProductsFormGroup(index): FormGroup {
    // this.productList = this.form.get('products') as FormArray;
    const formGroup = this.productList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    this.productSaved = false;
    //debugger;
    let products = localStorage.getItem("productsList")? JSON.parse(localStorage.getItem("productsList")) : []; 
    products = products.concat(this.form.value.products);
    localStorage.setItem("productsList", JSON.stringify(products));  
    this.form.reset();
    this.productSaved = true;
  }

}
