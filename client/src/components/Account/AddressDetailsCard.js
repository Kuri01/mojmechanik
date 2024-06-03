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
 * Komponent wyświetlający dane adresowe użytkownika.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {Object} props.details - Szczegóły adresowe.
 * @param {function} props.onEdit - Funkcja wywoływana po kliknięciu przycisku edycji.
 * @returns {JSX.Element} Zwraca komponent karty danych adresowych.
 */

const AddressDetailsCard = ({ details, onEdit }) => {
  const { data, isLoading, error } = details;
  return (
    <StyledCard elevation={3}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Dane adresowe
          </Typography>
        }
        action={
          <IconButton
            aria-label="edit"
            onClick={onEdit}
            disabled={isLoading || error}
          >
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
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
          </>
        )}
        {data && (
          <>
            <StyledTypography variant="body1">
              Ulica: <span>{data?.street}</span>
            </StyledTypography>
            <StyledTypography variant="body1">
              Miasto: <span>{data?.city}</span>
            </StyledTypography>
            <StyledTypography variant="body1">
              Numer budynku: <span>{data?.buildingNo}</span>
            </StyledTypography>
            <StyledTypography variant="body1">
              Numer lokalu: <span>{data?.localNo}</span>
            </StyledTypography>
            <StyledTypography variant="body1">
              Kod pocztowy: <span>{data?.postCode}</span>
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

export default AddressDetailsCard;
