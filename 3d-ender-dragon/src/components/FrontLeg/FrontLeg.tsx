import * as React from 'react';
import Group from "@/react-dimension-css/components/Group";
import Box from "@/react-dimension-css/components/Box";
import BlackSurface from "@/components/BlackSurface";
import GlowSurface from "@/components/GlowSurface";
import styles from './styles.module.css';

function FrontLeg(props: {
  flipped?: boolean
}) {
  return <Group className={props.flipped ? styles.flipped : ""}>
    <Group x={"-30px"} y={"15px"} z={"70px"}>
      <Group className={styles.animationLayer1}>
        <FrontLeg1></FrontLeg1>
        <Group z={"-47.5px"} x={"-7px"} y={"-6px"}>
          <Group className={styles.animationLayer2}>
            <FrontLeg2></FrontLeg2>
            <Group z={"-40px"} y={"-1px"}>
              <Group className={styles.animationLayer3}>
                <FrontLeg3></FrontLeg3>
              </Group>
            </Group>
          </Group>
        </Group>
      </Group>
    </Group>
  </Group>;
}

function FrontLeg1() {
  return <Box.Root width={"45px"} length={"14px"} height={"16px"} x={"-7px"} z={"-25px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function FrontLeg2() {
  return <Box.Root width={"40px"} length={"12px"} height={"12px"} z={"-20px"} y={"6px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function FrontLeg3() {
  return <Group z={"-2px"} y={"12px"}>
      <Box.Root width={"6px"} length={"18px"} height={"30px"}>
        <BlackSurface></BlackSurface>
      </Box.Root>
  </Group>;
}

export default FrontLeg;
