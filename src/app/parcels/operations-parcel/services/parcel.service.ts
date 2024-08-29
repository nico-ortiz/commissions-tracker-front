import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environments } from '../../../../environments/environments';
import { NewCommission } from '../interfaces/new-commission.interface';
import { Commission } from '../interfaces/commission.interface';
import { Envelope } from '../interfaces/envelope.interface';
import { Package } from '../interfaces/package.interface';
import { Parcel } from '../interfaces/parcel.interface';
import { Bigger } from '../interfaces/bigger.interface';
import { PackageType } from '../interfaces/enums/package-type.enum';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private baseUrl: string = environments.baseUrl;
  private parcel!: Commission;
  private packagesOfCommission: Package[] = [];

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
          console.log(parcel)
        }),
      );
  }

  public addEnvelopeToCommission(description: string): Observable<Envelope> {
    const envelope: Package = {
      description,
      price: 0,
      packageType: PackageType.SOBRE,
      commissionId: this.localStorage.getEncryptedData("commissionId")
    }

    console.log(envelope);
    return this.http.post<Envelope>(`${this.baseUrl}/envelopes/create`, envelope)
      .pipe(
        tap(env => this.packagesOfCommission.push(env))
      );
  }

  public addParcelToCommission(description: string, weight: number): Observable<Parcel> {

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

    return this.http.post<Parcel>(`${this.baseUrl}/parcels/create`, parcel);
  }

  public addBiggerToCommission(description: string, width: number, height: number, weight: number): Observable<Bigger> {
    const bigger = {
      description,
      packageType: PackageType.BIGGER,
      commissionId: this.parcel.commissionId,
      width,
      height,
      weight
    };

    return this.http.post<Bigger>(`${this.baseUrl}/biggers/create`, bigger);
  }

  public getPackagesOfCommission(commissionId: string): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.baseUrl}/commissions/${commissionId}/packages`);
  }
}
