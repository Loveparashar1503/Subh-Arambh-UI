import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found-component.component.html',
  styleUrls: ['./not-found-component.component.css']
})
export class NotFoundComponentComponent {
  constructor(private location: Location) { }

   goback(){
       this.location.back();
   }
}
