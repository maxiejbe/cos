import React from 'react';
import { List, Filter, Datagrid, ReferenceInput, BooleanInput, SelectInput, EditButton, TextInput, TextField, NumberField } from 'admin-on-rest';
import Chip from 'material-ui/Chip';
import ApproveButton from './buttons/approveButton'

const ClientsTitle = () => {
  return <span>Listado de Clientes</span>;
};

const ClientsFilter = ({...props}) => (
  <Filter {...props}>
        <TextInput label="resources.clients.fields.status" source="status" />
        <TextInput label="resources.clients.fields.email" source="email" alwaysOn />
        <TextInput label="resources.clients.fields.name" source="name" alwaysOn />
        <TextInput label="resources.clients.fields.cuit" source="cuit" alwaysOn />       
    </Filter>
);

export const ClientsList = (props) => (
  <List filters={<ClientsFilter />} title={<ClientsTitle />} {...props} sort={{
    field: 'id',
    order: 'ASC'
  }}>
        <Datagrid>
            <NumberField source="id" label="resources.clients.fields.id" />
            <TextField source="cuit" label="resources.clients.fields.cuit" />
            <TextField source="name" label="resources.clients.fields.name" />
            <TextField source="email" label="resources.clients.fields.email" />
            <TextField source="phone" label="resources.clients.fields.phone" />
            <TextField source="status" label="resources.clients.fields.status" />
            <ApproveButton/>
            <EditButton />
        </Datagrid>
    </List>
);