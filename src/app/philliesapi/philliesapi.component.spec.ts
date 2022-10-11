import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilliesapiComponent } from './philliesapi.component';

describe('PhilliesapiComponent', () => {
  let component: PhilliesapiComponent;
  let fixture: ComponentFixture<PhilliesapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhilliesapiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhilliesapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
