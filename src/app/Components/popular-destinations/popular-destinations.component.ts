import { Component, OnInit } from '@angular/core';
import { ICity } from '../../core/Interface/ICity';
import { CityService } from '../../core/services/city.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-popular-destinations',
  imports: [CommonModule,RouterLink],
  templateUrl: './popular-destinations.component.html',
  styleUrl: './popular-destinations.component.css'
})
export class PopularDestinationsComponent implements OnInit {
  cities:ICity[] = []
  filterCities:ICity[] = []
  root:string=""
  constructor(private _cityService:CityService){
    this.root=`${environment.baseUrl}`;

  }
  ngOnInit(): void {
    this._cityService.getAllCities().subscribe({
      next:(arr)=>{
        this.cities=arr
        this.filterCities = arr.slice(0, 3);

        console.log(this.cities)
        console.log(this.filterCities)

      },
      error:()=>{}
    })
  }

}
