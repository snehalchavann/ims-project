import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyUpdateService {
  private updateData = new Subject<void>();
  update$ = this.updateData.asObservable();

  notifyUpdate() {
    this.updateData.next();
  }
  constructor() { }
}
