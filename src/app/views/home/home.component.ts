import { Component, OnInit } from '@angular/core';
import { StockService } from '../../stock.service';
import { Stocks } from '../../models/stock';
import { interval } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  INTERVAL = 30 * 1000; //Seconds
  title = "Stockers";
  stocks: Array<any>;
  editing: boolean = false;
  editingIndex = -1;
  editingShares = 0;
  editingAveragePrice = 0;

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

  showEditFields(index){
    
   this.editing = true;
   this.editingIndex = index;
    //Delete on backend
   // this.stockService.deleteStock(symbol); 

     //Delete on UI
   //  this.stocks = this.stocks.filter( item => item.symbol != symbol );

  }

  cancelEditing(){
    this.editing = false;
    this.editingIndex = -1;
  }

  isEditing(index){
    return this.editingIndex == index;
  }

  updateShares(val){
    this.editingShares = (val);
  }
  
  updateAveragePrice(val){
    this.editingAveragePrice = (val);
  }
  
  updateStock(symbol){
    console.log(symbol);
    
    this.stockService.editStock(symbol, this.editingShares, this.editingAveragePrice);
  }

  onEnter(value: string) { alert(value); }
}
