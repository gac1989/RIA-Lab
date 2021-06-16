import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseAbmComponent } from './clase-abm.component';

describe('ClaseAbmComponent', () => {
  let component: ClaseAbmComponent;
  let fixture: ComponentFixture<ClaseAbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseAbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaseAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
