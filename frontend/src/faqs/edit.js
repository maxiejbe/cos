import React from 'react';
import { LongTextInput, Edit, SimpleForm, TextInput, maxLength, required } from 'admin-on-rest';

const IngredientTitle = ({ record }) => {

    return <span>Pregunta frecuente {record ? `"${record.id}"` : ''}</span>;
};

export const FaqEdit = (props) => (
    <Edit title={<IngredientTitle />} {...props}>
        <SimpleForm redirect="list"> 
            <LongTextInput source="question" validate={[ required, maxLength(100) ]} />
            <LongTextInput source="answer" validate={[ maxLength(300) ]} />
        </SimpleForm>
    </Edit>
);
