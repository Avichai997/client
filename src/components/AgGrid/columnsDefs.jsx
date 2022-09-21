// cell renderers
import ActionCellRenderer from './cellRenderers/ActionCellRenderer';
import CustomersRenderer from './cellRenderers/CustomersRenderer';
// cell editors
import TextCellEditor from './cellEditors/TextCellEditor';
import CustomersSelectCellEditor from './cellEditors/CustomersSelectCellEditor';
import CustomersTypesSelectCellEditor from './cellEditors/CustomersTypesSelectCellEditor';
import { Box } from '@mui/material';
import { Avatar } from '@mui/material';

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
    padding: '0px 5px'
  },
  valueFormatter: pinnedRowHeaderFormatter,
};

const getColumnsDefs = ({ page, customers, customersTypes }) => {
  const getFilteredCustomers = (customers) => {
    if (!customers) return;

    return customers.map((customer) => {
      const { name, shualCityId, logo } = customer;
      return {
        name,
        shualCityId,
        logo,
      };
    });
  };

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

  const locationValueGetter = (params) => {
    const colName = params.colDef.field;
    return params.data?.[colName]?.coordinates.join(', ');
  };

  const defaultFirstColumnProps = {
    enablePivot: true,
    // headerCheckboxSelection: true, // show select All checkbox
    // checkboxSelection: true, // allow checkbox
  };

  const actionsColumnDefs = {
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
  };

  const ImageRenderer = (params) => {
    const src = params.apiUrl ? params.apiUrl + params.value : params.value;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar alt='Cindy Baker' src={src} />
      </Box>
    );
  };

  switch (page) {
    case 'dashboards':
      const filteredCustomers = getFilteredCustomers(customers);

      return [
        {
          ...defaultFirstColumnProps,
          rowDrag: true,
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
          cellStyle: {
            direction: 'ltr',
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
          cellEditor: CustomersTypesSelectCellEditor,
          cellEditorParams: {
            options: customersTypes,
          },
          width: 110,
          maxWidth: 110,
          editable: false,
        },
        {
          field: 'updatedAt',
          headerName: 'עדכון אחרון',
          valueGetter: dateValueGetter,
          width: 160,
          maxWidth: 160,
          editable: false,
        },
        {
          ...actionsColumnDefs,
        },
      ];
    case 'customers':
      return [
        {
          ...defaultFirstColumnProps,
          field: 'customerTypeId',
          headerName: 'סוג לקוח',
          valueGetter: customerTypeValueGetter,
          cellEditor: CustomersTypesSelectCellEditor,
          cellEditorParams: {
            options: customersTypes,
          },
        },
        {
          field: 'shualCityId',
          headerName: 'קוד שוע"ל',
          cellEditor: TextCellEditor,
          filter: 'agNumberColumnFilter',
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
          field: 'lamas',
          headerName: 'קוד למ"ס',
          filter: 'agNumberColumnFilter',
          cellEditor: TextCellEditor,
          cellEditorParams: {
            inputType: 'number',
          },
        },
        {
          field: 'isTraining',
          headerName: 'סביבה תרגילית',
          ellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['false', 'true'],
          },
        },
        {
          field: 'isEnabled',
          headerName: 'סביבה פעילה',
          ellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['false', 'true'],
          },
        },
        {
          field: 'logo',
          headerName: 'לוגו',
          cellRenderer: ImageRenderer,
          cellEditor: TextCellEditor,
          cellEditorParams: {
            inputType: 'url',
          },
        },
        {
          field: 'location',
          headerName: 'נ.צ. [long, lat]',
          valueGetter: locationValueGetter,
          cellStyle: { direction: 'ltr', justifyContent: 'flex-end' },
        },
        {
          field: 'updatedAt',
          headerName: 'עדכון אחרון',
          valueGetter: dateValueGetter,
          editable: false,
        },
        {
          ...actionsColumnDefs,
        },
      ];
    case 'types':
      return [
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
          field: 'updatedAt',
          headerName: 'עדכון אחרון',
          valueGetter: dateValueGetter,
          editable: false,
        },
        {
          ...actionsColumnDefs,
        },
      ];
    case 'users':
      return [
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
          field: 'email',
          headerName: 'כתובת מייל',
          cellEditor: TextCellEditor,
          cellEditorParams: {
            inputType: 'text',
            minLength: 3,
            maxLength: 40,
          },
        },
        {
          field: 'photo',
          headerName: 'תמונת פרופיל',
          cellRenderer: ImageRenderer,
          cellRendererParams: {
            // https://localhost:5000/img/users/usrename.jpeg
            apiUrl: `${process.env.REACT_APP_API_URL}/img/users/`,
          },
          cellEditor: TextCellEditor,
          cellEditorParams: {
            inputType: 'url',
          },
        },
        {
          field: 'role',
          headerName: 'הרשאות',
          cellEditor: TextCellEditor,
          cellEditorParams: {
            inputType: 'text',
            minLength: 3,
            maxLength: 40,
          },
        },
        {
          field: 'updatedAt',
          headerName: 'עדכון אחרון',
          valueGetter: dateValueGetter,
          editable: false,
        },
        {
          ...actionsColumnDefs,
        },
      ];
    default:
      break;
  }
};

export { getColumnsDefs, defaultColDef };
