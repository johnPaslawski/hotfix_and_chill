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
  energyProductionMW,
  polandConsumptionMW,
  totalSellPricePLNkW,
} from "@/helpers/mockData.ts";
import SellPriceChart from "./charts/SellPriceChart.tsx";
import HourlyProductionChart from "./charts/HourlyProductionChart.tsx";

interface AppCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkUrl: string;
  linkLabel: string;
}

const AppCard: React.FC<AppCardProps> = ({
  imageSrc,
  title,
  description,
  linkUrl,
  linkLabel,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-8 flex-1 text-center">
    <div className="mb-4">
      <img
        src={imageSrc}
        alt={title}
        className="mx-auto w-full h-auto rounded"
      />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="mb-6 text-gray-700">{description}</p>
    {linkUrl && linkLabel && (
      <a
        href={linkUrl}
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        {linkLabel}
      </a>
    )}
  </div>
);

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
    const chartsSellPrice = totalSellPricePLNkW.map(([_, hour, val]) => {
      const hourInt = Number(hour);
      const formattedHour = hourInt.toString().padStart(2, "0") + ":00";
      return {
        date: formattedHour,
        value: Number(val),
      };
    });
    return chartsSellPrice;
  }, []);

  const energyProduction = useMemo(() => {
    const chartData = energyProductionMW.map(([start, end, value]) => ({
      date: start,
      value: Number(value),
    }));
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

  const appCardData = [
    {
      imageSrc: "/screen1.png",
      title: "Konto do monitorowania",
      description:
        "Załóż spersonalizowane konto i miej dostęp do swoich danych z dowolnego miejsca.",
      linkUrl: "",
      linkLabel: "",
    },
    {
      imageSrc: "/screen2.png",
      title: "Prognozy i dashboard",
      description:
        "Śledź prognozowaną produkcję oraz aktualne zużycie w przejrzystym panelu, dopasowanym do Twoich preferencji.",
      linkUrl: "",
      linkLabel: "",
    },
    {
      imageSrc: "/screen3.png",
      title: "Rozbudowane statystyki",
      description:
        "Korzystaj z dodatkowych analiz, porównań i porad optymalizacyjnych na podstawie Twoich danych.",
      linkUrl: "#Aplikacja",
      linkLabel: "Pobierz na Androida",
    },
  ];

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
          <div
            className={`transition-all duration-700 ease-out transform ${
              cardsVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "0s" }}
          >
            <div className="flex flex-col items-center w-full max-w-md mx-auto my-4">
              <label htmlFor="yearsSlider" className="text-lg font-medium mb-2">
                Okres: {years}{" "}
                {years % 10 >= 2 && years % 10 <= 4 && !(years % 100 >= 12 && years % 100 <= 14)
                  ? "lata"
                  : "lat"}
              </label>
              <input
                id="yearsSlider"
                type="range"
                onChange={(e) => setYears(Number(e.target.value))}
                value={years}
                min={5}
                max={25}
                step={1}
                style={{
                  background: `linear-gradient(to right, #cbd5e1 ${((years - 5) / 20) * 100}%, #e5e7eb ${((years - 5) / 20) * 100}%)`,
                }}
                className="w-full appearance-none cursor-pointer"
              />
            </div>
          </div>
          <div ref={resultsRef} className="flex flex-row gap-8">
            <div
              className={`transition-all duration-700 ease-out transform ${
                cardsVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
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
              style={{ transitionDelay: "0.4s" }}
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
              style={{ transitionDelay: "0.6s" }}
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
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              type="submit"
              special={true}
              gradient1={true}
          >
            Zobacz więcej
          </Button>
        </div>
      </SectionDivider>
      <SectionDivider id="FAQ" className="min-h-screen bg-gray-50 w-full h-fit pb-15">
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
              <div
                className={`transition-all duration-700 ease-out transform ${
                  faqVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                <ResultCard title="Produkcja energii w Polsce">
                  <HourlyProductionChart costs={energyProduction} />
                </ResultCard>
              </div>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <FAQ />
          </div>
        </div>
      </SectionDivider>
      <style jsx>{`
        input[type='range'] {
          -webkit-appearance: none;
          width: 100%;
          height: 24px;
          border-radius: 9999px;
          background: #e5e7eb;
          outline: none;
          transition: background 0.2s ease;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fb923c;
          cursor: pointer;
          border: none;
          margin: 0;
          transition: transform 0.2s ease;
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fb923c;
          cursor: pointer;
          border: none;
          transition: transform 0.2s ease;
          margin: 0;
        }
        input[type='range']::-ms-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fb923c;
          cursor: pointer;
          border: none;
        }
      `}</style>
      <SectionDivider id="Aplikacja" className="min-h-screen flex flex-col w-3/4 mx-auto">
        <div>
          <h2 className="text-4xl font-extrabold my-8 text-center">
            Aplikacja
          </h2>
        </div>
        <div className="flex flex-row space-x-4 justify-center flex-wrap">
          {appCardData.map((card, index) => (
            <AppCard
              key={card.imageSrc}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
              linkUrl={index === appCardData.length - 1 ? card.linkUrl : ""}
              linkLabel={index === appCardData.length - 1 ? card.linkLabel : ""}
            />
          ))}
        </div>
      </SectionDivider>
    </div>
  );
};

export default Landing;
