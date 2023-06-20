import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrmService } from 'src/app/services/crm/crm.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  searchValue: any;
  memberList: any[] = [];
  memberListDataSource = new MatTableDataSource(this.memberList);
  columns: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  constructor(private crmservice: CrmService, private router: Router) {
    this.columns = [ "name", "cpr", "email", "Actions"];
  }

  ngOnInit(): void {
    this.crmservice.getAllMembers().subscribe((res: any) => {
      this.memberList = res.recordset;
      this.memberListDataSource = new MatTableDataSource(this.memberList);
      this.memberListDataSource.sort = this.sort;
      this.memberListDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });
  }

  quickMemberSearch() {
    this.memberListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  updateMemberDate() {
    this.crmservice.upDateMemberDate().subscribe((res: any) => {
      console.log(res)
    }, (error: any) => {
      console.log(error);
    });
  }

  public gotoMemberDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }


}
