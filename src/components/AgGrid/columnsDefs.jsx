import TextCellEditor from './cellEditors/TextCellEditor';
import ActionCellRenderer from './cellRenderers/ActionCellRenderer';
import CustomersSelectCellEditor from './cellEditors/CustomersSelectCellEditor';
import CustomersRenderer from './cellRenderers/CustomersRenderer';

const isPinnedRow = (params) =>
  params.node.rowPinned === 'top' ? true : false;

const pinnedRowHeaderFormatter = (params) => {
  if (!isPinnedRow(params)) return undefined;

  const { editable } = params.colDef;
  return editable ? `הזן ${params.colDef.headerName}...` : '';
};

const defaultColDef = {
  editable: true,
  sortable: true,
  resizable: true,
  flex: 1,
  minWidth: 80,
  // filter: true,
  filter: 'agTextColumnFilter',
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

const getColumnsDefs = ({
  page,
  customers,
  filteredCustomers,
  customersTypes,
}) => {
  const dateValueGetter = (params) => {
    // return date in format '21.8.2022, 10:08:01'
    const colName = params.colDef.field;
    return new Date(`${params.data?.[colName]}`).toLocaleString();
  };

  const customerTypeValueGetter = (params) => {
    const colName = params.colDef.field;
    const colCustomerTypeId = params.data?.[colName];
    return customersTypes?.find((type) => type.id === colCustomerTypeId)?.name;
  };

  switch (page) {
    case 'dashboards':
      return [
        {
          rowDrag: true,
          enablePivot: true,
          headerCheckboxSelection: true, // show select All checkbox
          checkboxSelection: true, // allow checkbox
          field: 'order',
          filter: 'agNumberColumnFilter',
          headerName: 'סדר',
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
          cellRenderer: CustomersRenderer,
          cellRendererParams: {
            customers,
          },
          cellEditor: CustomersSelectCellEditor,
          cellEditorPopup: true,
          // cellEditorPopupPosition: 'under',
          cellEditorParams: {
            options: filteredCustomers,
            limitTags: 2,
          },
        },
        {
          field: 'excludeShualCityId',
          headerName: 'מנע צפייה מלקוחות',
          cellRenderer: CustomersRenderer,
          cellRendererParams: {
            customers,
          },
          cellEditor: CustomersSelectCellEditor,
          cellEditorPopup: true,
          cellEditorParams: {
            options: filteredCustomers,
            limitTags: 2,
          },
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
            return {
              component: ActionCellRenderer,
              params: { isPinnedRow: isPinnedRow(params) },
            };
          },
          editable: false,
          colId: 'action',
          cellStyle: {
            justifyContent: 'center',
          },
        },
      ];
    case 'types':
      break;
    case 'customers':
      break;
    case 'users':
      break;

    default:
      break;
  }
};

export { getColumnsDefs, defaultColDef };