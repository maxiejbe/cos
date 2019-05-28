import React from 'react';
import { RichTextField, List, Filter, Datagrid, DeleteButton, EditButton, TextInput, TextField } from 'admin-on-rest';
const ADMIN_ROLE = 'admin';

const FaqsTitle = () => {
    return <span>Preguntas frecuentes</span>;
};

const FaqsFilter = ({ ...props }) => (
    <Filter {...props}>
        <TextInput label="resources.faqs.fields.question" source="question" alwaysOn />
    </Filter>
);

export const FaqsList = (props) => (
    <List filters={<FaqsFilter />} title={<FaqsTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="question" label="resources.faqs.fields.question" />
            <RichTextField source="answer" label="resources.faqs.fields.answer" />
            {localStorage.getItem('role') === ADMIN_ROLE && <EditButton />}
            {localStorage.getItem('role') === ADMIN_ROLE && <DeleteButton />}
        </Datagrid>
    </List>
);