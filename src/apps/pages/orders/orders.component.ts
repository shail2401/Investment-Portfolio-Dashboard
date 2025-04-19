import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private _salesData: SalesDataService) {}

  orders: Order[] = [
    {
      id: 1,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2022, 12, 1),
      completed: new Date(2022, 12, 2),
    },
    {
      id: 2,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2022, 12, 1),
      completed: new Date(2022, 12, 2),
    },
    {
      id: 3,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2022, 12, 1),
      completed: new Date(2022, 12, 2),
    },
    {
      id: 4,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2022, 12, 1),
      completed: new Date(2022, 12, 2),
    },
    {
      id: 5,
      customer: {
        id: 1,
        name: 'Main St Bakery',
        state: 'CO',
        email: 'mainst@example.com',
      },
      total: 230,
      placed: new Date(2022, 12, 1),
      completed: new Date(2022, 12, 2),
    },
  ];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit)
      .subscribe((res: any) => {
        // console.log('Result from getOrders:', res);
        this.orders = res.page.data;
        this.total = res.page.total;
        this.loading = false;
    });
  }

  goToPrevious(): void {
    // console.log('Previous Button Clicked');
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    // console.log('Next Button Clicked');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number) {
    this.page = n;
    this.getOrders();
  }
}
