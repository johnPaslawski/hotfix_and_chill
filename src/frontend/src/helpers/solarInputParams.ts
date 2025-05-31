export interface SolarCalulcationParams {
  yearlyConsumptionWithoutPV: number;
  initialEnergyPurchasePrice: number;
  pvSystemSizeKw: number;
  annualEnergyProduced: number;
  initialEnergySellPrice: number;
  pvCostPerKw: number;
  selfConsumptionRate: number;
  annualEnergyPriceGrowth: number;
}

export const defaultSolarParams = {
  yearlyConsumptionWithoutPV: 4000,
  initialEnergyPurchasePrice: 1.0,
  pvSystemSizeKw: 5,
  annualEnergyProduced: 5000,
  initialEnergySellPrice: 0.5,
  pvCostPerKw: 5000,
  selfConsumptionRate: 25,
  annualEnergyPriceGrowth: 7,
};
