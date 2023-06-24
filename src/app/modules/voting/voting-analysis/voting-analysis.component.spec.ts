import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingAnalysisComponent } from './voting-analysis.component';

describe('VotingAnalysisComponent', () => {
  let component: VotingAnalysisComponent;
  let fixture: ComponentFixture<VotingAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
