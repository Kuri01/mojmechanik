import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import ApiClient from "../../../api/Client.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apiClient = new ApiClient();

/**
 * Komponent dialogowy do edycji danych adresowych.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {boolean} props.open - Czy dialog jest otwarty.
 * @param {function} props.onClose - Funkcja zamykająca dialog.
 * @param {Object} props.details - Domyślne wartości formularza.
 */

const EditAddressDetailsDialog = ({ open, onClose, details }) => {
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

  const { mutateAsync: putUserAddress, isPending } = useMutation({
    mutationFn: (data) => apiClient.putUserAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "address-details"]);
      enqueueSnackbar("Dane adresowe zostały zaktualizowane", {
        variant: "success",
      });
      onClose();
    },
    onError: () => {
      enqueueSnackbar("Wystąpił błąd podczas aktualizacji danych adresowych", {
        variant: "error",
      });
      onClose();
    },
  });

  /**
   * Funkcja wywoływana po wysłaniu formularza.
   * @param {Object} data - Dane z formularza.
   */

  const onSubmit = async (data) => {
    await putUserAddress(data);
  };

  useEffect(() => {
    reset(details);
  }, [details, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edytuj dane adresowe</DialogTitle>
      <DialogContent>
        <Controller
          name="street"
          control={control}
          rules={{ required: "Ulica jest wymagana" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ulica"
              fullWidth
              margin="normal"
              error={!!errors.street}
              helperText={errors.street?.message}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: "Miasto jest wymagane" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Miasto"
              fullWidth
              margin="normal"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          )}
        />
        <Controller
          name="buildingNo"
          control={control}
          rules={{ required: "Numer budynku jest wymagany" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Numer budynku"
              fullWidth
              margin="normal"
              error={!!errors.buildingNo}
              helperText={errors.buildingNo?.message}
            />
          )}
        />
        <Controller
          name="localNo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Numer lokalu"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="postCode"
          control={control}
          rules={{ required: "Kod pocztowy jest wymagany" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Kod pocztowy"
              fullWidth
              margin="normal"
              error={!!errors.postCode}
              helperText={errors.postCode?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Anuluj
        </Button>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          variant="contained"
          color="primary"
        >
          Zapisz
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDetailsDialog;
