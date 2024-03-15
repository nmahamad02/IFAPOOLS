import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CrmService } from 'src/app/services/crm/crm.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columns: any[];
  columnActiveAgreementDefs: any[];
  columnActiveAgreement: any[];
  columnInactiveAgreementDefs: any[];
  columnInactiveAgreement: any[];

  @ViewChild(MatPaginator, { static: false }) activePaginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) inactivePaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  activeAgreementlist: any[] = [];
  inactiveAgreementlist: any[] = [];
  
  activeAgreementlistDataSource = new MatTableDataSource(this.activeAgreementlist);  
  inactiveAgreementlistDataSource = new MatTableDataSource(this.inactiveAgreementlist);  

  videoSource = "https://ifamygate-floatingcity.s3.me-south-1.amazonaws.com/information/FC-Walkthrough.mov"

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getData();
  }
   
  constructor(private crmService: CrmService, private reportsService: ReportsService) {
    this.columnActiveAgreement = ["AGR_NO", "AGR_DATE", "AGR_CUST_NAME", "DEPT_NAME", "GTOTAL"];
    this.columnInactiveAgreement = ["AGR_NO", "AGR_DATE", "AGR_CUST_NAME", "DEPT_NAME", "GTOTAL"];
  }

  getData() {
    this.reportsService.getActiveAgreements().subscribe((res: any) => {
      this.activeAgreementlist = res.recordset;
      this.activeAgreementlistDataSource = new MatTableDataSource(this.activeAgreementlist);
      this.activeAgreementlistDataSource.sort = this.sort;
      //this.activeAgreementlistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

    this.reportsService.getInactiveAgreements().subscribe((res: any) => {
      this.inactiveAgreementlist = res.recordset;
      this.inactiveAgreementlistDataSource = new MatTableDataSource(this.inactiveAgreementlist);
      this.inactiveAgreementlistDataSource.sort = this.sort;
     // this.inactiveAgreementlistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });
  }
}
