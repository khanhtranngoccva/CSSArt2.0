import * as React from 'react';
import Group from "@/react-dimension-css/components/Group";
import Box from "@/react-dimension-css/components/Box";
import BlackSurface from "@/components/BlackSurface";
import styles from './styles.module.css';

function HindLeg(props: {
  flipped?: boolean
}) {
  return <Group className={props.flipped ? styles.flipped : ""}>
    <Group x={"-30px"} y={"5px"} z={"-25px"}>
      <Group className={styles.animationLayer1}>
        <HindLeg1></HindLeg1>
        <Group z={"-70px"} x={"-17.5px"} y={"-10px"}>
          <Group className={styles.animationLayer2}>
            <HindLeg2></HindLeg2>
            <Group z={"-65px"} y={"-4px"}>
              <Group className={styles.animationLayer3}>
                <HindLeg3></HindLeg3>
              </Group>
            </Group>
          </Group>
        </Group>
      </Group>
    </Group>
  </Group>;
}

function HindLeg1() {
  return <Box.Root width={"80px"} length={"35px"} height={"35px"} x={"-17.5px"} z={"-40px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function HindLeg2() {
  return <Box.Root width={"70px"} length={"30px"} height={"30px"} z={"-35px"} y={"10px"}>
    <BlackSurface></BlackSurface>
  </Box.Root>;
}

function HindLeg3() {
  return <Group z={"-4px"} y={"25px"}>
    <Box.Root width={"14px"} length={"40px"} height={"60px"}>
      <BlackSurface></BlackSurface>
    </Box.Root>
  </Group>;
}

export default HindLeg;
