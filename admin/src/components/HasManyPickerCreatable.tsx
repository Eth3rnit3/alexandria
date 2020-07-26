import React, { ReactElement } from 'react';
import SelectCreatable from 'react-select/creatable';
import randomstring from 'randomstring';
import * as SelectExp from 'react-select';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { UseFormMethods } from 'react-hook-form';
import { createSurname, deleteSurname } from '../api/surnnames';
import { IAuthor } from '../interfaces/author';
import { AxiosResponse } from 'axios';


interface Props extends SelectExp.Props {
  formMethods: UseFormMethods;
  options: any[];
  name: string;
  label?: string;
  id?: string;
  fromResource: IAuthor;
  toResource?: string;
  refresh?: any;
}

export default function HasManyPickerCreatable({
  label,
  id = randomstring.generate(7),
  formMethods,
  name,
  fromResource,
  toResource,
  refresh,
  ...rest
}: Props): ReactElement {
  const { register, errors } = formMethods;
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
        onChange={(values, { action, removedValue }) => {
          const vals = values || [];
          //@ts-ignore
          const lastItem = vals[vals.length - 1]
          if(action === 'create-option' && lastItem.__isNew__){
            if(toResource === 'surname'){
              createSurname(lastItem.label, 'Author', fromResource.id)
              .then((response: any) =>  refresh && refresh(response))
              .catch((error: any) => { console.log(error); })
            }
          }
          if(action === 'remove-value'){
            if(toResource === 'surname' && removedValue){
              deleteSurname(parseInt(removedValue.value))
              .then((response: any) =>  refresh && refresh(response))
              .catch((error: any) => { console.log(error); })
            }
          }
        }}
      />
      {errors.hasOwnProperty(name) && <FormFeedback>This field is required</FormFeedback>}
    </FormGroup>
  )
}
