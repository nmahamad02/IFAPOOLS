import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';
import { CrmService } from 'src/app/services/crm/crm.service';
import {Subscription, timer} from 'rxjs';  
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;

  uC = JSON.parse(localStorage.getItem('userclass'));
  showCRM = false;
  showVoting = false;
  notificationArr: any = []

  timerSubscription: Subscription; 

  constructor(private sideMenusService: SideMenusService, private crmService: CrmService) { 
    if (this.uC === 1) {
      this.showCRM = true;
    } else {
      this.showVoting = true;
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
    if(this.showCRM = true) {
      this.crmService.getMemberNotification().subscribe((res: any) => {
        this.notificationArr = res.recordset;
      })
    } else {

    }
  }
}
