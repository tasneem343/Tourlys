import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/AdminDashBoard/user.service';
import { IUser } from '../../../core/Interface/AdminDashBoard/IUser';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-view-users',
  imports: [CommonModule,DatePipe],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit {
  users!:IUser[];
  root:string="";
  admins!:IUser[];

constructor(private router:Router,private _userService:UserService) {
this.root=`${environment.baseUrl}`;
}

  ngOnInit(): void {
    this.GetAllusers();
this.GetAllAdmins();
  }
GetAllusers(){
  this._userService.GetAllUsers().subscribe((response)=>{
    this.users = response;
  },(error)=>{
    console.log(error);
  })
}
GetAllAdmins(){
  this._userService.GetAllAdmins().subscribe((response)=>{
    console.log(response);
    this.admins = response;
  },(error)=>{
    console.log(error);
  })
}
assignAdmin(user:IUser){
this._userService.AssignAdmin(user).subscribe((response)=>{
  console.log(response);
  this.GetAllusers();
this.GetAllAdmins();
},(error)=>{
  console.log(error);
})}
DeleteUser(userId:string){
  this._userService.DeleteUser(userId).subscribe((response)=>{
    console.log(response);
    this.GetAllusers();
  },(error)=>{
    console.log(error);
  })

}
}