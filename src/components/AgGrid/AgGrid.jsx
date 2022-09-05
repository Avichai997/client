import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import './AgGrid.scss';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AG_GRID_LOCALE_HE } from './local.he';
import TextCellEditor from './TextCellEditor';
import useWindowSize from 'hooks/useWindowsSize';
import { useDashboards } from 'hooks/useDashboards';
import MultipleSelect from 'components/MultipleSelect';
// import { LicenseManager } from 'ag-grid-enterprise';
// LicenseManager.setLicenseKey(
//   '[TRIAL]_16_May_2020_[v2]_MTU4OTU4NzIwMDAwMA==b03f1f5b63303eabbc3b42a734fcc666'
// );

const AgGrid = () => {
  const customerTypeId = '62ea79dbd152c7c170473ae0';
  const { dashboards } = useDashboards({
    params: '?sort=order&customerTypeId=62ea79dbd152c7c170473ae0',
    options: { enabled: !!customerTypeId },
  });

  const [gridApi, setGridApi] = useState();
  const [windowWidth] = useWindowSize(150); // default debounce is 150ms

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [windowWidth, gridApi]);

  useEffect(() => {
    if (dashboards) {
      console.log(dashboards);
      setRowData(dashboards);
    }
  }, [dashboards]);

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerCheckboxSelection: true, // show select All checkbox
      checkboxSelection: true,
      rowDrag: true,
      field: 'order',
      headerName: 'סדר',
      filterParams: { buttons: ['apply', 'cancel'] },
      enablePivot: true,
      cellEditor: TextCellEditor,
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
      filterParams: { buttons: ['clear', 'reset', 'apply', 'cancel'] },
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
      headerName: 'אפשר צפייה ללקוחות',
    },
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
      cellStyle: { height: '100%' },
    };
  }, []);

  const onGridReady = useCallback((params) => {
    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .then((resp) => resp.json())
    //   .then((data) => setRowData(data));

    setGridApi(params.api);
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById('page-size').value;
    gridApi.paginationSetPageSize(Number(value));
  }, []);

  const onRowValueChanged = useCallback((event) => {
    console.log(event);
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
        <select defaultValue={'20'} onChange={onPageSizeChanged} id='page-size'>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='200'>200</option>
        </select>
      </div>

      <MultipleSelect label='בחר סוג לקוח:' options={['100', '101', '102']} />

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
          editType={'fullRow'}
          // onRowValueChanged={onRowValueChanged}
          rowEditingStopped={onRowValueChanged}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default AgGrid;
