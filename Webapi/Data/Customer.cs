using System;

namespace WebApi.Data
{
  public class Customer
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string State { get; set; }

    public Customer()
    {
      Id = 0;
      Name = string.Empty;
      Email = string.Empty;
      State = string.Empty;
    }
  }
}