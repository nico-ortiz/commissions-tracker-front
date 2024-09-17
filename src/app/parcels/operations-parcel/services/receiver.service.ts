import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { Receiver } from '../interfaces/receiver.interface';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  private baseUrl: string = environments.baseUrl;
  private receiver!: Receiver;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  get currentReceiver(): Receiver | undefined {
    if (!this.receiver) return undefined;

    return structuredClone(this.receiver);
  }

  get getReceiver(): Receiver {
    return this.receiver;
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
        tap(receiver => {
          this.receiver = receiver;
          this.localStorage.saveEncryptedData("receiverId", JSON.stringify(receiver.receiverId));
        })
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

  public deleteReceiver(receiverId: string): Observable<boolean> {
    return this.http.delete<Receiver>(`${this.baseUrl}/receivers/del/${receiverId}`)
      .pipe(
        map(res => {
          this.localStorage.removeData("receiverId");
          return true;
        }),
        catchError(err => of(false))
      );
  }
}
