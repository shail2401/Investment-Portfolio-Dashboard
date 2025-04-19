using Microsoft.EntityFrameworkCore;
using WebApi;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register IConfiguration
builder.Configuration.AddJsonFile("appsettings.json");
var configuration = builder.Configuration;
builder.Services.AddSingleton<IConfiguration>(configuration);

// Register AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
{
  options.UseNpgsql(configuration.GetConnectionString("WebApiDatabase"));
});

builder.Services.AddTransient<DataSeed>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
  app.UseCors("CorsPolicy"); // Use the defined CORS policy

  using (var scope = app.Services.CreateScope())
  {
    var service = scope.ServiceProvider;
    var dbContext = service.GetRequiredService<AppDbContext>();
    var dataSeed = service.GetRequiredService<DataSeed>();

    // seed the data
    dataSeed.SeedData(20, 1000);

    // migrate the database
    dbContext.Database.Migrate();
  }

}

app.UseHttpsRedirection();

app.UseRouting();
app.UseAuthorization();

app.MapGet("/", () =>
{
  return "App is working!";
}
);

app.MapControllers();

app.Run();