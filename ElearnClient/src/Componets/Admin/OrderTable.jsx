import React, { useEffect, useState } from 'react';
import CreateAdminInstance from '../../Axios/adminAxios';
import { useTable, usePagination, useGlobalFilter } from 'react-table';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const adminAxios = CreateAdminInstance();

  useEffect(() => {
    // Fetch orders from the backend
    adminAxios.get('/getOrders') // Adjust the URL to match your backend route
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const data = React.useMemo(() => orders, [orders]);
  const columns = React.useMemo(
    () => [
      { Header: 'Order ID', accessor: '_id' },
      { Header: 'Chapter Title', accessor: 'chapterId.tittle' },
      { Header: 'Amount', accessor: 'chapterId.amount' },
      { Header: 'User Name', accessor: 'userId.name' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Initial page size can be adjusted
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="container mx-auto my-5">
      <h2 className="text-3xl font-bold mb-3">Order List</h2>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="my-3 p-1 border border-gray-300"
      />
      <table {...getTableProps()} className="min-w-full border bg-white">
        <thead className="bg-gray-800 text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-2 px-4 text-left">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="py-2 px-4">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 flex justify-between">
        <div>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
              className="w-16 p-1 border border-gray-300"
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="ml-2 p-1 border border-gray-300"
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-2 py-1 mr-1 border">
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-2 py-1 mr-1 border">
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage} className="px-2 py-1 mr-1 border">
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-2 py-1 border">
            {'>>'}
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
