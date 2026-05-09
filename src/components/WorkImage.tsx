import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const WorkImage = (props: { image: string; link: string }) => {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <div className="work-image">
      <a
        href={props.link}
        className="work-image-in"
        onMouseEnter={() => setIsVideo(true)}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
      >
        {props.link && (
          <div className="work-link">
            <FaExternalLinkAlt />
          </div>
        )}
        <img src={props.image} alt="Work" />
        {isVideo && (
          <video autoPlay loop muted playsInline>
            <source src="" type="video/mp4" />
          </video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;
