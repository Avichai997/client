import { TextField } from '@mui/material';
import RtlProvider from 'components/RtlProvider';
import { memo, forwardRef, useRef, useImperativeHandle } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TextEditor = memo(
  forwardRef((props, ref) => {
    // const [value, setValue] = useState(props.value);
    // const [isValid, setIsValid] = useState(null);
    const refInput = useRef(null);
    const headerName = props.colDef.headerName;
    const initialValue = props.value;
    console.log(refInput);
    const initialValues = {
      text: initialValue,
    };

    const validationSchema = Yup.object().shape({
      text: Yup.string().required('חובה להזין שדה זה'),
    });

    const onSubmit = (values, props) => {
      // alert(JSON.stringify(values), null, 2);
      // props.resetForm();
    };

    const validate = (value) => {
      return value.length === 6;
    };

    // useEffect(() => {
    //   // refInput.current.querySelector('input').value
    //   refInput.current.querySelector('input').focus(); // focus on the input
    // }, []);

    // useEffect(() => {
    //   if (validate(value)) {
    //     setIsValid(true);
    //   } else {
    //     setIsValid(false);
    //   }
    // }, [value]);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        // the final value to send to the grid, on completion of editing
        getValue() {
          // this simple editor doubles any value entered into the input
          return refInput.current.values.text;
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
          return !refInput.current.isValid;
        },
      };
    });

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={refInput}
          // onSubmit={onSubmit}
        >
          {(props) => (
            <Form noValidate>
              <RtlProvider>
                <Field
                  as={TextField}
                  name='text'
                  label={headerName}
                  fullWidth
                  error={props.errors.text && props.touched.text}
                  helperText={<ErrorMessage name='text' />}
                  required
                  margin='normal'
                  type='text'
                  variant='outlined'
                  style={{ margin: '10px 0px 0px 0px' }}
                  size='small'
                />
              </RtlProvider>
            </Form>
          )}
        </Formik>

        {/* <RtlProvider>
          <TextField
            ref={refInput}
            error={!isValid}
            // id='standard-error-helper-text'
            label={props.colDef.headerName}
            defaultValue={value}
            helperText='Incorrect entry.'
            // variant='standard'
            variant='outlined'
            name='email'
            fullWidth
            required
            margin='normal'
            type='text'
            autoComplete='email'
            style={{ margin: '10px 0px 0px 0px' }}
            size='small'
            onChange={(event) => setValue(event.target.value)}
          />
        </RtlProvider> */}
      </>
    );
  })
);

export default TextEditor;
