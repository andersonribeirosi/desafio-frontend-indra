import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fuel } from '../models/fuel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  urlFuel = '/api/historico';
  urlUser = '/api/usuarios';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    }),
  };

  // Obtem todos os combustiveis
  getFuels(): Observable<Fuel> {
    return this.httpClient
      .get<Fuel>(this.urlFuel, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // salva um combustível
  saveFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .post<Fuel>(this.urlFuel, JSON.stringify(fuel), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um combustivel
  updateFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .put<Fuel>(
        this.urlFuel + '/' + fuel.id,
        JSON.stringify(fuel),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um combustível
  deleteFuel(fuel: Fuel) {
    return this.httpClient
      .delete<Fuel>(this.urlFuel + '/' + fuel.id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //Users
  getUsers(): Observable<User> {
    return this.httpClient
      .get<User>(this.urlUser, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.urlUser, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
