import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookingAdmin } from '../../Interface/AdminDashBoard/IBookingAdmin';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ViewBookingService {

    constructor(private _httpClientService:HttpClient) {

    }
  GetAllBookings():Observable<IBookingAdmin[]>{
  return this._httpClientService.get<IBookingAdmin[]>(`${environment.baseUrl}/Admin/GetAllBookings`);
  }
DeleteBooking(BookingId:number):Observable<IBookingAdmin>{

  return this._httpClientService.delete<IBookingAdmin>(`${environment.baseUrl}/Admin/DeleteBooking`,{params:{BookingId:BookingId}});
}
}


