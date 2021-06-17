import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCursoComponent } from './resumen-curso.component';

describe('ResumenCursoComponent', () => {
  let component: ResumenCursoComponent;
  let fixture: ComponentFixture<ResumenCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
