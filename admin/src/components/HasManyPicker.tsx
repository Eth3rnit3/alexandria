import React, { ReactElement } from 'react';
import SelectCreatable from 'react-select/creatable';
import randomstring from 'randomstring';
import * as SelectExp from 'react-select';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { UseFormMethods } from 'react-hook-form';
import { createSurname } from '../api/surnnames';


interface Props extends SelectExp.Props {
  formMethods: UseFormMethods;
  options: any[];
  name: string;
  label?: string;
  id?: string;
  fromResource?: string;
  toResource?: string;
}

export default function HasManyPicker({
  options,
  label,
  id = randomstring.generate(7),
  formMethods,
  name,
  fromResource,
  toResource,
  ...rest
}: Props): ReactElement {
  const { register, errors,  } = formMethods;
  return (
    <FormGroup>
      {
        label &&
        <Label htmlFor={id}>{label}</Label>
      }
      <SelectCreatable
        {...rest}
        placeholder="Selectionner"
        isMulti
        id={id}
        onChange={(values, { action }) => {
          const vals = values || [];
          //@ts-ignore
          const lastItem = vals[vals.length - 1]
          console.log('Val', lastItem)
          if(action === 'create-option' && lastItem.__isNew__){
            if(toResource === 'surname'){
              createSurname(lastItem.label)
              .then((response: any) => { console.log(response); })
              .catch((error: any) => { console.log(error); })
            }
          }
        }}
      />
      {errors.hasOwnProperty(name) && <FormFeedback>This field is required</FormFeedback>}
    </FormGroup>
  )
}
