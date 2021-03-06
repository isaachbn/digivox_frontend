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
    }),
);

interface Item {
    name: string;
    price: number;
    type: {
        id: number;
        name: string;
    };
}
interface Type {
    id: number;
    name: string;
}
interface OptionsItem {
    value: number;
    label: string;
}
const defaultValues: Item = {
    name: '',
    price: 0,
    type: {
        id: 0,
        name: '',
    },
};
const CreateItem: React.FC = () => {
    const [values, setValues] = useState(defaultValues as Item);
    const [types, setType] = useState<Type[]>([]);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async (): Promise<void> => {
        const items = await api.get<Type[]>('types');
        setType(items.data);
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
        api.post(`items`, values).then((data) => [history.goBack()]);
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <TextField
                    id="outlined-input"
                    name="name"
                    label="Name"
                    type="text"
                    defaultValue={values.name}
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-input"
                    name="price"
                    label="Price"
                    type="text"
                    defaultValue={values.price}
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
                    Save
                </Button>
            </div>
        </div>
    );
};

export default withRouter(CreateItem);
