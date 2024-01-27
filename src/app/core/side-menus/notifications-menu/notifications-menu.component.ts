import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';
import { CrmService } from 'src/app/services/crm/crm.service';
import { Subscription, timer } from 'rxjs';  
import { map } from 'rxjs/operators';
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

  constructor(private sideMenusService: SideMenusService, private crmService: CrmService, private router: Router) { 
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
      }) 
    ).subscribe(); 
  }

  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }

}
