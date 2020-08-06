import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pokemon';
  isAdmin:boolean;
  productList:[];
  searchInput:string;

  constructor(private userService:UserService, private router:Router){
    this.isAdmin = this.userService.isLoggedAdmin;    
  }

  ngOnInit(){
    this.userService.currentProductList.subscribe(list => {
      if(list != null) this.productList = list;
    });
  }


  performSearch(data:object):void{
    let searchStr = data['target']['value'];
    for (var value of this.productList) {
      if(value['name'] == searchStr){
        this.searchInput = '';
        this.router.navigate(['/detail'],{queryParams:{id:value['customList']['id']}});
        break;
      }   
    }       
  }

  userChange(obj):void{
    this.userService.isLoggedAdmin = obj;
  }

}
