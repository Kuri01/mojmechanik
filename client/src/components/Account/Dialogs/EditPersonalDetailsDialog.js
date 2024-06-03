import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../../api/Client.ts';

const apiClient = new ApiClient();

const EditPersonalDetailsDialog = ({ open, onClose, details }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: details,
    });
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const { mutateAsync: putUser, isPending } = useMutation({
        mutationFn: (data) => apiClient.putUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['user', 'personal-details']);
            enqueueSnackbar('Dane osobowe zostały zaktualizowane', { variant: 'success' });
            onClose();
        },
        onError: () => {
            enqueueSnackbar('Wystąpił błąd podczas aktualizacji danych osobowych', { variant: 'error' });
            onClose();
        },
    });

    const onSubmit = async (data) => {
        await putUser(data);
    };

    useEffect(() => {
        reset(details);
    }, [details, reset]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edytuj dane osobowe</DialogTitle>
            <DialogContent>
                <Controller
                    name='name'
                    control={control}
                    rules={{ required: 'Imię jest wymagane' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Imię'
                            fullWidth
                            margin='normal'
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    name='surname'
                    control={control}
                    rules={{ required: 'Nazwisko jest wymagane' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Nazwisko'
                            fullWidth
                            margin='normal'
                            error={!!errors.surname}
                            helperText={errors.surname?.message}
                        />
                    )}
                />
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: 'E-mail jest wymagany',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Nieprawidłowy adres e-mail',
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='E-mail'
                            fullWidth
                            margin='normal'
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isPending}>
                    Anuluj
                </Button>
                <LoadingButton onClick={handleSubmit(onSubmit)} loading={isPending} variant='contained' color='primary'>
                    Zapisz
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditPersonalDetailsDialog;
