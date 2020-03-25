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
  showAddScreen : boolean = true;
  editingIndex = -1;
  editingShares = 0;
  editingAveragePrice = 0;
  sharesPlaceholder = "0";
  pricePlaceholder = "0";
  gains = "0";
  totalMarketValue = "0";
  totalCost = "0";
  currency = "Php ";
  addForm = new FormGroup({
    addSymbol: new FormControl(''), 
    addShares: new FormControl(''),
    addPrice: new FormControl(''),
  });
  fetchingData = true;

  nfObject = new Intl.NumberFormat('en-US')

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
    this.fetchingData = true;
    this.stockService.getStocks().subscribe(
      stocks => {         
        this.stocks = stocks.stock;      
        
        this.fetchingData = false;
        let gains =  this.stocks.reduce( (total, current ) => total + parseFloat(current.gainloss) ,0.0000 ).toFixed(2);
        this.gains = this.nfObject.format( gains );

        let totalCost =  this.stocks.reduce( (total, current ) => total + parseFloat(current.totalcost) ,0.0000 ).toFixed(2);

        this.totalCost = this.nfObject.format( totalCost );

        let totalMarketValue =  this.stocks.reduce( (total, current ) => total + parseFloat(current.marketvalue) ,0.0000 ).toFixed(2);
        this.totalMarketValue = this.nfObject.format( totalMarketValue );
         
      }
    );
  }

  convertToNumber(str){
    return parseInt(str);
  }

  deleteStock(symbol){
    
   
    //Delete on backend
    this.stockService.deleteStock(symbol); 

     //Delete on UI
     this.stocks = this.stocks.filter( item => item.symbol != symbol );

  }

  async saveStock(e){
    e.preventDefault();
     console.log("saved");
     let symbol:string = this.addForm.controls.addSymbol.value.toUpperCase();
     let shares = this.addForm.controls.addShares.value;
     let price = this.addForm.controls.addPrice.value;
     let res = await this.stockService.saveStock(symbol, shares, price);
     this.addForm.controls.addSymbol.setValue("");
     this.addForm.controls.addShares.setValue("");
     this.addForm.controls.addPrice.setValue("");
  }

  showEditFields(index, origShares, origPrice){
    
   this.editing = true;
   this.editingIndex = index;
   this.sharesPlaceholder = origShares;
   this.pricePlaceholder = origPrice;
   
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
  
  async updateStock(symbol){
    console.log(symbol);
    
   let result = await this.stockService.editStock(symbol, this.editingShares, this.editingAveragePrice);
   this.cancelEditing();
  }

  onEnter(value: string) { alert(value); }
}
