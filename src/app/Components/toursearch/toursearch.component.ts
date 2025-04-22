import { Component, OnInit } from '@angular/core';
import { ICity } from '../../core/Interface/ICity';
import { CityService } from '../../core/services/city.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../core/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-toursearch',
  imports: [CommonModule,FormsModule],
  templateUrl: './toursearch.component.html',
  styleUrl: './toursearch.component.css'
})
export class ToursearchComponent implements OnInit {

  cities:ICity[] = []

  formData = {
    city: '',
    roomType: '',
    checkIn: new Date(),
    checkOut:new Date()
  };
  constructor(private _cityService: CityService,private _roomService:RoomService, private router: Router,private route: ActivatedRoute){
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      formData: any,

    };
    if (state) {


      this.formData = state.formData;

      console.log('formData:', this.formData);
    }
  }
  ngOnInit(): void {
    this._cityService.getAllCities().subscribe({
      next: (arr) => {
        this.cities = arr;


        this.route.queryParams.subscribe(params => {
          const cityParam = params['city'];
          if (cityParam) {
            this.formData.city = cityParam;
          }
        });
      },
      error: () => {}
    });
  }
  onSubmit() {
    console.log(this.formData);
    this._roomService.getAvailableRooms(this.formData.city,this.formData.roomType,this.formData.checkIn,this.formData.checkOut).subscribe({
      next:(arr)=>{
        console.log(arr)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/SearchResult'], {
            state: {
              formData: this.formData,
              results: arr
            }
          });
        });
      }
      ,error:()=>{}
    })
  }

}
