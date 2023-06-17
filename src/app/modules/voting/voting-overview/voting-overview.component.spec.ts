import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingOverviewComponent } from './voting-overview.component';

describe('VotingOverviewComponent', () => {
  let component: VotingOverviewComponent;
  let fixture: ComponentFixture<VotingOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
