import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, BaseChartDirective } from 'ng2-charts';
import { CrmService } from 'src/app/services/crm/crm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("baseChart", {static: false}) chart: BaseChartDirective;

  mRegMemCount: number = 0
  mUnRegMemCount: number = 0
  mMemCount: number = 0
  mProxMemCount: number = 0
  mPropCount: number = 0
  mRegPropCount: number = 0;
  mUnRegPropCount: number = 0

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getData();
  }
   
  constructor(private crmService: CrmService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChart1Labels: Label[] = ['Registered Members', 'Unregistered Members', 'Proxy Members'];
  public pieChart1Data: SingleDataSet  = [this.mRegMemCount, this.mUnRegMemCount, this.mProxMemCount]
  public pieChart2Labels: Label[] = ['Registered Properties', 'Unregistered Properties'];
  public pieChart2Data: SingleDataSet  = [this.mRegPropCount, this.mUnRegPropCount]
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  getData() {
    this.crmService.getAllMembers().subscribe((res: any) => {
      console.log(res)
      this.mRegMemCount = res.rowsAffected[0]
      this.crmService.getAllPotentialMembers().subscribe((res: any) => {
        console.log(res)
        this.mMemCount = res.recordset[0].COUNT
        this.mUnRegMemCount = this.mMemCount - this.mRegMemCount;
        //this.chart.chart.update();
        this.crmService.getAllProxyMembers().subscribe((res: any) => {
          console.log(res)
          this.mProxMemCount = res.recordset[0].COUNT
          this.pieChart1Data = [this.mRegMemCount, this.mUnRegMemCount, this.mProxMemCount]
          this.crmService.getAllProperties().subscribe((res: any) => {
            console.log(res)
            this.mPropCount = res.rowsAffected[0]
            this.crmService.getAllPropertyWiseLandlords().subscribe((res: any) => {
              console.log(res)
              this.mRegPropCount = res.rowsAffected[0]
              this.mUnRegPropCount = this.mPropCount - this.mRegPropCount;
              this.pieChart2Data = [this.mRegPropCount, this.mUnRegPropCount]
            }, (err: any) => {
            console.log(err)
          })
          }, (err: any) => {
            console.log(err)
          }) 
        }, (err: any) => {
          console.log(err)
        })
      }, (err: any) => {
        console.log(err)
      })
    }, (err: any) => {
      console.log(err)
    })
  }

  

}
