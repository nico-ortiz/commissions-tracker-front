import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseUrl: string = environments.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`)
      .pipe(
        catchError(() => of([]))
      );
  }

  public registerCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers/register`, customer);
  }
}
