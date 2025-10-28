import cn from 'classnames';
import type React from 'react';

type FieldsetProps = {
  label?: string;
  legend?: string;
  labelType?: 'warning' | 'info' | 'success' | 'error';
  className?: string;
  onChange: (value: string | File) => void;
  // value?: string;
  type: 'text' | 'file' | 'select' | 'checkbox' | 'password';
  options?: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement> &
  React.InputHTMLAttributes<HTMLInputElement>;
const Fieldset: React.FC<FieldsetProps> = ({
  label,
  // labelType = 'info',
  className,
  onChange,
  value,
  type,
  options,
  legend,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (type === 'file') {
      const target = event.target as HTMLInputElement;
      if (target.files?.length) {
        const file = target.files[0];
        onChange(file);
      }
    } else {
      onChange(event.target.value);
    }
  };

  if (type === 'select') {
    return (
      <fieldset className={cn('fieldset', className)}>
        <legend className='fieldset-legend'>{legend}</legend>
        <select
          onChange={handleChange}
          // value={value}
          className='select outline-0 min-w-[150px]'
          required
        >
          {options?.map((option, index) => (
            <option
              key={index}
              value={option.toLowerCase()}
            >
              {option}
            </option>
          ))}
        </select>
        <p className='label'>
          {label}
        </p>
      </fieldset>
    );
  }

  return (
    <fieldset className={cn('fieldset', className)}>
      <legend className='fieldset-legend'>{legend}</legend>
      <input
        type={type}
        onChange={handleChange}
        required
        value={value}
        className={cn(
          'outline-0',
          { ['input']: type === 'text' || type === 'password' },
          { ['file-input']: type === 'file' },
          { ['checkbox']: type === 'checkbox' },
        )}
        placeholder='Type here...'
      />
      <p className='label'>
        {label}
      </p>
    </fieldset>
  );
};

export default Fieldset;
