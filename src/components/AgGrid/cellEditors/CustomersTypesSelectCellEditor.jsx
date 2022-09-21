import { memo, useState, forwardRef, useImperativeHandle } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import RtlProvider from 'utils/RtlProvider';

const CustomersTypesSelectCellEditor = forwardRef((props, ref) => {
  const [selected, setSelected] = useState(props.value);
  const headerName = props.colDef.headerName;

  /* Component Editor Lifecycle methods */
  useImperativeHandle(ref, () => {
    return {
      getValue() {
        // the final value to send to the grid, on completion of editing
        return props.options.find((option) => option.name === selected).id;
      },

      isCancelBeforeStart() {
        // Gets called once before editing starts, to give editor a chance to
        // cancel the editing before it even starts.
        return props.options ? false : true;
      },
      // Gets called once when editing is finished (eg if Enter is pressed).
      isCancelAfterEnd() {
        // our editor will reject any value formik didn't validate

        // If you return true, then the edit will be ignored. (!false)
        // If you return false, then the edit will be saved. (!true)
        return false;
      },
    };
  });

  return (
    <RtlProvider>
      <Box sx={{ minWidth: 130 }}>
        <FormControl sx={{ minWidth: 'inherit' }}>
          <InputLabel>{headerName}</InputLabel>
          <Select
            value={selected}
            label={headerName}
            onChange={(event) => setSelected(event.target.value)}
          >
            {props.options.map((option, i) => (
              <MenuItem key={i} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </RtlProvider>
  );
});

export default memo(CustomersTypesSelectCellEditor);
