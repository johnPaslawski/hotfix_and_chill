import React from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

interface FormProps {
  fields: Field[];
  onSubmit: (data: { [key: string]: string }) => void;
  title?: string;
  width?: string | number;
  className?: string;
  columns?: number;
  buttonName?: string;
  altButtonAction?: () => void;
  altButtonName?: string;
  initialValues?: { [key: string]: string };
  size: 'small' | 'medium' | 'large';
  onSliderChange: (newSize: 'small' | 'medium' | 'large') => void;
  onReset: () => void;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  title,
  width = '100%',
  className,
  buttonName = 'Submit',
  altButtonAction,
  altButtonName,
  columns = 1,
  initialValues,
  size,
  onSliderChange,
  onReset,
}) => {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: initialValues && initialValues[field.name] ? initialValues[field.name] : '',
    }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      className={`form-container ${className || ''}`}
      onSubmit={handleSubmit}
      style={{ width }}
    >
      {title && <h1 className="form-title">{title}</h1>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <FontAwesomeIcon
          icon={faHome}
          size="1x"
          onClick={() => onSliderChange('small')}
          style={{ cursor: 'pointer', margin: '0 0.5rem', opacity: size === 'small' ? 1 : 0.6 }}
        />
        <FontAwesomeIcon
          icon={faHome}
          size="2x"
          onClick={() => onSliderChange('medium')}
          style={{ cursor: 'pointer', margin: '0 0.5rem', opacity: size === 'medium' ? 1 : 0.6 }}
        />
        <FontAwesomeIcon
          icon={faHome}
          size="3x"
          onClick={() => onSliderChange('large')}
          style={{ cursor: 'pointer', margin: '0 0.5rem', opacity: size === 'large' ? 1 : 0.6 }}
        />
      </div>
      <div
        className="form-fields"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '1rem',
        }}
      >
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
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
              className="form-input"
            />
          </div>
        ))}
      </div>
      <div className="form-actions centerItem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <button type="button" onClick={onReset} style={{}}>Reset</button>
        <Button type="submit">
          {buttonName}
        </Button>
        {altButtonAction && altButtonName && (
          <Button onClick={altButtonAction} style={{}}>
            {altButtonName}
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
