import React from 'react';
import '../index.css';
import Button from './Button';

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
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  title,
  width = '100%',
  className,
}) => {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
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
      {title && <h2 className="form-title">{title}</h2>}
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
      <div className="form-actions">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default Form;
