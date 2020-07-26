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
  options?: any[];
}

export default function InputForm({
  formMethods,
  name,
  id = randomstring.generate(7),
  label,
  validations = {},
  clearable,
  options,
  ...rest
}: Props): ReactElement {
  const { register, errors } = formMethods;
  const innerRef = register(validations);
  const isSelect = rest.type && rest.type === 'select';
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
        {
          isSelect
          ? (
            // select input
            <Input
              {...rest}
              id={id}
              invalid={errors.hasOwnProperty(name)}
              name={name}
              innerRef={innerRef}
            >
              {
                options?.map(option => <option key={option.id} value={option.id}>{option.name}</option>)
              }
            </Input>
          ) : (
            // other inputs
            <Input
              {...rest}
              id={id}
              invalid={errors.hasOwnProperty(name)}
              name={name}
              innerRef={innerRef}
            />
          )
        }
        {errors.hasOwnProperty(name) && <FormFeedback>This field is required</FormFeedback>}
      </InputGroup>
    </FormGroup>
  )
}
