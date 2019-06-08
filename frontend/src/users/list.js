import React from 'react';
import { List, Filter, Datagrid, ReferenceInput, ShowButton, SelectInput, DeleteButton, EditButton, TextInput, TextField, NumberField } from 'admin-on-rest';
const ADMIN_ROLE = 'admin';

const UsersTitle = () => {
    return <span>Listado de Usuarios</span>;
};

const UsersFilter = ({ ...props }) => (
    <Filter {...props}>
        <TextInput label="resources.users.fields.email" source="email" alwaysOn />
    </Filter>
);

export const UsersList = (props) => (
    <List filters={<UsersFilter />} title={<UsersTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="email" label="resources.users.fields.email" />
            <TextField source="name" label="resources.users.fields.name" />
            <TextField source="role" label="resources.users.fields.role" />     
            <ShowButton /> 
            {localStorage.getItem('role') === ADMIN_ROLE && <EditButton />}
            {localStorage.getItem('role') === ADMIN_ROLE && <DeleteButton />}
        </Datagrid>
    </List>
);