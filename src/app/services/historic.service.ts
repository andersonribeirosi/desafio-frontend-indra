import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fuel } from '../models/fuel';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  url = 'https://combustivelapp.herokuapp.com/api/historico';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  // httpOptions = {
  //   headers: new HttpHeaders().set(
  //     'Access-Control-Allow-Origin',
  //     'http://localhost:4200'
  //   ),
  // };

  // Obtem todos os carros
  getFuels(): Observable<Fuel> {
    return this.httpClient
      .get<Fuel>(
        'https://combustivelapp.herokuapp.com/api/historico',
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem um carro pelo id
  // getCarById(id: number): Observable<Combustivel> {
  //   return this.httpClient
  //     .get<Combustivel>(this.url + '/' + id)
  //     .pipe(retry(2), catchError(this.handleError));
  // }

  // salva um combustível
  saveFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .post<Fuel>(this.url, JSON.stringify(fuel), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // atualiza um combustivel
  updateFuel(fuel: Fuel): Observable<Fuel> {
    return this.httpClient
      .put<Fuel>(
        this.url + '/' + fuel.id,
        JSON.stringify(fuel),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // deleta um combustível
  deleteFuel(fuel: Fuel) {
    return this.httpClient
      .delete<Fuel>(this.url + '/' + fuel.id, this.httpOptions)
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
