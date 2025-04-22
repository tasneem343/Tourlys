import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  imports: [CommonModule],

  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentUrl!: SafeResourceUrl;
 

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as {
      paymentResponse: string;
    };

    if (state) {
      this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(state.paymentResponse);
    }
  }
 
}