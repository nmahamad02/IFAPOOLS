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
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { SubcategoryListComponent } from './subcategory/subcategory-list/subcategory-list.component';
import { SubcategoryDetailComponent } from './subcategory/subcategory-detail/subcategory-detail.component';

export const inventoryRoutes = [
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product/details/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'category-list',
    component: CategoryListComponent
  },
  {
    path: 'category/details/:id',
    component: CategoryDetailsComponent
  },
  {
    path: 'subcategory-list',
    component: SubcategoryListComponent
  },
  {
    path: 'subcategory/details/:id',
    component: SubcategoryDetailComponent
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CategoryListComponent,
    CategoryDetailsComponent,
    SubcategoryListComponent,
    SubcategoryDetailComponent, 
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
