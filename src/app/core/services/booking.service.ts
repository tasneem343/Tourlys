import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookingRoom } from '../Interface/ibooking-room';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private _httpClientService: HttpClient) { }

  bookRoom(bookingData: IBookingRoom): Observable<any> {
    return this._httpClientService.post(`${environment.baseUrl}/Room/book`, bookingData, { responseType: 'text' });
  }
}

