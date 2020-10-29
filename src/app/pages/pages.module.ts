import { RatingModule } from 'ng-starrating';
import { PipesModule } from './../pipes/pipes.module';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';




@NgModule({
  declarations: [HomeComponent,
                 PeliculaComponent,
                 BuscarComponent,
                ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule
  ]
})
export class PagesModule { }
