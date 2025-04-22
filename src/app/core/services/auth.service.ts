import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import{ jwtDecode} from 'jwt-decode';
import { ILogin } from '../Interface/ilogin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  register(registerData: FormData): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/Auth/register`,
      registerData
    );
  }
  login(loginUser: ILogin): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/Auth/login`,
      loginUser
    );
  }

  isAuthorized(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return true;
  }
  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return (
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || null
      );
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  logout(userId: string): Observable<any> {
    return this._httpClient.delete(
      `${environment.baseUrl}/Auth/logout/${userId}`
    );
  }

  isAdmin(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return (
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ] || null
      );
    }
    return null;
  }

  externalLogin(provider: 'Google' | 'GitHub'): void {
    const returnUrl = `${window.location.origin}/auth-callback`;
    const externalLoginUrl = `${environment.baseUrl}/Auth/externallogin?provider=${provider}&returnUrl=${returnUrl}`;
    window.location.href = externalLoginUrl;
  }
}
