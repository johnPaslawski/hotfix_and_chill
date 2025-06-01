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

const Landing: React.FC = () => {
  const [solarParams, setSolarParams] = useState(defaultSolarParams);
  const [years, setYears] = useState(10);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [faqVisible, setFaqVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

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

  const [faq1Open, setFaq1Open] = useState(false);
  const [faq2Open, setFaq2Open] = useState(false);

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
                style={{ transitionDelay: "0.4s" }}
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
                style={{ transitionDelay: "0.6s" }}
              >
                <ResultCard title="Degradacja wydajności paneli">
                  <EfficiencyChart savings={efficiency} />
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
    </div>
  );
};

export default Landing;
