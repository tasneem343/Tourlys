import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoomAdmin } from '../../Interface/AdminDashBoard/IRoomAdmin';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IRoom } from '../../Interface/iroom';

@Injectable({
  providedIn: 'root'
})
export class ViewRoomsService {

  constructor(private _httpClientService:HttpClient) {
}
GetAllRooms():Observable<IRoomAdmin[]>{
return this._httpClientService.get<IRoomAdmin[]>(`${environment.baseUrl}/Admin/GetAllRooms`); // Adjust the endpoint as needed
}
AddNewRoom(roomdata:FormData):Observable<IRoomAdmin>{
  return this._httpClientService.post<IRoomAdmin>(`${environment.baseUrl}/Admin/CreateRoom`, roomdata);
}
DeleteRoom(roomId:number):Observable<IRoomAdmin>{

  return this._httpClientService.delete<IRoomAdmin>(`${environment.baseUrl}/Admin/DeleteRoom`,{params:{roomId:roomId}}) // Adjust the endpoint as needed
}
UpdateRoom(roomData:FormData):Observable<IRoomAdmin>{
  return this._httpClientService.put<IRoomAdmin>(`${environment.baseUrl}/Admin/UpdateRoom`, roomData);

}
}
