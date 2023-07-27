import React from "react";
import ReactPlayer from "react-player/youtube";//reactplayer libraray which has diff. type of players

import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}//static url for youtube +videoid
                    // ?-ke baad uery parametrs , v-watch
                    controls//for play, pausing a video
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;