import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskedInComponent } from './asked-in.component';

describe('AskedInComponent', () => {
  let component: AskedInComponent;
  let fixture: ComponentFixture<AskedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
