import { Cast } from './../../interfaces/credits-response';
import { MovieDetail } from './../../interfaces/movie-response';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetail;
  public cast: Cast[] = [];

  constructor(
              private activatedRoute: ActivatedRoute,
              private peliService: PeliculasService,
              private location: Location,
              private router: Router
              ) { }

  ngOnInit(): void {

    const {id} =  this.activatedRoute.snapshot.params;

    combineLatest([

      this.peliService.getPeliculaDetalle(id),

      this.peliService.getCredit(id)

    ]).subscribe( ([pelicula, cast]) => {

      if ( !pelicula ){
        this.router.navigateByUrl('/home');
        return;
      }

      this.movie = pelicula;
      this.cast = cast.filter(actor => actor.profile_path !== null);
    });

    // this.peliService.getPeliculaDetalle(id)
    //                 .subscribe(movie => {
    //                   if ( !movie ){
    //                     this.router.navigateByUrl('/home');
    //                     return;
    //                   }
    //                   this.movie = movie;
    //                 });

    // this.peliService.getCredit(id)
    //                 .subscribe(cast => {
    //                   this.cast = cast.filter(actor => actor.profile_path !== null);
    //                 });

  }

  onRegresar() {
    this.location.back();
  }

}
