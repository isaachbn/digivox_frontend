import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import api from '../services/api';

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
    const [data, setData] = useState([] as Rent[]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async (): Promise<void> => {
        const clients = await api.get<Rent[]>('rents');
        setData(clients.data);
    };
    const deleteCustomer = async (event: any, id: number): Promise<void> => {
        event.persist();
        await api.delete(`rents/${id}`).then((data_) => {
            getData();
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Client</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Entrega</TableCell>
                        <TableCell align="right">Devolver</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((rent) => (
                        <TableRow key={rent.id}>
                            <TableCell component="th" scope="row">
                                {rent.item.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {rent.item.type.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {rent.client.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {rent.item.price}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {rent.delivery}
                            </TableCell>
                            <TableCell align="right">
                                <AssignmentReturnIcon
                                    onClick={(e) => deleteCustomer(e, rent.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SimpleTable;
