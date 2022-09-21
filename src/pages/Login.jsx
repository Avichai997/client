import { useState } from 'react';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RtlProvider from 'utils/RtlProvider';
import Copyright from 'components/Copyright';
import { useAuth } from 'hooks/useAuth';
import { useUser } from 'hooks/useUser';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  
  const initialValues = {
    email: '',
    password: '',
  };

  const passwordRegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('האימייל שהוזן אינו תקין')
      .required('חובה להזין כתובת אימייל'),
    password: Yup.string()
      .min(10, 'אורך הסיסמה חייב להיות 10 תווים לפחות')
      .matches(
        passwordRegExp,
        'הסיסמה חייבת לכלול אות אחת גדולה, קטנה, מספר, ותו מיוחד'
      )
      .required('חובה להזין סיסמה'),
  });

  const onSubmit = (values, props) => {
    login(values, props.resetForm);

    // props.resetForm();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component='h1' variant='h5'>
          התחבר
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form noValidate>
              <RtlProvider>
                <Field
                  as={TextField}
                  name='email'
                  label='כתובת אימייל'
                  fullWidth
                  error={formik.errors.email && formik.touched.email}
                  helperText={<ErrorMessage name='email' />}
                  required
                  margin='normal'
                  type='email'
                  variant='outlined'
                  autoComplete='email'
                  autoFocus={true}
                  style={{ direction: 'ltr' }}
                  />

                <Field
                  as={TextField}
                  name='password'
                  label='סיסמא'
                  fullWidth
                  error={formik.errors.password && formik.touched.password}
                  helperText={<ErrorMessage name='password' />}
                  required
                  id='password'
                  // className={'formInput'}
                  type={showPassword ? 'text' : 'password'}
                  variant='outlined'
                  autoComplete='current-password'
                  margin='normal'
                  style={{ direction: 'ltr' }}
                  InputProps={{
                    componentsProps: {
                      input: {
                        style: { paddingLeft: '14px' },
                      },
                      root: {
                        style: { padding: 0 },
                      },
                    },
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        style={{ position: 'absolute', right: 0 }}
                      >
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {formik.values.password ? (
                            showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )
                          ) : (
                            ''
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    style: { paddingLeft: '14px' },
                  }}
                />

                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='זכור אותי'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formik.isValid}
                >
                  התחבר
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Button href='#' variant='text'>
                      שכחת את הסיסמה?
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button href='#' variant='text'>
                      פתח חשבון
                    </Button>
                  </Grid>
                </Grid>
              </RtlProvider>
            </Form>
          )}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
