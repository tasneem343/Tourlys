import { CommonModule, CurrencyPipe, DatePipe, NgClass, SlicePipe } from '@angular/common';
import { Component, numberAttribute } from '@angular/core';
import { IBookingAdmin } from '../../core/Interface/AdminDashBoard/IBookingAdmin';
import { ViewBookingService } from '../../core/services/AdminDashBoard/viewbooking.service';
import { environment } from '../../../environments/environment.development';
import { ProfileService } from '../../core/services/profile.service';
import { BookingService } from '../../core/services/booking.service';
import { SignalRService } from '../../core/services/signal-r.service';
import { Router } from '@angular/router';
import { IBookingRoom } from '../../core/Interface/ibooking-room';

@Component({
  selector: 'app-user-booking',
  imports: [DatePipe,CommonModule],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent {
  bookingResult={
    "url":"",
    "bookingId":0,
  }
 bookingRoom: IBookingRoom = {
    userId: '',
    roomId: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    totalPrice: 0
  };
bookings:IBookingAdmin[]=[]
  constructor(private router: Router,private _profileservice:ProfileService,private _bookingService:BookingService) {
  }

  ngOnInit(): void {

    const userId=localStorage.getItem('userId');
    if (userId) {
      this.GetUserBookings(userId);
    } else {
      console.error('User ID not found in local storage.');
    }
  }
  GetUserBookings(userId: string) {
    this._profileservice.GetbookingsByUserId(userId).subscribe((response)=>{
      this.bookings = response;
      console.log(this.bookings);
    },(error)=>{
      console.log(error);
    })
  }
  DeleteBooking(bookingId:number){
    console.log(bookingId);

    this._profileservice.DeleteBooking(bookingId).subscribe( (response)=>{
      console.log(response);
      const userId=localStorage.getItem('userId');
      if (userId) {
        this.GetUserBookings(userId);
      } else {
        console.error('User ID not found in local storage.');
      }
    },(error)=>{
      console.log(error);
    })


  }
  bookRoom(RoomId: number, price: number, checkIn: any, checkOut: any) {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['Login']);
      return;
    }

    this.bookingRoom.userId = localStorage.getItem('userId') ?? '';
    this.bookingRoom.roomId = RoomId;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    this.bookingRoom.checkIn = checkInDate;
    this.bookingRoom.checkOut = checkOutDate;
    this.bookingRoom.totalPrice = price;

    console.log(this.bookingRoom);

    this._bookingService.bookRoom(this.bookingRoom).subscribe({
      next: (response) => {
        this.bookingResult = response;
        console.log('Booking successful:', response);
        this.router.navigate(['/Payment'], {
          state: { paymentResponse: response },
        });
      },
      error: (error) => {
        console.error('Booking failed:', error);
      },
    });
  }
}
