import * as React from 'react';
import Group from "@/react-dimension-css/components/Group";
import Box from "@/react-dimension-css/components/Box";
import styles from "./styles.module.css";
import BlackSurface from "@/components/BlackSurface";
import GlowSurface from "@/components/GlowSurface";
import GlowBase from "@/components/GlowBase";

function Neck() {
  return <Group z={"142.5px"}>
    <NeckNode z={"-50px"} animationDelay={"-0.2s"}></NeckNode>
    <NeckNode z={"-25px"} animationDelay={"-0.4s"}></NeckNode>
    <NeckNode z={"0"} animationDelay={"-0.6s"}></NeckNode>
    <NeckNode z={"25px"} animationDelay={"-0.8s"}></NeckNode>
    <NeckNode z={"50px"} animationDelay={"-1s"}></NeckNode>
  </Group>;
}

function NeckNode(props: {
  z: string,
  animationDelay: string,
}) {
  return <Group z={props.z}>
    <Group className={styles.node} style={{
      animationDelay: props.animationDelay,
    }}>
      <NeckNodeBase></NeckNodeBase>
      <NeckNodeTop></NeckNodeTop>
    </Group>
  </Group>;
}

function NeckNodeBase() {
  return <Box.Root length={"25px"} height={"25px"} width={"25px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function NeckNodeTop() {
  return <Box.Root length={"6px"} height={"10px"} width={"15px"} y={"-18px"}>
    <GlowBase></GlowBase>
    <GlowSurface></GlowSurface>
  </Box.Root>;
}


export default Neck;
