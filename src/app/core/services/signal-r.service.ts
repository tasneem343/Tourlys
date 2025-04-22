import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.baseUrl}/bookingStatusHub`, {
      withCredentials: true 
    })
    .configureLogging(signalR.LogLevel.Information) 
    .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('Error while starting SignalR: ' + err));
  }

  public onBookingStatusUpdate(callback: (roomId: number, status: string) => void): void {
    this.hubConnection.on('ReceiveBookingStatus', callback);
  }

}
