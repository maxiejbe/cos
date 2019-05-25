import { UPDATE } from 'admin-on-rest';

export const CLIENT_APPROVE = 'CLIENT_APPROVE';
export const CLIENT_APPROVE_LOADING = 'CLIENT_APPROVE_LOADING';
export const CLIENT_APPROVE_FAILURE = 'CLIENT_APPROVE_FAILURE';
export const CLIENT_APPROVE_SUCCESS = 'CLIENT_APPROVE_SUCCESS';

export const clientApprove = (id, data, basePath) => ({
  type: CLIENT_APPROVE,
  payload: {
    id,
    data: {
      ...data,
      status: 'APROBADO'
    },
    basePath
  },
  meta: {
    resource: 'clients',
    fetch: UPDATE,
    cancelPrevious: false
  },
});

export const CLIENT_REJECT = 'CLIENT_REJECT';
export const CLIENT_REJECT_LOADING = 'CLIENT_REJECT_LOADING';
export const CLIENT_REJECT_FAILURE = 'CLIENT_REJECT_FAILURE';
export const CLIENT_REJECT_SUCCESS = 'CLIENT_REJECT_SUCCESS';

export const clientReject = (id, data, basePath) => ({
  type: CLIENT_REJECT,
  payload: {
    id,
    data: {
      ...data,
      status: 'RECHAZADO'
    },
    basePath
  },
  meta: {
    resource: 'clients',
    fetch: UPDATE,
    cancelPrevious: false
  },
});