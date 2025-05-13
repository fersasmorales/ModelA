import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';
import { AfterViewInit } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-carrito',
  standalone:true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements AfterViewInit{
  carrito: Producto[] = [];

  constructor(
    public carritoService: CarritoService, 
    private router: Router) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
  }
ngAfterViewInit() {
  if (this.carrito.length > 0) {
    this.renderizarBotonPaypal();
  }
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
  getTotal(): number {
  if (!this.carrito || this.carrito.length === 0) {
    return 0;
  }

  return this.carrito.reduce((acc, producto) => acc + Number(producto.precio), 0);
}

renderizarBotonPaypal() {
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';

  const total = this.getTotal().toFixed(2);

  paypal.Buttons({
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: this.getTotal().toFixed(2)
          }
          
        }]
      });
    },
    onApprove: (data: any, actions: any) => {
      return actions.order.capture().then((details: any) => {

        this.carritoService.vaciarCarrito();
        this.carrito = [];
        const container = document.getElementById('paypal-button-container');
        if (container) container.innerHTML = '';
        this.descargarXML();
      });
    },
    onError: (err: any) => {
      console.error(err);
      alert('Error en el pago');
    }
  }).render('#paypal-button-container');
}
}
