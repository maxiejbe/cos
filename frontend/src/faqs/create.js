import React from 'react';
import { LongTextInput, Create, SimpleForm, TextInput, maxLength, required } from 'admin-on-rest';

export const FaqCreate = (props) => (
  <Create {...props}>
      <SimpleForm redirect="list">
          <LongTextInput source="question" validate={[ required, maxLength(100) ]} />
          <LongTextInput source="answer" validate={[ required, maxLength(300) ]} />
      </SimpleForm>
  </Create>
);