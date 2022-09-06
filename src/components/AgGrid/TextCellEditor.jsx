import { TextField } from '@mui/material';
import RtlProvider from 'components/RtlProvider';
import { memo, forwardRef, useRef, useImperativeHandle } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TextEditor = memo(
  forwardRef((props, ref) => {
    const formikRef = useRef(null);
    const headerName = props.colDef.headerName;
    const inputType = props.inputType;
    const requiredMessage = 'חובה להזין שדה זה';
    const initialValues = {};
    initialValues[inputType] = props.value;

    const validationOptions = {
      text: Yup.string()
        .min(
          props.minLength,
          `שדה זה צריך להכיל לפחות ${props.minLength} תווים`
        )
        .max(
          props.maxLength,
          `שדה זה צריך להכיל ${props.maxLength} תווים לכל היותר`
        )
        .required(requiredMessage),
      url: Yup.string().url('כתובת URL לא תקינה').required(requiredMessage),
    };

    const schema = {};
    schema[inputType] = validationOptions[inputType];
    //  schema = {
      // url: Yup.string().url('כתובת URL לא תקינה').required(requiredMessage),
    // }
    const validationSchema = Yup.object().shape(schema);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
      return {
        getValue() {
          // the final value to send to the grid, on completion of editing
          return formikRef.current.values[inputType];
        },

        isCancelBeforeStart() {
          // Gets called once before editing starts, to give editor a chance to
          // cancel the editing before it even starts.
          return false;
        },
        // Gets called once when editing is finished (eg if Enter is pressed).
        // If you return true, then the result of the edit will be ignored.
        isCancelAfterEnd() {
          // our editor will reject any value shortet then 6 chars
          return !formikRef.current.isValid;
        },
      };
    });

    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          // onSubmit={onSubmit}
        >
          {(formikProps) => (
            <Form noValidate>
              <RtlProvider>
                <Field
                  as={TextField}
                  name={inputType}
                  label={headerName}
                  fullWidth
                  error={
                    formikProps.errors[inputType] &&
                    formikProps.touched[inputType]
                  }
                  helperText={<ErrorMessage name={inputType} />}
                  required
                  margin='normal'
                  type={inputType}
                  autoComplete={inputType}
                  variant='outlined'
                  style={{ margin: '10px 0px 0px 0px' }}
                  size='small'
                />
              </RtlProvider>
            </Form>
          )}
        </Formik>
      </>
    );
  })
);

export default TextEditor;
