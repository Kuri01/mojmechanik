import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ApiClient from "../../../api/Client.ts";

const apiClient = new ApiClient();

/**
 * Komponent dialogowy do dodawania samochodów.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {boolean} props.open - Czy dialog jest otwarty.
 * @param {function} props.onClose - Funkcja zamykająca dialog.
 * @param {Object} props.details - Domyślne wartości formularza.
 * @param {function} props.onSave - Funkcja wywoływana po zapisaniu samochodu.
 */

const AddCarDialog = ({ open, onClose, details, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: details,
  });

  const { enqueueSnackbar } = useSnackbar();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const queryClient = useQueryClient();

  const carBrands = useQuery({
    queryKey: ["car", "brands"],
    queryFn: () => apiClient.getCarBrands(),
  });

  const carModels = useQuery({
    queryKey: ["car", selectedBrand, "models"],
    queryFn: () => apiClient.getCarModels(selectedBrand),
    enabled: !!selectedBrand,
  });

  const { mutateAsync: postCar, isLoading: isPending } = useMutation({
    mutationFn: (data) => apiClient.postCar(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "cars"]);
      enqueueSnackbar("Samochód został dodany", { variant: "success" });
      onClose();
    },
    onError: () => {
      enqueueSnackbar("Wystąpił błąd podczas dodawania samochodu", {
        variant: "error",
      });
      onClose();
    },
  });

  /**
   * Funkcja wywoływana po wysłaniu formularza.
   * @param {Object} formData - Dane z formularza.
   */

  const onSubmit = async (formData) => {
    const data = {
      brand_id: selectedBrand,
      model_id: carModels.data.find((model) => model.name === formData.model)
        .id,
      registrationNumber: formData.registrationNumber,
      firstRegistrationDate: formData.firstRegistrationDate,
      icon: formData.icon,
    };

    await postCar(data);
  };

  useEffect(() => {
    reset(details);
  }, [details, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Dodaj samochód</DialogTitle>
      <DialogContent>
        <Controller
          name="brand_id"
          control={control}
          rules={{ required: "Marka jest wymagana" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={carBrands.data || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => {
                field.onChange(value?.name);
                setSelectedBrand(value?.id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Marka"
                  fullWidth
                  margin="normal"
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="model"
          control={control}
          rules={{ required: "Model jest wymagany" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={carModels.data || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => field.onChange(value?.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model"
                  fullWidth
                  margin="normal"
                  error={!!errors.model}
                  helperText={errors.model?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="registrationNumber"
          control={control}
          rules={{ required: "Numer rejestracyjny jest wymagany" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Numer rejestracyjny"
              fullWidth
              margin="normal"
              error={!!errors.registrationNumber}
              helperText={errors.registrationNumber?.message}
            />
          )}
        />
        <Controller
          name="firstRegistrationDate"
          control={control}
          rules={{ required: "Data pierwszej rejestracji jest wymagana" }}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Data pierwszej rejestracji"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={!!errors.firstRegistrationDate}
                  helperText={errors.firstRegistrationDate?.message}
                />
              )}
              value={field.value}
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
        <Controller
          name="icon"
          control={control}
          rules={{ required: "URL ikony jest wymagany" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ikona URL"
              fullWidth
              margin="normal"
              error={!!errors.icon}
              helperText={errors.icon?.message}
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

export default AddCarDialog;
