import React, { useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { defaultSolarParams } from '../helpers/solarInputParams.ts';

const scaleParams = (
  params: { [key: string]: number },
  scale: number
): { [key: string]: string } => {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      (value * scale).toFixed(2),
    ])
  );
};

const fields = [
  {
    name: 'yearlyConsumptionWithoutPV',
    label: 'Konsumpcja energii z jednego roku',
    type: 'number',
    placeholder: 'kWh (np. 5000)',
    required: true,
  },
  {
    name: 'initialEnergyPurchasePrice',
    label: 'Cena zakupu energii w pierwszym roku',
    type: 'number',
    placeholder: 'PLN/kWh (np. 0.60)',
    required: true,
  },
  {
    name: 'pvSystemSizeKw',
    label: 'Wielkość instalacji fotowoltaicznej',
    type: 'number',
    placeholder: 'kW (np. 5)',
    required: true,
  },
  {
    name: 'annualEnergyProduced',
    label: 'Energia wyprodukowana w jednym roku',
    type: 'number',
    placeholder: 'kWh (np. 6000)',
    required: true,
  },
  {
    name: 'initialEnergySellPrice',
    label: 'Cena sprzedaży wyprodukowanej energii',
    type: 'number',
    placeholder: 'PLN/kWh (np. 0.30)',
    required: true,
  },
  {
    name: 'pvCostPerKw',
    label: 'Koszt instalacji PV za 1 kW',
    type: 'number',
    placeholder: 'PLN (np. 4000)',
    required: true,
  },
  {
    name: 'selfConsumptionRate',
    label: 'Procent autokonsumpcji',
    type: 'number',
    placeholder: '% (np. 30)',
    required: true,
  },
  {
    name: 'annualEnergyPriceGrowth',
    label: 'Roczny procentowy wzrost ceny energii',
    type: 'number',
    placeholder: '% (np. 5)',
    required: true,
  },
];

const Form: React.FC = () => {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const computedInitialValues = scaleParams(defaultSolarParams, 1);
  computedInitialValues['annualEnergyPriceGrowth'] = '5';
  const [initialValues, setInitialValues] = useState<{ [key: string]: string }>(
    computedInitialValues
  );
  const [formKey, setFormKey] = useState<number>(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: initialValues[field.name] || '',
    }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formularz wysłany:', formData);
    // Tutaj możesz dodać dowolną logikę, np. wysłanie danych na serwer
  };

  const handleSizeChange = (
    eOrValue: React.ChangeEvent<HTMLInputElement> | 'small' | 'medium' | 'large'
  ) => {
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
    newInitials['annualEnergyPriceGrowth'] = formData['annualEnergyPriceGrowth'] || '5';
    setInitialValues(newInitials);
    setFormKey((prev) => prev + 1);
    setFormData(
      fields.reduce((acc, field) => ({
        ...acc,
        [field.name]: newInitials[field.name] || '',
      }), {})
    );
  };

  const handleReset = () => {
    setSize('medium');
    const newInitials = scaleParams(defaultSolarParams, 1);
    newInitials['annualEnergyPriceGrowth'] = '5';
    setInitialValues(newInitials);
    setFormKey((prev) => prev + 1);
    setFormData(
      fields.reduce((acc, field) => ({
        ...acc,
        [field.name]: newInitials[field.name] || '',
      }), {})
    );
  };

  return (
    <form
      key={formKey}
      className="form-container centerItem border"
      onSubmit={handleFormSubmit}
      style={{ width: '100%' }}
    >
      <h1 className="form-title">Kalkulator solarny</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <FontAwesomeIcon
          icon={faHome}
          size="1x"
          onClick={() => handleSizeChange('small')}
          style={{ cursor: 'pointer', margin: '0 0.5rem', opacity: size === 'small' ? 1 : 0.6 }}
        />
        <FontAwesomeIcon
          icon={faHome}
          size="2x"
          onClick={() => handleSizeChange('medium')}
          style={{ cursor: 'pointer', margin: '0 0.5rem', opacity: size === 'medium' ? 1 : 0.6 }}
        />
        <FontAwesomeIcon
          icon={faHome}
          size="3x"
          onClick={() => handleSizeChange('large')}
          style={{ cursor: 'pointer', margin: '0 0.5rem', opacity: size === 'large' ? 1 : 0.6 }}
        />
      </div>
      <div
        className="form-fields"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          gap: '1rem',
        }}
      >
        {fields.map((field) => (
          <div className="form-group" key={field.name} style={{ flex: '0 0 30%' }}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type || 'text'}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.name]}
              onChange={handleChange}
              className="form-input borderAlt"
            />
          </div>
        ))}
      </div>
      <div className="form-actions centerItem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Button className={"borderAlt"} onClick={handleReset}>Reset</Button>
        <Button className={"borderAlt"} type="submit">
          Policz
        </Button>
        <Button className={"borderAlt"} onClick={() => alert('Guzik')}>
          QR
        </Button>
      </div>
    </form>
  );
};

export default Form;
