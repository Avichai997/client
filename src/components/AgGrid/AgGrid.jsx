import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import './AgGrid.scss';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import "ag-grid-community/styles/ag-theme-material.css";

import { AG_GRID_LOCALE_HE } from './local.he';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey(
  '[TRIAL]_16_May_2020_[v2]_MTU4OTU4NzIwMDAwMA==b03f1f5b63303eabbc3b42a734fcc666'
);

class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node.id;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const AgGrid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'ID',
      cellRenderer: NodeIdRenderer,
      headerCheckboxSelection: true, // show select All checkbox
      checkboxSelection: true,
      rowDrag: true,
    },
    {
      field: 'athlete',
      filterParams: { buttons: ['clear', 'reset', 'apply'] },
    },
    {
      field: 'age',
      filterParams: { buttons: ['apply', 'cancel'] },
      enablePivot: true,
    },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    {
      field: 'sport',
      // filter: "agMultiColumnFilter",
      // filterParams: {
      //   filters: [
      //     {
      //       filter: "agTextColumnFilter",
      //       display: "accordion",
      //     },
      //     {
      //       filter: "agSetColumnFilter",
      //       display: "accordion",
      //     },
      //   ],
      // },
    },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_HE;
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

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
    <div style={containerStyle}>
      <div className='example-header'>
        Page Size:
        <select onChange={onPageSizeChanged} id='page-size'>
          <option value='10'>10</option>
          <option value='20' selected={true}>
            20
          </option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='200'>200</option>
        </select>
      </div>

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
          // suppressMoveWhenRowDragging={false} // no animation on drag rows
          animateRows={true}
          paginationPageSize={20}
          // paginationAutoPageSize={true}
          statusBar={statusBar}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AgGrid;
