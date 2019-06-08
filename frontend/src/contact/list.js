import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { List, ViewTitle, Datagrid, TextField } from 'admin-on-rest';

const ContactTitle = () => {
    return <span>Consultas realizadas</span>;
};

export const ContactList = (props) => (
    <div>
        <Card>
            <ViewTitle title="Información de contacto" />
            <CardText>             
                <div>Dirección: <b>Sede Av. Paseo Colón 850 - Buenos Aires - Argentina</b></div>
                <div>Teléfono: <b>(54-11) 528-50568/69</b></div>
                <div>Email: <b>tramitaciones@fi.uba.ar</b></div>
            </CardText>
        </Card>
            
        <List title={<ContactTitle />} {...props} sort={{ field: 'id', order: 'ASC' }}>
            <Datagrid>
                <TextField source="name" label="resources.contacts.fields.name" />
                <TextField source="surname" label="resources.contacts.fields.surname" />
                <TextField source="email" label="resources.contacts.fields.email" />
                <TextField source="phone" label="resources.contacts.fields.phone" />
                <TextField source="message" label="resources.contacts.fields.message" />
            </Datagrid>
        </List>
    </div>
);