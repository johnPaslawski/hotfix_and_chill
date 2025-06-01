using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;

namespace GoSolar.API.Controllers
{
    [ApiController]
    [Route("details")]
    public class DetailsController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetDetailedData()
        {
            var path1 = Path.Combine(Directory.GetCurrentDirectory(), "CSVs/calkowita_konsumpcja_dla_polski.csv"
                ); 
            using (TextFieldParser parser = new TextFieldParser(path: path1))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                var consumptionTotal = new List<(string, string, string)>();
                var i = 0;

                while (!parser.EndOfData)
                {
                    //Process row
                    string[] fields = parser.ReadFields()!;
                    if (i == 0)
                    {
                        i++;
                        continue;
                    }
                    foreach (string field in fields)
                    {
                        //consumptionTotal.Add((field[0], field[1], field[2]))
                    }
                }
            }

            return Ok();
        }

    }
}
