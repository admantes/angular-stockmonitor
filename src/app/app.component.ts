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
  routeChildComponent;

  Refresh(){
    //console.log(this.routeChildComponent);
    this.routeChildComponent.readStockData();
  }

  //Called when router activates a component and passes the component reference 
  onActivate(componentReference) {
    console.log(componentReference)
    this.routeChildComponent = componentReference;
   // componentReference.anyFunction();
 }

 
}
