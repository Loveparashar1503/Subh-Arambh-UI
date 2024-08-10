import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private progressBarSubject = new Subject<number>();
  progressBar$ = this.progressBarSubject.asObservable();
  private endValue = 0; // Set your custom end value here

  updateProgressBar(value: number) {
    const normalizedValue = Math.min(value, this.endValue);
    this.progressBarSubject.next(normalizedValue);
  }

  setEndValue(endValue: number) {
    this.endValue = endValue;
  }
  constructor() { }
}
