import * as React from 'react';
import Group from "@/react-dimension-css/components/Group";
import Box from "@/react-dimension-css/components/Box";
import styles from "./styles.module.css";
import BlackSurface from "@/components/BlackSurface";
import GlowSurface from "@/components/GlowSurface";
import GlowBase from "@/components/GlowBase";

function Tail() {
  return <Group z={"-90px"}>
    {Array.from({length: 12}, (_, i) => {
      return <TailNode key={i} z={`${20 * -i}px`} animationDelay={`${-5 - 0.2 * -i}s`}/>;
    })}
  </Group>;
}

function TailNode(props: {
  z: string,
  animationDelay: string,
}) {
  return <Group z={props.z}>
    <Group className={styles.node} style={{
      animationDelay: props.animationDelay,
    }}>
      <TailNodeBase></TailNodeBase>
      <TailNodeTop></TailNodeTop>
    </Group>
  </Group>;
}

function TailNodeBase() {
  return <Box.Root length={"25px"} height={"25px"} width={"25px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function TailNodeTop() {
  return <Box.Root length={"6px"} height={"8px"} width={"15px"} y={"-17.5px"}>
    <GlowSurface></GlowSurface>
    <GlowBase></GlowBase>
  </Box.Root>;
}


export default Tail;
