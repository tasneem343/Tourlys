import { Component, OnInit } from '@angular/core';
import { ICityAdmin } from '../../../core/Interface/AdminDashBoard/ICityAdmin';
import { environment } from '../../../../environments/environment.development';
import {  ViewCityService } from '../../../core/services/AdminDashBoard/viewcity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cities',
  imports: [],
  templateUrl: './view-cities.component.html',
  styleUrl: './view-cities.component.css'
})
export class ViewCitiesComponent implements OnInit {
cities!:ICityAdmin[]
  root:string=""
  constructor(private router:Router,private _cityservice:ViewCityService) {
    this.root=`${environment.baseUrl}`;

  }
  ngOnInit(): void {
    this.GetAllCities();
  }

GetAllCities(){
  this._cityservice.GetAllCities().subscribe((response)=>{
    this.cities = response;

console.log(this.cities);
  },(error)=>{
    console.log(error);
  })
}
 DeleteCity(cityId:number){
  console.log(cityId);
  this._cityservice.DeleteCity(cityId).subscribe( (response)=>{
    console.log(response);
this.GetAllCities();
  },(error)=>{
    console.log(error);
  })
}}
