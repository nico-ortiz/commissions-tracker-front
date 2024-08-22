import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseUrl: string = environments.baseUrl;

  private customer!: Customer;

  constructor(
    private http: HttpClient
  ) { }

  get currentCustomer(): Customer | undefined {
    if (!this.customer) return undefined;

    return structuredClone(this.customer);
  }

  get getCustomer(): Customer {
    return this.customer;
  }

  public getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`)
      .pipe(
        catchError(() => of([]))
      );
  }

  public registerCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers/register`, customer)
      .pipe(
        tap(customer => this.customer = customer)
      );
  }

  public updateCustomer(newDataCustomer: Customer, customerId: string): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/customers/update/${customerId}`, newDataCustomer)
      .pipe(
        tap(customer => this.customer = customer)
      );
  }

  public getCustomerById(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${customerId}`)
      .pipe(
        catchError(() => of())
      );
  }

  public deleteCustomerById(customerId: string): Observable<boolean> {
    return this.http.delete<Customer>(`${this.baseUrl}/customers/del/${customerId}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false))
      );
  }
}
