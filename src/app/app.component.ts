import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule,ProductoComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:`<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'ModelA';
}
