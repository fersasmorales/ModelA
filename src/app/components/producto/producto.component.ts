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

@Component({
  selector: 'app-producto',
  standalone:true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{
  productos:any[]=[];
  mostrarHeader: boolean = true;
  constructor(
    private productoService:ProductoService,
    private carritoService:CarritoService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    }, error => {
      console.error('Error al obtener productos:', error);
    });
  }

  header(){
    this.router.navigate(['/header']);
  }
  agregarAlCarrito(producto:any){
    this.carritoService.agregarProducto(producto);
    /*alert(`${producto.nombre} ha sido agregado al carrito`);*/
    }

}
