import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocks } from './models/stock';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  baseUrl = environment.baseUrl;

  constructor( private http:HttpClient) { }

  getStocks():Observable<Stocks>{
    return this.http.get<Stocks>(this.baseUrl + 'fetchdata.php')
  }

  deleteStock(symbol){
    let inData = {"symbol": symbol};
    this.http.post( this.baseUrl + 'deletestock.php', inData);
  }
}
