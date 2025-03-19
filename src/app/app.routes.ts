import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { HeaderComponent } from './components/header/header.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DeseosComponent } from './components/deseos/deseos.component';

export const routes: Routes = [
    {path:'',component:ProductoComponent},
    {path:'perfil',component:PerfilComponent},
    {path:'deseos',component:DeseosComponent},
    {path:'carrito',component:CarritoComponent},
    {path:'header',component:HeaderComponent}
];
