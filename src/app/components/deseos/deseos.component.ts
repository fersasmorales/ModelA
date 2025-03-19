import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-deseos',
  standalone:true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './deseos.component.html',
  styleUrl: './deseos.component.css'
})
export class DeseosComponent {

}
