import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ProductoComponent } from './app/components/producto/producto.component';
import { DeseosComponent } from './app/components/deseos/deseos.component';
import { PerfilComponent } from './app/components/perfil/perfil.component';
import { CarritoComponent } from './app/components/carrito/carrito.component';
import { HeaderComponent } from './app/components/header/header.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes),
      provideHttpClient()
  ],
  }).catch((err) => console.error(err));
