import React, { ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { Input, Container, Row, Col, FormGroup, Label, CustomInput } from 'reactstrap';
import InputForm from '../../components/Input';
import { INationality } from '../../interfaces/nationality';
import { fetchNationalities } from '../../api/nationalities';
import HasManyPickerCreatable from '../../components/HasManyPickerCreatable';
import HasManyPicker from '../../components/HasManyPicker';
import { ISurname } from '../../interfaces/surname';
import { IAuthor } from '../../interfaces/author';
import { RouteChildrenProps } from 'react-router-dom';
import { fetchAuthor } from '../../api/authors';
import { ISecretOrder } from '../../interfaces/secretOrder';
import { fetchSecretOrders } from '../../api/secret_orders';

const defaultAuthor: IAuthor = {
  //@ts-ignore
  id: null,
  birthdate:  '',
  deathdate:  '',
  firstname:  '',
  is_master:  false,
  lastname:   '',
  //@ts-ignore
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
  const [_secret_orders, set_secret_orders] = React.useState<ISecretOrder[]>([]);
  const onSubmit = (data: any) => console.log(data);
  const isEditMode = _author.id !== null;

  const refreshAuthor = () => {
    //@ts-ignore
    const authorId = match?.params.id;
    if(authorId){
      fetchAuthor(authorId)
      .then((response) => set_author(response.data))
      .catch((error) => { console.log(error); })
    }
  }

  React.useEffect(() => {
    fetchNationalities()
    .then((response) => set_nationalities(response.data))
    .catch((error) => { console.log(error); })
    fetchSecretOrders()
    .then((response) => set_secret_orders(response.data))
    .catch((error) => { console.log(error); })
    refreshAuthor();
  }, [])

  console.log({_author});
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
          {
            isEditMode &&
            <Col md="6">
              <HasManyPickerCreatable
                isClearable
                refresh={() => refreshAuthor()}
                options={_author.surnames.map(surname => ({ label: surname.name, value: surname.id }))}
                //@ts-ignore
                value={_author.surnames.map(surname => ({ label: surname.name, value: surname.id }))}
                label="Surnoms"
                name="surname_ids"
                fromResource={_author}
                toResource="surname"
                formMethods={formMethods}
              />
            </Col>
          }
          {
            isEditMode &&
            <Col md="6">
              <input type="hidden" name="secret_order_ids" ref={register}/>
              <HasManyPicker
                options={_secret_orders.map(secret_order => ({ label: secret_order.name, value: secret_order.id }))}
                //@ts-ignore
                defaultValue={_author.secret_orders.map(secret_order => ({ label: secret_order.name, value: secret_order.id }))}
                label="Sociétés secrètes"
                name="secret_order_ids"
                fromResource={_author}
                toResource="secret_order"
                formMethods={formMethods}
              />
            </Col>
          }
          <Col md="6">
            <FormGroup>
              <Label>Maître de son art</Label>
              <CustomInput onChange={(e) => set_author({..._author, is_master: e.target.checked})} checked={_author.is_master} type="switch" id="is_master" innerRef={register} name="is_master" label="Activer si l'auteur a ateind la maîtrise de son art" />
            </FormGroup>
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
