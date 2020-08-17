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
export class HistoryService {
  urlHistory = 'https://combustivelapp.herokuapp.com/api/historico';
  urlUser = 'https://combustivelapp.herokuapp.com/api/usuarios';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  // Obtem todos os combustiveis
  getFuels(): Observable<Fuel> {
    return this.httpClient
      .get<Fuel>(this.urlHistory, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // salva um combustível
  saveFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .post<Fuel>(this.urlHistory, JSON.stringify(fuel), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um combustivel
  updateFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .put<Fuel>(
        this.urlHistory + '/' + fuel.id,
        JSON.stringify(fuel),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um combustível
  deleteFuel(fuel: Fuel) {
    return this.httpClient
      .delete<Fuel>(this.urlHistory + '/' + fuel.id, this.httpOptions)
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
      .post<User>(this.urlHistory, JSON.stringify(user), this.httpOptions)
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
