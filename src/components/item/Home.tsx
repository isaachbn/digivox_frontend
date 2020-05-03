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
import AvailableIcon from '@material-ui/icons/EventAvailable';
import EnhancedIcon from '@material-ui/icons/EnhancedEncryption';
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
export interface Item {
    id: number;
    name: string;
    price: number;
    rented: boolean;
    type: {
        id: number;
        name: string;
    };
}

const TableItem: React.FC = () => {
    const classes = useStyles();
    const [data, setData] = useState([] as Item[]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async (): Promise<void> => {
        const items = await api.get<Item[]>('items');
        setData(items.data);
    };
    const deleteCustomer = async (event: any, id: number): Promise<void> => {
        event.persist();
        await api.delete(`items/${id}`).then((data_) => {
            getData();
        });
    };

    return (
        <>
            <Link to="/item/create">
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
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell align="right">
                                Ações
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row">
                                    {item.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {item.rented ? 'alugado' : 'disponível'}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Link to={`/reservation/create/${item.id}`}>
                                        reservar
                                        <EnhancedIcon
                                            className={classes.marginRight}
                                        />{' '}
                                    </Link>
                                    <Link to={`/rent/create/${item.id}`}>
                                        alugar
                                        <AvailableIcon
                                            className={classes.marginRight}
                                        />{' '}
                                    </Link>
                                    <Link to={`/item/edit/${item.id}`}>
                                        editar
                                        <EditIcon
                                            className={classes.marginRight}
                                        />{' '}
                                    </Link>
                                    <DeleteIcon
                                        onClick={(e) =>
                                            deleteCustomer(e, item.id)
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

export default TableItem;
