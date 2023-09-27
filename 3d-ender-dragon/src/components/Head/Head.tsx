import * as React from 'react';
import Box from "@/react-dimension-css/components/Box";
import Group from "@/react-dimension-css/components/Group";
import styles from './styles.module.css';
import BlackSurface from "@/components/BlackSurface";
import GlowSurface from "@/components/GlowSurface";
import GlowBase from "@/components/GlowBase";

function Head() {
  return <Group z={"227.5px"}>
    <Group className={styles.head}>
      <HeadMain></HeadMain>
      <Ear x={"-10px"}></Ear>
      <Ear x={"10px"}></Ear>
      <Mouth></Mouth>
    </Group>
  </Group>;
}

function Mouth() {
  return <Group z={"45px"}>
    <Mouth1></Mouth1>
    <Mouth2></Mouth2>
    <Mouth3></Mouth3>
  </Group>;
}

function HeadMain() {
  return <Box.Root length={"45px"} height={"45px"} width={"50px"}>
    <BlackSurface></BlackSurface>
    <Box.Front className={styles.face}>
      <Eye></Eye>
      <Eye flipped={true}></Eye>
    </Box.Front>
  </Box.Root>;
}

function Eye(props: {
  flipped?: boolean
}) {
  return <div className={`${styles.eyeFilter} ${props.flipped ? styles.flippedEye : ""}`}>
    <div className={`${styles.eye}`}></div>
  </div>;
}

function Mouth1() {
  return <Box.Root length={"40px"} height={"10px"} width={"45px"} y={"5px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function Mouth3() {
  return <Box.Root length={"25px"} height={"13px"} width={"20px"} y={"12.5px"} z={"-10px"}>
    <GlowSurface></GlowSurface>
  </Box.Root>;
}

function Mouth2() {
  return <Group y={"15px"}>
    <Box.Root length={"40px"} height={"10px"} width={"45px"} className={styles.mouth2}>
      <BlackSurface></BlackSurface>
    </Box.Root>
  </Group>;
}


function Ear(props: {
  x: string
}) {
  return <Box.Root length={"5px"} height={"12.5px"} width={"17.5px"} y={"-30px"} x={props.x}>
    <GlowBase></GlowBase>
    <GlowSurface></GlowSurface>
  </Box.Root>;
}

export default Head;
