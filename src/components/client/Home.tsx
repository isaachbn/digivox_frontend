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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
export interface Client {
    id: number;
    name: string;
    email: string;
}

const TableClient: React.FC = () => {
    const classes = useStyles();
    const [data, setData] = useState([] as Client[]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const clients = await api.get<Client[]>('clients');
        setData(clients.data);
    };
    const deleteCustomer = async (event: any, id: number) => {
        event.persist();
        await api.delete(`clients/${id}`).then((data_) => {
            getData();
        });
    };

    return (
        <>
            <Link to="/client/create">
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
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="right">
                                Ações
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((client) => (
                            <StyledTableRow key={client.id}>
                                <StyledTableCell component="th" scope="row">
                                    {client.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {client.email}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Link to={`/client/edit/${client.id}`}>
                                        {' '}
                                        <EditIcon
                                            className={classes.marginRight}
                                        />{' '}
                                    </Link>
                                    <DeleteIcon
                                        onClick={(e) =>
                                            deleteCustomer(e, client.id)
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

export default TableClient;
