import React, { useEffect, useState } from 'react';
import { withRouter, useHistory, useParams } from 'react-router-dom';
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

export interface Type {
    name: string;
}
export interface FormState {
    [key: string]: any;
    values: Type[];
    submitSuccess: boolean;
    loading: boolean;
}
const EditType: React.FC = () => {
    const [values, setValues] = useState({} as Type);
    const { id } = useParams();

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    const getData = async (): Promise<void> => {
        const customer = await api.get(`types/${id}`);
        await setValues(customer.data);
    };

    const handleChange = (event: any): void => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event: any): void => {
        event.persist();
        api.put(`types/${id}`, values).then((data) => {
            history.goBack();
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <TextField
                    id="outlined-input"
                    name="name"
                    value={values.name}
                    label="Name"
                    type="text"
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
                    Update
                </Button>
            </div>
        </div>
    );
};

export default withRouter(EditType);
