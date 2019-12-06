import React, { useState, useEffect } from 'react'

import axios from 'axios';

import { Grid, Card, Typography, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        // margin: 5,
        padding: 5,
        background: 'green',
        color: 'white'
    },
    paper: {
padding:5,
marginBottom: 5
    }
}));

function List() {
    const [hobbits, setHobbits] = useState([])
    const classes = useStyles();

    useEffect(() => {
        axios
            .get('https://hobbitses.herokuapp.com/api/users/')
            .then(res => {
                console.log('hobbits', res)
                setHobbits(res.data)
            })
            .catch(err => console.log(err))

    }, [])


    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h3">
                    Lord of the Rings
            </Typography>
            </Paper>
            <Grid container className={classes.root} spacing={1}>
                {hobbits.map(shire => (
                    <Grid item key={shire.id}>
                        <Card className={classes.card}>
                            {shire.name}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default List
