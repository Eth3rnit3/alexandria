import React, { ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { Input, Container, Row, Col } from 'reactstrap';
import InputForm from '../../components/Input';
import { INationality } from '../../interfaces/nationality';
import { fetchNationalities } from '../../api/nationalities';
import HasManyPicker from '../../components/HasManyPicker';
import { ISurname } from '../../interfaces/surname';
import { IAuthor } from '../../interfaces/author';
import { RouteChildrenProps } from 'react-router-dom';
import { fetchAuthor } from '../../api/authors';

const defaultAuthor: IAuthor = {
  id: null,
  birthdate:  '',
  deathdate:  '',
  firstname:  '',
  is_master:  false,
  lastname:   '',
  user_id:    null,
  image_urls: [],
  pending_images: [],
  display_name: '',
  biography: '',
  nationality_id: 0,
  books: [],
  secret_orders: [],
  surnames: [],
  created_at: new Date(),
  updated_at: new Date(),
}

interface Props extends RouteChildrenProps {
  
}

export default function AuthorForm({ match }: Props): ReactElement {
  const formMethods = useForm();
  const { register, handleSubmit, watch, errors } = formMethods;
  const [_author, set_author] = React.useState<IAuthor>(defaultAuthor);
  const [_nationalities, set_nationalities] = React.useState<INationality[]>([]);
  const [_surnames, set_surnames] = React.useState<ISurname[]>([]);
  const onSubmit = (data: any) => console.log(data);

  React.useEffect(() => {
    //@ts-ignore
    const authorId = match?.params.id;
    fetchNationalities()
    .then((response) => set_nationalities(response.data))
    .catch((error) => { console.log(error); })

    if(authorId){
      fetchAuthor(authorId)
      .then((response) => set_author(response.data))
      .catch((error) => { console.log(error); })
    }
  }, [])

  console.log({errors});
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6">
            <InputForm
            defaultValue={_author.firstname}
              label="Prénom"
              name="firstname"
              formMethods={formMethods}
              validations={{ required: true }} />
          </Col>
          <Col md="6">
            <InputForm
            defaultValue={_author.lastname}
              label="Nom"
              name="lastname"
              formMethods={formMethods}
              validations={{ required: true }} />
          </Col>
          <Col md="6">
            <InputForm
            defaultValue={_author.birthdate}
            type="date"
            label="Date de naissance"
            name="birthdate"
            formMethods={formMethods}
            validations={{ required: true }} />
          </Col>
          <Col md="6">
            <InputForm
              defaultValue={_author.deathdate}
              clearable
              type="date"
              label="Date de décès"
              name="deathdate"
              formMethods={formMethods} />
          </Col>
          <Col md="6">
            <InputForm
              defaultValue={_author.nationality_id}
              clearable
              options={_nationalities}
              type="select"
              label="Nationalité"
              name="nationality_id"
              formMethods={formMethods} />
          </Col>
          <Col md="6">
            <HasManyPicker
              isClearable
              options={_surnames}
              label="Surnoms"
              name="surname_ids"
              fromResource="author"
              toResource="surname"
              formMethods={formMethods}
            />
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
