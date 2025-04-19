using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
  private readonly AppDbContext _ctx;

  public OrderController(AppDbContext ctx)
  {
    _ctx = ctx;
  }

  // GET api/order/pageNumber(which page)/pageSize(x results per page)
  [HttpGet("{pageIndex:int}/{pageSize:int}")]
  public IActionResult Get(int pageIndex, int pageSize)
  {
    var data = _ctx.Orders.Include(o => o.Customer)
      .OrderByDescending(c => c.Placed);

    var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);

    var totalCount = data.Count();
    var totalPages = Math.Ceiling((double)totalCount / pageSize);

    var response = new
    {
      Page = page,
      TotalPages = totalPages
    };

    return Ok(response);
  }

  [HttpGet("ByState")]
  public IActionResult ByState()
  {
    var orders = _ctx.Orders.Include(o => o.Customer).ToList();

    var groupResult = orders.GroupBy(o => o.Customer?.State)
      .ToList()
      .Select(grp => new
      {
        State = grp.Key,
        Total = grp.Sum(x => x.Total)
      }).OrderByDescending(res => res.Total)
      .ToList();

      return Ok(groupResult);
  }

  [HttpGet("ByCustomer/{n}")]
  public IActionResult ByCustomer(int n)
  {
    var orders = _ctx.Orders.Include(o => o.Customer).ToList();

    var groupResult = orders.GroupBy(o => o.Customer?.Id)
      .ToList()
      .Select(grp => new
      {
        State = _ctx.Customers.Find(grp.Key)?.Name,
        Total = grp.Sum(x => x.Total)
      }).OrderByDescending(res => res.Total)
      .Take(n)
      .ToList();

      return Ok(groupResult);
  }

  [HttpGet("GetOrder/{id}", Name = "GetOrder")]
  public IActionResult GetOrder(int id)
  {
    var order = _ctx.Orders.Include(o => o.Customer)
      .First(o => o.Id == id);
    
    return Ok(order);
  }

}