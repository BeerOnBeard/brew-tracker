import optimisticallyRetry from './optimisticallyRetry';

describe('Optimistically Retry Tests', () => {
  it('Should not modify the original document', async () => {
    const originalValue = 'originalValue';
    const modifiedValue = 'modified';

    const originalDocument = { prop: originalValue };

    const responseKey = 'doc';
    const mockPut = doc => Promise.resolve({ [responseKey]: doc });

    const result = await optimisticallyRetry(
      mockPut,
      originalDocument,
      doc => {
        doc.prop = modifiedValue;
        return doc;
      },
      responseKey
    );

    expect(originalDocument.prop).toEqual(originalValue);
    expect(result.document.prop).toEqual(modifiedValue);
  });

  it('Should retry if the document is out of date', async () => {
    const modifiedValue = 'modified';
    const originalDoc = { prop: 'original value' };
    const responseKey = 'doc';

    const mockPut = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        err: { statusText: 'DOCUMENT_OUT_OF_DATE' },
        [responseKey]: { prop: 'updated value' }
      }))
      .mockImplementationOnce(doc => Promise.resolve({ [responseKey]: doc }));
    
    const result = await optimisticallyRetry(
      mockPut,
      originalDoc,
      doc => {
        doc.prop = modifiedValue;
        return doc;
      },
      responseKey
    );

    expect(result.document).toBeDefined();
    expect(result.document.prop).toEqual(modifiedValue);
  });

  it('Should return the response if the error does not imply an out of date document', async () => {
    const errorMessage = 'uh oh!';
    const mockPut = () => Promise.resolve({ err: errorMessage });
    const result = await optimisticallyRetry(
      mockPut,
      { prop: 'will not be updated' },
      doc => { return doc; },
      'does not matter'
    );

    expect(result.err).toBeDefined();
    expect(result.err.err).toEqual(errorMessage);
  });
});
