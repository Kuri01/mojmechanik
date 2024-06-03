import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Container,
  Grid,
  CardHeader,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const StyledMainCard = styled(Card)({
  padding: "16px",
  borderRadius: "16px",
});

const StyledCard = styled(Card)({
  padding: "8px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "16px",
});

const StyledCardContent = styled(CardContent)({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: "16px",
});

const mockReservations = [
  {
    id: 1,
    workshop: {
      image:
        "https://t1.pixers.pics/img-1fb6f67c/obrazy-na-plotnie-stary-amerykanski-samochod.jpg?H4sIAAAAAAAAA3WOQW6EMAxFrxMkwA5xAuEAs50jICDJlBZIlGTaUU_foKrLygvbX_7-D55nmp2F1Z7ZRjg2Y3YLbtvLlsZo0_ZtGdZEshqLujNErEb_aeMafWBNVzccZa3kUEtZbr7mYjzm-MHecg5pBEiiDdurfCttTbAeCTrkCjiC7J2VfFYCB6OnsPt8-kZiM7wIG0VtOB81XlX9kRAWlosgx-1gBcmXsMzew6OCfwJ_ZyguuN1BcegEkAbqL2m63RXvBGnqp0Uvxg3akUEUasbBGuFWTtpwdJ1d2pLyA8j68V8vAQAA",
      name: "Auto Serwis Kowalski",
    },
    car: {
      image: "https://example.com/car_image.jpg",
      model: "BMW",
      brand: "X5",
    },
    registrationNumber: "XYZ789",
    date: new Date("2024-06-01T10:00:00"),
    description: "Naprawa układu hamulcowego i wymiana oleju.",
  },
  {
    id: 2,
    workshop: {
      image:
        "https://st4.depositphotos.com/28384682/41602/i/450/depositphotos_416026580-stock-photo-repairer-consults-with-a-colleague.jpg",
      name: "MOTO-TECH",
    },
    car: {
      image: "https://example.com/car_image.jpg",
      model: "Audi",
      brand: "A4",
    },
    registrationNumber: "WU 30221",
    date: new Date("2024-07-15T14:30:00"),
    description: "Przegląd techniczny i diagnostyka komputerowa.",
  },
];

const getReservations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReservations);
    }, 500);
  });
};

/**
 * Komponent wyświetlający listę rezerwacji użytkownika.
 *
 * @component
 * @returns {JSX.Element} Zwraca komponent listy rezerwacji.
 */
const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    getReservations()
      .then((data) => {
        setReservations(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  /**
   * Otwiera dialog edycji rezerwacji.
   *
   * @param {Object} reservation - Rezerwacja do edycji.
   */
  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation);
    setEditDialogOpen(true);
  };

  /**
   * Otwiera dialog usuwania rezerwacji.
   *
   * @param {Object} reservation - Rezerwacja do usunięcia.
   */
  const handleDeleteClick = (reservation) => {
    setSelectedReservation(reservation);
    setDeleteDialogOpen(true);
  };

  /**
   * Obsługuje zapisanie edytowanej rezerwacji.
   *
   * @param {Object} data - Zaktualizowane dane rezerwacji.
   */
  const handleEditSubmit = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setReservations((prev) =>
          prev.map((r) => (r.id === data.id ? { ...r, ...data } : r))
        );
        setEditDialogOpen(false);
      }, 500);
    }).catch((err) => {
      console.error(err);
    });
  };

  /**
   * Obsługuje usunięcie rezerwacji.
   */
  const handleDeleteSubmit = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setReservations((prev) =>
          prev.filter((r) => r.id !== selectedReservation.id)
        );
        setDeleteDialogOpen(false);
      }, 500);
    }).catch((err) => {
      console.error(err);
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (reservations.length === 0) {
    return <Alert severity="info">Brak rezerwacji</Alert>;
  }

  return (
    <Container sx={{ marginTop: "32px", marginBottom: "32px" }}>
      <StyledMainCard>
        <CardHeader
          title={
            <Typography variant="h4" gutterBottom>
              Moje Rezerwacje
            </Typography>
          }
        />

        <Grid container spacing={3}>
          {reservations.map((reservation) => (
            <Grid item xs={12} key={reservation.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="140"
                  image={reservation.workshop.image}
                  alt={reservation.workshop.name}
                  sx={{ width: 140, borderRadius: "16px" }}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {reservation.workshop.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Model: {reservation.car.model}, Brand:{" "}
                    {reservation.car.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Numer rejestracyjny: {reservation.registrationNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data: {reservation.date.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Opis: {reservation.description}
                  </Typography>
                </StyledCardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <IconButton onClick={() => handleEditClick(reservation)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(reservation)}>
                    <Delete />
                  </IconButton>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledMainCard>

      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        reservation={selectedReservation}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteSubmit}
      />
    </Container>
  );
};

export default MyReservations;
