import React, { ReactElement } from 'react';
import { Table } from 'reactstrap';
import { IAuthor } from '../../interfaces/author';
import { fetchAuthors } from '../../api/authors';
import { Link } from 'react-router-dom';

interface Props {
  
}

export default function Authors({}: Props): ReactElement {
  const [_authors, set_authors] = React.useState<IAuthor[]>([]);
  React.useEffect(() => {
    fetchAuthors()
    .then((response) => set_authors(response.data))
    .catch((error) => { console.log(error); })
  }, [])
  return (
    <>
    <Link to="authors/new">Ajouter un auteur</Link>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Prénom</th>
          </tr>
        </thead>
        <tbody>
          {
            _authors.map((author, idx) => {
              return (
                <tr key={author.id || idx}>
                  <th scope="row">{author.id}</th>
                  <td>{author.lastname}</td>
                  <td>{author.firstname}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}
