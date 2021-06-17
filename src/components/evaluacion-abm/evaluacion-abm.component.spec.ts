import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionAbmComponent } from './evaluacion-abm.component';

describe('EvaluacionAbmComponent', () => {
  let component: EvaluacionAbmComponent;
  let fixture: ComponentFixture<EvaluacionAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
