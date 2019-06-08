import React from 'react';

import { LongTextInput, Create, SimpleForm, TextInput, maxLength, required } from 'admin-on-rest';

export const ContactCreate = (props) => (
  <Create {...props}>
      <SimpleForm redirect="list">
          <TextInput source="name" validate={[ required, maxLength(20) ]} />
          <TextInput source="surname" validate={[ maxLength(20) ]} />
          <TextInput type="email" source="email" validate={[ required, maxLength(20) ]} />
          <TextInput source="phone" validate={[ maxLength(15) ]} />          
          <LongTextInput source="message" validate={[ required, maxLength(300) ]} />
      </SimpleForm>
  </Create>
);