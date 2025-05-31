import "../helpers/solarInputParams"
import { defaultSolarParams as dsp }  from "../helpers/solarInputParams"

export interface SavingsRecord {
    year: number,
    sum: number
}

export interface SummaryRecord {
    year: number,
    with: number
    without: number,
}

export interface ChartRecords {
    yearsToReturn: number,
    summaryRecords: SummaryRecord[],
    savingsRecords: SavingsRecord[]
}

export function CalculateSavings(_params: typeof dsp, numOfYears: number): ChartRecords {

    let thisYearEnergyPurchaseCost = _params.initialEnergyPurchasePrice / 1.07
    let thisYearEnergySellingPrice = 1
    let cumulativeSavings = - dsp.pvCostPerKw
    let chartRecords = {} as ChartRecords;
    let summaryRecordChart = [] as SummaryRecord[];
    let savingsRecords = [] as SavingsRecord[];
    let yearsProfitNum = null;

    for (let index = 1; index <= numOfYears; index++) {
        let summaryRecord = {} as SummaryRecord;
        let savingsRecord = {} as SavingsRecord;

        thisYearEnergyPurchaseCost = thisYearEnergyPurchaseCost * (1 + _params.annualEnergyPriceGrowth / 100)
        thisYearEnergySellingPrice = index === 1 
            ? 0
            : thisYearEnergySellingPrice * (1 + _params.annualEnergyPriceGrowth / 100)
        let energyConstWithoutPV = thisYearEnergyPurchaseCost * _params.yearlyConsumptionWithoutPV
        let selfConsumption = (_params.selfConsumptionRate / 100) * _params.annualEnergyProduced
        let energyGivenBack = _params.annualEnergyProduced - selfConsumption
        let energyConsumptionWithPV = _params.yearlyConsumptionWithoutPV - selfConsumption
        let thisYearProfit = thisYearEnergySellingPrice * energyGivenBack
        let energyCostWithPV = thisYearEnergyPurchaseCost * energyConsumptionWithPV - thisYearProfit
        let annualSavings = energyConstWithoutPV - energyCostWithPV
        cumulativeSavings = cumulativeSavings + annualSavings 

        summaryRecord.year = index;
        summaryRecord.without = energyConstWithoutPV;
        summaryRecord.with = energyCostWithPV;
        summaryRecordChart.push(summaryRecord);

        savingsRecord.year = index;
        savingsRecord.sum = cumulativeSavings;
        savingsRecords.push(savingsRecord);
        
        if (!yearsProfitNum && cumulativeSavings > 0) {
            yearsProfitNum = index;
        }  
    }

    chartRecords.summaryRecords = summaryRecordChart;
    
    return chartRecords;
}
