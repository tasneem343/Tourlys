import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) {}

  sendMessage(formData: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Contact/send`, formData);
  }
}
