// using System.Linq;
// using System.Collections.Generic;
using WebApi.Data;

namespace WebApi
{
  public class DataSeed
  {
    private readonly AppDbContext _ctx;

    public DataSeed(AppDbContext ctx)
    {
      _ctx = ctx;
    }

    public void SeedData(int nCustomers, int nOrders)
    {
      if (!_ctx.Customers.Any())
      {
        SeedCustomers(nCustomers);
        _ctx.SaveChanges();
      }

      if (!_ctx.Orders.Any())
      {
        SeedOrders(nOrders);
        _ctx.SaveChanges();
      }

      if (!_ctx.Servers.Any())
      {
        SeedServers();
        _ctx.SaveChanges();
      }

    }

    private void SeedCustomers(int n)
    {
      List<Customer> customers = BuildCustomerList(n);

      foreach (var customer in customers)
      {
        _ctx.Customers.Add(customer);
      }
    }

    private void SeedOrders(int n)
    {
      List<Order> orders = BuildOrderList(n);

      foreach (var order in orders)
      {
        _ctx.Orders.Add(order);
      }
    }

    private void SeedServers()
    {
      List<Server> servers = BuildServerList();

      foreach (var server in servers)
      {
        _ctx.Servers.Add(server);
      }
    }

    private List<Customer> BuildCustomerList(int nCustomers)
    {
      var customers = new List<Customer>();
      var names = new List<string>();

      for (var i = 1; i <= nCustomers; i++)
      {
        var name = Helpers.MakeUniqueCustomerName(names);
        names.Add(name);


        customers.Add(new Customer
        {
          Id = i,
          Name = name,
          Email = Helpers.MakeCustomerEmail(name),
          State = Helpers.GetRandomState()
        });
      }

      return customers;
    }

    private List<Order> BuildOrderList(int nOrders)
    {
      var orders = new List<Order>();
      var rand = new Random();

      for (var i = 1; i <= nOrders; i++)
      {
        var randCustomerId = rand.Next(1, _ctx.Customers.Count());
        var placed = Helpers.GetRandomOrderPlaced();
        var completed = Helpers.GetRandomOrderCompleted(placed);
        var customers = _ctx.Customers.ToList();

        orders.Add(new Order
        {
          Id = i,
          Customer = customers.First(c => c.Id == randCustomerId),
          Total = Helpers.GetRandomOrderTotal(),
          Placed = placed,
          Completed = completed
        });
      }

      return orders;
    }

    private List<Server> BuildServerList()
    {
      return new List<Server>()
      {
        new Server {
          Id = 1,
          Name = "Dev-Web",
          isOnline = true
        },
        new Server {
          Id = 2,
          Name = "Dev-Mail",
          isOnline = false
        },
        new Server {
          Id = 3,
          Name = "Dev-Services",
          isOnline = true
        },
        new Server {
          Id = 4,
          Name = "QA-Web",
          isOnline = true
        },
        new Server {
          Id = 5,
          Name = "QA-Mail",
          isOnline = false
        },
        new Server {
          Id = 6,
          Name = "QA-Services",
          isOnline = true
        },
        new Server {
          Id = 7,
          Name = "Prod-Web",
          isOnline = true
        },
        new Server {
          Id = 8,
          Name = "Prod-Mail",
          isOnline = true
        },
        new Server {
          Id = 9,
          Name = "Prod-Services",
          isOnline = true
        }
      };
    }
  }
}
