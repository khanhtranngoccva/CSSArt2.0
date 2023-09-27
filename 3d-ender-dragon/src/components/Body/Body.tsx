import * as React from 'react';
import Box from "@/react-dimension-css/components/Box";
import Group from "@/react-dimension-css/components/Group";
import BlackSurface from "@/components/BlackSurface";
import GlowSurface from "@/components/GlowSurface";
import GlowBase from "@/components/GlowBase";

function Body() {
  return <Group>
    <BodyMain></BodyMain>
    <BodyLightNode z={"-50px"}></BodyLightNode>
    <BodyLightNode></BodyLightNode>
    <BodyLightNode z={"50px"}></BodyLightNode>
  </Group>;
}

function BodyMain() {
  return <Box.Root length={"60px"} height={"60px"} width={"160px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>
}

function BodyLightNode(props: {
  z?: string
}) {
  return <Box.Root length={"10px"} height={"10px"} width={"35px"} y={"-35px"} z={props.z ?? "0px"}>
    <GlowBase></GlowBase>
    <GlowSurface></GlowSurface>
  </Box.Root>
}

export default Body;
