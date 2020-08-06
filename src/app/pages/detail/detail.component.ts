import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  ProductID:string = '1';  
  productDetail:{};
  productName:string;

  constructor(private route: ActivatedRoute, private userService:UserService, private router:Router) { 
    this.ProductID = this.route.snapshot.queryParamMap.get('id');
    this.getDetail();
  }

  ngOnInit(): void {
    //this.ProductID = this.route.snapshot.paramMap.get('id');
    this.router.events.subscribe((val) => {
      this.ProductID = this.route.snapshot.queryParamMap.get('id');
      this.getDetail();
    });

  }

  getDetail():void{
    //this.router.navigate(['/detail'],{queryParams: {id:this.ProductID}});
    this.userService.getDetail(this.ProductID).then((res: {}) => {
      this.productDetail = JSON.parse(JSON.stringify(res));
    });
  }

}
