import React, { useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../api/Client.ts";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

const apiClient = new ApiClient();

const StyledCard = styled(Card)({
  padding: "16px",
  borderRadius: "16px",
});

/**
 * Komponent wyświetlający samochody użytkownika.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {function} props.handleOpenDialog - Funkcja otwierająca dialog do dodawania samochodu.
 * @returns {JSX.Element} Zwraca komponent karty samochodów.
 */

const MyCars = ({ handleOpenDialog }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", "cars"],
    queryFn: () => apiClient.getCars(),
  });

  const { mutateAsync: deleteCar, isPending } = useMutation({
    mutationFn: (id) => apiClient.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "cars"]);
      enqueueSnackbar("Samochód został usunięty", { variant: "success" });
      handleClose();
    },
    onError: () => {
      enqueueSnackbar("Wystąpił błąd podczas usuwania samochodu", {
        variant: "error",
      });
      handleClose();
    },
  });

  /**
   * Otwiera dialog potwierdzenia usunięcia samochodu.
   *
   * @param {number} id - ID samochodu do usunięcia.
   */

  const handleClickOpen = (id) => {
    setSelectedCarId(id);
    setOpen(true);
  };

  /**
   * Zamyka dialog potwierdzenia usunięcia samochodu.
   */

  const handleClose = () => {
    setOpen(false);
    setSelectedCarId(null);
  };

  /**
   * Usuwa wybrany samochód.
   */

  const handleDelete = async () => {
    if (selectedCarId) {
      await deleteCar(selectedCarId);
    }
  };

  return (
    <StyledCard elevation={3}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Moje samochody
          </Typography>
        }
        action={
          <IconButton aria-label="add" onClick={() => handleOpenDialog("car")}>
            <Add />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {isLoading && (
            <Box width="100%">
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography variant="body1" color="error">
              Wystąpił błąd podczas pobierania danych.
            </Typography>
          )}
          {data &&
            data?.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <StyledCard sx={{ padding: "8px" }}>
                  <CardHeader
                    title={`${car.brand} ${car.model}`}
                    action={
                      <>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleClickOpen(car.id)}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    }
                  />
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <img
                        src={car.icon}
                        alt={`${car.brand} logo`}
                        style={{ width: 40, marginRight: 10 }}
                      />
                      <Box>
                        <Typography variant="body1">
                          {car.registrationNumber}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Data pierwszej rejestracji:{" "}
                          {car.firstRegistrationDate}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
        </Grid>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Usuwanie samochodu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Czy na pewno chcesz usunąć ten samochód? Tej operacji nie można
            cofnąć.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Anuluj
          </Button>
          <LoadingButton
            onClick={handleDelete}
            color="primary"
            loading={isPending}
            variant="contained"
          >
            Usuń
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default MyCars;
