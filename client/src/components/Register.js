import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Container, Typography, Box, Link, Backdrop, Alert, AlertTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { registerUser } from '../api';

const schema = yup.object().shape({
    name: yup.string().required('Imię jest wymagane').min(2, 'Imię musi mieć co najmniej 2 znaki'),
    surname: yup.string().required('Nazwisko jest wymagane').min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
    email: yup.string().required('Email jest wymagany').email('Nieprawidłowy format email'),
    password: yup.string().required('Hasło jest wymagane').min(6, 'Hasło musi mieć co najmniej 6 znaków'),
    street: yup.string().required('Ulica jest wymagana'),
    city: yup.string().required('Miasto jest wymagane'),
    buildingNo: yup.string().required('Numer budynku jest wymagany'),
    localNo: yup.string(),
    postCode: yup
        .string()
        .required('Kod pocztowy jest wymagany')
        .matches(/^\d{2}-\d{3}$/, 'Nieprawidłowy format kodu pocztowego'),
});

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            setOpenBackdrop(true);
        },
        onError: () => {
            enqueueSnackbar('Wystąpił błąd podczas rejestracji', { variant: 'error' });
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const handleNavigateToLogin = () => {
        setOpenBackdrop(false);
        navigate('/');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage:
                    'url(https://files.oaiusercontent.com/file-yeafuKJIRURwVj1LzEGp68X5?se=2024-05-31T11%3A12%3A37Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D8e448096-57e4-45ee-84aa-6d450fcf969c.webp&sig=6jmxIp5bL7gUsnIDRz7JYoE0Okx4hJdhh/ldLkzicmg%3D)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backdropFilter: 'blur(5px)',
            }}
        >
            <Container maxWidth='xs' sx={{ bgcolor: 'white', p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant='h4' component='h1' gutterBottom align='center'>
                    Rejestracja
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label='Imię'
                        fullWidth
                        name='name'
                        margin='normal'
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label='Nazwisko'
                        fullWidth
                        name='surname'
                        margin='normal'
                        {...register('surname')}
                        error={!!errors.surname}
                        helperText={errors.surname?.message}
                    />
                    <TextField
                        label='Email'
                        type='email'
                        name='email'
                        fullWidth
                        margin='normal'
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label='Hasło'
                        type='password'
                        name='password'
                        fullWidth
                        margin='normal'
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        label='Ulica'
                        name='street'
                        fullWidth
                        margin='normal'
                        {...register('street')}
                        error={!!errors.street}
                        helperText={errors.street?.message}
                    />
                    <TextField
                        label='Miasto'
                        name='city'
                        fullWidth
                        margin='normal'
                        {...register('city')}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />
                    <TextField
                        label='Numer budynku'
                        name='buildingNo'
                        fullWidth
                        margin='normal'
                        {...register('buildingNo')}
                        error={!!errors.buildingNo}
                        helperText={errors.buildingNo?.message}
                    />
                    <TextField
                        label='Numer lokalu'
                        name='localNo'
                        fullWidth
                        margin='normal'
                        {...register('localNo')}
                        error={!!errors.localNo}
                        helperText={errors.localNo?.message}
                    />
                    <TextField
                        label='Kod pocztowy'
                        name='postCode'
                        fullWidth
                        margin='normal'
                        {...register('postCode')}
                        error={!!errors.postCode}
                        helperText={errors.postCode?.message}
                    />
                    <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 3 }} disabled={mutation.isLoading}>
                        Zarejestruj się
                    </Button>
                </form>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant='body2'>
                        Masz już konto?{' '}
                        <Link href='/' variant='body2'>
                            Zaloguj się
                        </Link>
                    </Typography>
                </Box>
            </Container>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openBackdrop}>
                <Alert severity='success' variant='filled' sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                    <AlertTitle>Rejestracja powiodła się!</AlertTitle>
                    <Button variant='contained' color='primary' onClick={handleNavigateToLogin}>
                        Przejdź do logowania
                    </Button>
                </Alert>
            </Backdrop>
        </Box>
    );
};

export default Register;
