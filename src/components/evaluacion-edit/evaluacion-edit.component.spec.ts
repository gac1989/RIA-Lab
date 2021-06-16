import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionEditComponent } from './evaluacion-edit.component';

describe('EvaluacionEditComponent', () => {
  let component: EvaluacionEditComponent;
  let fixture: ComponentFixture<EvaluacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
