import React, { useState } from 'react';
import SectionDivider from '@components/layout/SectionDivider';
import Button from '@components/Button';
import Form from '@components/Form';
import { defaultSolarParams } from '../helpers/solarInputParams.ts';

const scaleParams = (params: { [key: string]: number }, scale: number): { [key: string]: string } => {
  return Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, ((value * scale).toFixed(2))])
  );
};

const Landing: React.FC = () => {
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [initialValues, setInitialValues] = useState<{ [key: string]: string }>(
      scaleParams(defaultSolarParams, 1)
    );
    const [formKey, setFormKey] = useState<number>(0);
    const fields = [
      { name: 'yearlyConsumptionWithoutPV', label: 'Konsumpcja energii z jednego roku bez instalacji', type: 'number', placeholder: 'kWh (np. 5000)', required: true },
      { name: 'initialEnergyPurchasePrice', label: 'Cena zakupu energii w pierwszym roku', type: 'number', placeholder: 'PLN/kWh (np. 0.60)', required: true },
      { name: 'pvSystemSizeKw', label: 'Wielkość instalacji fotowoltaicznej', type: 'number', placeholder: 'kW (np. 5)', required: true },
      { name: 'annualEnergyProduced', label: 'Energia wyprodukowana w jednym roku', type: 'number', placeholder: 'kWh (np. 6000)', required: true },
      { name: 'initialEnergySellPrice', label: 'Cena sprzedaży wyprodukowanej energii w pierwszym roku', type: 'number', placeholder: 'PLN/kWh (np. 0.30)', required: true },
      { name: 'pvCostPerKw', label: 'Koszt instalacji PV za 1 kW', type: 'number', placeholder: 'PLN (np. 4000)', required: true },
      { name: 'selfConsumptionRate', label: 'Procent autokonsumpcji', type: 'number', placeholder: '% (np. 30)', required: true },
      { name: 'annualEnergyPriceGrowth', label: 'Roczny procentowy wzrost ceny energii', type: 'number', placeholder: '% (np. 5)', required: true },
    ];

    const handleFormSubmit = (data: { [key: string]: string }) => {
      console.log('Formularz wysłany:', data);
      // Tutaj możesz dodać dowolną logikę, np. wysłanie danych na serwer
    };

    // Handler to change slider value and reset form
    const handleSizeChange = (eOrValue: React.ChangeEvent<HTMLInputElement> | 'small' | 'medium' | 'large') => {
      let newSize: 'small' | 'medium' | 'large';
      if (typeof eOrValue === 'string') {
        newSize = eOrValue;
      } else {
        newSize = eOrValue.target.value as 'small' | 'medium' | 'large';
      }
      setSize(newSize);
      let scale = 1;
      if (newSize === 'small') scale = 0.85;
      else if (newSize === 'large') scale = 1.15;
      const newInitials = scaleParams(defaultSolarParams, scale);
      setInitialValues(newInitials);
      setFormKey(prev => prev + 1);
    };

    // Reset handler
    const handleReset = () => {
      setSize('medium');
      const newInitials = scaleParams(defaultSolarParams, 1);
      setInitialValues(newInitials);
      setFormKey(prev => prev + 1);
    };

    return (
        <div>

            {/* 2. Pierwsza sekcja */}
            <SectionDivider id="Formularz">

                {/*

                Ciekawostka lewy górny, formularz na środku, ładny obrazek jakiś gradient na tło
                guzik na dół prowadzący


                */}
                <Form
                  key={formKey}
                  fields={fields}
                  onSubmit={handleFormSubmit}
                  title="Formularz energetyczny"
                  width="100%"
                  className="centerItem"
                  buttonName="Policz"
                  columns={2}
                  altButtonAction={() => alert('Guzik')}
                  altButtonName="QR"
                  initialValues={initialValues}
                  size={size}
                  onSliderChange={handleSizeChange}
                  onReset={handleReset}
                />
               {/* Slider for Wielkość gospodarstwa */}

            </SectionDivider>

            {/* 3. Druga sekcja */}
            <SectionDivider id="Wyniki">
                <h2>Sekcja 2</h2>
                <p>Kolejna porcja treści, którą możesz sobie edytować według uznania.</p>
            </SectionDivider>


        </div>
    );
};

export default Landing;
