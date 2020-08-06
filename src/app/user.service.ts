import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router,
  CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private productListURL = 'http://pokeapi.co/api/v2/pokemon/?limit=30&offset=';
  private detailUrl:string='https://pokeapi.co/api/v2/pokemon/';
  private currentProductListSource = new BehaviorSubject(null);
   currentProductList = this.currentProductListSource.asObservable();

  public isLoggedAdmin:boolean=false;
  //public currentProductList:[]=[];

  constructor(private http:HttpClient) {
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return localStorage.getItem('productsList') ? true : false;
  }

  getProductList(offset:string):any{
    return this.http.get(this.productListURL+offset).toPromise().then((res) => {  
      this.currentProductListSource.next(res['results']);
      return res;
    });
  }

  getImage(url:string):any{
    let readProp:{}={};
    return this.http.get(url).toPromise().then((res:never) => {
      readProp['id'] = res['id'];
      readProp['imageUrl'] = res['sprites']['other']['dream_world']['front_default'];
      return  readProp;
    });
  }

  getDetail(id:string):any{
    return this.http.get(this.detailUrl+id).toPromise().then((res:never) => {
      return res;
    });
  }

  getNav(url:string):any{
    return this.http.get(url).toPromise().then((res:never) => {
      return res;
    });
  }


}

