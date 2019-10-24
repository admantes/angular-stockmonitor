import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';
import { Stocks } from '../../models/stock';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  INTERVAL = 30 * 1000; //Seconds
  title = "Stockers";
  stocks: Array<any>;

  constructor( private stockService:StockService ) {
     
   }

  ngOnInit() {

    this.readStockData();

    //Get Stock Prices at regular intervals
    interval( this.INTERVAL ).subscribe( n=>{     
        this.readStockData();
      }
    )

   

  }


  readStockData(){
    this.stockService.getStocks().subscribe(
      stocks => {         
        this.stocks = stocks.stock;
      }
    );
  }

  deleteStock(symbol){
    
   
    //Delete on backend
    this.stockService.deleteStock(symbol); 

     //Delete on UI
     this.stocks = this.stocks.filter( item => item.symbol != symbol );

  }

  onEnter(value: string) { alert(value); }
}
