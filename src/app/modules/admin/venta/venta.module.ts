import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaFormComponent } from './pages/venta-form/venta-form.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'app/shared/material/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { VentaTableComponent } from './pages/venta-table/venta-table.component';
import { BoletaComponent } from './pages/boleta/boleta.component';
import { SafePipe } from 'app/core/config/safe-pipe';

const ventaRoutes: Route[] = [
  {
    path: '',
    component: VentaTableComponent
  }
];

@NgModule({
  declarations: [
    VentaFormComponent,
    VentaTableComponent,
    BoletaComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ventaRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class VentaModule { }
