import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesDataService } from 'src/app/services/sales-data.service';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales' },
  { data: [25, 39, 60, 91, 36, 54, 50], label: 'Q4 Sales' },
];

const SAMPLE_BARCHART_LABELS: string[] = [
  'W1',
  'W2',
  'W3',
  'W4',
  'W5',
  'W6',
  'W7',
];

interface Order {
  id: number;
  customer: {
    id: number;
    name: string;
    email: string;
    state: string;
  };
  total: number;
  placed: string;
  completed: string | null;
}

interface Page {
  total: number;
  data: Order[];
}

interface OrderResponse {
  page: Page;
  totalPages: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  constructor(private _salesDataService: SalesDataService) {}

  orders: Order[] = [];
  // orderLabels: string[];
  // orderData: number[];

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe((res: any) => {
      const localChartData = this.getChartData(res);
      this.barChartLabels = localChartData.map((x: any) => x[0]).reverse();
      this.barChartData = [
        { data: localChartData.map((x: any) => x[1]), label: 'Sales' },
      ];
    });
  }

  getChartData(res: OrderResponse) {
    this.orders = res.page.data;

    const formattedOrders = this.orders.map((order) => [
      moment(order.placed).format('YY-MM-DD'),
      order.total,
    ]);

    const p: any = [];

    const chartData = formattedOrders.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;
  }
}
