import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

//destructure rating which we passed in carousel.jsx as prop
const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}//if we remove it then it will count from 100,therefore circukar progressbar length will be reduced
                text={rating}//to show rating as text
                //custom styling-buildstyles imported from circularprogressbar library
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;