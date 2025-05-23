import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  apellido = '';
  username = '';
  correo = '';
  telefono = '';
  contrasena = '';
  confirmarContrasena = '';

  constructor(private registroService: RegistroService, private router: Router) {}

  validarContrasena(pass: string): boolean {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pass);
  }

  registrar() {
    if (
      !this.nombre.trim() ||
      !this.apellido.trim() ||
      !this.username.trim() ||
      !this.correo.trim() ||
      !this.telefono.trim() ||
      !this.contrasena.trim() ||
      !this.confirmarContrasena.trim()
    ) {
      Swal.fire({
        icon: 'warning',
        title: '¡Faltan datos!',
        customClass: {
          icon: 'mi-icon',
          title: 'mi-titulo',
          popup: 'mi-popup',
          confirmButton: 'mi-boton'
        }
      });
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      Swal.fire({
        icon: 'warning',
        title: '¡Contraseñas no coinciden!',
        customClass: {
          icon: 'mi-icon',
          title: 'mi-titulo',
          popup: 'mi-popup',
          confirmButton: 'mi-boton'
        }
      });
      return;
    }

    if (!this.validarContrasena(this.contrasena)) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña insegura',
        text: 'Debe tener al menos 8 caracteres, un número y un símbolo.',
        customClass: {
          icon: 'mi-icon',
          title: 'mi-titulo',
          popup: 'mi-popup',
          confirmButton: 'mi-boton'
        }
      });
      return;
    }

    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      correo: this.correo,
      telefono: this.telefono,
      contrasena: this.contrasena
    };

    this.registroService.registrar(datos).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso, inicia sesión',
          customClass: {
            icon: 'mi-icon',
            title: 'mi-titulo',
            popup: 'mi-popup',
            confirmButton: 'mi-boton'
          }
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar. Intenta más tarde.',
          customClass: {
            icon: 'mi-icon',
            title: 'mi-titulo',
            popup: 'mi-popup',
            confirmButton: 'mi-boton'
          }
        });
      }
    });
  }
}
