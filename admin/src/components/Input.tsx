import React, { ReactElement } from 'react';
import { Input, FormGroup, FormFeedback, Label, InputProps, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { UseFormMethods, ValidationRules } from 'react-hook-form';
import { MdClear } from 'react-icons/md';
import randomstring from 'randomstring';

interface Props extends InputProps {
  formMethods: UseFormMethods;
  name: string;
  label?: string;
  validations?: ValidationRules;
  clearable?: boolean;
}

export default function InputForm({
  formMethods,
  name,
  id = randomstring.generate(7),
  label,
  validations = {},
  clearable,
  ...rest
}: Props): ReactElement {
  const { register, errors } = formMethods;
  const innerRef = register(validations);
  return (
    <FormGroup>
      {
        label &&
        <Label htmlFor={id}>{label}</Label>
      }
      <InputGroup>
        {
          clearable &&
          <InputGroupAddon addonType="append">
            <Button onClick={() => {
              const input = document.getElementById(id);
              //@ts-ignore
              input.value = ''
            }} type="button" color="secondary">
              <MdClear />
            </Button>
          </InputGroupAddon>
        }
        <Input
          {...rest}
          id={id}
          invalid={errors.hasOwnProperty(name)}
          name={name}
          innerRef={innerRef}
        />
        {errors.hasOwnProperty(name) && <FormFeedback>This field is required</FormFeedback>}
      </InputGroup>
    </FormGroup>
  )
}
