import React, { ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { Input, FormFeedback, FormGroup } from 'reactstrap';

interface Props {
  
}

export default function AuthorForm({}: Props): ReactElement {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: any) => console.log(data);

  console.log({errors});
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Input name="example" defaultValue="test" innerRef={register} />
      </FormGroup>
      <FormGroup>
        <Input invalid={errors.hasOwnProperty('exampleRequired')} name="exampleRequired" innerRef={register({ required: true })} />
        {errors.hasOwnProperty('exampleRequired') && <FormFeedback>This field is required</FormFeedback>}
      </FormGroup>
      <Input type="submit" />
    </form>
  )
}
