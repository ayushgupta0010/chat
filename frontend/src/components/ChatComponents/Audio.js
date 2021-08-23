import React from "react";

const Audio = ({ files }) =>
  Object.keys(files).map((x, i) => <audio src={files[x]} controls key={i} />);

export default Audio;
