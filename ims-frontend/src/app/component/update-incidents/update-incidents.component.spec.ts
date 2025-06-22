import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidentsComponent } from './update-incidents.component';

describe('UpdateIncidentsComponent', () => {
  let component: UpdateIncidentsComponent;
  let fixture: ComponentFixture<UpdateIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
