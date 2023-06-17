import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotingService } from 'src/app/services/voting/voting.service';

@Component({
  selector: 'app-voting-overview',
  templateUrl: './voting-overview.component.html',
  styleUrls: ['./voting-overview.component.scss']
})
export class VotingOverviewComponent implements OnInit {
  votingType: any[] = []

  constructor(private votingService: VotingService, private router: Router) { 
    this.getData() 
  }

  ngOnInit() {
  }

  getData() {
    this.votingService.getAllVoteTypes().subscribe((res: any) => {
      this.votingType = res.recordset
    })
  }

  public gotoVotingDetails(url, category, year) {
    var myurl = `${url}/${category}/${year}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
