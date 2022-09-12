import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Checkbox, Chip } from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import RtlProvider from 'components/RtlProvider';

const MultipleSelect = forwardRef(
  ({ options, label, limitTags = 2, style }, ref) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChange = (event, value) => {
      setSelectedOptions(value);
    };

    useImperativeHandle(
      ref,
      () => ({
        getSelectedOptions: () => {
          return selectedOptions;
        },
      }),
      [selectedOptions]
    );

    return (
      <RtlProvider>
        <Autocomplete
          multiple
          limitTags={limitTags}
          disableCloseOnSelect
          size='small'
          options={options}
          getOptionLabel={(option) => option.name}
          defaultValue={[options[0]]}
          onChange={handleChange}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize='small' />}
                checkedIcon={<CheckBox fontSize='small' />}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label={label} placeholder='לקוחות' />
          )}
          sx={style}
        />
      </RtlProvider>
    );
  }
);

export default MultipleSelect;
