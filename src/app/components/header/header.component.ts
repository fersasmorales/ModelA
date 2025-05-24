import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router:Router
  ){}

  esAdmin: boolean = false;
  ngOnInit() {
    const rol = localStorage.getItem('rol');
    this.esAdmin = rol === 'admin';
  }

  producto(){
    this.router.navigate(['/']);
  }
  deseos(){
    this.router.navigate(['/deseos']);
  }
  carrito(){
    this.router.navigate(['/carrito']);
  }
  perfil(){
    this.router.navigate(['/perfil']);
  }
  inventario(){
    this.router.navigate(['/inventario']);
  }

  logout() {
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }

  
}



