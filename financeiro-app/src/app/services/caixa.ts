import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CaixaPayload {
  id?: number;
  usuario_id: string | number;
  data_abertura?: string;
  saldo_inicial?: number;
  data_fechamento?: string;
  saldo_final?: number;
  status: 'ABERTO' | 'FECHADO';
}

@Injectable({
  providedIn: 'root',
})
export class CaixaService {
  private readonly baseUrl = 'http://localhost:8080/caixa';

  constructor(private http: HttpClient) {}

  abrirCaixa(payload: Pick<CaixaPayload, 'usuario_id' | 'saldo_inicial'>): Observable<CaixaPayload> {

    const params = new HttpParams()
    .set('usuarioId', payload.usuario_id)
    .set('saldoInicial', (payload.saldo_inicial ?? 0).toString());

   return this.http.post<CaixaPayload>(`${this.baseUrl}/abrir`, null, { params });
  }

  fecharCaixa(id: number, payload: Pick<CaixaPayload, 'saldo_final'>): Observable<CaixaPayload> {
    const params = new HttpParams().set('saldoFinal', (payload.saldo_final ?? 0).toString());
    return this.http.post<CaixaPayload>(`${this.baseUrl}/fechar/${id}`, null, { params });
  }

  fecharTodos(): Observable<CaixaPayload[]> {
    return this.http.patch<CaixaPayload[]>(`${this.baseUrl}/fechar/`, {});
  }
}
