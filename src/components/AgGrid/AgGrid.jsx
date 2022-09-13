import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import './AgGrid.scss';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_HE } from './local.he';

import useWindowSize from 'hooks/useWindowsSize';
import MultipleSelect from 'components/MultipleSelect';
import { ToastConfirmDialog, ToastError } from 'components/Toasts';
import { Box, Tooltip, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import SelectBox from './SelectBox';
import { useDashboards } from 'hooks/useDashboards';
import { useCustomersTypes } from 'hooks/useCustomersTypes';
import { useCustomers } from 'hooks/useCustomers';
import { useLocation } from 'react-router-dom';
import {getColumnsDefs, defaultColDef} from './columnsDefs';

let sortActive = false;
let filterActive = false;

const AgGrid = () => {
  let location = useLocation();
  const page = location.pathname.slice(
    location.pathname.lastIndexOf('/') + 1
  );

  const gridRef = useRef(null);
  // default debounce is 150ms
  // const [windowWidth] = useWindowSize(150);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [showPinnedRow, setShowPinnedRow] = useState(false);
  const [inputRow, setInputRow] = useState({});
  const [columnDefs, setColumnDefs] = useState([]);
  const [autoPagination, setAutoPagination] = useState(true);
  
  const toggleShowPinnedRow = () => {
    setShowPinnedRow((prevState) => !prevState);
  };

  const { customersTypes } = useCustomersTypes({
    params: '?sort=-name',
  });

  const { customers } = useCustomers({
    params: '?sort=shualCityId',
  });

  const { dashboards } = useDashboards({
    params: '?sort=order&customerTypeId=62ea79dbd152c7c170473ae0',
    options: { enabled: !!customersTypes },
  });

  const filteredCustomers = useMemo(() => {
    if (!customers) return;

    return customers.map((customer) => {
      const { name, shualCityId, logo } = customer;
      return {
        name,
        shualCityId,
        logo,
      };
    });
  }, [customers]);

  const columns = [];

  // const autoSizeAll = useCallback((skipHeader) => {
  //   const allColumnIds = [];
  //   gridRef.current.columnApi?.getColumns().forEach((column) => {
  //     allColumnIds.push(column.getId());
  //   });
  //   gridRef.current.columnApi?.autoSizeColumns(allColumnIds, skipHeader);
  // }, []);

  // const adjustGridSize = useCallback(() => {
  //   if (windowWidth > 1500) {
  //     gridRef.current.api?.sizeColumnsToFit();
  //   } else {
  //     autoSizeAll();
  //   }
  // }, [windowWidth, autoSizeAll]);

  // useEffect(() => {
  //   adjustGridSize();
  // }, [windowWidth, adjustGridSize]);

  // useEffect(() => {
  //   if (dashboards) {
  //     setRowData(dashboards);
  //   }
  // }, [dashboards]);

  useEffect(() => {
    let columns;
    let rowsData;

    switch (page) {
      case 'dashboards':
        if (!customersTypes || !filteredCustomers || !dashboards) return;
        rowsData = dashboards;
        columns = getColumnsDefs({
          page,
          customers,
          filteredCustomers,
          customersTypes,
        });
        break;

      default:
        break;
    }
    setColumnDefs(columns);
    setRowData(rowsData);

    if (customersTypes && filteredCustomers) {
      // setColumnDefs(columns);
    }
  }, [page, dashboards, customers, customersTypes, filteredCustomers, setColumnDefs]);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_HE;
  }, []);

  const isPinnedRow = (params) =>
    params.node.rowPinned === 'top' ? true : false;



  const onGridReady = useCallback((params) => {}, []);

  const onRowSelected = useCallback((event) => {}, []);

  const onCellEditingStopped = useCallback(
    (params) => {
      if (!isPinnedRow(params)) return;

      const allDataFilled = columnDefs.every((def) =>
        def.editable === false ? true : inputRow[def.field]
      );
      if (allDataFilled) {
        setRowData([...rowData, inputRow]);
        setInputRow({});
        toggleShowPinnedRow();
      } else {
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
        isPinnedRow(params) && setInputRow({});
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

  // suppress row drag if either sort or filter is active
  const handleSuppressRowDrag = useCallback(() => {
    const suppressRowDrag = sortActive || filterActive;
    // console.log(
    //   `sortActive = ${sortActive}, filterActive = ${filterActive}, allowRowDrag = ${suppressRowDrag}`
    // );
    gridRef.current.api.setSuppressRowDrag(suppressRowDrag);
  }, []);

  // listen for change on sort changed
  const onSortChanged = useCallback(() => {
    const colState = gridRef.current.columnApi.getColumnState() || [];
    sortActive = colState.some((c) => c.sort);
    handleSuppressRowDrag();
  }, []);

  // listen for changes on filter changed
  const onFilterChanged = useCallback(() => {
    filterActive = gridRef.current.api.isAnyFilterPresent();
    handleSuppressRowDrag();
  }, []);

  const onRowDragMove = useCallback(
    (event) => {
      const movingNode = event.node;
      const overNode = event.overNode;
      if (!overNode) {
        console.log(overNode);
        return;
      }
      const rowNeedsToMove = movingNode !== overNode;
      if (rowNeedsToMove) {
        // the list of rows we have is data, not row nodes, so extract the data
        const movingData = movingNode.data;
        const overData = overNode.data;
        const fromIndex = rowData.indexOf(movingData);
        const toIndex = rowData.indexOf(overData);
        const newStore = rowData.slice();
        moveInArray(newStore, fromIndex, toIndex);
        // rowData = newStore;
        setRowData(newStore);
        gridRef.current.api.clearFocusedCell();
      }
      function moveInArray(arr, fromIndex, toIndex) {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
    },
    [rowData]
  );

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          m: 1,
        }}
      >
        {customersTypes && (
          <MultipleSelect
            label='הצג דשבורדים של לקוחות:'
            options={customersTypes}
            limitTags={3}
          />
        )}

        <Box sx={{ display: 'flex' }}>
          <SelectBox
            autoPagination={autoPagination}
            setAutoPagination={setAutoPagination}
            label='מספר רשומות להצגה'
            options={['התאם למסך' ,5 ,10, 20, 30, 50, 100]}
            gridRef={gridRef}
          />

          <Tooltip title='הוסף רשומה'>
            <IconButton onClick={toggleShowPinnedRow}>
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          // grid properties
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // sideBar={true}
          rowGroupPanelShow={'always'}
          enableRangeSelection={true}
          enableCharts={true}
          // Style
          localeText={localeText}
          enableRtl={true}
          animateRows={true}
          rowHeight={80}
          getRowStyle={getRowStyle}
          // Editing
          editType={'fullRow'}
          pinnedTopRowData={showPinnedRow ? [inputRow] : []}
          onRowEditingStopped={onRowEditingStopped}
          onRowEditingStarted={onRowEditingStarted}
          onCellClicked={onCellClicked}
          onCellEditingStopped={onCellEditingStopped}
          suppressClickEdit={false} // disable double/single click to edit a row
          // Dragging
          rowDragManaged={false} // row drag managed by ag-grid. dragging won't work with pagination' filtering' sorting etc...
          rowDragMultiRow={true} // enable row dragging and multi-row dragging
          // suppressRowDrag={true} // prevent row dragging when sorting or filtering is active
          // suppressMoveWhenRowDragging={false} // false = play animation on drag rows
          onSortChanged={onSortChanged}
          onFilterChanged={onFilterChanged}
          onRowDragMove={onRowDragMove}
          getRowId={getRowId}
          // Selection
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          onRowSelected={onRowSelected}
          // pagination
          pagination={true}
          // paginationPageSize={10}
          paginationAutoPageSize={autoPagination} // display number of viewed rows auto

          statusBar={statusBar}
          // onRowValueChanged={onRowValueChanged}
          // suppressCellFocus={true} // supress keyboard navigation
          // onCellFocused={onCellFocused}
          // onCellFocused={onCellFocused}

          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </>
  );
};

export default AgGrid;
