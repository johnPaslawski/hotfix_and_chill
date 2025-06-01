namespace GoSolar.API.Models
{
    public class UserData : User
    {
        public double yearlyConsumptionWithoutPV { get; set; } = 5000;
        public double initialEnergyPurchasePrice { get; set; } = 0.6;
        public double pvSystemSizeKw { get; set; } = 5;
        public double annualEnergyProduced { get; set; } = 6000;
        public double initialEnergySellPrice { get; set; } = 0.3;
        public double pvCostPerKw { get; set; } = 4000;
        public double selfConsumptionRate { get; set; } = 30;
        public double annualEnergyPriceGrowth { get; set; } = 5;
    }
}
