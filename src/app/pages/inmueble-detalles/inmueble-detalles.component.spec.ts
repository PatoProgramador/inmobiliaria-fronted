import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleDetallesComponent } from './inmueble-detalles.component';

describe('InmuebleDetallesComponent', () => {
  let component: InmuebleDetallesComponent;
  let fixture: ComponentFixture<InmuebleDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InmuebleDetallesComponent]
    });
    fixture = TestBed.createComponent(InmuebleDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
