import React from 'react';
import RichTextInput from 'aor-rich-text-input';
import { Edit, SimpleForm, TextInput, maxLength, required } from 'admin-on-rest';

const IngredientTitle = ({ record }) => {

    return <span>Faq {record ? `"${record.id}"` : ''}</span>;
};

export const FaqEdit = (props) => (
    <Edit title={<IngredientTitle />} {...props}>
        <SimpleForm redirect="list"> 
            <TextInput source="question" validate={[ required, maxLength(100) ]} />
            <RichTextInput source="answer" validate={[ maxLength(300) ]} />
        </SimpleForm>
    </Edit>
);
