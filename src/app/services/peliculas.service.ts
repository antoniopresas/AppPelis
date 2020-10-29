import { CreditsResponse, Cast } from './../interfaces/credits-response';
import { MovieDetail } from './../interfaces/movie-response';
import { CarteleraResponse, Movie } from './../interfaces/cartelera-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';

  private carteleraPage = 1;

  public cargando: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  get params() {
    return{
      api_key: '4182d9423ff6ce1c8ce5912100a6a85b',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if ( this.cargando ) {
      // Cargando pelis
      return of ([]);
    }

    this.cargando = true;

    // https://api.themoviedb.org/3/movie/now_playing?api_key=4182d9423ff6ce1c8ce5912100a6a85b&language=es-ES&page=5

    return this.http.get<CarteleraResponse>( `${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );

  }

  buscarPeliculas(texto: string): Observable<Movie[]>{

    const params = {...this.params, page: '1', query: texto, include_adult: 'true' };

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp =>  resp.results)
    );


  }

  // https://api.themoviedb.org/3/movie/613504?api_key=4182d9423ff6ce1c8ce5912100a6a85b&language=es-ES

  getPeliculaDetalle(id: number ): Observable<MovieDetail>{

    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );

  }

  // https://api.themoviedb.org/3/movie/24428/credits?api_key=4182d9423ff6ce1c8ce5912100a6a85b

  getCredit(id: string): Observable<Cast[]> {

    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([])),
    );

  }

}
