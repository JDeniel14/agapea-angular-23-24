import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {

  public showPanel : string=''; //<------ puede valer panelCliente si en url: /Cliente/Panel/....,
                                //'panelTienda' si en url : /Tienda/....
                                // y  '' si en url /Cliente/Login o Registro

  public subcriptorRuta : Subscription;

  /**
   *
   */
  constructor( private activatedRoute : ActivatedRoute) {

    this.subcriptorRuta= this.activatedRoute.url.subscribe(
      (url)=> {
        if(url[0].path == 'Cliente' && url[1].path == 'Panel'){
          this.showPanel = 'panelCliente'
        }else if(url[0].path == 'Tienda'){
          this.showPanel = 'panelTienda'
        }else{
          this.showPanel = ''
        }
        console.log('valor panel: ',this.showPanel)
      }
    )

  }
  ngOnDestroy(): void {
    if(this.subcriptorRuta){
      this.subcriptorRuta.unsubscribe();
    }
  }




}
