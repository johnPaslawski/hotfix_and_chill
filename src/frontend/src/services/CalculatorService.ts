import "../helpers/solarInputParams"
import { defaultSolarParams, defaultSolarParams as dsp }  from "../helpers/solarInputParams"

interface SavingsRecord {
    year: number,
    sum: number
}

interface SummaryRecord {
    year: number,
    with: number
    without: number,
}

interface ChartRecords {
    yearsToReturn: number,
    summaryRecords: SummaryRecord[],
    savingsRecords: SavingsRecord[]
}

export function CalculateSavings(_params: typeof dsp, numOfYears: number): ChartRecords {

    let thisYearEnergyPurchaseCost = _params.initialEnergyPurchasePrice / 1.07
    let thisYearEnergySellingPrice = 1
    let chartRecords = {} as ChartRecords;
    let summaryRecordChart = [] as SummaryRecord[];

    for (let index = 1; index <= numOfYears; index++) {
        let summaryRecord = {} as SummaryRecord;

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

        summaryRecord.year = index;
        summaryRecord.without = energyConstWithoutPV;
        summaryRecord.with = energyCostWithPV;

        summaryRecordChart.push(summaryRecord);
    }

    chartRecords.summaryRecords = summaryRecordChart;
    
    return chartRecords;
}
