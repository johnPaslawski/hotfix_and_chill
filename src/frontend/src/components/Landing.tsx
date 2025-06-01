import React, { useMemo, useState, useEffect, useRef } from "react";
import Button from "./Button";
// Enable smooth scrolling for anchor links
if (typeof document !== "undefined") {
  document.documentElement.style.scrollBehavior = "smooth";
}
import SectionDivider from "@components/layout/SectionDivider";
import Form from "@components/Form";
import ResultCard from "./ResultCard.tsx";
import CostsChart from "./charts/CostsChart.tsx";
import SavingsChart from "./charts/SavingsChart.tsx";
import {
  CalculateEfficiency,
  CalculateSavings,
} from "@/services/CalculatorService.ts";
import { defaultSolarParams } from "@/helpers/solarInputParams.ts";
import FAQ from "./FAQ";
import EfficiencyChart from "./charts/EfficiencyChart.tsx";
import HourlyUsagePoland from "./charts/HourlyUsagePoland.tsx";
import {
  polandConsumptionMW,
  totalSellPricePLNkW,
} from "@/helpers/mockData.ts";
import SellPriceChart from "./charts/SellPriceChart.tsx";

const Landing: React.FC = () => {
  const [solarParams, setSolarParams] = useState(defaultSolarParams);
  const [years, setYears] = useState(10);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const hourlyUsagePoland = useMemo(() => {
    const chartsPoland = polandConsumptionMW.map(([dates, _est, actual]) => {
      const date = dates.split("-")[0].trim().split(" ")[1];
      return {
        date,
        value: Number(actual),
      };
    });
    return chartsPoland;
  }, []);

  const hourlySellPrice = useMemo(() => {
    const chartData = totalSellPricePLNkW.map(([date, hour, val]) => {
      const dateStr = date.slice(date.length - 2) + " " + (Number(hour) - 1);
      return {
        date: dateStr,
        value: Number(val),
      };
    });
    return chartData;
  }, []);

  useEffect(() => {
    if (window.location.hash === "#wyniki" && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  useEffect(() => {
    const sectionEl = resultsRef.current;
    const faqEl = faqRef.current;
    if (!sectionEl || !faqEl) return;

    let delayTimer: number | undefined;
    let delayTimerFaq: number | undefined;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            delayTimer = window.setTimeout(() => {
              setCardsVisible(true);
            }, 500);
            sectionObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionObserver.observe(sectionEl);

    const faqObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            delayTimerFaq = window.setTimeout(() => {
              setFaqVisible(true);
            }, 500);
            faqObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    faqObserver.observe(faqEl);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (delayTimerFaq) clearTimeout(delayTimerFaq);
      sectionObserver.disconnect();
      faqObserver.disconnect();
    };
  }, []);

  const results = useMemo(
    () => CalculateSavings(solarParams, years),
    [solarParams, years]
  );

  const efficiency = useMemo(() => CalculateEfficiency(20), []);

  return (
    <div className="flex flex-col items-center" id={"landing"}>
      {/* 2. Pierwsza sekcja */}
      <SectionDivider id="Formularz">
        <div id={"Wrapper"}>
          <Form setSolarParams={setSolarParams} />
        </div>
      </SectionDivider>

      {/* 3. Druga sekcja */}
      <SectionDivider id="wyniki" className="h-screen flex flex-col">
        <div>
          <h2 className="text-4xl font-extrabold my-8 text-center">
            Ile oszczędzisz?
          </h2>
          <div className="flex items-center">
            <input
              type="range"
              onChange={(e) => setYears(Number(e.target.value))}
              value={years}
              min={5}
              max={25}
            />
            <span className="ml-4 text-lg font-medium">
              {years}{" "}
              {years % 10 >= 2 &&
              years % 10 <= 4 &&
              !(years % 100 >= 12 && years % 100 <= 14)
                ? "lata"
                : "lat"}
            </span>
          </div>
          <div ref={resultsRef} className="flex flex-row gap-8">
            <div
              className={`transition-all duration-700 ease-out transform ${
                cardsVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0s" }}
            >
              <ResultCard title="Zwrot inwestycji">
                <div className="w-full h-full text-center text-green-500 flex items-center justify-center">
                  <p className="text-[12rem] font-bold">
                    {results.yearsToReturn ?? 2}
                  </p>
                  <p className="text-[3rem] font-semibold">lata</p>
                </div>
              </ResultCard>
            </div>

            <div
              className={`transition-all duration-700 ease-out transform ${
                cardsVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <ResultCard title="Zestawienie">
                <CostsChart costs={results.summaryRecords} />
              </ResultCard>
            </div>

            <div
              className={`transition-all duration-700 ease-out transform ${
                cardsVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <ResultCard title="Oszczędności">
                <SavingsChart savings={results.savingsRecords} />
              </ResultCard>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Button
            onClick={() => {
              const el = document.getElementById("FAQ");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg"
            special={true}
          >
            Zobacz więcej
          </Button>
        </div>
      </SectionDivider>
      <SectionDivider id="FAQ" className="min-h-screen bg-gray-50 w-full">
        <h2 ref={faqRef} className="text-4xl font-extrabold my-8 text-center">
          Jak to wygląda w praktyce?
        </h2>
        <div className="flex flex-row h-full">
          <div className="w-2/3 p-4">
            {/* Lewa część (2/3 szerokości) */}
            <div className="flex flex-row flex-wrap justify-center gap-4">
              <div
                className={`transition-all duration-700 ease-out transform ${
                  faqVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "0s" }}
              >
                <ResultCard title="Degradacja wydajności paneli">
                  <EfficiencyChart savings={efficiency} />
                </ResultCard>
              </div>
              <div
                className={`transition-all duration-700 ease-out transform ${
                  faqVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <ResultCard title="Godzinowe użycie energii w Polsce">
                  <HourlyUsagePoland usage={hourlyUsagePoland} />
                </ResultCard>
              </div>
              <div
                className={`transition-all duration-700 ease-out transform ${
                  faqVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                <ResultCard title="Średnia cena sprzedaży">
                  <SellPriceChart costs={hourlySellPrice} />
                </ResultCard>
              </div>
              {/* <div
                className={`transition-all duration-700 ease-out transform ${
                  faqVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <ResultCard title="Produkcja energii w Polsce">
                  <EfficiencyChart savings={efficiency} />
                </ResultCard>
              </div> */}
            </div>
          </div>
          <div className="w-1/3 p-4">
            <FAQ />
          </div>
        </div>
      </SectionDivider>
    </div>
  );
};

export default Landing;
