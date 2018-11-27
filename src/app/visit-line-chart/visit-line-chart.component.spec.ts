import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitLineChartComponent } from './visit-line-chart.component';

describe('VisitLineChartComponent', () => {
  let component: VisitLineChartComponent;
  let fixture: ComponentFixture<VisitLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
