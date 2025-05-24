import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  Contrasenia = '';
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}
onLogin() {
  const credentials = {
    username: this.username,
    Contrasenia: this.Contrasenia
  };

  this.loginService.login(credentials).subscribe({
    next: (response) => {
      console.log('Login exitoso', response);
      localStorage.setItem('username', response.username);
      localStorage.setItem('rol', response.rol); // <- guardamos el rol
      this.router.navigate(['/producto']);
    },
    error: (error) => {
      console.error('Error en login', error);

      Swal.fire({
      icon: 'error',
      title: '¡Credenciales incorrectas!',
      confirmButtonText: 'Volver a intentar',
      customClass: {
      icon:"mi-icon",
      popup: 'mi-popup',
      title: 'mi-titulo',
      confirmButton: 'mi-boton'
      }
      });
    }
  });
}


}