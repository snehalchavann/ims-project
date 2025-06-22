import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDashboardCardComponent } from './common-dashboard-card.component';

describe('CommonDashboardCardComponent', () => {
  let component: CommonDashboardCardComponent;
  let fixture: ComponentFixture<CommonDashboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonDashboardCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
