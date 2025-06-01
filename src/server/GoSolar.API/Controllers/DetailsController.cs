using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;

namespace GoSolar.API.Controllers
{
    [ApiController]
    [Route("details")]
    public class DetailsController : ControllerBase
    {
        [HttpGet]
        public JsonResult GetDetailedData()
        {
            var consumptionTotalchart1 = new List<string[]>();
            var consumptionTotalchart2 = new List<string[]>();
            var consumptionTotalchart3 = new List<string[]>();

            var path = Path.Combine(Directory.GetCurrentDirectory(), 
                "CSVs/calkowita_konsumpcja_dla_polski.csv"); 
            using (TextFieldParser parser = new TextFieldParser(path: path))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
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
                    consumptionTotalchart1.Add(fields);
                    if (i == 2000) break;
                }
            }

            path = Path.Combine(Directory.GetCurrentDirectory(), 
                "CSVs/calkowita_cena_sprzedazy.csv");
            using (TextFieldParser parser = new TextFieldParser(path: path))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
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
                    consumptionTotalchart2.Add(fields);
                    if (i == 2000) break;

                }
            }
            path = Path.Combine(Directory.GetCurrentDirectory(), 
                "CSVs/produkcja_energii.csv");
            using (TextFieldParser parser = new TextFieldParser(path: path))
            {
                parser.TextFieldType = FieldType.Delimited;
                parser.SetDelimiters(",");
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
                    consumptionTotalchart3.Add(fields);
                    if (i == 2000) break;

                }
            }
            var result = new List<List<string[]>>();
            result.Add(consumptionTotalchart1);
            result.Add(consumptionTotalchart2);
            result.Add(consumptionTotalchart3);

            return new JsonResult(result);
        }

    }
}
