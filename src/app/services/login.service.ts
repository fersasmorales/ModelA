import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiURL = 'http://localhost:3000/api/usuario/validate'; // <- ruta correcta

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; Contrasenia: string }): Observable<any> {
    return this.http.post(this.apiURL, credentials);
  }
}
