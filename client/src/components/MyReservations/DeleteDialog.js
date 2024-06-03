import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

/**
 * Komponent dialogowy do usuwania rezerwacji.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {boolean} props.open - Czy dialog jest otwarty.
 * @param {function} props.onClose - Funkcja zamykająca dialog.
 * @param {function} props.onConfirm - Funkcja potwierdzająca usunięcie rezerwacji.
 * @returns {JSX.Element} Zwraca komponent dialogu usuwania rezerwacji.
 */
const DeleteDialog = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  /**
   * Potwierdza usunięcie rezerwacji.
   */
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Usuń Rezerwację</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Czy na pewno chcesz usunąć tę rezerwację?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Anuluj
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleConfirm}
          color="primary"
          loading={loading}
        >
          Usuń
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
