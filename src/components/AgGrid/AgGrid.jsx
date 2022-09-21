import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import './AgGrid.scss';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_HE } from './local.he';

// import useWindowSize from 'hooks/useWindowsSize';
import MultipleSelect from 'components/MultipleSelect';
import { ToastConfirmDialog, ToastError } from 'components/Toasts';
import { Box, Tooltip, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import SelectBox from './SelectBox';
import { useDashboards } from 'hooks/useDashboards';
import { useCustomersTypes } from 'hooks/useCustomersTypes';
import { useCustomers } from 'hooks/useCustomers';
import { useLocation } from 'react-router-dom';
import { getColumnsDefs, defaultColDef } from './columnsDefs';
import { useUsers } from 'hooks/useUsers';

let sortActive = false;
let filterActive = false;

const AgGrid = () => {
  const location = useLocation();
  const page = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
  const gridRef = useRef(null);
  // default debounce is 150ms
  // const [windowWidth] = useWindowSize(150);
  const [rowsData, setRowsData] = useState([]);
  const [columnsDefs, setColumnsDefs] = useState([]);
  const [showPinnedRow, setShowPinnedRow] = useState(false);
  const [inputRow, setInputRow] = useState({});
  const [autoPagination, setAutoPagination] = useState(true);

  const toggleShowPinnedRow = () => {
    setShowPinnedRow((prevState) => !prevState);
  };

  const { customersTypes } = useCustomersTypes({
    params: '?sort=-name',
  });
  const { dashboards } = useDashboards({
    params: '?sort=order&customerTypeId=62ea79dbd152c7c170473ae0',
    options: { enabled: !!customersTypes },
  });
  const { customers } = useCustomers({
    params: '?sort=shualCityId',
  });
  const { users } = useUsers();

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
  //     setRowsData(dashboards);
  //   }
  // }, [dashboards]);

  const changePageData = useCallback(({ rowsData, columnsDefs }) => {
    columnsDefs = getColumnsDefs(columnsDefs);
    setColumnsDefs(columnsDefs);
    setRowsData(rowsData);
  }, []);

  useEffect(() => {
    switch (page) {
      case 'dashboards':
        if (!customersTypes || !dashboards) return;
        changePageData({
          rowsData: dashboards,
          columnsDefs: {
            page,
            customers,
            customersTypes,
          },
        });
        break;

      case 'customers':
        if (!customersTypes) return;
        changePageData({
          rowsData: customers,
          columnsDefs: {
            page,
            customersTypes,
          },
        });
        break;

      case 'types':
        if (!customersTypes) return;
        changePageData({
          rowsData: customers,
          columnsDefs: {
            page,
            customersTypes,
          },
        });
        break;

      case 'users':
        if (!users) return;
        changePageData({
          rowsData: users,
          columnsDefs: {
            page,
            users,
          },
        });
        break;

      default:
        break;
    }
  }, [page, dashboards, customers, customersTypes, changePageData]);

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

      const allDataFilled = columnsDefs.every((def) =>
        def.editable === false ? true : inputRow[def.field]
      );
      if (allDataFilled) {
        setRowsData([...rowsData, inputRow]);
        setInputRow({});
        toggleShowPinnedRow();
      } else {
        ToastError('לא כל השדות מולאו, הרשומה לא נשמרה.');
      }
    },
    [rowsData, inputRow, columnsDefs]
  );

  const onRowEditingStarted = useCallback((params) => {
    params.api.refreshCells({
      columns: ['action'],
      rowNodes: [params.node],
      // force: true,
    });
  }, []);

  const onRowEditingStopped = useCallback((params) => {
    console.log(params);
    params.api.refreshCells({
      columns: ['action'],
      rowNodes: [params.node],
      // force: true,
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
  }, [handleSuppressRowDrag]);

  // listen for changes on filter changed
  const onFilterChanged = useCallback(() => {
    filterActive = gridRef.current.api.isAnyFilterPresent();
    handleSuppressRowDrag();
  }, [handleSuppressRowDrag]);

  const onRowDragMove = useCallback(
    (event) => {
      const movingNode = event.node;
      const overNode = event.overNode;
      const rowNeedsToMove = movingNode !== overNode;
      if (!overNode || !rowNeedsToMove) return;

      // the list of rows we have is data, not row nodes, so extract the data
      const movingData = movingNode.data;
      const overData = overNode.data;
      const fromIndex = rowsData.indexOf(movingData);
      const toIndex = rowsData.indexOf(overData);
      const newStore = rowsData.slice();
      moveInArray(newStore, fromIndex, toIndex);
      setRowsData(newStore);
      gridRef.current.api.clearFocusedCell();

      function moveInArray(arr, fromIndex, toIndex) {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
    },
    [rowsData]
  );
  const onRowDragEnd = useCallback((event) => {
    let fromIndex = event.node.data.order - 1;
    let toIndex = event.overIndex;
    let updatedRows = [];
    const newStore = gridRef.current.props.rowData.slice();
    if (fromIndex > toIndex) {
      [fromIndex, toIndex] = [toIndex, fromIndex];
    }

    for (let i = fromIndex; i <= toIndex; i++) {
      newStore[i].order = i + 1;
      updatedRows.push(newStore[i]);
    }

    setRowsData(newStore);
    gridRef.current.api.refreshCells({
      columns: ['order'],
      rowNodes: updatedRows,
      force: true,
    });

    console.log(updatedRows);
  }, []);

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
        {page === 'dashboards' && customersTypes ? (
          <MultipleSelect
            label='הצג דשבורדים של לקוחות:'
            options={customersTypes}
            limitTags={3}
          />
        ) : <div/>}

        <Box sx={{ display: 'flex' }}>
          <SelectBox
            autoPagination={autoPagination}
            setAutoPagination={setAutoPagination}
            label='מספר רשומות להצגה'
            options={['התאם למסך', 5, 10, 20, 30, 50, 100]}
            gridRef={gridRef}
          />

          <Tooltip title='הוסף רשומה'>
            <IconButton onClick={toggleShowPinnedRow}>
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <div className='ag-theme-alpine agGrid'>
        <AgGridReact
          // grid properties
          ref={gridRef}
          rowData={rowsData}
          columnDefs={columnsDefs}
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
          rowDragMultiRow={true} // enable row dragging and multi-row dragging
          rowDragManaged={false} // row drag managed by ag-grid. dragging won't work with pagination' filtering' sorting etc...
          // suppressRowDrag={true} // prevent row dragging when sorting or filtering is active
          // suppressMoveWhenRowDragging={false} // false = play animation on drag rows
          onSortChanged={onSortChanged}
          onFilterChanged={onFilterChanged}
          onRowDragMove={onRowDragMove}
          onRowDragEnd={onRowDragEnd}
          getRowId={getRowId}
          // Selection
          rowSelection={'multiple'}
          // suppressRowClickSelection={true}
          // onRowSelected={onRowSelected}
          // pagination
          pagination={true}
          // paginationPageSize={10}
          paginationAutoPageSize={autoPagination} // display number of viewed rows auto
          statusBar={statusBar}
          // onRowValueChanged={onRowValueChanged}
          // suppressCellFocus={true} // supress keyboard navigation
          // onCellFocused={onCellFocused}
          // onCellFocused={onCellFocused}
          // enableCellChangeFlash={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </>
  );
};

export default AgGrid;
