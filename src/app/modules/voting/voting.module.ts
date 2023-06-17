import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { VotingOverviewComponent } from './voting-overview/voting-overview.component';
import { VotingResultsComponent } from './voting-results/voting-results.component';
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
import { MatRadioModule } from '@angular/material/radio';
import { VotingDetailsComponent } from './voting-details/voting-details.component';

export const votingRoutes = [
  {
    path: 'overview',
    component: VotingOverviewComponent
  },  
  {
    path: 'details/:category/:year',
    component: VotingDetailsComponent
  },
  {
    path: 'results',
    component: VotingResultsComponent
  },
];

@NgModule({
  declarations: [VotingOverviewComponent, VotingResultsComponent, VotingDetailsComponent],
  imports: [
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSortModule,
    PdfViewerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(votingRoutes)
  ],
  providers: [
    ThemeService
  ]
})
export class VotingModule { }
