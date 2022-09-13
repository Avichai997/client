import { useRef, memo } from 'react';

const CustomersRenderer = (params) => {
  if (!params.customers) return;
  const colName = params.colDef.field; // excludeShualCityId || includeShualCityId
  const colData = params.data?.[colName];

  let results = [];
  for (let index in colData) {
    const customerName = params.customers.find(
      (customer) => customer.shualCityId === colData[index]
    )?.name;
    customerName && results.push(customerName);
  }
  return <span>{results.join(', ')}</span>;
};

export default memo(CustomersRenderer);
