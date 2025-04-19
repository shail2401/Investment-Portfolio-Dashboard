namespace WebApi
{
  public class PaginatedResponse<T>
  {
    public PaginatedResponse(IEnumerable<T> data, int i, int len)
    {
      // [1] page, 10 results per page --> skip 0, take 10
      Data = data.Skip((i - 1) * len).Take(len).ToList();
      Total = data.Count();
    }

    public int Total { get; set; }
    public IEnumerable<T> Data { get; set; }
  }
}