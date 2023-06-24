import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CrmService } from 'src/app/services/crm/crm.service';
import { VotingService } from 'src/app/services/voting/voting.service';

@Component({
  selector: 'app-voting-analysis',
  templateUrl: './voting-analysis.component.html',
  styleUrls: ['./voting-analysis.component.scss']
})
export class VotingAnalysisComponent implements OnInit {
  @ViewChild('membLookupDialog', { static: false }) membLookupDialog!: TemplateRef<any>;

  analysisForm: FormGroup;
  membArr: any[] = [];

  voteArr: any[] = [];

  membDisplayedColumns: string[] = ["name", "cpr", "email"];
  membDataSource = new MatTableDataSource(this.membArr);

  selectedRowIndex: any = 0;

  constructor(private crmservice: CrmService,private dialog: MatDialog,private votingservice: VotingService) {
    this.analysisForm = new FormGroup({ 
      cprno: new FormControl('', []),
      name: new FormControl('', []),
      category: new FormControl('', []),
    });
  }

  lookUpMembers() {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.membLookupDialog);
    this.crmservice.getAllMembers().subscribe((res: any) => {
      this.membArr = res.recordset;
      this.membDataSource = new MatTableDataSource(this.membArr);
    }, (err: any) => {
      console.log(err);
    })
  }

  onViewCellClicked(event: any) {
    this.analysisForm.patchValue({
      cprno: event.MemberNo,
      name: event.NAME,
      category: event.Email,
    })
    let dialogRef = this.dialog.closeAll();
  }

  searchMember() {
    let data = this.analysisForm.value;
    console.log(data);
    this.votingservice.getVotingMembers(data.category,data.cprno).subscribe((res: any) => {
      this.voteArr = res.recordset
      console.log(this.voteArr)
    })
  }

  ngOnInit() {
  }

  get f(){
    return this.analysisForm.controls;
  }

  highlight(index: number){
    console.log(index);
    if(index >= 0 && index <= this.membArr.length - 1) {
      this.selectedRowIndex = index;
    } 
  }

  arrowUpEvent(index: number){
   this.highlight(--index);
  }

  arrowDownEvent(index: number){
    this.highlight(++index);
  }

}
