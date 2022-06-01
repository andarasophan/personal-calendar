import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import styles from './templates.module.scss';
import Invitee from './Invitee';
import { customDateFormat } from '../../utils/helpers/DateHelpers';

const schema1 = yup.object().shape({
  name: yup.string().trim().required('Please enter title'),
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

const Form = ({ formId, onSubmit, selectedDate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setFocus,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema1),
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'invitees',
  });

  const handleInviteesSubmit = ({ email } = {}) => {
    if (!email) handleSubmit(onSubmit)();
    else append({ email });
  };

  useEffect(() => {
    setFocus('name', { shouldSelect: true });
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
        <TextField
          {...register('name')}
          label="Title"
          helperText={errors.name?.message}
          error={Boolean(errors.name)}
        />
        {/* to do at time field */}
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
      if (!mainFormErrors.name) setFocus('email', { shouldSelect: true });
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
