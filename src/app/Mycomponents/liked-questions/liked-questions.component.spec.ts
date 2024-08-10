import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedQuestionsComponent } from './liked-questions.component';

describe('LikedQuestionsComponent', () => {
  let component: LikedQuestionsComponent;
  let fixture: ComponentFixture<LikedQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
