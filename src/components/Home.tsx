import React, { useEffect, useState } from 'react';
import {
    withStyles,
    Theme,
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import api from '../services/api';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    marginRight: {
        marginRight: 10,
    },
});

interface Rent {
    id: number;
    withdrawal: string;
    delivery: string;
    item: {
        id: number;
        name: string;
        price: number;
        rented: boolean;
        type: {
            id: number;
            name: string;
        };
    };
    client: {
        id: number;
        name: string;
        email: string;
    };
}

const SimpleTable: React.FC = () => {
    const classes = useStyles();
    const [renteds, setRented] = useState([] as Rent[]);
    const [delivereds, setDelivered] = useState([] as Rent[]);
    useEffect(() => {
        getRented();
        getDelivered();
    }, []);
    const getRented = async (): Promise<void> => {
        const clients = await api.get<Rent[]>('rents?rented=true');
        setRented(clients.data);
    };
    const getDelivered = async (): Promise<void> => {
        const clients = await api.get<Rent[]>('rents?delivered=true');
        setDelivered(clients.data);
    };
    const deleteCustomer = async (event: any, id: number): Promise<void> => {
        event.persist();
        await api.patch(`rents/${id}/deliver`).then((data_) => {
            getRented();
            getDelivered();
        });
    };

    return (
        <>
            <h2>Itens a serem devolvidos</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Item</StyledTableCell>
                            <StyledTableCell>Categoria</StyledTableCell>
                            <StyledTableCell>Client</StyledTableCell>
                            <StyledTableCell>Valor</StyledTableCell>
                            <StyledTableCell>Entrega Prevista</StyledTableCell>
                            <StyledTableCell align="right">
                                Receber
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renteds.map((rent) => (
                            <StyledTableRow key={rent.id}>
                                <StyledTableCell component="th" scope="row">
                                    {rent.item.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.item.type.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.client.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.item.price}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.delivery}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <AssignmentReturnIcon
                                        onClick={(e) =>
                                            deleteCustomer(e, rent.id)
                                        }
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2>Itens alugados </h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Item</StyledTableCell>
                            <StyledTableCell>Categoria</StyledTableCell>
                            <StyledTableCell>Client</StyledTableCell>
                            <StyledTableCell>Valor</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {delivereds.map((rent) => (
                            <StyledTableRow key={rent.id}>
                                <StyledTableCell component="th" scope="row">
                                    {rent.item.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.item.type.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.client.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {rent.item.price}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default SimpleTable;
