import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];

  agregarProducto(producto: Producto) {
    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  actualizarCantidad(id: number, cantidad: number) {
    const producto = this.carrito.find(p => p.id === id);

    if (producto && cantidad > 0) {
      producto.cantidad = cantidad;
    } else if (producto && cantidad === 0) {
      this.eliminarProducto(producto);
    }
  }
  generarXML(): string {
    const fechaActual = new Date().toISOString().split('T')[0];
    const folio = Date.now(); 

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<factura>\n`;
    xml += `<info>\n`;
    xml += `    <folio>${folio}</folio>\n`;
    xml += `    <fecha>${fechaActual}</fecha>\n`;
    xml += `    <cliente>\n`;
    xml += `        <nombre>Fernanda</nombre>\n`;
    xml += `        <email>fersasmorales@gmail.com</email>\n`;
    xml += `    </cliente>\n`;
    xml += `</info>\n`;
    xml += `<productos>\n`;

    let subtotal = 0;

    this.carrito.forEach(producto => {
      const totalProducto = producto.precio * producto.cantidad;
      subtotal += totalProducto;

      xml += `    <producto>\n`;
      xml += `        <id>${producto.id}</id>\n`;
      xml += `        <descripcion>${producto.nombre}</descripcion>\n`;
      xml += `        <cantidad>${producto.cantidad}</cantidad>\n`;
      xml += `        <preciounitario>$${producto.precio}</preciounitario>\n`;
      xml += `        <subtotal>$${totalProducto}</subtotal>\n`;
      xml += `    </producto>\n`;
    });

    const iva = Number((subtotal * 0.16).toFixed(2));
    const total = subtotal + iva;

    xml += `</productos>\n`;
    xml += `<totales>\n`;
    xml += `    <subtotal>$${subtotal.toFixed(2)}</subtotal>\n`;
    xml += `    <impuestos>\n`;
    xml += `        <iva>$${iva.toFixed(2)}</iva>\n`;
    xml += `    </impuestos>\n`;
    xml += `    <total>$${total.toFixed(2)}</total>\n`;
    xml += `</totales>\n`;
    xml += `</factura>`;

    return xml;
  }

  descargarXML() {
    const blob = new Blob([this.generarXML()], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `factura ${new Date().toISOString().split('T')[0]}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  eliminarProducto(producto: Producto) {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
  }

  constructor() { }
}
