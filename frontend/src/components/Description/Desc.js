import React from 'react';
import classes from "./desc.module.css";
export default function Desc({ desc }) {
    let result = '';

    if (desc) {
        result = desc.toString().substring(0, 80);
    }
    return (<>
        <span>{result} </span>
        <span className={classes.underlined}> ...show more</span>
        </>
    );
}
