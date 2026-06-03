import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacaoCaixa } from './operacao-caixa';

describe('OperacaoCaixa', () => {
  let component: OperacaoCaixa;
  let fixture: ComponentFixture<OperacaoCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperacaoCaixa],
    }).compileComponents();

    fixture = TestBed.createComponent(OperacaoCaixa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
