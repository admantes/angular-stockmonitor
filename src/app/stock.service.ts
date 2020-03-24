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
    let formData: FormData = new FormData();
    formData.append('symbol', symbol);
    this.http.post<any>( this.baseUrl + 'deletestock.php', formData ).subscribe( data => this.getStocks() );
  }

  editStock(symbol, shares, price){
    let inData = {symbol: symbol, shares: shares, aveprice: price};
    let formData: FormData = new FormData();
    formData.append('symbol', symbol);
    formData.append('shares', shares);
    formData.append('aveprice', price);

    this.http.post( this.baseUrl + 'editstock.php', formData).subscribe( data => {
      this.getStocks() 
    });    
    
  }

  saveStock(symbol, shares, price){
    let inData = {symbol: symbol, shares: shares, aveprice: price};
    let formData: FormData = new FormData();
    formData.append('symbol', symbol);
    formData.append('shares', shares);
    formData.append('aveprice', price);

    this.http.post( this.baseUrl + 'savestock.php', formData).subscribe( data => {
      this.getStocks() 
    });    
    
  }
}
