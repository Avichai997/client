import { TextField } from '@mui/material';
import {
  memo,
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from 'react';

const TextEditor = memo(
  forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const [isValid, setIsValid] = useState(null);
    const refInput = useRef(null);

    const validate = (value) => {
      return value.length === 6;
    };

    useEffect(() => {
      // refInput.current.querySelector('input').value
      refInput.current.querySelector('input').focus(); // focus on the input
    }, []);

    useEffect(() => {
      if (validate(value)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }, [value]);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          // this simple editor doubles any value entered into the input
          return value;
        },

        // Gets called once before editing starts, to give editor a chance to
        // cancel the editing before it even starts.
        isCancelBeforeStart() {
          return false;
        },
        // Gets called once when editing is finished (eg if Enter is pressed).
        // If you return true, then the result of the edit will be ignored.
        isCancelAfterEnd() {
          // our editor will reject any value shortet then 6 chars
          return !validate(value);
        },
      };
    });

    return (
      <TextField
        ref={refInput}
        error={!isValid}
        // id='standard-error-helper-text'
        label='Name'
        defaultValue={value}
        helperText='Incorrect entry.'
        variant='standard'
        onChange={(event) => setValue(event.target.value)}
      />

      // <input
      //   type='text'
      //   ref={refInput}
      //   value={value}
      //   onChange={(event) => setValue(event.target.value)}
      //   style={{ width: '100%' }}
      // />
    );
  })
);

export default TextEditor;
