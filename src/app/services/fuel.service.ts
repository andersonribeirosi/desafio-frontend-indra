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
import { API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers - Cabeçalho das requisições
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
      .get<Fuel>(`${API.FUEL_URL}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // salva um combustível
  saveFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .post<Fuel>(`${API.FUEL_URL}`, JSON.stringify(fuel), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um combustivel
  updateFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .put<Fuel>(
        `${API.FUEL_URL}/${fuel.id}`,
        JSON.stringify(fuel),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um combustível
  deleteFuel(fuel: Fuel) {
    return this.httpClient
      .delete<Fuel>(`${API.FUEL_URL}/${fuel.id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  //Users
  getUsers(): Observable<User> {
    return this.httpClient
      .get<User>(`${API.USER_URL}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${API.USER_URL}`, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um combustivel
  updateUser(user: User): Observable<User> {
    return this.httpClient
      .put<User>(
        `${API.USER_URL}/${user.id}`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um usuario
  deleteUser(user: User) {
    return this.httpClient
      .delete<User>(`${API.USER_URL}/${user.id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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
