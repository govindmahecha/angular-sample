import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ClientArea } from '../../models/client-area';
import { MaturityItemSummary } from '../../models/maturity-item-summary';

@Component({
  selector: 'tracc-performance-versus-others-chart',
  template: `
  <chart [options]="_chartData"></chart>

  <div style="display: none; visibility: hidden;">
    <span i18n="@@Maturity" #maturityString>Maturity</span>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TraccPerformanceVersusChartComponent {
  // ----------------------------------------------------------------
  @ViewChild('maturityString') elementRefMaturity: ElementRef;
  // ----------------------------------------------------------------


  // ----------------------------------------------------------------
  @Input() set chartData(chartData: { area: ClientArea, assessmentsSummary: MaturityItemSummary[] }) {
    this.assessmentsSummary = chartData.assessmentsSummary;
    this.area = chartData.area;
    if (chartData.area && chartData.assessmentsSummary) {
      this.setChartData(chartData.area, chartData.assessmentsSummary);
    }
  }

  @Input() set sort(sortStatus: string) {
    if (this.area && this.assessmentsSummary) {
      this.setChartData(this.area, this.assessmentsSummary, sortStatus);
    }
  }
  // ----------------------------------------------------------------


  // ----------------------------------------------------------------
  area: ClientArea;
  _chartData: Object;
  assessmentsSummary: MaturityItemSummary[];
  // ----------------------------------------------------------------


  setChartData(area: ClientArea, assessmentsSummary: MaturityItemSummary[], sortBy?: string) {
    switch (sortBy) {
      case 'highestFirst':
        assessmentsSummary.sort((a, b) => b.maturity - a.maturity);
        break;
      case 'lowestFirst':
        assessmentsSummary.sort((a, b) => a.maturity - b.maturity);
        break;
      default:
        assessmentsSummary.sort((a, b) => {
          const nameA = a.name ? a.name.toUpperCase() : a.name;
          const nameB = b.name ? b.name.toUpperCase() : b.name;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
    }

    this._chartData = {
      chart: {
        height: '550',
        type: 'bar',
        // spacingBottom: 0,
        // spacingTop: 0
      },
      title: {
        text: ''
      },
      // subtitle: {
      //   text: 'All TRACCs for this this area'
      // },
      xAxis: {
        categories: assessmentsSummary.map(m => m.name ? m.name : m.code ? m.code : 'N/A')
        //   title: {
        //     text: null
        //   }
      },
      yAxis: {
        min: 0,
        max: 5,
        title: {
          text: this.elementRefMaturity.nativeElement.innerText,
          align: 'high'
        },
        // labels: {
        //   overflow: 'justify'
        // }
        // labels: {
        //   formatter: function() {
        //     return this.value + ' %';
        //   }
        // },
      },
      tooltip: {
        pointFormat: '<span style="color:{point.color}" class="fa fa-circle"></span> {series.name}: <b>{point.y}</b><br/>',
        useHTML: true
      },
      // plotOptions: {
      //   bar: {
      //     dataLabels: {
      //       enabled: true
      //       color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
      //     }
      //   }
      // },
      plotOptions: {
        series: {
          //     // pointPadding: 0,
          //     // groupPadding: 0,
          dataLabels: {
            enabled: true,
            //
            //       // color: '#000',
            //       // style: {fontWeight: 'bolder'},
            //       formatter: function() { return this.series.name + ': ' + this.y; },
            //       // inside: true,
            //       // align: 'left'
            //       // rotation: 270
            //
            //       //   color: '#000',
            //       //   style: {fontWeight: 'bolder'},
            //       //   formatter: function() {return  this.category + ': ' + this.y },
            //       //   inside: true,
            //       //   // rotation: 270
          },
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: this.elementRefMaturity.nativeElement.innerText, data: assessmentsSummary.map(m => m.maturity)
      }]
    };

  }

}

/*
 [{
 name: 'Avg. Packaging areas',
 // color: '#7cb5ec',
 data: [3.6]
 },
 {
 name: 'Avg. Warehouse areas',
 // color: '#7cb5ec',
 data: [3.2]
 },
 {
 name: 'This area',
 color: '#118acb',

 data: [2.5]
 },
 {
 name: 'Avg. Manufacturing areas',
 // color: '#7cb5ec',
 data: [2.2]
 }]
 */
