import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private router:Router
  ){}
}
