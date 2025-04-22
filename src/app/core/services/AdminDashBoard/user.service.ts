import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IUser } from '../../Interface/AdminDashBoard/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClientService:HttpClient) {

  }
GetAllUsers():Observable<IUser[]>{
return this._httpClientService.get<IUser[]>(`${environment.baseUrl}/Admin/GetAllUsers`);
}
AssignAdmin(user:IUser):Observable<IUser>{
return this._httpClientService.post<IUser>(`${environment.baseUrl}/Admin/ChangeUserRole`,user);

}
DeleteUser(userId:string):Observable<IUser>{
  return this._httpClientService.delete<IUser>(`${environment.baseUrl}/Admin/DeleteUser/${userId}`);
}
GetAllAdmins():Observable<IUser[]>{
  return this._httpClientService.get<IUser[]>(`${environment.baseUrl}/Admin/GetAllAdmins`);
}}