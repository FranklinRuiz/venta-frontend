import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GeneralPage } from 'app/shared/interface-paginator';
import { VentaService } from '../../services/venta.service';
import { VentaFormComponent } from '../venta-form/venta-form.component';

@Component({
  selector: 'app-venta-table',
  templateUrl: './venta-table.component.html',
  styleUrls: ['./venta-table.component.scss']
})
export class VentaTableComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'fecha', 'total', 'action'];
  dataSource: any[];

  tableData: GeneralPage;

  pagina: number = 0;
  size: number = 10;

  constructor(
    public dialog: MatDialog,
    private apiService: VentaService,
    private _fuseConfirmationService: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.onLoadTable()
  }

  onLoadTable() {
    this.apiService.lista(this.pagina, this.size).subscribe((resp: any) => {
      if (resp) {
        this.tableData = resp.data;
      }
    });
  }

  onChangePagination(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.size = event.pageSize;

    this.apiService.lista(this.pagina, this.size).subscribe((resp: any) => {
      this.tableData = resp.data;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(VentaFormComponent, {
      width: '620px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onLoadTable();
      }
    });
  }

  onPrint(ventaId: number) {
    

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'confirmed') {
    //     this.apiService.delete(brandId).subscribe((resp) => {
    //       this.onLoadTable();
    //     });
    //   }
    // });
  }

}
