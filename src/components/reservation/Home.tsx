import React, { useEffect, useState } from 'react';
import {
    makeStyles,
    withStyles,
    Theme,
    createStyles,
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
import CancelIcon from '@material-ui/icons/CancelPresentation';
import CreateIcon from '@material-ui/icons/AddBox';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import api from '../../services/api';

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

interface Reservation {
    id: number;
    pickUp: string;
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

const TableReservation: React.FC = () => {
    const classes = useStyles();
    const [data, setData] = useState([] as Reservation[]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async (): Promise<void> => {
        const items = await api.get<Reservation[]>('reservations');
        setData(items.data);
    };
    const deleteCustomer = async (event: any, id: number): Promise<void> => {
        event.persist();
        await api.delete(`reservations/${id}`).then((data_) => {
            getData();
        });
    };

    return (
        <>
            <Link to="/reservation/create">
                {' '}
                <CreateIcon className={classes.marginRight} />{' '}
            </Link>
            <Link to="/">
                {' '}
                <BackIcon className={classes.marginRight} />{' '}
            </Link>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Reservado</StyledTableCell>
                            <StyledTableCell>Item</StyledTableCell>
                            <StyledTableCell>Para a data</StyledTableCell>
                            <StyledTableCell align="right">
                                Ações
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((reservation) => (
                            <StyledTableRow key={reservation.id}>
                                <StyledTableCell component="th" scope="row">
                                    {reservation.client.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {reservation.item.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {reservation.pickUp}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <CancelIcon
                                        onClick={(e) =>
                                            deleteCustomer(e, reservation.id)
                                        }
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableReservation;
