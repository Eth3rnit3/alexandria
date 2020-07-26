import React, { ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { Input, Container, Row, Col } from 'reactstrap';
import InputForm from '../../components/Input';

interface Props {
  
}

export default function AuthorForm({}: Props): ReactElement {
  const formMethods = useForm();
  const { register, handleSubmit, watch, errors } = formMethods;
  const onSubmit = (data: any) => console.log(data);

  console.log({errors});
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6">
            <InputForm label="Prénom" name="firstname" formMethods={formMethods} validations={{ required: true }} />
          </Col>
          <Col md="6">
            <InputForm label="Nom" name="lastname" formMethods={formMethods} validations={{ required: true }} />
          </Col>
          <Col md="6">
            <InputForm type="date" label="Date de naissance" name="birthdate" formMethods={formMethods} validations={{ required: true }} />
          </Col>
          <Col md="6">
            <InputForm clearable type="date" label="Date de décès" name="deathdate" formMethods={formMethods} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input type="submit" />
          </Col>
        </Row>
      </form>
    </Container>
  )
}
