import React from 'react';
import { Edit, DisabledInput, AutocompleteInput, ReferenceInput, SelectInput, SimpleForm, BooleanInput, TextInput, translate, maxLength, required } from 'admin-on-rest';

const ClientTitle = ({ record }) => {
    return <span>Cliente {record ? `"${record.name}"` : ''}</span>;
};

export const ClientEdit = (props) => (
    <Edit title={<ClientTitle />} {...props}>
        <SimpleForm redirect="list"> 
            <DisabledInput source="id" />
            <TextInput source="email" validate={[required, maxLength(255)]} />
            <TextInput source="cuit" validate={[required, maxLength(14)]} />
            <TextInput source="name" validate={[required, maxLength(100)]} />
            <TextInput source="phone" validate={[required, maxLength(50)]} />
            <AutocompleteInput source="status" choices={[
                { id: 'PENDIENTE', name: 'PENDIENTE' },
                { id: 'EMAIL_CONFIRMADO', name: 'EMAIL_CONFIRMADO' },
                { id: 'APROBADO', name: 'APROBADO' },
                { id: 'RECHAZADO', name: 'RECHAZADO' },
            ]} />                
        </SimpleForm>
    </Edit>
);
