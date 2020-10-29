import { Movie } from './../../interfaces/cartelera-response';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public buscarMovie: Movie[] = [];
  public texto: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private peliService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {

      this.texto = params.texto;

      this.peliService.buscarPeliculas( params.texto)
                                      .subscribe(movies => {
                                        this.buscarMovie = movies;
                                      });
    });
  }

}
