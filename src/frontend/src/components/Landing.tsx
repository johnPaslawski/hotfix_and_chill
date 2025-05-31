import React, { useMemo, useState } from "react";
import SectionDivider from "@components/layout/SectionDivider";
import Form from "@components/Form";
import ResultCard from "./ResultCard.tsx";
import CostsChart from "./charts/CostsChart.tsx";
import SavingsChart from "./charts/SavingsChart.tsx";
import { CalculateSavings } from "@/services/CalculatorService.ts";
import { defaultSolarParams } from "@/helpers/solarInputParams.ts";

const Landing: React.FC = () => {
  const [solarParams, setSolarParams] = useState(defaultSolarParams);
  const [years, setYears] = useState(10);
  const results = useMemo(
    () => CalculateSavings(solarParams, years),
    [solarParams, years]
  );

  return (
    <div className="flex flex-col items-center" id={"landing"}>
      {/* 2. Pierwsza sekcja */}
      <SectionDivider id="Formularz">
        <div id={"Wrapper"}>
          <Form setSolarParams={setSolarParams} />
        </div>
      </SectionDivider>

      {/* 3. Druga sekcja */}
      <SectionDivider id="wyniki">
        <h2 className="text-4xl font-extrabold my-8 text-center">
          Ile oszczędzisz?
        </h2>
        <input
          type="range"
          onChange={(e) => setYears(e.target.value)}
          value={years}
          min={5}
          max={25}
        />
        <div className="flex flex-row gap-8">
          <ResultCard title="Zwrot inwestycji">
            <div className="w-full h-full text-center text-green-500 flex items-center justify-center">
              <p className="text-[12rem] font-bold">
                {results.yearsToReturn ?? 2}
              </p>
              <p className="text-[3rem] font-semibold">lata</p>
            </div>
          </ResultCard>
          <ResultCard title="Zestawienie">
            <CostsChart costs={results.summaryRecords} />
          </ResultCard>
          <ResultCard title="Oszczędności">
            <SavingsChart savings={results.savingsRecords} />
          </ResultCard>
        </div>
      </SectionDivider>
    </div>
  );
};

export default Landing;
