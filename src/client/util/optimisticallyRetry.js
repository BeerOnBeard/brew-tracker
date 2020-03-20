import deepCopy from './deepCopy';

/*
 * PUT endpoints in the API support optimistic concurrency.
 * This function encapsulates the retry logic when a PUT
 * fails because the document is out of date.
 * 
 * @param put         The awaitable PUT function.
 * @param document    The document to put.
 * @param modify      The function used to modify and return the updated document.
 *                    This will be applied before the first put.
 * @param responseKey The parameter name of the updated document in the response.
 * 
 * @returns { err, document }
 *      err: The put response, if it contains an error.
 *      document: Modified document.
 */
async function optimisticallyRetry(put, document, modify, responseKey) {
  const localDocument = modify(deepCopy(document));

  const response = await put(localDocument);
  if (response.err && response.err.statusText === 'DOCUMENT_OUT_OF_DATE') {
    return await optimisticallyRetry(put, response[responseKey], modify, responseKey);
  } else if (response.err) {
    return { err: response };
  }

  return { document: response[responseKey] };
}

export default optimisticallyRetry;
