import React, { forwardRef, memo, useRef, useMemo } from 'react';
import styles from './textField.module.scss';
import clsx from 'clsx';
import { IMaskInput } from 'react-imask';

const TextField = (
  {
    id,
    name,
    value,
    label,
    onChange,
    error,
    helperText,
    placeholder = ' ',
    disabled,
    className,
    append,
    readOnly,
    format,
    imaskprops,
  },
  ref
) => {
  const inputRef = useRef();

  const inputComponent = useMemo(() => {
    if (format)
      return (
        // TODO make it uncontrolled component
        <IMaskInput
          {...imaskprops}
          id={id || name}
          name={name}
          mask={format}
          value={value}
          onAccept={onChange}
          placeholder={placeholder}
          disabled={disabled}
          inputRef={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
          }}
        />
      );
    return (
      <input
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        type="text"
        readOnly={readOnly}
        ref={(el) => {
          inputRef.current = el;
          if (typeof ref === 'function') ref(el);
        }}
      />
    );
  }, [
    disabled,
    format,
    id,
    imaskprops,
    name,
    onChange,
    placeholder,
    readOnly,
    ref,
    value,
  ]);

  return (
    <div className={clsx(styles.formGroup, error && styles.error, className)}>
      <div className={styles.formControl}>
        <div className={styles.inputWrapper}>
          {inputComponent}
          <label
            className={styles.formLabel}
            htmlFor={id || name}
            onClick={() => {
              if (inputRef.current) inputRef.current.focus();
            }}
          >
            {label}
          </label>
        </div>
        {append && <div className="px-2">{append}</div>}
        <div
          className={clsx(
            styles.formLine,
            (readOnly || disabled) && styles.disabled
          )}
        />
      </div>
      <label className={styles.helperText}>{helperText}</label>
    </div>
  );
};

export default memo(forwardRef(TextField));
