import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import PersonalDetailsCard from './PersonalDetailsCard';
import AddressDetailsCard from './AddressDetailsCard';
import MyCars from './MyCars';
import EditPersonalDetailsDialog from './Dialogs/EditPersonalDetailsDialog';
import EditAddressDetailsDialog from './Dialogs/EditAddressDetailsDialog';
import AddCarDialog from './Dialogs/AddCarDialog.js';
import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../api/Client.ts';

const apiClient = new ApiClient();

const Account = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [currentData, setCurrentData] = useState({});

    const personalDetails = useQuery({
        queryKey: ['user', 'personal-details'],
        queryFn: () => apiClient.getUser(),
    });

    const addressDetails = useQuery({
        queryKey: ['user', 'address-details'],
        queryFn: () => apiClient.getUserAddress(),
    });

    const handleOpenDialog = (type, data) => {
        setDialogType(type);
        setCurrentData(data);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentData({});
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <PersonalDetailsCard details={personalDetails} onEdit={() => handleOpenDialog('personal', personalDetails)} />
            </Box>

            <Box sx={{ mt: 4 }}>
                <AddressDetailsCard details={addressDetails} onEdit={() => handleOpenDialog('address', addressDetails)} />
            </Box>

            <Box sx={{ mt: 4 }}>
                <MyCars handleOpenDialog={handleOpenDialog} />
            </Box>

            <EditPersonalDetailsDialog
                open={openDialog && dialogType === 'personal'}
                onClose={handleCloseDialog}
                details={personalDetails?.data}
            />
            <EditAddressDetailsDialog
                open={openDialog && dialogType === 'address'}
                onClose={handleCloseDialog}
                details={addressDetails?.data}
            />
            <AddCarDialog open={openDialog && dialogType === 'car'} onClose={handleCloseDialog} details={currentData} />
        </Container>
    );
};

export default Account;
