import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocks } from './models/stock';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor( private http:HttpClient) { }

  getStocks():Observable<Stocks>{
    return this.http.get<Stocks>('./assets/fetchdata.php')
  }

  deleteStock(symbol){
    let inData = {"symbol": symbol};
    this.http.post('./assets/deletestock.php', inData);
  }
}
