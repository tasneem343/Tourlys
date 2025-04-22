import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoom } from '../Interface/iroom';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private _httpClientService:HttpClient) { }
  getAvailableRooms(city:string,roomType:string,checkIn:Date,checkOut:Date):Observable<IRoom[]>{

    return this._httpClientService.get<IRoom[]>(`${environment.baseUrl}/Room/GetAvailableRooms?City=${city}&CheckIn=${checkIn}&CheckOut=${checkOut}&RoomType=${roomType}`)
}
}
