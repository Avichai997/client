import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RtlProvider from 'components/RtlProvider';

const SelectBox = ({
  autoPagination,
  setAutoPagination,
  label,
  options = [],
  gridRef,
}) => {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {

    if (selected === 'התאם למסך') {
      if (autoPagination) return;

      setAutoPagination(true);
      return;
    }

    setAutoPagination(false);
    gridRef.current.api?.paginationSetPageSize(+selected);
  }, [autoPagination, setAutoPagination, selected, gridRef]);

  return (
    <RtlProvider>
      <Box sx={{ minWidth: 130 }}>
        <FormControl sx={{ minWidth: 'inherit' }}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={selected}
            label={label}
            onChange={(event) => setSelected(event.target.value)}
          >
            {options.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </RtlProvider>
  );
};

export default SelectBox;
