import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CrmService } from 'src/app/services/crm/crm.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  //eligibleUnitList: any[] = [];
  //nonEligibleUnitList: any[] = [];
  searchValue: any;
  propertyList: any[] = [];
  propertyListDataSource = new MatTableDataSource(this.propertyList);
  columns: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  constructor(private crmservice: CrmService, private router: Router) {
    this.columns = [ "memberno", "name", "property", "mobile", "email", "Actions"];
  }

  ngOnInit(): void {
    this.crmservice.getAllPropertyWiseLandlords().subscribe((res: any) => {
      this.propertyList = res.recordset;
      this.propertyListDataSource = new MatTableDataSource(this.propertyList);
      this.propertyListDataSource.sort = this.sort;
      this.propertyListDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });
  }

  quickPropertySearch() {
    this.propertyListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  /*ngOnInit() {
    this.crmService.getAllEligibleUnits().subscribe((res: any) => {
      this.eligibleUnitList = res.recordset;
      console.log(this.eligibleUnitList)
    }, (err: any) => {
      console.log(err);
    })
    this.crmService.getAllNonEligibleUnits().subscribe((res: any) => {
      this.nonEligibleUnitList = res.recordset;
      console.log(this.nonEligibleUnitList)
    }, (err: any) => {
      console.log(err);
    })
  }*/

  public gotoPropertyDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
