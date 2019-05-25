import React from 'react';
import { Create, ReferenceInput, SelectInput, SimpleForm, BooleanInput, TextInput, translate, maxLength, required } from 'admin-on-rest';

export const CategoryCreate = (props) => (
  <Create {...props}>
      <SimpleForm redirect="list">
          <TextInput source="name" validate={[ required, maxLength(100) ]} />
          <ReferenceInput label="resources.categories.fields.parent.name" source="parent" reference="categories" allowEmpty sort={{ field: 'name', order: 'ASC' }}>
              <SelectInput optionText="name" />
          </ReferenceInput>
          <BooleanInput source="featured" />
      </SimpleForm>
  </Create>
);