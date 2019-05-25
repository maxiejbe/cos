import React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, BooleanInput, TextInput, translate, maxLength, required } from 'admin-on-rest';

export const IngredientCreate = (props) => (
  <Create {...props}>
      <SimpleForm redirect="list">
          <TextInput source="code" validate={[ required, maxLength(6) ]} />
          <TextInput source="name" validate={[ required, maxLength(20) ]} />
          <TextInput source="description" validate={[ maxLength(100) ]} />
      </SimpleForm>
  </Create>
);