import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeseosComponent } from './deseos.component';

describe('DeseosComponent', () => {
  let component: DeseosComponent;
  let fixture: ComponentFixture<DeseosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeseosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
