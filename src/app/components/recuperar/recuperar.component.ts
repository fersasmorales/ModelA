import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  username = '';
  correo = '';
  nuevaContrasena = '';
  mensaje = '';
  tipoMensaje = '';
  
  constructor(private http: HttpClient, private router: Router) {}

  validarContrasena(contrasena: string): boolean {
    // Al menos 8 caracteres, al menos un número, al menos un símbolo especial
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(contrasena);
  }

  recuperar() {
  if (!this.username.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Escribe tu nombre de usuario',
      confirmButtonText: 'Ok',
      customClass: {
        popup: 'mi-popup',
        title: 'mi-titulo',
        confirmButton: 'mi-boton',
        icon: 'mi-icon'
      }
    });
    return;
  }

  if (!this.correo.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Escribe tu correo electrónico',
      confirmButtonText: 'Ok',
      customClass: {
        popup: 'mi-popup',
        title: 'mi-titulo',
        confirmButton: 'mi-boton',
        icon: 'mi-icon'
      }
    });
    return;
  }

  if (!this.nuevaContrasena.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Escribe la contraseña nueva',
      confirmButtonText: 'Ok',
      customClass: {
        popup: 'mi-popup',
        title: 'mi-titulo',
        confirmButton: 'mi-boton',
        icon: 'mi-icon'
      }
    });
    return;
  }

  if (!this.validarContrasena(this.nuevaContrasena)) {
    Swal.fire({
      icon: 'error',
      title: 'Debe tener al menos 8 caracteres, incluir números y símbolos.',
      confirmButtonText: 'Ok',
      customClass: {
        popup: 'mi-popup',
        title: 'mi-titulo',
        confirmButton: 'mi-boton',
        icon: 'mi-icon'
      }
    });
    return;
  }

  const datos = {
    username: this.username,
    correo: this.correo,
    nuevaContrasena: this.nuevaContrasena
  };

  this.http.post('http://localhost:3000/api/usuario/recuperar', datos)
    .subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: '¡Contraseña actualizada!',
          showConfirmButton: false,
          timer: 1300,
          customClass: {
            popup: 'mi-popup',
            title: 'mi-titulo',
            icon: 'mi-icon'
          }
        });
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1300);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: error.status === 404 ? 'Datos incorrectos' : 'Error del servidor',
          text: error.status === 404 ? 'Usuario o correo incorrectos' : 'No se pudo recuperar la cuenta',
          customClass: {
            popup: 'mi-popup',
            title: 'mi-titulo',
            confirmButton: 'mi-boton',
            icon: 'mi-icon'
          }
        });
        console.error('Error al recuperar cuenta:', error);
      }
    });
}


}