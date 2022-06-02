import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import styles from './templates.module.scss';
import Invitee from './Invitee';
import { customDateFormat } from '../../utils/helpers/DateHelpers';
import { IMask } from 'react-imask';
import { timeRegex } from '../../utils/enums/regexTypes';

const TimeFormatProps = {
  format: 'HH:mm',
  imaskprops: {
    lazy: false,
    blocks: {
      HH: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23,
        placeholderChar: 'H',
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59,
        placeholderChar: 'M',
      },
    },
  },
};

// invalid time frame
const schema1 = yup.object().shape({
  name: yup.string().trim().required('Please enter title'),
  from: yup
    .string()
    .matches(timeRegex, 'Please enter time')
    .required('Please enter time'),
  to: yup
    .string()
    .matches(timeRegex, 'Please enter time')
    .required('Please enter time')
    .test({
      name: 'timeFrame',
      message: 'Invalid time frame',
      test: function (value) {
        return +value?.replace(/:/g, '') > +this.parent.from?.replace(/:/g, '');
      },
    }),

  invitees: yup
    .array()
    .of(
      yup.object().shape({
        email: yup.string(),
      })
    )
    .min(1, 'Please add at least 1 people'),
});

const schema2 = yup.object().shape({
  email: yup.string().email('Invalid email format'),
});

const Form = ({ formId, onSubmit, selectedDate, defaultValues = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setFocus,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema1),
    defaultValues,
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'invitees',
  });

  const handleInviteesSubmit = ({ email } = {}) => {
    if (!email) handleSubmit(onSubmit)();
    else if (!fields.some((el) => el.email === email)) append({ email });
  };

  useEffect(() => {
    setFocus('from');
  }, [setFocus]);

  return (
    <>
      <TextField
        label="Date"
        readOnly
        value={customDateFormat(selectedDate)}
        className="mb-4"
      />
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className={styles.timeGroup}>
          <Controller
            control={control}
            name="from"
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                ref={ref}
                label="From"
                {...TimeFormatProps}
                onChange={onChange}
                value={value}
                helperText={errors.from?.message}
                error={Boolean(errors.from)}
              />
            )}
          />
          <Controller
            control={control}
            name="to"
            render={({ field: { onChange, value }, ref }) => (
              <TextField
                ref={ref}
                label="To"
                {...TimeFormatProps}
                onChange={onChange}
                value={value}
                helperText={errors.to?.message}
                error={Boolean(errors.to)}
              />
            )}
          />
        </div>
        <TextField
          {...register('name')}
          label="Title"
          helperText={errors.name?.message}
          error={Boolean(errors.name)}
        />
      </form>
      <InviteeForm onSubmit={handleInviteesSubmit} mainFormErrors={errors} />
      <div className={styles.inviteesWrapper}>
        <p>
          {fields.length} people{fields.length > 1 && 's'}
        </p>
        <div className={styles.invitees}>
          {fields.map(({ id, email }, i) => (
            <div key={id} className={styles.customInvitee}>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => remove(i)}
              >
                <span>
                  <SVG width="100%" height="100%" src="/assets/svg/Close.svg" />
                </span>
              </button>
              <Invitee email={email} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const InviteeForm = ({ onSubmit, mainFormErrors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setFocus,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema2),
  });

  const submit = (values) => {
    onSubmit(values);
    if (values.email) reset();
  };

  useEffect(() => {
    if (mainFormErrors.invitees) {
      setError('email', {
        type: 'custom',
        message: mainFormErrors.invitees.message,
      });
      if (!mainFormErrors.name && !mainFormErrors.name && !mainFormErrors.to)
        setFocus('email', { shouldSelect: true });
    }
  }, [mainFormErrors, setError, setFocus]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextField
        {...register('email')}
        label="Add Invitee"
        helperText={errors.email?.message}
        error={Boolean(errors.email)}
        append={
          <Button type="submit" className={styles.addUserBtn}>
            <span>
              <SVG width="100%" height="100%" src="/assets/svg/Add.svg" />
            </span>
          </Button>
        }
      />
    </form>
  );
};

export default Form;
