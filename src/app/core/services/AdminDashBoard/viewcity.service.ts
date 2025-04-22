import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICityAdmin } from '../../Interface/AdminDashBoard/ICityAdmin';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ViewCityService {


  constructor(private _httpClientService:HttpClient) {

  }
GetAllCities():Observable<ICityAdmin[]>{
return this._httpClientService.get<ICityAdmin[]>(`${environment.baseUrl}/Admin/GetAllCities`);
}
AddNewCity(cityData:FormData):Observable<ICityAdmin>{
  return this._httpClientService.post<ICityAdmin>(`${environment.baseUrl}/Admin/CreateCity`, cityData);
}
DeleteCity(cityId:number):Observable<ICityAdmin>{

  return this._httpClientService.delete<ICityAdmin>(`${environment.baseUrl}/Admin/DeleteCity`,{params:{cityId:cityId}})
}
UpdateCity(cityData:FormData):Observable<ICityAdmin>{
  return this._httpClientService.put<ICityAdmin>(`${environment.baseUrl}/Admin/UpdateCity`, cityData);

}}
