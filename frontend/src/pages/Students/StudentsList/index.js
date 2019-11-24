import React from 'react';
import { MdAdd } from 'react-icons/md';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Container from '~/components/Container';
import { Title } from './styles';

export default function StudentsList() {
  return (
    <Container>
      <Title>
        <h1>Lista de alunos</h1>

        <div>
          <Button icon={MdAdd} type="button" text="CADASTRAR" />
          <TextInput
            type="text"
            name="search"
            placeholder="Pesquisar por alunos"
          />
        </div>
      </Title>
      {/* <Content>
        <Table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </Table>
      </Content> */}
    </Container>
  );
}
