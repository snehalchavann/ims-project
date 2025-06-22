import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurgeIncidentsComponent } from './purge-incidents.component';

describe('PurgeIncidentsComponent', () => {
  let component: PurgeIncidentsComponent;
  let fixture: ComponentFixture<PurgeIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurgeIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurgeIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
