import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  columnCall: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  calllist: any[] = [];
  
  calllistDataSource = new MatTableDataSource(this.calllist);  

  constructor(private financeservice: FinanceService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private router: Router){
    this.columnCall = ["CASE_NO", "CUST_NAME", "PARTY_MOBILE", "Actions"];
  }

  ngOnInit() {
    this.financeservice.getCallList().subscribe((res: any) => {
      console.log(res)
      this.calllist = res.recordsets[0];
      this.calllistDataSource = new MatTableDataSource(this.calllist);
      this.calllistDataSource.sort = this.sort;
      this.calllistDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });

  }

  quickCallSearch() {
    this.calllistDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoCallDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }
}
