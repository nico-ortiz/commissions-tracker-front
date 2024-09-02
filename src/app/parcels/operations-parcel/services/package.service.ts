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
export class ParcelService {

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

  public addParcelToCommission(description: string, weight: number): Observable<IParcel> {
    let packageType: PackageType;
    if (weight <= 10) {
      packageType = PackageType.CAJA_CHICA;
    } else if (weight > 10 && weight <= 20) {
      packageType = PackageType.CAJA_MEDIANA;
    } else {
      packageType = PackageType.CAJA_GRANDE;
    }

    const parcel = {
      description,
      packageType: packageType,
      commissionId: this.parcel.commissionId,
      weight,
    };

    return this.http.post<IParcel>(`${this.baseUrl}/parcels/create`, parcel);
  }

  public addBiggerToCommission(description: string, width: number, height: number, weight: number): Observable<IBigger> {
    const bigger = {
      description,
      packageType: PackageType.BIGGER,
      commissionId: this.parcel.commissionId,
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
}
