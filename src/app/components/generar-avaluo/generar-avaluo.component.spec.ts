import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAvaluoComponent } from './generar-avaluo.component';

describe('GenerarAvaluoComponent', () => {
  let component: GenerarAvaluoComponent;
  let fixture: ComponentFixture<GenerarAvaluoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarAvaluoComponent]
    });
    fixture = TestBed.createComponent(GenerarAvaluoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
