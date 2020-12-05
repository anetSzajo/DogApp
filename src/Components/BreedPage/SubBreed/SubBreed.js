import React from "react";
import {capitalizeFirstLetter} from '../../../Common/utils';
import '../../../main.scss';

function SubBreed(props) {
    return (
        <div className="subBreedsList__element">
            <button onClick={props.onClick}>{capitalizeFirstLetter(props.subBreedName)}</button>
        </div>)
}

export default SubBreed;
