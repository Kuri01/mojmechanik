import React, { useState } from 'react';
import {
    Typography,
    Box,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Button,
    Grid,
    Rating,
    CircularProgress,
    Alert,
    Container,
} from '@mui/material';
import WorkshopDetailsDialog from './WorkshopDetailsDialog';
import WorkshopCalendarDialog from './WorkshopCalendarDialog';
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/system';
import { CalendarIcon } from '@mui/x-date-pickers';
import { Info } from '@mui/icons-material';
import ApiClient from '../api/Client.ts';

const StyledCard = styled(Card)({
    padding: '8px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const StyledCardContent = styled(CardContent)({
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '16px',
});

const ButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '8px',
    height: '100%',
});

const apiClient = new ApiClient();

const Search = () => {
    const [search, setSearch] = useState('');
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['workshops'],
        queryFn: () => apiClient.getWorkshops(),
    });

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleDetailsClick = (workshop) => {
        setSelectedWorkshop(workshop);
        setDetailsDialogOpen(true);
    };

    const handleCalendarClick = (workshop) => {
        setSelectedWorkshop(workshop);
        setCalendarDialogOpen(true);
    };

    const handleCloseDetailsDialog = () => {
        setDetailsDialogOpen(false);
        setSelectedWorkshop(null);
    };

    const handleCloseCalendarDialog = () => {
        setCalendarDialogOpen(false);
        setSelectedWorkshop(null);
    };

    console.log(data);

    return (
        <>
            <Container>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        label='Szukaj warsztatu'
                        variant='outlined'
                        value={search}
                        onChange={handleSearchChange}
                        sx={{ width: '50%' }}
                    />
                </Box>

                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {isLoading && (
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {error && <Alert severity='error'>Nie udało się pobrać warsztatów</Alert>}

                    {data &&
                        data
                            .filter((workshop) => workshop.name.toLowerCase().includes(search.toLowerCase()))
                            .map((workshop) => (
                                <Grid item xs={12} key={workshop.id}>
                                    <StyledCard>
                                        <CardMedia
                                            component='img'
                                            height='140'
                                            image={workshop.image}
                                            alt={workshop.name}
                                            sx={{ width: 140, borderRadius: '16px' }}
                                        />
                                        <StyledCardContent>
                                            <Typography gutterBottom variant='h5' component='div'>
                                                {workshop.name}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                {`${workshop.address.street} ${workshop.address.buildingNo}, ${workshop.address.city}`}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                <Rating value={workshop.rate} precision={0.1} readOnly />
                                                <Typography variant='body2' sx={{ ml: 1 }}>
                                                    {workshop.rate}
                                                </Typography>
                                                <Typography variant='body2' sx={{ ml: 1 }}>
                                                    ({workshop.opinionsNumber} opinii)
                                                </Typography>
                                            </Box>
                                        </StyledCardContent>
                                        <ButtonContainer>
                                            <Button
                                                size='small'
                                                variant='contained'
                                                color='primary'
                                                sx={{ mb: 1 }}
                                                onClick={() => handleDetailsClick(workshop)}
                                                endIcon={<Info />}
                                            >
                                                Szczegóły
                                            </Button>
                                            <Button
                                                size='small'
                                                variant='outlined'
                                                color='primary'
                                                onClick={() => handleCalendarClick(workshop)}
                                                endIcon={<CalendarIcon />}
                                            >
                                                Kalendarz
                                            </Button>
                                        </ButtonContainer>
                                    </StyledCard>
                                </Grid>
                            ))}
                </Grid>
            </Container>
            {selectedWorkshop && (
                <>
                    <WorkshopDetailsDialog open={detailsDialogOpen} onClose={handleCloseDetailsDialog} workshop={selectedWorkshop} />
                    <WorkshopCalendarDialog open={calendarDialogOpen} onClose={handleCloseCalendarDialog} workshop={selectedWorkshop} />
                </>
            )}
        </>
    );
};

export default Search;
