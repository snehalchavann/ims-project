import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncidentsComponent } from './view-incidents.component';

describe('ViewIncidentsComponent', () => {
  let component: ViewIncidentsComponent;
  let fixture: ComponentFixture<ViewIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
