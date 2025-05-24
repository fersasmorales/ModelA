import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { Producto } from '../../models/producto';
import { CarritoComponent } from '../carrito/carrito.component';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  standalone:true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit{
  productos:any[]=[];
  mostrarHeader: boolean = true;

  Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  constructor(
    private productoService:ProductoService,
    private carritoService:CarritoService,
    private router:Router
  ){}
  ngOnInit() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data as any[];
    });
  }

  header(){
    this.router.navigate(['/header']);
  }
  agregarAlCarrito(producto:any){
    this.carritoService.agregarProducto(producto);
    this.Toast.fire({
      icon: 'success',
      title: '¡Genial!',
      position: 'top-end',
      text: 'Tu modelo se ha agregado al carrito.'
    });
    }

}
