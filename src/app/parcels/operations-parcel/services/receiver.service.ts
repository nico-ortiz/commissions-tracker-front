import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { Receiver } from '../interfaces/receiver.interface';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  private baseUrl: string = environments.baseUrl;
  private receiver?: Receiver;

  constructor(
    private http: HttpClient
  ) { }

  get currentReceiver(): Receiver | undefined {
    if (!this.receiver) return undefined;

    return structuredClone(this.receiver);
  }

  public getReceiverById(receiverId: string): Observable<Receiver> {
    return this.http.get<Receiver>(`${this.baseUrl}/receivers/${receiverId}`)
      .pipe(
        catchError(() => of())
      );
  }

  public createReceiver(receiver: Receiver): Observable<Receiver> {
    return this.http.post<Receiver>(`${this.baseUrl}/receivers/create`, receiver)
      .pipe(
        tap(receiver => this.receiver = receiver)
      );
  }

  public updateReceiver(receiverId: string, receiver: Receiver): Observable<boolean> {
    return this.http.put<Receiver>(`${this.baseUrl}/receivers/update/${receiverId}`, receiver)
      .pipe(
        tap(receiver => this.receiver = receiver),
        map(resp => true),
        catchError(err => of(false))
      );
  }
}
