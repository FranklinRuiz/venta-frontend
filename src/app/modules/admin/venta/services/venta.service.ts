import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VentaRequestDto } from '../model/venta';
import { GeneralPage } from 'app/shared/interface-paginator';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = environment.apiurl;

  constructor(private http: HttpClient) { }

  busquedaCliente(dni: string) {
    return this.http.get<any>(`${this.url}/api/cliente/busqueda/${dni}`);
  }

  busquedaProducto(producto: string) {
    let params = new HttpParams();
    params = params.append('producto', producto);
    return this.http.get<any>(`${this.url}/api/producto/lista-producto`, { params });
  }

  registrarVenta(ventaRequestDto: VentaRequestDto) {
    return this.http.post<any>(`${this.url}/api/venta/registrar`, ventaRequestDto);
  }

  lista(pagina: number, size: number) {
    let params = new HttpParams();
    params = params.append('page', pagina);
    params = params.append('size', size);
    params = params.append('ventaId', '');
    params = params.append('sort', 'ventaId,desc');
    return this.http.get<GeneralPage>(`${this.url}/api/venta/lista`, { params });
  }

}
