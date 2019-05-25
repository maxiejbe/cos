import React from 'react';
import { Edit, DisabledInput, ReferenceInput, SelectInput, SimpleForm, DeleteButton, BooleanInput, TextInput, translate, maxLength, required } from 'admin-on-rest';

const IngredientTitle = ({ record }) => {

    return <div> 
            <span>Principio activo {record ? `"${record.code}"` : ''}</span>
            <DeleteButton basePath="/ingredients" record={record} />
        </div>;
};

export const IngredientEdit = (props) => (
    <Edit title={<IngredientTitle />} {...props}>
        <SimpleForm redirect="list"> 
            <DisabledInput source="id" />
            <DisabledInput source="code" />
            <TextInput source="name" validate={[ required, maxLength(20) ]} />
            <TextInput source="description" validate={[ maxLength(100) ]} />
        </SimpleForm>
    </Edit>
);
