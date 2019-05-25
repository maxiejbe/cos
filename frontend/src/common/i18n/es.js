export const messages = {
  resources: {
    register: {
      email: 'Email',
      name: 'Nombre',
      repeatpassword: 'Repetir password',
      surname: 'Apellido',
      label: 'Registrarse',
      errors: {
        repeatpassword: 'Las passwords no conciden',
        emailLength: 'Máximo 20 caracteres',
        passwordLength: 'Máximo 20 caracteres',
        nameLength: 'Máximo 40 caracteres'
      }
    },
    clients: {
      search: {
        name: 'Buscar nombre'
      },
      title: 'Clietes',
      name: 'Cliente |||| Clientes',
      fields: {
        id: 'ID',
        cuit: 'DNI/CUIT',
        name: 'Razón Social',
        email: 'E-mail',
        phone: 'Teléfono',
        status: 'Estado'
      }
    },
    categories: {
      search: {
        name: 'Buscar nombre'
      },
      title: 'Categorías',
      name: 'Categoría |||| Categorías',
      fields: {
        id: 'ID',
        name: 'Nombre',
        parent: {
          name: 'Categoría padre'
        },
        featured: 'Destacada',
        enabled: 'Habilitado'
      }
    },
    products: {
      search: {
        name: 'Buscar nombre'
      },
      title: 'Productos',
      name: 'Producto |||| Productos',
      tabs: {
        general: 'General',
        images: 'Imágenes',
        manual: 'Manual',
        hdImages: 'Imágenes HD',
        catalogImages: 'imágenes catálogo'
      },
      fields: {
        id: 'ID',
        code: 'Código',
        name: 'Nombre',
        category: 'Categoría',
        price: 'Precio',
        description: 'Descripción',
        quantityPerPackage: 'Cantidad por bulto',
        featured: 'Destacado',
        enabled: 'Habilitado'
      }
    }
  }
};

export default messages;
