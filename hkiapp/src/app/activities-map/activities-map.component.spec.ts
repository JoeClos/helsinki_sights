import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesMapComponent } from './activities-map.component';

describe('ActivitiesMapComponent', () => {
  let component: ActivitiesMapComponent;
  let fixture: ComponentFixture<ActivitiesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
