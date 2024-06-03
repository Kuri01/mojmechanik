import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { format, addMonths } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { getAvailableWorkshopHours, postNewReservation } from "../api";
import useApi from "../hooks/useApi";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

const mockCars = [
  { id: 1, name: "Audi A4" },
  { id: 2, name: "BMW X5" },
  { id: 3, name: "Mercedes C Class" },
];

const allHours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

/**
 * Komponent dialogu kalendarza warsztatu.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {boolean} props.open - Czy dialog jest otwarty.
 * @param {function} props.onClose - Funkcja zamykająca dialog.
 * @param {Object} props.workshop - Dane warsztatu.
 * @returns {JSX.Element} Zwraca komponent dialogu kalendarza warsztatu.
 */

const WorkshopCalendarDialog = ({ open, onClose, workshop }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedDate: new Date(),
      selectedHour: "",
      selectedCar: "",
      serviceDescription: "",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const [availableHours, setAvailableHours] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, fetchData } = useApi(getAvailableWorkshopHours);

  /**
   * Pobiera zajęte godziny dla wybranego dnia.
   *
   * @param {Date} date - Wybrana data.
   */

  const fetchOccupiedHours = useCallback(
    async (date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      try {
        const response = await fetchData(workshop.id, formattedDate);
        const occupiedHours = response.data;
        setAvailableHours(
          allHours.filter((hour) => !occupiedHours.includes(hour))
        );
      } catch (error) {
        console.error("Error fetching occupied hours:", error);
        setAvailableHours(allHours);
      }
    },
    [workshop.id, fetchData]
  );

  useEffect(() => {
    if (open) {
      fetchOccupiedHours(watch("selectedDate"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, watch("selectedDate"), fetchOccupiedHours]);

  /**
   * Funkcja obsługująca wysłanie formularza rezerwacji.
   *
   * @param {Object} data - Dane rezerwacji.
   */

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await postNewReservation(data);
      enqueueSnackbar("Rezerwacja została zapisana", { variant: "success" });
      onClose();
    } catch (error) {
      enqueueSnackbar("Wystąpił błąd podczas zapisywania rezerwacji", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const maxDate = addMonths(today, 24);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{workshop.name}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex">
          <Box flex={1} marginRight={2}>
            <Typography variant="subtitle1" gutterBottom>
              Wybierz dzień
            </Typography>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={watch("selectedDate")}
              onChange={(date) => {
                setValue("selectedDate", date);
                setValue("selectedHour", "");
              }}
              minDate={today}
              maxDate={maxDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.selectedDate}
                  helperText={errors.selectedDate?.message}
                />
              )}
            />

            <Typography variant="subtitle1" gutterBottom>
              Wybierz godzinę
            </Typography>
            <List>
              {allHours.map((hour) => (
                <ListItemButton
                  key={hour}
                  selected={watch("selectedHour") === hour}
                  onClick={() => setValue("selectedHour", hour)}
                  disabled={!availableHours.includes(hour) || loading}
                >
                  <ListItemText primary={hour} />
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box flex={2}>
            <Typography variant="h6" gutterBottom>
              Szczegóły rezerwacji
            </Typography>
            <Controller
              name="selectedCar"
              control={control}
              rules={{ required: "Wybór samochodu jest wymagany" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Wybierz samochód"
                  fullWidth
                  margin="normal"
                  error={!!errors.selectedCar}
                  helperText={errors.selectedCar?.message}
                >
                  {mockCars.map((car) => (
                    <MenuItem key={car.id} value={car.name}>
                      {car.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="serviceDescription"
              control={control}
              rules={{ required: "Opis usługi jest wymagany" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Opis usługi"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={!!errors.serviceDescription}
                  helperText={errors.serviceDescription?.message}
                />
              )}
            />
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleSubmit(onSubmit)}
              disabled={!watch("selectedHour") || isSubmitting}
              loading={isSubmitting}
            >
              Zarezerwuj
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopCalendarDialog;
