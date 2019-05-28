import React from 'react';
import RichTextInput from 'aor-rich-text-input';

import { Create, SimpleForm, TextInput, maxLength, required } from 'admin-on-rest';

export const FaqCreate = (props) => (
  <Create {...props}>
      <SimpleForm redirect="list">
          <TextInput source="question" validate={[ required, maxLength(100) ]} />
          <RichTextInput source="answer" validate={[ required, maxLength(300) ]} />
      </SimpleForm>
  </Create>
);