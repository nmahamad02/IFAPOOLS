import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  columns: any[];
  columnCustomerDefs: any[];
  columnCustomer: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  customerlist: any[] = [];
  
  customerlistDataSource = new MatTableDataSource(this.customerlist);  

  constructor(private financeservice: FinanceService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private router: Router){
    this.columnCustomer = ["PCODE", "CUST_NAME", "TAX_1_NO", "Actions"];
  }

  ngOnInit() {
    this.financeservice.getCustomerList(String(this.currentYear)).subscribe((res: any) => {
      this.customerlist = res.recordset;
      this.customerlistDataSource = new MatTableDataSource(this.customerlist);
      this.customerlistDataSource.sort = this.sort;
      this.customerlistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

  }

  quickPartySearch() {
    this.customerlistDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoCustomerDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }
}
