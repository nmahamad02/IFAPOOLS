import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrmService } from 'src/app/services/crm/crm.service';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { VotingService } from 'src/app/services/voting/voting.service';

@Component({
  selector: 'app-voting-overview',
  templateUrl: './voting-overview.component.html',
  styleUrls: ['./voting-overview.component.scss']
})
export class VotingOverviewComponent implements OnInit {
  votingType: any[] = []
  memberList: any[] = []

  uC = JSON.parse(localStorage.getItem('userid'));

  constructor(private votingService: VotingService, private router: Router, private crmservice: CrmService, private dataSharingService: DataSharingService) { 
    this.getData() 
  }

  ngOnInit() {
  }

  getData() {
    this.votingService.getActiveVoteTypes().subscribe((res: any) => {
      this.votingType = res.recordset
    })
    this.crmservice.getMemberFromCPR(this.uC).subscribe((res: any) => {
      console.log(res)
      for(let i=0; i<res.recordset.length;i++){
        if(res.recordset[i].MEMBTYPE==='O') {
          const memb = {
            memberno: res.recordset[i].MemberNo,
            membername: res.recordset[i].NAME,
            membertype: res.recordset[i].MEMBTYPE
          }
          this.memberList.push(memb)
        } else if(res.recordset[i].MEMBTYPE==='P') {
          this.crmservice.getMemberFromCPR(res.recordset[i].PRIMARYMEMBER).subscribe((resp: any) => {
            const memb = {
              memberno: resp.recordset[0].MemberNo,
              membername: resp.recordset[0].NAME,
              membertype: resp.recordset[0].MEMBTYPE
            }
            this.memberList.push(memb)
          })
        }
      }
    })
  }

  public gotoVotingDetails(url, category, year, membno, membname, membtype) {
    var myurl = `${url}/${category}/${year}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
    const membData = {
      membno: membno,
      membname: membname,
      membtype: membtype
    }
    this.dataSharingService.setData(membData)
  }

}
