import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({providedIn: 'root'})
export class LocalStorageService {

  private key : string = "123";

  constructor() { }

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string): string {
    return localStorage.getItem(key) || "";
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }

  public saveEncryptedData(key: string, value: string): void {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getEncryptedData(key: string): string {
    let data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  public removeEncryptedData(key: string): void {
    let data = localStorage.getItem(key) || "";
    localStorage.removeItem(this.decrypt(data));
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string): string {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
