import React from "react";
import SectionDivider from "@components/layout/SectionDivider";
import Button from "@components/Button";
import Form from "@components/Form";
import ResultCard from "./ResultCard.tsx";
import CostsChart from "./CostsChart.tsx";

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center" id={"landing"}>
      {/* 2. Pierwsza sekcja */}
      <SectionDivider id="Formularz">
          <div id={"Wrapper"}>
        <Form />
          </div>
      </SectionDivider>

      {/* 3. Druga sekcja */}
      <SectionDivider id="Wyniki">
        <h2>Sekcja 2</h2>
        <p>
          Kolejna porcja treści, którą możesz sobie edytować według uznania.
        </p>
        <div className="flex flex-row gap-8">
          <ResultCard title="Po ilu latach inwestycja się zwróci?" value="2" />
          <ResultCard title="Zestawienie">
            <CostsChart />
          </ResultCard>
        </div>
      </SectionDivider>

      {/* 4. Trzecia sekcja z headerem i guzikiem na środku */}
      <SectionDivider id="sekcja3">
        <h2 className="section-heading-center">Trzecia Sekcja</h2>
        <div className="section-flex-center">
          <Button
            onClick={() => {
              alert("Kliknięto guzik w trzeciej sekcji!");
            }}
          >
            Kliknij mnie
          </Button>
        </div>
      </SectionDivider>
    </div>
  );
};

export default Landing;
