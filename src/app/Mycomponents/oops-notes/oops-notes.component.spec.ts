import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OopsNotesComponent } from './oops-notes.component';

describe('OopsNotesComponent', () => {
  let component: OopsNotesComponent;
  let fixture: ComponentFixture<OopsNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OopsNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OopsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
