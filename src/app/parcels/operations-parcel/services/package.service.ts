import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { NewCommission } from '../interfaces/new-commission.interface';
import { Commission } from '../interfaces/commission.interface';
import { PackageType } from '../interfaces/enums/package-type.enum';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { IPackage } from '../interfaces/package.interface';
import { IEnvelope } from '../interfaces/envelope.interface';
import { IParcel } from '../interfaces/parcel.interface';
import { IBigger } from '../interfaces/bigger.interface';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private baseUrl: string = environments.baseUrl;
  private parcel!: Commission;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  public createCommission(commission: NewCommission): Observable<Commission> {
    return this.http.post<Commission>(`${this.baseUrl}/commissions/create`, commission)
      .pipe(
        tap(parcel => {
          this.parcel = parcel;
          this.localStorage.saveEncryptedData("commissionId", JSON.stringify(parcel.commissionId));
        }),
      );
  }

  public deleteCommission(commissionId: string): Observable<boolean> {
    return this.http.delete<Commission>(`${this.baseUrl}/commissions/del/${commissionId}`)
    .pipe(
      map(() => {
        this.localStorage.removeData("commissionId");
        return true;
      }),
      catchError(err => of(false))
    );
  }

  public addEnvelopeToCommission(description: string): Observable<IEnvelope> {
    const envelope: IPackage = {
      packageId: '',
      description,
      price: 0,
      packageType: PackageType.SOBRE,
      commissionId: this.localStorage.getEncryptedData("commissionId")
    }

    return this.http.post<IEnvelope>(`${this.baseUrl}/envelopes/create`, envelope);
  }

  public addParcelToCommission(description: string, packageType: PackageType): Observable<IParcel> {
    const parcel: IPackage = {
      packageId: '',
      description,
      price: 0,
      packageType,
      commissionId: this.localStorage.getEncryptedData("commissionId")
    };

    return this.http.post<IParcel>(`${this.baseUrl}/parcels/create`, parcel);
  }

  public addBiggerToCommission(description: string, width: number, height: number, weight: number): Observable<IBigger> {
    const bigger = {
      description,
      packageType: PackageType.BIGGER,
      commissionId: this.localStorage.getEncryptedData("commissionId"),
      width,
      height,
      weight
    };

    return this.http.post<IBigger>(`${this.baseUrl}/biggers/create`, bigger);
  }

  public getPackagesOfCommission(commissionId: string): Observable<IPackage[]> {
    return this.http.get<IPackage[]>(`${this.baseUrl}/commissions/${commissionId}/packages`);
  }

  public deletePackageOfCommission(packageId: string): Observable<boolean> {
    return this.http.delete<IPackage>(`${this.baseUrl}/packages/del/${packageId}`)
      .pipe(
        map(result => true),
        catchError(err => of(false))
      );
  }

  public getPackageById(packageId: string): Observable<IPackage> {
    return this.http.get<IPackage>(`${this.baseUrl}/packages/${packageId}`);
  }

  public updateEnvelope(envelopeId: string, description: string): Observable<boolean> {
    return this.http.put<IEnvelope>(`${this.baseUrl}/envelopes/update/${envelopeId}`,
      {},
      {params: {description: description}}
    )
      .pipe(
        map(result => true),
        catchError(err => of(false))
      );
  }

  public updateParcel(parcelId: string, description: string, packageType: PackageType ): Observable<boolean> {
    return this.http.put<IParcel>(`${this.baseUrl}/parcels/update/${parcelId}`,
      {},
      {params: {description, packageType}}
    )
      .pipe(
        map(result => true),
        catchError(err => of(false))
      );
  }

  public updateBigger(biggerId: string, description: string, width: number, height: number, weight: number): Observable<boolean> {
    return this.http.put<IBigger>(`${this.baseUrl}/biggers/update/${biggerId}`, 
      {},
      {params: {description, width, height, weight}}
    )
      .pipe(
        map(result => true),
        catchError(err => of(false))
      );
  }
}
