import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICity } from '../Interface/ICity';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  getAllCities():Observable<ICity[]>{
    return this._httpClientService.get<ICity[]>(`${environment.baseUrl}/City/AllCities`)
  }

  constructor(private _httpClientService:HttpClient) { }
}
