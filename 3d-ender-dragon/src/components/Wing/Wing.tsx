import * as React from 'react';
import Group from "@/react-dimension-css/components/Group";
import Box from "@/react-dimension-css/components/Box";
import GlowSurface from "@/components/GlowSurface";
import styles from './styles.module.css'

function Wing(props: {
  flipped?: boolean
}) {
  // Layer 1: transform layer
  return <Group className={props.flipped ? styles.flipped : ""}>
    {/* Layer 2: position layer */}
    <Group x={"-30px"} y={"-25px"} z={"65px"}>
      {/* Layer 3: animation layer */}
      <Group className={styles.animationLayer1}>
        <WingSegment1></WingSegment1>
        <WingSegment2></WingSegment2>
        <Group x={"-160px"}>
          <Group className={styles.animationLayer2}>
            <WingSegment3></WingSegment3>
            <WingSegment2 inverted={true}></WingSegment2>
          </Group>
        </Group>
      </Group>
    </Group>
  </Group>;
}

function WingSegment1() {
  return <Box.Root width={"15px"} length={"160px"} height={"15px"} x={"-80px"}>
    <GlowSurface></GlowSurface>
  </Box.Root>;
}

function WingSegment3() {
  return <Box.Root width={"10px"} length={"160px"} height={"10px"} x={"-80px"}>
    <GlowSurface></GlowSurface>
  </Box.Root>;
}

function WingSegment2(props: {
  inverted?: boolean
}) {
  return <Box.Root width={"140px"} length={"160px"} height={"1px"} x={"-80px"} z={"-70px"}>
    <Box.Top className={styles.backfaceSegment}>
      <div className={`${props.inverted ? styles.flipped : ""} ${styles.segmentContainer}`}>
        <div className={styles.wingSegment2Background}></div>
        <div className={styles.wingSegment2CurveFilter}>
          <div className={styles.wingSegment2Curve1}></div>
          <div className={styles.wingSegment2Curve2}></div>
          <div className={styles.wingSegment2Curve3}></div>
          <div className={styles.wingSegment2Curve4}></div>
        </div>
      </div>
    </Box.Top>
  </Box.Root>;
}

export default Wing;
