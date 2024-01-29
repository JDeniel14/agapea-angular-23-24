import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
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
  constructor( private activatedRoute : ActivatedRoute, private router: Router) {

  


      this.subcriptorRuta = this.router.events.subscribe( (ev) => {
        if(ev instanceof NavigationStart){
          console.log('ruta', ev.url)
          console.log('ruta[1],ruta[2]',ev.url.split('/')[1],ev.url.split('/')[2] )
          if(ev.url.split('/')[1] == 'Cliente' && ev.url.split('/')[2] == 'Panel'){

            this.showPanel = 'panelCliente';
            console.log(this.showPanel)
          }else if(ev.url.split('/')[1] == 'Tienda'){
            this.showPanel = 'panelTienda';
          }else{
            this.showPanel = '';
          }
        }
      })

  }
  ngOnDestroy(): void {
    if(this.subcriptorRuta){
      this.subcriptorRuta.unsubscribe();
    }
  }




}
