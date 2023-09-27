import * as React from 'react';
import Box from "@/react-dimension-css/components/Box";

function BlackSurface() {
  return <>
    <Box.Left background={"#121212"}></Box.Left>
    <Box.Right background={"#121212"}></Box.Right>
    <Box.Top background={"#151515"}></Box.Top>
    <Box.Bottom background={"#090909"}></Box.Bottom>
    <Box.Front background={"#101010"}></Box.Front>
    <Box.Back background={"#0c0c0c"}></Box.Back>
  </>;
}

export default BlackSurface;
