import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ScheduleDetailsComponent } from './schedules/schedule-details/schedule-details.component'

export const crmRoutes = [
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'customer/details/:id',
    component: CustomerDetailsComponent
  },
  {
    path: 'contact-list',
    component: ContactListComponent
  },
  {
    path: 'contact/details/:id',
    component: ContactDetailsComponent
  },
  {
    path: 'schedule-list',
    component: ScheduleListComponent
  },
  {
    path: 'schedule/details/:id',
    component: ScheduleDetailsComponent
  },
];

@NgModule({
  declarations: [
  CustomerListComponent,
  CustomerDetailsComponent,
  ContactListComponent,
  ContactDetailsComponent,
  ScheduleListComponent,
  ScheduleDetailsComponent,
  ],
  imports: [
    MatDialogModule,
    MatIconModule,
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule.forChild(crmRoutes)
  ],
  providers: [
    ThemeService
  ]
})
export class CrmModule { }
