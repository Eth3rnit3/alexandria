import React, { ReactElement } from 'react';
import { Input, FormGroup, FormFeedback, Label, InputProps } from 'reactstrap';
import { UseFormMethods, ValidationRules } from 'react-hook-form';
import randomstring from 'randomstring';

interface Props extends InputProps {
  formMethods: UseFormMethods;
  name: string;
  label?: string;
  validations?: ValidationRules;
}

export default function InputForm({ formMethods, name, id = randomstring.generate(7), label, validations = {} }: Props): ReactElement {
  const { register, errors } = formMethods;
  return (
    <FormGroup>
      {
        label &&
        <Label htmlFor={id}>{label}</Label>
      }
      <Input
        id={id}
        invalid={errors.hasOwnProperty(name)}
        name={name}
        innerRef={register(validations)} 
      />
      {errors.hasOwnProperty(name) && <FormFeedback>This field is required</FormFeedback>}
    </FormGroup>
  )
}
