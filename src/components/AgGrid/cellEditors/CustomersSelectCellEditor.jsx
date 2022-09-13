import MultipleSelect from 'components/MultipleSelect';
import { memo, useState, forwardRef, useImperativeHandle } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Checkbox, Chip } from '@mui/material';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';
import RtlProvider from 'components/RtlProvider';

const CustomersSelectCellEditor = memo(
  forwardRef((props, ref) => {
    
    const getInitialSelectedOptions = () => {
      let results = [];
      for (let index in props.value) {
        const res = props.options.find(
          (option) => option.shualCityId === props.value[index]
        );
        res && results.push(res);
      }
      return results;
    };

    const headerName = props.colDef.headerName;
    const [selectedOptions, setSelectedOptions] = useState(
      getInitialSelectedOptions
    );

    const handleChange = (event, value) => {
      setSelectedOptions(
        value.sort(function (a, b) {
          return a.shualCityId - b.shualCityId;
        })
      );
    };

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        getValue() {
          // the final value to send to the grid, on completion of editing
          return selectedOptions.map((option) => option.shualCityId);
        },

        isCancelBeforeStart() {
          // Gets called once before editing starts, to give editor a chance to
          // cancel the editing before it even starts.
          return false;
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
      <>
        <RtlProvider>
          <Autocomplete
            multiple
            disableCloseOnSelect
            size='small'
            options={props.options}
            getOptionLabel={(option) => option.name}
            // defaultValue={[props.options[0]]}
            defaultValue={selectedOptions}
            onChange={handleChange}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlank fontSize='small' />}
                  checkedIcon={<CheckBox fontSize='small' />}
                  checked={selected}
                  style={{ marginRight: '-18px' }}
                />

                <img
                  loading='lazy'
                  width='20'
                  src={option.logo}
                  alt=''
                  style={{ marginLeft: 8 }}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label={headerName} placeholder='לקוחות' />
            )}
            // renderTags={(value, getTagProps) => {
            //   const numTags = value.length;
            //   const limitTags = 2;

            //   return (
            //     <>
            //       {value.slice(0, limitTags).map((option, index) => (
            //         <Chip
            //           {...getTagProps({ index })}
            //           key={index}
            //           label={option.name}
            //         />
            //       ))}

            //       {numTags > limitTags && ` +${numTags - limitTags}`}
            //     </>
            //   );
            // }}
            sx={{ width: props.column.actualWidth, paddingTop: '10px' }}
          />
        </RtlProvider>

        {/* <MultipleSelect
          ref={selectRef}
          label={headerName}
          options={props.options}
          limitTags={props.limitTags || 5}
          sortBy={'shualCityId'}
          img={'logo'}
          style={}
        /> */}
      </>
    );
  })
);

export default CustomersSelectCellEditor;
