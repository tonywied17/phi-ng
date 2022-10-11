import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EaglesapiComponent } from './eaglesapi.component';

describe('EaglesapiComponent', () => {
  let component: EaglesapiComponent;
  let fixture: ComponentFixture<EaglesapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EaglesapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EaglesapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
