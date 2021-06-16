import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseEditComponent } from './clase-edit.component';

describe('ClaseEditComponent', () => {
  let component: ClaseEditComponent;
  let fixture: ComponentFixture<ClaseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
