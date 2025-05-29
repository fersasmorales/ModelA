import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { Producto } from '../../models/producto';
import { InventarioService } from '../../services/inventario.service';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos: Producto[] = [];
  mostrarFormulario: boolean = false;

  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    creador: '',
    categoria:''
  };
productoFormulario: Producto = {
  id: 0,
  nombre: '',
  precio: 0,
  descripcion: '',
  imagen: '',
  creador: '',
  categoria:''
};

  editarProducto: Producto | null = null;

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
    private inventarioService: InventarioService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.inventarioService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }


toggleFormulario() {
  this.mostrarFormulario = !this.mostrarFormulario;
  this.editarProducto = null;
  this.productoFormulario = {
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    imagen: '',
    creador: '',
    categoria: ''
  };
}


agregarProducto() {
  this.inventarioService.agregarProducto(this.productoFormulario).subscribe(() => {
    Swal.fire('Agregado', 'Producto agregado correctamente', 'success');
    this.toggleFormulario();
    this.cargarProductos();
  });
}
prepararEdicion(producto: Producto) {
  this.editarProducto = { ...producto };
  this.productoFormulario = { ...producto };  
  this.mostrarFormulario = true;
}
cancelarFormulario(): void {
  this.mostrarFormulario = false;
  this.editarProducto = null;
}

actualizarProducto() {
  if (this.editarProducto) {
    this.inventarioService.actualizarProducto(this.productoFormulario.id, this.productoFormulario).subscribe(() => {
      Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
      this.toggleFormulario();
      this.cargarProductos();
    });
  }
}

  eliminarProducto(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventarioService.eliminarProducto(id).subscribe(() => {
          Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
          this.cargarProductos();
        });
      }
    });
  }
}
