import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RouterModule } from '@angular/router';


export const notificationRoutes = [
  {
    path: 'announcements',
    component: AnnouncementsComponent
  },
  {
    path: 'downloads',
    component: DownloadsComponent
  },
];

@NgModule({
  declarations: [AnnouncementsComponent, DownloadsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(notificationRoutes)
  ]
})
export class NotificationsModule { }
