import React, { useState, useEffect } from 'react'

import axios from 'axios';

import { Container, Grid, Card, Typography, Paper, makeStyles, TextField, Button } from '@material-ui/core'

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
        padding: 5,
        marginBottom: 5
    },
    input: {
        fontSize: 8,
        width: '40%'
    },
    button: {
        background: 'orange',
        margin: 10,
        fontSize: 8
    }
}));

function List() {
    const [persons, setPersons] = useState([])
    const [character, setCharacter] = useState({
        id: 1,
        name: ""
    })
    const classes = useStyles();

    useEffect(() => {
        axios
            .get('https://hobbitses.herokuapp.com/api/users/')
            .then(res => {
                console.log('hobbits', res)
                setPersons(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    const handleChanges = e => {
        setCharacter({
            name: e.target.value
        });

    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log(character)
        axios
            .post('https://hobbitses.herokuapp.com/api/users/', character)
            .then(res => {
                console.log('Post', res)
                setPersons([...persons, character])
                
            })
            .catch(err => {
                console.log(err)
            })
        setCharacter({ name: "" })
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h3">
                    Lord of the Rings
            </Typography>
            </Paper>
            <Container>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="username"
                        margin="normal"
                        variant="outlined"
                        value={character.name}
                        onChange={handleChanges}
                        className={classes.input}
                    />
                    <Button type="submit" className={classes.button}>submit</Button>
                </form>
                <Grid container className={classes.root} spacing={1}>
                    {persons.map(shire => (
                        <Grid item key={shire.id}>
                            <Card className={classes.card}>
                                {shire.name}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default List
