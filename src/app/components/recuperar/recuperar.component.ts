import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
      this.mensaje = 'El nombre de usuario es obligatorio.';
      return;
    }
    if (!this.correo.trim()) {
      this.mensaje = 'El correo electrónico es obligatorio.';
      return;
    }
    if (!this.nuevaContrasena.trim()) {
      this.mensaje = 'La nueva contraseña es obligatoria.';
      return;
    }
    if (!this.validarContrasena(this.nuevaContrasena)) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres, incluir números y símbolos.';
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
        this.mensaje = 'Contraseña actualizada correctamente';
        console.log(response);
         setTimeout(() => {
        this.router.navigate(['']);
      }, 1300);
      },
 error: (error) => {
          if (error.status === 404) {
            this.mensaje = 'Usuario o correo incorrectos.';
          } else {
            this.mensaje = 'No se pudo recuperar la cuenta.';
          }
          this.tipoMensaje = 'error';
          console.error('Error al recuperar cuenta:', error);
        
        }
      });
  }
}
