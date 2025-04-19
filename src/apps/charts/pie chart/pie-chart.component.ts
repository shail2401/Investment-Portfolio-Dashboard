import { Component, Input, OnInit } from '@angular/core';
import { THEMES_COLORS } from 'src/app/shared/themes.colors';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit{
  
  constructor() { }

  @Input() inputData: any;
  @Input() limit?: number;

  pieChartDatasets = [
    { 
      data: [350, 450, 120],
      backgroundColor: [
        ...this.themeColors(theme),
      ],
      borderColor: '#1c2228',
    }
  ];
  pieChartLabels: string[] = ['XYZ Logistics', 'Main St Bakery', 'Acme Hosting'];

  ngOnInit(): void {
    if (this.inputData) {
      this.parseChartData(this.inputData, this.limit);
    }
  }

  parseChartData(res: any, limit?: number) {
    const allData = res.slice(0, limit || 5);
    
    this.pieChartDatasets[0].data = allData.map((x: any) => x.total);
    this.pieChartLabels = allData.map((x:any) => x.state);
  }

  themeColors(setName: string): string[] {
    const c = THEMES_COLORS.slice(0).find(set => set.name === setName)!.colorSet;
    return c;
 }
}
