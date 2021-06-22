import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoCursoComponent } from './resultado-curso.component';

describe('ResultadoCursoComponent', () => {
  let component: ResultadoCursoComponent;
  let fixture: ComponentFixture<ResultadoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
