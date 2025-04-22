import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '../Interface/Iprofile';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IBookingAdmin } from '../Interface/AdminDashBoard/IBookingAdmin';
import { IBookingRoom } from '../Interface/ibooking-room';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 GetProfileByUserId(userid:string):Observable<IProfile>{
    return this._httpClientService.get<IProfile>(`${environment.baseUrl}/user/${userid}`);
  }
  constructor(private _httpClientService:HttpClient) { }
  UpdateProfile(userId: string, formdata: FormData): Observable<IProfile> {
    return this._httpClientService.put<IProfile>(`${environment.baseUrl}/user/${userId}`, formdata);
  }
GetbookingsByUserId(userId: string): Observable<IBookingAdmin[]> {
  return this._httpClientService.get<IBookingAdmin[]>(`${environment.baseUrl}/booking/user/${userId}`);
}
DeleteBooking(BookingId:number):Observable<IBookingAdmin>{

  return this._httpClientService.delete<IBookingAdmin>(`${environment.baseUrl}/Booking/DeleteBooking/${BookingId}`)
}
}
