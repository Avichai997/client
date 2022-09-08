import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import './AgGrid.scss';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_HE } from './local.he';

import TextCellEditor from './TextCellEditor';
import ActionCellRenderer from './ActionCellRenderer';
import useWindowSize from 'hooks/useWindowsSize';
import MultipleSelect from 'components/MultipleSelect';
import { useDashboards } from 'hooks/useDashboards';
import { useCustomersTypes } from 'hooks/useCustomersTypes';
import { ToastConfirmDialog, ToastError } from 'components/Toasts';

const AgGrid = () => {
  const gridRef = useRef(null);
  // default debounce is 150ms
  const [windowWidth] = useWindowSize(150);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [inputRow, setInputRow] = useState({});
  const [columnDefs, setColumnDefs] = useState([]);

  const { customersTypes } = useCustomersTypes({
    params: '?sort=shualCityId',
  });

  const { dashboards } = useDashboards({
    params: '?sort=order&customerTypeId=62ea79dbd152c7c170473ae0',
    options: { enabled: !!customersTypes },
  });

  const dateValueGetter = (params) => {
    // return date in format '21.8.2022, 10:08:01'
    const colName = params.colDef.field;
    return new Date(`${params.data[colName]}`).toLocaleString();
  };

  const customerTypeValueGetter = (params) => {
    const colName = params.colDef.field;
    const colCustomerTypeId = params.data[colName];
    return customersTypes?.find((type) => type.id === colCustomerTypeId)?.name;
  };

  const columns = [
    {
      headerCheckboxSelection: true, // show select All checkbox
      checkboxSelection: true, // allow checkbox
      rowDrag: true,
      field: 'order',
      headerName: 'סדר',
      enablePivot: true,
      editable: false,
      cellEditorParams: {
        inputType: 'number',
      },
    },
    {
      field: 'name',
      headerName: 'שם',
      cellEditor: TextCellEditor,
      cellEditorParams: {
        inputType: 'text',
        minLength: 3,
        maxLength: 40,
      },
    },
    {
      field: 'url',
      headerName: 'כתובת URL',
      cellEditor: TextCellEditor,
      cellEditorParams: {
        inputType: 'url',
      },
    },
    {
      field: 'includeShualCityId',
      headerName: 'אפשר צפייה ללקוחות',
    },
    {
      field: 'excludeShualCityId',
      headerName: 'מנע צפייה מלקוחות',
    },
    {
      field: 'customerTypeId',
      headerName: 'סוג לקוח',
      valueGetter: customerTypeValueGetter,
      width: 110,
      maxWidth: 120,
    },
    {
      field: 'updatedAt',
      headerName: 'עדכון אחרון',
      valueGetter: dateValueGetter,
      editable: false,
    },
    {
      headerName: 'פעולות',
      width: 110,
      minWidth: 110,
      maxWidth: 110,
      cellRendererSelector: (params) => {
        if (isPinnedRow(params)) {
          return undefined;
        } else {
          return {
            component: ActionCellRenderer,
          };
        }
      },
      editable: false,
      colId: 'action',
      cellStyle: {
        justifyContent: 'center',
      },
    },
  ];

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi?.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi?.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  const adjustGridSize = useCallback(() => {
    if (windowWidth > 1500) gridRef.current.api.sizeColumnsToFit();
    else autoSizeAll();
  }, [windowWidth, autoSizeAll]);

  useEffect(() => {
    adjustGridSize();
  }, [windowWidth, adjustGridSize]);

  useEffect(() => {
    if (dashboards) {
      setRowData(dashboards);
    }
  }, [dashboards]);

  useEffect(() => {
    if (customersTypes) {
      setColumnDefs(columns);
    }
  }, [customersTypes, setColumnDefs]);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_HE;
  }, []);

  const isPinnedRow = (params) => {
    return params.node.rowPinned === 'top' ? true : false;
  };

  const pinnedRowHeaderFormatter = (params) => {
    const { editable } = params.colDef;
    if (isPinnedRow(params)) {
      if (!editable) return '';

      return `${params.colDef.headerName}...`;
    }
    return undefined;
  };

  function isPinnedRowDataCompleted(params) {
    if (!isPinnedRow(params)) return;
    return columnDefs.every((def) =>
      def.editable ? inputRow[def.field] : true
    );
  }

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 80,
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      cellStyle: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      valueFormatter: pinnedRowHeaderFormatter,
    };
  }, []);

  const onGridReady = useCallback((params) => {}, []);

  // const onPageSizeChanged = useCallback(() => {
  //   const value = document.getElementById('page-size').value;
  //   gridRef.current.paginationSetPageSize(Number(value));
  // }, []);

  // const onRowSelected = useCallback((event) => {
  //   console.log(event);
  // }, []);

  const onCellEditingStopped = useCallback(
    (params) => {
      if (!isPinnedRow(params)) return;
      const allDataFilled = columnDefs.every((def) =>
        def.editable === false ? true : inputRow[def.field]
      );
      if (allDataFilled) {
        setRowData([...rowData, inputRow]);
        setInputRow({});
      }
      else {
        ToastError('לא כל השדות מולאו, הרשומה לא נשמרה.');
      }
    },
    [rowData, inputRow, columnDefs]
  );

  const onRowEditingStarted = useCallback((params) => {
    params.api.refreshCells({
      columns: ['action'],
      rowNodes: [params.node],
      force: true,
    });
  }, []);

  const onRowEditingStopped = useCallback((params) => {
    params.api.refreshCells({
      columns: ['action'],
      rowNodes: [params.node],
      force: true,
    });
  }, []);

  const onCellClicked = async (params) => {
    const columnName = params.column.colId;
    const action =
      params.event.target.parentElement.parentElement.dataset.action ||
      params.event.target.dataset.action;

    if (!action || columnName !== 'action') return;

    switch (action) {
      case 'edit':
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[1].colId,
          rowPinned: isPinnedRow(params) ? 'top' : null,
        });
        break;
      case 'delete':
        const confirmDelete = await ToastConfirmDialog({
          text: 'לא תוכל לבטל את השינויים',
          afterConfirmText: 'הרשומה נמחקה בהצלחה',
        });

        if (!confirmDelete) return;

        params.api.applyTransaction({
          remove: [params.node.data],
        });
        break;
      case 'update':
        params.api.stopEditing(false);
        break;
      case 'cancel':
        params.api.stopEditing(true);
        break;
      default:
        break;
    }
  };

  const getRowStyle = useCallback(
    ({ node }) =>
      node.rowPinned ? { fontWeight: 'bold', fontStyle: 'italic' } : undefined,
    []
  );

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        // { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agTotalRowCountComponent', align: 'center' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
  }, []);

  return (
    <>
      {/* <div className='example-header'>
        Page Size:
        <select defaultValue={'20'} onChange={onPageSizeChanged} id='page-size'>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
        <option value='200'>200</option>
        </select>
      </div> */}
      {customersTypes && (
        <MultipleSelect label='בחר סוג לקוח:' options={customersTypes} />
      )}
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          localeText={localeText}
          enableRtl={true}
          // sideBar={true}
          rowGroupPanelShow={'always'}
          // pagination={true}
          enableRangeSelection={true}
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          enableCharts={true}
          rowDragManaged={true} // row drag managed by ag-grid
          rowDragMultiRow={true}
          suppressMoveWhenRowDragging={false} // no animation on drag rows
          animateRows={true}
          paginationPageSize={20}
          // paginationAutoPageSize={true}
          statusBar={statusBar}
          rowHeight={80}
          getRowStyle={getRowStyle}
          editType={'fullRow'}
          // onRowValueChanged={onRowValueChanged}
          // onRowSelected={onRowSelected}
          onCellEditingStopped={onCellEditingStopped}
          // suppressCellFocus={true} // supress keyboard navigation
          // onCellFocused={onCellFocused}
          // suppressClickEdit={true}
          // onCellFocused={onCellFocused}
          onCellClicked={onCellClicked}
          onRowEditingStopped={onRowEditingStopped}
          onRowEditingStarted={onRowEditingStarted}
          pinnedTopRowData={[inputRow]}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </>
  );
};

export default AgGrid;
