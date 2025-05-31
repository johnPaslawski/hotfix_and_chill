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
    const chartRecords = {} as ChartRecords;
    const summaryRecordChart = [] as SummaryRecord[];
    const savingsRecords = [] as SavingsRecord[];
    let yearsProfitNum: number = 0;

    for (let index = 1; index <= numOfYears; index++) {
        const summaryRecord = {} as SummaryRecord;
        const savingsRecord = {} as SavingsRecord;

        thisYearEnergyPurchaseCost = thisYearEnergyPurchaseCost * (1 + _params.annualEnergyPriceGrowth / 100)
        thisYearEnergySellingPrice = index === 1 
            ? 0
            : thisYearEnergySellingPrice * (1 + _params.annualEnergyPriceGrowth / 100)
        const energyConstWithoutPV = thisYearEnergyPurchaseCost * _params.yearlyConsumptionWithoutPV
        const selfConsumption = (_params.selfConsumptionRate / 100) * _params.annualEnergyProduced
        const energyGivenBack = _params.annualEnergyProduced - selfConsumption
        const energyConsumptionWithPV = _params.yearlyConsumptionWithoutPV - selfConsumption
        const thisYearProfit = thisYearEnergySellingPrice * energyGivenBack
        const energyCostWithPV = thisYearEnergyPurchaseCost * energyConsumptionWithPV - thisYearProfit
        const annualSavings = energyConstWithoutPV - energyCostWithPV
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
    chartRecords.savingsRecords = savingsRecords;
    chartRecords.yearsToReturn = yearsProfitNum;
    
    return chartRecords;
}
