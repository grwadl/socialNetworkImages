import * as yup from 'yup';
export const validationSchema = yup.object().shape({
    Password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(15,'Password should be shorter than 15'),
    Login: yup.string().required('This field is required'),

});