import React from 'react';
import {
  TextField,
  Show,
  SimpleShowLayout,
  ImageField
} from 'admin-on-rest';

const UserTitle = ({ record }) => {
  return (
    <span>Usuario {record ? `"${record.email}"` : ''}</span>
  );
};

export const UserShow = props => (
  <Show title={<UserTitle />} {...props}>
       <SimpleShowLayout>
          <TextField source="email" label="resources.users.fields.email" />
          <TextField source="name" label="resources.users.fields.name" />
          <TextField source="role" label="resources.users.fields.role" />  
       </SimpleShowLayout>
  </Show>
);
