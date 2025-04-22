import { Component, OnInit, Pipe } from '@angular/core';
import { ViewRoomsService } from '../../../core/services/AdminDashBoard/viewRooms.service';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { IRoomAdmin } from '../../../core/Interface/AdminDashBoard/IRoomAdmin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-rooms',
  imports: [CommonModule],
  templateUrl: './view-rooms.component.html',
  styleUrl: './view-rooms.component.css'
})
export class ViewRoomsComponent implements OnInit {
rooms!:IRoomAdmin[]
root:string=""
  constructor(private router:Router,private _roomservice:ViewRoomsService) {
    this.root=`${environment.baseUrl}`;
    }
    ngOnInit(): void {
      this.GetAllRooms();
    }
  GetAllRooms(){
    this._roomservice.GetAllRooms().subscribe((response)=>{
      this.rooms = response;
console.log(this.rooms);
    },(error)=>{
      console.log(error);
    })
  }
  DeleteRoom(roomId:number){
    console.log(roomId);
    this._roomservice.DeleteRoom(roomId).subscribe( (response)=>{
      console.log(response);
  this.GetAllRooms();
    },(error)=>{
      console.log(error);
    })
  }
GoToEditForm(room: IRoomAdmin) {
  const roomData = encodeURIComponent(JSON.stringify(room));
  this.router.navigate(['/Admin/editroom'], {
    queryParams: { room: roomData }
  });
}}
