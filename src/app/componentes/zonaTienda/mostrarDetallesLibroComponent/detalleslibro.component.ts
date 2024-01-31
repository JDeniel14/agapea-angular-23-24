import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ILibro } from '../../../modelos/libro';
import { RestnodeService } from '../../../servicios/restnode.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-detalleslibro',
  templateUrl: './detalleslibro.component.html',
  styleUrl: './detalleslibro.component.css',
})
export class DetalleslibroComponent implements OnDestroy {
  public libro$: Observable<ILibro>;
  public libroAMostrar?: ILibro;
  public subLibro: Subscription;
  /**
   *
   */
  constructor(
    private restSvc: RestnodeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.libro$ = this.activatedRoute.paramMap.pipe(
      switchMap((param) => {
        let isbn = param.get('isbn');
        return this.restSvc.RecuperarUnLibro(isbn as string);
      })
    );

    this.subLibro = this.libro$.subscribe((dato: ILibro) => {
      this.libroAMostrar = dato;
    });
  }
  ngOnDestroy(): void {
    this.subLibro.unsubscribe();
  }

  public AddLibroPedido() {}
}
