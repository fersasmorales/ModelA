import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { HeaderComponent } from './components/header/header.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'perfil',component:PerfilComponent},
    {path:'producto',component:ProductoComponent},
    {path:'carrito',component:CarritoComponent},
    {path:'header',component:HeaderComponent}
];
