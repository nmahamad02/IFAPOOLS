import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTableModule, MatSnackBarModule, MatButtonModule, MatDialogModule, MatCardModule, MatSelectModule, MatPaginatorModule, MatDividerModule, MatSortModule, MAT_DATE_LOCALE } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomeModule } from '../home/home.module';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

export const inventoryRoutes = [
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product/details/:id',
    component: ProductDetailsComponent
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent, 
  ],
  imports: [
    HomeModule,
    MatIconModule,
    CommonModule,
    ChartsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSortModule,
    FormsModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule.forChild(inventoryRoutes)
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class InventoryModule { }
