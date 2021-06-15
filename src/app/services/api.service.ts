import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from  'rxjs';

export  interface  Item {
  name:  string;
  countryInfo: {
    iso2 : string,
    iso3 : string,
  } 
  recovered:  string;
  deaths:  string;
  active:  string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private  dataURL: string  = "https://corona.lmao.ninja/v2/countries/India, Nepal, Bangladesh, Pakistan, Bhutan, Sri Lanka, Maldives";
  constructor(private  httpClient: HttpClient) {}
  get():  Observable<Item[]>{
      return this.httpClient.get(this.dataURL) as Observable<Item[]>;
  }
}
