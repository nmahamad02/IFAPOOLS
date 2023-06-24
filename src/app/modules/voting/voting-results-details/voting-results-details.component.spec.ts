import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingResultsDetailsComponent } from './voting-results-details.component';

describe('VotingResultsDetailsComponent', () => {
  let component: VotingResultsDetailsComponent;
  let fixture: ComponentFixture<VotingResultsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingResultsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingResultsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
