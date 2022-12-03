import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.scss']
})
export class BoletaComponent implements OnInit {

  tryDoctype: any = null;

  constructor(
    public dialogRef: MatDialogRef<BoletaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: VentaService,

  ) {
    this.mostrarBoleta()
  }

  ngOnInit(): void {
  }


  mostrarBoleta() {
    this.apiService.boleta(this.data).subscribe((response) => {
      this.tryDoctype = URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
    })
  }

}
