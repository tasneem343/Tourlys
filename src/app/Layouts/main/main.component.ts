import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';
import { IProfile } from '../../core/Interface/Iprofile';
import { ProfileService } from '../../core/services/profile.service';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
