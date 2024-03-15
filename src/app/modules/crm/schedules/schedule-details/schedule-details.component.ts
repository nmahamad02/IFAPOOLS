import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent implements OnInit {
  currentYear = new Date().getFullYear()

  public scheduleForm: FormGroup;

  constructor(private financeService: FinanceService, private route: ActivatedRoute,  private _snackBar: MatSnackBar) { 
    this.scheduleForm = new FormGroup({
      caseID: new FormControl('', [ Validators.required]),
      caseNbr: new FormControl('', [ Validators.required]),
      caseType: new FormControl('', [ Validators.required]),
      caseDesc: new FormControl('', [ Validators.required]),
      custName: new FormControl('', [ Validators.required]),
      custPhone: new FormControl('', [ Validators.required]),
      custAddress1: new FormControl('', [ Validators.required]),
      custAddress2: new FormControl('', [ Validators.required]),
      custAddress3: new FormControl('', [ Validators.required]),
      enqNbr: new FormControl('', [ Validators.required]),
      enqStatus: new FormControl('', [ Validators.required]),
      enqDate: new FormControl('', [ Validators.required]),
      custType: new FormControl('', [ Validators.required]),
      deptType: new FormControl('', [ Validators.required]),
      enqType: new FormControl('', [ Validators.required]),
      enqassignedto: new FormControl('', [ Validators.required]),
      enqassignedtoname: new FormControl('', [ Validators.required]),
      jobno: new FormControl('', [ Validators.required]),
      agrNo: new FormControl('', [ Validators.required]),
      sono: new FormControl('', [ Validators.required]),
      enqInstructions: new FormControl('', [ Validators.required]),
      enqRemarks: new FormControl('', [ Validators.required]),
      enqCompleted: new FormControl('', [ Validators.required]),
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params.id === 'new') {
      this.newForm()
    } else {
      this.getData(this.route.snapshot.params.id)
    }
  }

  getData(pcode: string) {
    this.refreshForm()
    this.financeService.getCallDetail(pcode).subscribe((res: any) => {
      console.log(res)
      this.scheduleForm.patchValue({
        caseID: res.recordset[0].CASE_ID,
        caseNbr: res.recordset[0].CASE_NO,
        caseType: res.recordset[0].CASE_TYPE,
        caseDesc: res.recordset[0].CASE_DESCRIPTION,
        custName: res.recordset[0].CUST_NAME,
        custPhone: res.recordset[0].PHONE1,
        custAddress1: res.recordset[0].ADD1,
        custAddress2: res.recordset[0].ADD2,
        custAddress3: res.recordset[0].ADD3,
        enqNbr: res.recordset[0].ENQNO,
        enqStatus: res.recordset[0].ENQ_STATUS,
        enqDate: res.recordset[0].ENQ_CREATEDT,
        custType: res.recordset[0].CONTACT_TYPE,
        deptType: res.recordset[0].ENQ_DEPT_NAME,
        enqType: res.recordset[0].ENQ_TYPE,
        enqassignedto: res.recordset[0].ENQ_ASSIGNED_TO,
        enqassignedtoname: res.recordset[0].ENQ_ASSIGNED_TO_NAME,
        jobno: res.recordset[0].ENQ_JOB_NO,
        agrNo: res.recordset[0].ENQ_AGR_NO,
        sono: res.recordset[0].ENQ_SONO,
        enqInstructions: res.recordset[0].ENQ_INSTRUCTIONS,
        enqRemarks: res.recordset[0].ENQ_REMARKS,
        enqCompleted: res.recordset[0].ENQ_COMPLETED,
        });
      }, (err: any) =>{
        console.log(err)
      })
  }

  newForm() {
    this.financeService.getCustomerCount().subscribe((res: any) => {
      console.log(res)
      this.financeService.getMaxParty().subscribe((resp: any) => {
        console.log(resp)
        this.scheduleForm = new FormGroup({
          caseID: new FormControl('', [ Validators.required]),
          caseNbr: new FormControl('', [ Validators.required]),
          caseType: new FormControl('', [ Validators.required]),
          caseDesc: new FormControl('', [ Validators.required]),
          custName: new FormControl('', [ Validators.required]),
          custPhone: new FormControl('', [ Validators.required]),
          custAddress1: new FormControl('', [ Validators.required]),
          custAddress2: new FormControl('', [ Validators.required]),
          custAddress3: new FormControl('', [ Validators.required]),
          enqNbr: new FormControl('', [ Validators.required]),
          enqStatus: new FormControl('', [ Validators.required]),
          enqDate: new FormControl('', [ Validators.required]),
          custType: new FormControl('', [ Validators.required]),
          deptType: new FormControl('', [ Validators.required]),
          enqType: new FormControl('', [ Validators.required]),
          enqassignedto: new FormControl('', [ Validators.required]),
          enqassignedtoname: new FormControl('', [ Validators.required]),
          jobno: new FormControl('', [ Validators.required]),
          agrNo: new FormControl('', [ Validators.required]),
          sono: new FormControl('', [ Validators.required]),
          enqInstructions: new FormControl('', [ Validators.required]),
          enqRemarks: new FormControl('', [ Validators.required]),
          enqCompleted: new FormControl('', [ Validators.required]),
        });
      })
    })
  }  

  refreshForm() {
    this.scheduleForm = new FormGroup({
      caseID: new FormControl('', [ Validators.required]),
      caseNbr: new FormControl('', [ Validators.required]),
      caseType: new FormControl('', [ Validators.required]),
      caseDesc: new FormControl('', [ Validators.required]),
      custName: new FormControl('', [ Validators.required]),
      custPhone: new FormControl('', [ Validators.required]),
      custAddress1: new FormControl('', [ Validators.required]),
      custAddress2: new FormControl('', [ Validators.required]),
      custAddress3: new FormControl('', [ Validators.required]),
      enqNbr: new FormControl('', [ Validators.required]),
      enqStatus: new FormControl('', [ Validators.required]),
      enqDate: new FormControl('', [ Validators.required]),
      custType: new FormControl('', [ Validators.required]),
      deptType: new FormControl('', [ Validators.required]),
      enqType: new FormControl('', [ Validators.required]),
      enqassignedto: new FormControl('', [ Validators.required]),
      enqassignedtoname: new FormControl('', [ Validators.required]),
      jobno: new FormControl('', [ Validators.required]),
      agrNo: new FormControl('', [ Validators.required]),
      sono: new FormControl('', [ Validators.required]),
      enqInstructions: new FormControl('', [ Validators.required]),
      enqRemarks: new FormControl('', [ Validators.required]),
      enqCompleted: new FormControl('', [ Validators.required]),
    });
  }

}
