// src/components/WorkshopDetailsDialog.js
import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, IconButton, Rating, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const WorkshopDetailsDialog = ({ open, onClose, workshop }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
            <DialogTitle>
                <Box display='flex' justifyContent='flex-end' alignItems='center'>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box display='flex'>
                    <Box flex={1} marginRight={2}>
                        <CardMedia component='img' height='200' image={workshop.image} alt={workshop.name} />
                        <Box display='flex' alignItems='center' mt={1}>
                            <Rating value={workshop.rate} precision={0.1} readOnly />
                            <Typography variant='body2' sx={{ ml: 1 }}>
                                {workshop.rate}
                            </Typography>
                        </Box>
                    </Box>
                    <Box flex={2}>
                        <Typography variant='h6' gutterBottom>
                            {workshop.name}
                        </Typography>
                        <Typography variant='body1'>{`${workshop.address.street} ${workshop.address.buildingNo}, ${workshop.address.city}`}</Typography>
                        <Typography variant='body2' color='textSecondary' paragraph>
                            {workshop.description}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default WorkshopDetailsDialog;
