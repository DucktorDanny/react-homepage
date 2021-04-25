import { useState, useEffect } from 'react';

import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import '../style/Settings.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 150,
        marginBottom: '1rem',
    },
}));

const FontSelect = ({ defaultFont, fontOnChange }) => {
    const classes = useStyles();
    const [ font, setFont ] = useState(defaultFont);

    const handleChange = (event) => {
        setFont(event.target.value);
        localStorage.setItem('font', event.target.value);
        document.querySelector('body').style.fontFamily = event.target.value;
        // document.querySelector('.react-calendar').children.style.fontFamily = event.target.value;
        // document.querySelector('.react-calendar button').style.fontFamily = event.target.value;
        // document.querySelector('.react-calendar span').style.fontFamily = event.target.value;
        // document.querySelector('.react-calendar abbr').style.fontFamily = event.target.value;
        // document.querySelector('.react-calendar .react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth').style.fontFamily = event.target.value;
    }

    
    useEffect(() => {
        const loopThroughChildren = (children, font) => {
            for (let i = 0; i < children.length; i++) {
                children[i].style.fontFamily = font;
                if (children[i].children && children[i].children.length > 0) {
                    loopThroughChildren(children[i].children, font);
                }
            }
        }
        console.log('default font: ', defaultFont);
        document.querySelector('body').style.fontFamily = defaultFont;
        // document.querySelector('.react-calendar').children.style.fontFamily = defaultFont;
        const calendar = document.querySelector('.react-calendar');
        // console.log(calendar);
        console.log(calendar.children[0]);
        loopThroughChildren(calendar.children, defaultFont);
        // document.querySelector('.react-calendar button').style.fontFamily = defaultFont;
        // document.querySelector('.react-calendar span').style.fontFamily = defaultFont;
        // document.querySelector('.react-calendar abbr').style.fontFamily = defaultFont;
        // document.querySelector('.react-calendar .react-calendar__tile react-calendar__month-view__days__day react-calendar__month-view__days__day--neighboringMonth').style.fontFamily = defaultFont;
    }, [defaultFont]);

    useEffect(() => {
        if (fontOnChange) {
            // it needs because of MuiTheme
            fontOnChange(font);
        }
    }, [font, fontOnChange]);

    return (
        <>
            <h2>Font select</h2>
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='font-mat-ui-label'>Font</InputLabel>
                <Select
                    labelId='font-select'
                    id='font-mat-ui-select'
                    value={font}
                    onChange={handleChange}
                    label='Font'
                >
                    <MenuItem value="'Comic Neue', cursive">Comic Neue</MenuItem>
                    <MenuItem value="'Roboto', sans-serif">Roboto</MenuItem>
                    <MenuItem value="'Indie Flower', cursive">Indie Flower</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

export default FontSelect;