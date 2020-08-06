import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products:[]=[];
  offsetVal:string='0';
  navigations:any='';
  constructor(private userService:UserService) { 
    this.getProduct();
  }

  ngOnInit(): void {
    
  }

  navValue(type:string):void{
    let offset:any;
    if(type == 'next'){
      offset = new URL(this.navigations['next']);
      offset = offset.searchParams.get('offset');
    }
    else{
      offset = new URL(this.navigations['prev']);
      offset = offset.searchParams.get('offset');
    }

    this.offsetVal = offset;
    this.getProduct();
  }

  getProduct():void{
    let tempProducts:any;
    this.navigations = {};
    tempProducts =this.userService.getProductList(this.offsetVal).then( (res) => {
      this.navigations['prev'] = res.previous;
      this.navigations['next'] = res.next;

      tempProducts = res.results;
      this.products = tempProducts.map((value:{}, index:number) => {
         this.userService.getImage(value['url']).then(values => {
          value['customList'] =  values;
        });
        return value;
      });
    });
    
    


  }

  

}
