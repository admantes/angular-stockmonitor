import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  @ViewChild(HomeComponent, { static: false })
   private child: HomeComponent;
  comp;

  Refresh(){
     
    console.log(this.comp);
    this.comp.readStockData();
  }

  onActivate(componentReference) {
    console.log(componentReference)
    this.comp = componentReference;
   // componentReference.anyFunction();
 }
}
