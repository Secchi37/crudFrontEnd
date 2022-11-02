import { Injectable } from '@angular/core';
import { Dipendente } from './dipendente';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DipendenteServiceService {
  //variabile locale
  //richiamo il dato per fare le chiamte al server
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //metodo chiamata dipendente le quadre evitano erroni riferito al numero elementi lista
  public getDipendenti(): Observable<Dipendente[]> {
    //acenti comando ALT+96
    //gestione risposta, faccio una chiamata; richiamo la variabile this.http,
    // il tipo di chiamta dell'oggetto getDipendenti,
    // definisco la strinda dell'url
    return this.http.get<Dipendente[]>(`${this.apiServerUrl}/dipendenti/all`);
  }

  //aggiungiamo nuovo dipendente
  public addDipendente(dipendente: Dipendente): Observable<Dipendente> {
    return this.http.post<Dipendente>(
      `${this.apiServerUrl}/dipendenti/add`,
      dipendente
    );
  }

  //aggiorna dipendente
  public updateDipendente(dipendente: Dipendente): Observable<Dipendente> {
    return this.http.put<Dipendente>(
      `${this.apiServerUrl}/dipendenti/update`,
      dipendente
    );
  }

  //cancella dipendente
  public deleteDipendente(dipendenteId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/dipendenti/delete/${dipendenteId}`
    );
  }
}
