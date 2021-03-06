import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
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

export interface Client {
    name: string;
    email: string;
}
export interface FormState {
    [key: string]: any;
    values: Client[];
    submitSuccess: boolean;
    loading: boolean;
}
const defaultValues: Client = {
    name: '',
    email: '',
};
const CreateClient: React.FC = () => {
    const [values, setValues] = useState(defaultValues as Client);

    const classes = useStyles();
    const history = useHistory();

    const handleChange = (event: any): void => {
        event.persist();
        setValues((value) => ({
            ...value,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event: any): void => {
        event.persist();
        api.post(`clients`, values).then((data) => [history.goBack()]);
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
                    name="email"
                    label="Email Address"
                    type="email"
                    defaultValue={values.email}
                    className={classes.formInput}
                    variant="outlined"
                    onChange={handleChange}
                />
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

export default withRouter(CreateClient);
