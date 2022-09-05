import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import RtlProvider from 'components/RtlProvider';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Box,
  Chip,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const options = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

function getStyles(option, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelect = ({ options, label }) => {
  const theme = useTheme();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const options = event.target.value;
    setSelectedOptions(
      // On autofill we get a stringified options.
      typeof options === 'string' ? options.split(',') : options
    );
  };

  return (
    <RtlProvider>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='multiple-checkbox-chip-label'>{label}</InputLabel>
        <Select
          labelId='multiple-checkbox-chip-label'
          id='multiple-checkbox-chip'
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput id='select-multiple-chip' label='Tag' />}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                height: '80px',
                overflowY: 'auto',
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selectedOptions, theme)}
            >
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </RtlProvider>
  );
};

export default MultipleSelect;
