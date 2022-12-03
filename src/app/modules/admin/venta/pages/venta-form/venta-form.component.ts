import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { GeneralPage } from 'app/shared/interface-paginator';
import { VentaRequestDto } from '../../model/venta';
import { ventaDetalle } from '../../model/venta-detalle';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.scss']
})
export class VentaFormComponent implements OnInit {

  @ViewChild("inputProducto")
  inputProducto: ElementRef;

  form: FormGroup;
  clienteId: number = 0;

  displayedColumns: string[] = ['producto', 'cantidad', 'precio', 'total', 'action'];
  tablaTemp = [];
  tableData = new MatTableDataSource();

  listaProducto: any[];
  productoId: number = 0;
  producto: string = '';
  precio: number = 0;

  subTotal: number = 0.00;
  igv: number = 0.18;
  total: number = 0.00;

  constructor(
    public dialogRef: MatDialogRef<VentaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: VentaService,
    private matSnackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.builform()
    this.onProductoAutocomplete()
  }

  ngOnInit(): void {
  }

  private builform(): void {
    this.form = this._formBuilder.group({
      dni: ['', Validators.required],
      cliente: [{ value: '', disabled: true }],
      producto: [''],
      cantidad: [''],
    });
  }

  onProductoAutocomplete() {
    this.form.get('producto').valueChanges.subscribe(value => {
      if (value) {
        if (value.length > 2) {
          this.apiService.busquedaProducto(value).subscribe((x: any) => {
            this.listaProducto = x.data
          });
        }
      } else {
        this.listaProducto = [];
        this.form.get('producto').setValue('');
      }
    });
  }

  onBusquedaCliente(dni: string) {
    this.apiService.busquedaCliente(dni).subscribe((response: any) => {
      if (response) {
        this.form.get("cliente").setValue(response.data.nombre);
        this.clienteId = response.data.clienteId
      }
    });
  }

  onBusquedaProducto(producto: string) {
    this.apiService.busquedaCliente(producto).subscribe((response: any) => {
      if (response) {
        this.form.get("cliente").setValue(response.data.nombre)
      }
    });
  }

  onSelectProducto(id: number, producto: string, precio: number) {
    this.productoId = id;
    this.producto = producto;
    this.precio = precio;
  }

  onAgregarProducto() {
    if (!this.form.valid) {
      this.matSnackBar.open(
        'Ingrese datos requeridos para agregar un producto.',
        'Cerrar',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' }
      );
      return;
    }
    const temp = {
      id: this.productoId,
      producto: this.producto,
      cantidad: this.form.get('cantidad').value,
      precio: this.precio.toFixed(2),
      total: (+this.form.get('cantidad').value * this.precio).toFixed(2)
    }

    if (this.productoId != 0) {
      this.tablaTemp.push(temp);
      this.tableData = new MatTableDataSource(this.tablaTemp);
    }

    this.inputProducto.nativeElement.focus();

    this.productoId = 0;
    this.producto = '';
    this.precio = 0;
    this.form.get('producto').setValue('')
    this.form.get('cantidad').setValue('')
    this.calcularTotal()
  }

  calcularTotal() {
    let tempSubTotal = 0.00;
    this.tablaTemp.forEach(x => {
      tempSubTotal = +this.subTotal + (+x.total)
    })

    this.subTotal = tempSubTotal;
    this.total = tempSubTotal + (tempSubTotal * this.igv)
  }

  onSave(): void {

    if (this.tablaTemp.length == 0) {
      this.matSnackBar.open(
        'Por favor, ingrese producto para la venta',
        'Cerrar',
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' }
      );
      return;
    }

    let detalleVenta = [];
    this.tablaTemp.forEach(x => {
      let detalle: ventaDetalle = {
        productoId: x.id,
        precio: x.precio,
        cantidad: x.cantidad,
        total: x.total
      };
      detalleVenta.push(detalle);
    });

    let venta: VentaRequestDto = {
      clienteId: this.clienteId,
      subTotal: this.subTotal,
      igv: this.igv,
      total: this.total,
      ventaDetalle: detalleVenta
    };

    console.log(venta)

    this.apiService.registrarVenta(venta).subscribe((response) => {
      if (response) {
        this.matSnackBar.open(
          'Venta registrado con exito',
          'Cerrar',
          { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' }
        );
        this.dialogRef.close(true);
      }
    });

  }

  onDelete(modeloId: number) {
    const dialogRef = this._fuseConfirmationService.delete();

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result == 'confirmed') {
    //     this.apiService.deleteModel(modeloId).subscribe((resp) => {
    //       this.onLoadTable(this.brandId);
    //     });
    //   }
    // });
  }

}
