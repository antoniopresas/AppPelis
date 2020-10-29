import { Movie } from './../../interfaces/cartelera-response';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ) {
      // Llamar servicio
      if ( this.peliculasServices.cargando ) { return; }
      this.peliculasServices.getCartelera().subscribe(resp => {
         this.movies.push(...resp);
      });
    }
  }

  constructor(
    private peliculasServices: PeliculasService
  ){ }

  ngOnDestroy(): void {
    this.peliculasServices.resetCarteleraPage();
  }

  ngOnInit(): void {
    this.peliculasServices.getCartelera()
    .subscribe( resp => {
      // console.log(resp.result);
      this.movies = resp.filter( movie => movie.poster_path !== null || movie.backdrop_path !== null );
      this.moviesSlideShow = resp.filter( movie => movie.poster_path !== null );

    });
  }

}
