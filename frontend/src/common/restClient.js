import {
  COUNT,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils
} from 'admin-on-rest';

const API_URL = process.env.REACT_APP_API_URL;

const prepareFilters = params => {
  let filters = params.filter;
  for (var filter in params.filter) {
    if (!params.filter.hasOwnProperty(filter)) continue;
    // TODO: This is only for strings! :)
    // Need to handle the remaining data types
    if (typeof params.filter[filter] === 'string') {
      filters[filter] = { contains: params.filter[filter] };
    }
  }
  return { filters };
};

const prepareBody = params => {
  let body = params.data;
  for (var property in params.data) {
    if (!params.data.hasOwnProperty(property)) continue;
    if (params.data[property] === null) continue;
    if (Array.isArray(params.data[property])) continue;
    if (typeof params.data[property] !== 'object') continue;
    body[property] = params.data[property].id;
  }
  return { body };
};

const prepareSort = params => {
  const { field, order } = params.sort;
  let dotIndex = field.indexOf('.');
  let sortField = field;
  if (dotIndex > 0) {
    sortField = field.substr(0, dotIndex);
  }
  let sort = sortField + ' ' + order;
  return { sort };
};

const preparePagination = params => {
  const { page, perPage } = params.pagination;
  let skip = (page - 1) * perPage;
  let limit = perPage;
  return { skip, limit };
};

const prepareOptions = () => {
  const options = {};
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);

  return { options };
};

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
  let url = '';
  const { queryParameters } = fetchUtils;
  const { options } = prepareOptions();
  switch (type) {
    case COUNT: {
      const { filters } = prepareFilters(params);
      const query = {
        where: JSON.stringify(filters)
      };
      url = `${API_URL}/${resource}/count?${queryParameters(query)}`;
      break;
    }
    case GET_LIST: {
      const { filters } = prepareFilters(params);
      const { sort } = prepareSort(params);
      const { skip, limit } = preparePagination(params);
      const query = {
        sort: sort,
        skip: JSON.stringify(skip),
        limit: JSON.stringify(limit),
        where: JSON.stringify(filters)
      };
      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_ONE:
      if (params.id === null || typeof params.id === 'object') return;
      url = `${API_URL}/${resource}/${params.id}`;
      break;
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids })
      };
      url = `${API_URL}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;

      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id })
      };
      url = `${API_URL}/${resource}`; //?${queryParameters(query)}
      break;
    }
    case UPDATE:
      url = `${API_URL}/${resource}/${params.id}`;
      options.method = 'PUT';

      const { body } = prepareBody(params);
      options.body = JSON.stringify(body);

      break;
    case CREATE:
      url = `${API_URL}/${resource}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${API_URL}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
  return { url, options };
};

const getFilenameFromUrl = url => url.substring(url.lastIndexOf('/') + 1);
const convertUrlToFileInput = urls => {
  urls = !Array.isArray(urls) && urls !== null ? [urls] : urls;
  return (urls || []).map(url => ({
    src: url ? url : '',
    title: getFilenameFromUrl(url ? url : '')
  }));
};
const convertProductResponseToREST = json => ({
  ...json,
  image: convertUrlToFileInput(json.image),
  singleImage: json.image
});

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @param {Object} count Rest response count.
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params, count) => {
  const { headers, json } = response;
  switch (type) {
    case COUNT:
      return json.count;
    case GET_ONE:
      if (resource === 'products') {
        return { data: convertProductResponseToREST(json) };	
      } else {	
        return { data: json };	
      }
    case GET_LIST:
      if (resource === 'products') {
        return { data: json.map(convertProductResponseToREST), total: count };	
      } else {	
        return { data: json.map(x => x), total: count };	
      }
    case CREATE:
    case UPDATE:
      if (resource === 'products') {	      
        return { data: convertProductResponseToREST(json) };	
      } else {	
        return { data: json };	
      }
    default:
      return { data: json };
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @param {Object} count Rest response count.
 * @returns {Promise} the Promise for a REST response
 */
const executeRequest = (type, resource, params, count) => {
  const { fetchJson } = fetchUtils;
  const { url, options } = convertRESTRequestToHTTP(type, resource, params);

  return fetchJson(url, options).then(response => {
    return convertHTTPResponseToREST(response, type, resource, params, count);
  });
};

const uploadFile = file => {
  return new Promise((resolve, reject) =>{

    var formData = new FormData();
    formData.append('file', file.rawFile);

    return fetch(API_URL + '/products/upload', {
      // content-type header should not be specified!
      method: 'POST',
      body: formData
    }).then(response => response.json()).then(resolve).catch(reject)
  });
};

const updateProduct = (type, resource, params) => {
  const product = params.data;
  let imageToSave;
  if (product.image && product.image.length > 0){
    imageToSave = product.image[0];
  }

  console.log(product);

  if (!imageToSave) return executeRequest(type, resource, params);

  return uploadFile(imageToSave).then((uploadResult) => ({
      ...params,
      data: {
        ...params.data,
        image: uploadResult.fileName.length > 0 ? API_URL + '/' + uploadResult.fileName : product.singleImage
      }
    }))
    .then(params => executeRequest(type, resource, params));
}

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;

  switch (type) {
    case CREATE:
    case UPDATE:
      if (resource === 'products') {
       return updateProduct(type, resource, params);
      }
    case GET_LIST: {
      //We first need to retrieve count, then find elements
      const { url, options } = convertRESTRequestToHTTP(
        COUNT,
        resource,
        params
      );
      if (url == '') return;

      return fetchJson(url, options).then(response => {
        var count = convertHTTPResponseToREST(
          response,
          COUNT,
          resource,
          params,
          null
        );
        return executeRequest(type, resource, params, count);
      });
    }
    default: {
      return executeRequest(type, resource, params, null);
    }
  }
};
