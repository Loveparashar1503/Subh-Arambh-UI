import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantlistComponent } from './importantlist.component';

describe('ImportantlistComponent', () => {
  let component: ImportantlistComponent;
  let fixture: ComponentFixture<ImportantlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportantlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
