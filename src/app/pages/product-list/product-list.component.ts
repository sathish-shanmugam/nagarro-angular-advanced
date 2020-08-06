import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList:[]=[];
  constructor() { 
    this.productList  = localStorage.getItem('productsList') ? JSON.parse(localStorage.getItem('productsList')) : [];
  }

  ngOnInit(): void {
    
  }

}
