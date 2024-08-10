import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumemadeComponent } from './resumemade.component';

describe('ResumemadeComponent', () => {
  let component: ResumemadeComponent;
  let fixture: ComponentFixture<ResumemadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumemadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumemadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
