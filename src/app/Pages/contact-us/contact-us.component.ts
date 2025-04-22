import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsService } from '../../core/services/contact-us.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contuct-us',
  imports: [HeaderComponent, FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContuctUsComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactUsService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animateOnScroll('.form-wrapper', 'animate-scale-fade');
    this.animateOnScroll('.form-group', 'animate-bounce');
    this.animateOnScroll('.text-container', 'animate-slide-right');
    this.animateOnScroll('.contact-info li', 'animate-pulse');
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.contactService.sendMessage(this.contactForm.value).subscribe({

      next: () => {
        this.successMessage = 'Your message has been sent successfully!';
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong. Please try again later.';
        this.isSubmitting = false;
      }
    });
  }

  private animateOnScroll(selector: string, animationClass: string): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }

}

