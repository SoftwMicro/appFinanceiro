import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CaixaService } from '../services/caixa';

@Component({
  selector: 'app-operacao-caixa',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './operacao-caixa.html',
  styleUrls: ['./operacao-caixa.css'],
})
export class OperacaoCaixa {

  caixaForm: FormGroup;
  caixaId?: number;
  alertMessage?: string;
  alertType: 'success' | 'error' | '' = '';

  constructor(private fb: FormBuilder, private caixaService: CaixaService) {
    this.caixaForm = this.fb.group({
      usuario_id: ['', Validators.required],
      saldo_inicial: ['', Validators.required],
      saldo_final: ['', Validators.required]
    });
  }

  abrirCaixa() {
    if (this.caixaForm.get('usuario_id')?.invalid || this.caixaForm.get('saldo_inicial')?.invalid) {
      return;
    }

    const valor = this.caixaForm.value;
    const payload = {
      usuario_id: valor.usuario_id,
      saldo_inicial: Number(valor.saldo_inicial),
    };

    this.caixaService.abrirCaixa(payload).subscribe({
      next: (res) => {
        this.caixaId = res.id;
        this.setAlert(`Caixa aberto com sucesso: ${JSON.stringify(res)}`, 'success');
        console.log('Caixa aberto com sucesso:', res);
      },
      error: (err) => {
        this.setAlert('Falha ao abrir caixa. Verifique os dados e tente novamente.', 'error');
        console.error('Erro ao abrir caixa:', err);
      },
    });
  }

  fecharCaixa() {
    if (!this.caixaId || this.caixaForm.get('saldo_final')?.invalid) {
      return;
    }

    const valor = this.caixaForm.value;
    const payload = {
      saldo_final: Number(valor.saldo_final),
    };

    this.caixaService.fecharCaixa(this.caixaId, payload).subscribe({
      next: (res) => {
        this.setAlert('Caixa fechado com sucesso.', 'success');
        console.log('Caixa fechado com sucesso:', res);
      },
      error: (err) => {
        this.setAlert('Falha ao fechar caixa. Verifique os dados e tente novamente.', 'error');
        console.error('Erro ao fechar caixa:', err);
      },
    });
  }

  private formatDate(value: string | Date): string {
    if (!value) {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);
    return date.toISOString();
  }

  private setAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = undefined;
      this.alertType = '';
    }, 5000);
  }
}

