import { Component } from '@angular/core';
import { IBookingAdmin } from '../../../core/Interface/AdminDashBoard/IBookingAdmin';
import { environment } from '../../../../environments/environment.development';
import { ViewBookingService } from '../../../core/services/AdminDashBoard/viewbooking.service';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-view-bookings',
  imports: [DatePipe],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {
bookings:IBookingAdmin[]=[]
  root:string=""
  constructor(private _bookingservice:ViewBookingService) {
    this.root=`${environment.baseUrl}`;
  }
  ngOnInit(): void {
    this.GetAllBookings();
  }
  GetAllBookings(){
    this._bookingservice.GetAllBookings().subscribe((response)=>{
      this.bookings = response;
      console.log(this.bookings);
    },(error)=>{
      console.log(error);
    })
  }
  DeleteBooking(bookingId:number){
    console.log(bookingId);
    this._bookingservice.DeleteBooking(bookingId).subscribe( (response)=>{
      console.log(response);
    this.GetAllBookings();
    },(error)=>{
      console.log(error);
    })
  }
}
