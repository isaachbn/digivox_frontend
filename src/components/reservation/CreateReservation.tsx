import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Select,
    InputLabel,
    MenuItem,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
                display: 'block',
            },
        },
        wrapper: {
            width: '100%',
        },
        formInput: {
            width: '100%',
        },
        button: {
            margin: theme.spacing(1),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

interface Type {
    id: number;
    name: string;
}

interface Item {
    id: number;
    name: string;
    price: number;
    type: Type;
}

interface Client {
    id: number;
    name: string;
    email: string;
}

interface Reservation {
    id: number;
    pickUp: string;
    item: Item;
    client: Client;
}

const defaultValues: Reservation = {
    id: 0,
    pickUp: '',
    client: {
        id: 0,
        email: '',
        name: '',
    },
    item: {
        id: 0,
        name: '',
        price: 0,
        type: {
            id: 0,
            name: '',
        },
    },
};
const CreateReservation: React.FC = () => {
    const [values, setValues] = useState(defaultValues as Reservation);
    const [items, setItem] = useState<Item[]>([]);
    const [clients, setClient] = useState<Client[]>([]);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getItem();
    }, []);

    useEffect(() => {
        getClient();
    }, []);

    const getClient = async (): Promise<void> => {
        const response = await api.get<Client[]>('clients');
        setClient(response.data);
    };

    const getItem = async (): Promise<void> => {
        const response = await api.get<Item[]>('items');
        setItem(response.data);
    };

    const handleChange = (event: any): void => {
        event.persist();
        setValues((value) => ({
            ...value,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event: any): void => {
        event.persist();
        api.post(`reservations`, values).then((data) => [history.goBack()]);
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <TextField
                    id="outlined-input"
                    label="Data da reserva"
                    type="date"
                    defaultValue={new Date()}
                    className={classes.formInput}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    name="pickUp"
                />
                <InputLabel id="label">Item</InputLabel>
                <Select
                    id="outlined-input"
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                    name="item"
                >
                    {items.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
                <InputLabel id="label">Clientes</InputLabel>
                <Select
                    id="outlined-input"
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                    name="client"
                >
                    {clients.map((client) => {
                        return (
                            <MenuItem key={client.id} value={client.id}>
                                {client.name}
                            </MenuItem>
                        );
                    })}
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default withRouter(CreateReservation);
