import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';
import { CrmService } from 'src/app/services/crm/crm.service';
import {Subscription, timer} from 'rxjs';  
import { map } from 'rxjs/operators';
import { VotingService } from 'src/app/services/voting/voting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;

  uC = JSON.parse(localStorage.getItem('userclass'));
  cpr = JSON.parse(localStorage.getItem('userid'));
  showCRM = false;
  showVoting = false;
  notificationArr: any = []
  proxArr: any = []
  message = []

  timerSubscription: Subscription; 

  constructor(private sideMenusService: SideMenusService, private crmService: CrmService, private votingService: VotingService,  private router: Router) { 
    if (this.uC === 1) {
      this.showCRM = true;
      this.showVoting = false;
    } else if (this.uC === 2){
      this.showVoting = true;
      this.showCRM = false;
    }
  }

  ngOnInit() {
    this.timerSubscription = timer(0, 10000).pipe( 
      map(() => { 
        this.getData()
      }) 
    ).subscribe(); 
  }

  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }

  getData() {
    this.proxArr = []
    this.message = []
    console.log(this.showVoting)
    console.log(this.showCRM)
    this.crmService.getMemberNotification().subscribe((res: any) => {
      this.notificationArr = res.recordset;
      console.log(res)
    }, (err: any) => {
      console.log(err)
    })
    this.crmService.checkProxy(this.cpr).subscribe((res: any) => {
      for(let i=0; i<res.recordset.length; i++){
        this.crmService.getMemberFromCPR(res.recordset[i].PRIMARYMEMBER).subscribe((resp: any) => {
          const prox = {
            membNo: resp.recordset[0].MemberNo,
            membName: resp.recordset[0].NAME,
          }
          this.proxArr.push(prox)
        }, (err: any) => {
          console.log(err)
        })
      }
    }, (err: any) => {
      console.log(err)
    })
    this.votingService.checkVotingStatus(this.cpr,"GENERAL","2023").subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0){
        const msg = {
          msg: "You have not yet voted in the GENERAL category in the 2023 AGM.",
          category: "GENERAL",
          year: "2023"
        }
        this.message.push(msg)
      }
    }, (err: any) => {
      console.log(err)
    })
    this.votingService.checkVotingStatus(this.cpr,"BYLAW","2023").subscribe((res: any) => {
      console.log(res)
      if(res.recordset.length === 0){
        const msg = {
          msg: "You have not yet voted in the BYLAW category in the 2023 AGM.",
          category: "BYLAW",
          year: "2023"
        }
        this.message.push(msg)
      }
    }, (err: any) => {
      console.log(err)
    })
  }

}
