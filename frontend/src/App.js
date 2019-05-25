import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';

import Login from './login';
import customRoutes from './customRoutes';

import myApiRestClient from './common/restClient'
import authClient from './common/authClient';

import { IngredientsList, IngredientCreate, IngredientEdit } from './ingredients';
import IngredientIcon from 'material-ui/svg-icons/action/label';

import { ProductsList, ProductCreate, ProductEdit } from './products';
import ProductIcon from 'material-ui/svg-icons/action/shopping-cart';

import { ClientsList, ClientEdit } from './clients';
import ClientIcon from 'material-ui/svg-icons/social/people';

import spanishMessages from 'aor-language-spanish';
import customSpanishMessages from './common/i18n/es';

const messages = {
    es: { ...spanishMessages, ...customSpanishMessages }
};

const ADMIN_ROLE = 'admin';
const CLIENT_ROLE = 'client';

const App = () => (
    <Admin loginPage={Login} authClient={authClient} restClient={myApiRestClient} customRoutes={customRoutes} title="Cos" locale="es" messages={messages}>
        {permissions => [
            permissions === ADMIN_ROLE 
                ? <Resource name="ingredients" list={IngredientsList} create={IngredientCreate} edit={IngredientEdit} icon={IngredientIcon} remove={Delete} />
                : null
            ,
            <Resource name="products" list={ProductsList} create={ProductCreate} edit={ProductEdit} icon={ProductIcon} remove={Delete} />,
            <Resource name="clients" list={ClientsList} edit={ClientEdit} icon={ClientIcon} remove={Delete} />,
            <Resource name="provinces" />
        ]}
    </Admin>
);

export default App;