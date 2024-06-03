import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

/**
 * Komponent dialogowy do edycji rezerwacji.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {boolean} props.open - Czy dialog jest otwarty.
 * @param {function} props.onClose - Funkcja zamykająca dialog.
 * @param {function} props.onSubmit - Funkcja obsługująca zapisanie zmian.
 * @param {Object} props.reservation - Domyślne wartości formularza.
 * @returns {JSX.Element} Zwraca komponent dialogu edycji rezerwacji.
 */

const EditDialog = ({ open, onClose, onSubmit, reservation }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: reservation,
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    reset(reservation);
  }, [reservation, reset]);

  /**
   * Funkcja obsługująca zapisanie zmian w formularzu.
   *
   * @param {Object} data - Dane z formularza.
   */

  const onSubmitHandler = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edytuj Rezerwację</DialogTitle>
      <DialogContent>
        <DialogContentText mb={3}>
          Edytuj informacje o rezerwacji poniżej.
        </DialogContentText>
        <Stack
          component={"form"}
          sx
          spacing={2}
          noValidate
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Controller
            name="workshop.name"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                label="Nazwa Warsztatu"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="car.model"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                label="Model Samochodu"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="car.brand"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                label="Marka Samochodu"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="registrationNumber"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                label="Numer Rejestracyjny"
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Data i Czas"
                inputFormat="yyyy/MM/dd HH:mm"
                renderInput={(props) => (
                  <TextField {...props} margin="dense" fullWidth />
                )}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                margin="dense"
                label="Opis"
                fullWidth
                multiline
                rows={4}
                {...field}
              />
            )}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary" disabled={loading}>
              Anuluj
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              color="primary"
              loading={loading}
            >
              Zapisz
            </LoadingButton>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
