import React, { useEffect, useState } from 'react';
import { withRouter, useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    InputLabel,
    Select,
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
    }),
);
interface Type {
    id: number;
    name: string;
}

interface Item {
    name: string;
    price: number;
    type: Type;
}
const defaultValues: Item = {
    name: '',
    price: 0,
    type: {
        id: 0,
        name: '',
    },
};
const EditItem: React.FC = () => {
    const [values, setValues] = useState(defaultValues as Item);
    const [types, setType] = useState<Type[]>([]);
    const [select, setSelect] = useState(0);
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const getTypes = async (): Promise<void> => {
        const items = await api.get<Type[]>('types');
        setType(items.data);
    };

    const getData = async (): Promise<void> => {
        const customer = await api.get(`items/${id}`);
        const item = customer.data as Item;
        setSelect(item.type.id);
        setValues(customer.data);
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
        const item = {
            name: values.name,
            price: values.price,
            type: values.type.id,
        };
        api.put(`items/${id}`, item).then((data) => {
            history.goBack();
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <TextField
                    id="outlined-input"
                    name="name"
                    label="Name"
                    type="text"
                    value={values.name}
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-input"
                    name="price"
                    label="Price"
                    type="text"
                    value={values.price}
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                />
                <InputLabel id="label">Tipo</InputLabel>
                <Select
                    id="outlined-input"
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                    name="type"
                    value={select}
                >
                    {types.map((type) => {
                        return (
                            <MenuItem key={type.id} value={type.id}>
                                {type.name}
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
                    Update
                </Button>
            </div>
        </div>
    );
};

export default withRouter(EditItem);
