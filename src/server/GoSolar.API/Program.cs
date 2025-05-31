var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowAnyOrigin();
    });
});


//app.Use(async (context, next) =>
//{
//    // Login nie wymaga autoryzacji
//    if (context.Request.Path == "/login")
//    {
//        await next();
//        return;
//    }

//    var apiKey = context.Request.Headers["X-API-KEY"].ToString();
//    if (string.IsNullOrEmpty(apiKey) || !users.Any(u => u.ApiKey == apiKey))
//    {
//        context.Response.StatusCode = 401;
//        await context.Response.WriteAsync("Unauthorized – Missing or invalid API key.");
//        return;
//    }

//    await next();
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
