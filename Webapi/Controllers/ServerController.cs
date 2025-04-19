using Microsoft.AspNetCore.Mvc;
using WebApi.Data;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServerController : ControllerBase
{
  private readonly AppDbContext _ctx;

  public ServerController(AppDbContext ctx)
  {
    _ctx = ctx;
  }

  [HttpGet]
  public IActionResult Get()
  {
    var response = _ctx.Servers.OrderBy(s => s.Id).ToList();
    return Ok(response);
  }

  [HttpGet("{id}", Name = "GetServer")]
  public IActionResult Get(int id)
  {
    var response = _ctx.Servers.Find(id);
    return Ok(response);
  }

  [HttpPut("{id}")]
  public IActionResult Message(int id, [FromBody] ServerMessage msg)
  {
    var server = _ctx.Servers.Find(id);

    if (server == null)
    {
      return NotFound();
    }

    // Refactor: move into a service
    if (msg.Payload == "activate")
    {
      server.isOnline = true;
    }

    if (msg.Payload == "deactivate")
    {
      server.isOnline = false;
    }

    _ctx.SaveChanges();
    return new NoContentResult();
  }
}