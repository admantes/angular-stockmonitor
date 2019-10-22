import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';
import { Stocks } from '../../models/stock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  INTERVAL = 30 * 1000; //Seconds
  title = "Stockers";
  stocks: Stocks;

  constructor( private stockService:StockService ) {
     
   }

  ngOnInit() {

    this.readStockData();

    //Get Stock Prices at regular intervals
    setInterval( ()=>{
     this.readStockData();
    }, this.INTERVAL);
     
  }


  readStockData(){
    this.stockService.getStocks().subscribe(
      stocks => {         
        this.stocks = stocks;
      }
    );
  }
}
