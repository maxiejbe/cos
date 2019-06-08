import React from 'react';
import { LongTextInput, Edit, DisabledInput, SimpleForm, TextInput, maxLength, required } from 'admin-on-rest';

const IngredientTitle = ({ record }) => {

    return <span>Principio activo {record ? `"${record.code}"` : ''}</span>;
};

export const IngredientEdit = (props) => (
    <Edit title={<IngredientTitle />} {...props}>
        <SimpleForm redirect="list"> 
            <DisabledInput source="code" />
            <TextInput source="name" validate={[ required, maxLength(20) ]} />
            <LongTextInput source="description" validate={[ maxLength(100) ]} />
        </SimpleForm>
    </Edit>
);
