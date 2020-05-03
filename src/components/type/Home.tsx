import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/AddBox';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    marginRight: {
        marginRight: 10,
    },
});
export interface Type {
    id: number;
    name: string;
}

export default function SimpleTable() {
    const classes = useStyles();
    const [data, setData] = useState([] as Type[]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const clients = await api.get<Type[]>('types');
        setData(clients.data);
    };
    const deleteCustomer = async (event: any, id: number) => {
        event.persist();
        await api.delete(`types/${id}`).then((data_) => {
            getData();
        });
    };

    return (
        <>
            <Link to="/type/create">
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
                            <TableCell>Name</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((type) => (
                            <TableRow key={type.name}>
                                <TableCell component="th" scope="row">
                                    {type.name}
                                </TableCell>
                                <TableCell align="right">
                                    <Link to={`/client/edit/${type.id}`}>
                                        {' '}
                                        <EditIcon
                                            className={classes.marginRight}
                                        />{' '}
                                    </Link>
                                    <DeleteIcon
                                        onClick={(e) =>
                                            deleteCustomer(e, type.id)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
