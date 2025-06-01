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
            var consumptionTotal = new List<string[]>();

            var path1 = Path.Combine(Directory.GetCurrentDirectory(), "CSVs/calkowita_konsumpcja_dla_polski.csv"
                ); 
            using (TextFieldParser parser = new TextFieldParser(path: path1))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
                var i = 0;

                while (!parser.EndOfData || i > 5000)
                {
                    //Process row
                    string[] fields = parser.ReadFields()!;
                    if (i == 0)
                    {
                        i++;
                        continue;
                    }
                    consumptionTotal.Add(fields);
                    //foreach (string field in fields)
                    //{
                    //    //
                    //}
                }
            }

            return Ok(consumptionTotal);
        }

    }
}
