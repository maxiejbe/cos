import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { ViewTitle } from 'admin-on-rest';

const CompanyInfo = () => (
    <Card>
        <ViewTitle title="Información de contacto" />
        <CardText>             
            <div>Dirección: <b>Sede Av. Paseo Colón 850 - Buenos Aires - Argentina</b></div>
            <div>Teléfono: <b>(54-11) 528-50568/69</b></div>
            <div>Email: <b>tramitaciones@fi.uba.ar</b></div>
        </CardText>
    </Card>
);

export default CompanyInfo;