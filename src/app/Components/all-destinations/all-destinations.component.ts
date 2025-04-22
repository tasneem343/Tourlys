import { Component, OnInit } from '@angular/core';
import { ICity } from '../../core/Interface/ICity';
import { CityService } from '../../core/services/city.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-all-destinations',
  imports: [CommonModule,RouterLink],
  templateUrl: './all-destinations.component.html',
  styleUrl: './all-destinations.component.css'
})
export class AllDestinationsComponent implements OnInit {
  root:string=""
   cities:ICity[] = []
  constructor(private _cityService:CityService) {
    this.root=`${environment.baseUrl}`;

   }
  ngOnInit(): void {
    this._cityService.getAllCities().subscribe({
      next:(arr)=>{
        this.cities=arr


        console.log(this.cities)


      },
      error:()=>{}
    })
  }


}
