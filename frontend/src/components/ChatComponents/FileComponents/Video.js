import React from "react";

const Video = ({ files }) =>
  Object.keys(files).map((x, i) => (
    <video src={files[x]} width='320' height='240' controls key={i} />
  ));

export default Video;
