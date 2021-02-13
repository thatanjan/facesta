import React from "react";
import dynamic from "next/dynamic";

const Personal = dynamic(import("./personal/Personal"));

export default () => {
  return <Personal />;
};
