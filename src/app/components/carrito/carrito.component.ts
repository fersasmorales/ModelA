import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-carrito',
  standalone:true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  carrito: Producto[] = [];

  constructor(public carritoService: CarritoService, private router: Router) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }

  actualizarCantidad(id: number, cantidad: number) {
    this.carritoService.actualizarCantidad(id, cantidad);
  }

  eliminarProducto(producto: Producto) {
    this.carritoService.eliminarProducto(producto);
    this.carrito = this.carritoService.obtenerCarrito();
  }

  descargarXML() {
    this.carritoService.descargarXML();
  }
}
