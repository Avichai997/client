import React, { useState } from 'react';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
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
import RtlProvider from 'components/RtlProvider';
import Copyright from 'components/Copyright';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('האימייל שהוזן אינו תקין')
      .required('חובה להזין כתובת אימייל'),
    password: Yup.string().required('חובה להזין סיסמה'),
  });

  const onSubmit = (values, props) => {
    alert(JSON.stringify(values), null, 2);
    props.resetForm();
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
          {(props) => (
            <Form noValidate>
              <RtlProvider>
                <Field
                  as={TextField}
                  name='email'
                  label='כתובת אימייל'
                  fullWidth
                  error={props.errors.email && props.touched.email}
                  helperText={<ErrorMessage name='email' />}
                  required
                  margin='normal'
                  type='email'
                  variant='outlined'
                  autoComplete='email'
                  style={{ direction: 'ltr' }}
                />

                <Field
                  as={TextField}
                  name='password'
                  label='סיסמא'
                  fullWidth
                  error={props.errors.password && props.touched.password}
                  helperText={<ErrorMessage name='password' />}
                  required
                  id='password'
                  className={'formInput'}
                  type={showPassword ? 'text' : 'password'}
                  variant='outlined'
                  autoComplete='current-password'
                  margin='normal'
                  style={{ direction: 'ltr' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {props.values.password ? (
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
