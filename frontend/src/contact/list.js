import React from 'react';
import { RichTextField, List, Filter, Datagrid, DeleteButton, EditButton, TextInput, TextField } from 'admin-on-rest';
const CLIENT_ROLE = 'client';

const ContactTitle = () => {
    return <span>Consultas realizadas</span>;
};

export const ContactList = (props) => (
    <List title={<ContactTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="name" label="resources.contacts.fields.name" />
            <TextField source="surname" label="resources.contacts.fields.surname" />
            <TextField source="email" label="resources.contacts.fields.email" />
            <TextField source="phone" label="resources.contacts.fields.phone" />
            <RichTextField source="message" label="resources.contacts.fields.message" />
        </Datagrid>
    </List>
);