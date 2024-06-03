import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  padding: "16px",
  borderRadius: "16px",
});

const StyledTypography = styled(Typography)({
  marginBottom: "16px",
  span: {
    fontWeight: "100",
  },
});

/**
 * Komponent wyświetlający dane osobowe użytkownika.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {Object} props.details - Szczegóły osobowe.
 * @param {function} props.onEdit - Funkcja wywoływana po kliknięciu przycisku edycji.
 * @returns {JSX.Element} Zwraca komponent karty danych osobowych.
 */

const PersonalDetailsCard = ({ details, onEdit }) => {
  const { data, isLoading, error } = details;

  return (
    <StyledCard elevation={3}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Dane osobowe
          </Typography>
        }
        action={
          <IconButton aria-label="edit" onClick={onEdit}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        {isLoading && (
          <>
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
          </>
        )}
        {data && (
          <>
            <StyledTypography variant="body1">
              Imię: <span>{data?.name}</span>
            </StyledTypography>
            <StyledTypography variant="body1">
              Nazwisko: <span>{data?.surname}</span>
            </StyledTypography>
            <StyledTypography variant="body1">
              E-mail: <span>{data?.email}</span>
            </StyledTypography>
          </>
        )}
        {error && (
          <Typography variant="body1" color="error">
            Wystąpił błąd podczas pobierania danych.
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default PersonalDetailsCard;
