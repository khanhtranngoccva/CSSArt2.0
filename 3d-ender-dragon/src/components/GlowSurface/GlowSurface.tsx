import * as React from 'react';
import Box from "@/react-dimension-css/components/Box";
import styles from "./styles.module.css";

function GlowSurface() {
  return <>
    <Box.Left background={"#f0cff6"} className={styles.lightNodeSide}></Box.Left>
    <Box.Right background={"#f0cff6"} className={styles.lightNodeSide}></Box.Right>
    <Box.Top background={"#faecff"} className={styles.lightNodeSide}></Box.Top>
    <Box.Bottom background={"#c776d5"} className={styles.lightNodeSide}></Box.Bottom>
    <Box.Front background={"#f0bffa"} className={styles.lightNodeSide}></Box.Front>
    <Box.Back background={"#e0a3ea"} className={styles.lightNodeSide}></Box.Back>
  </>;
}

export default GlowSurface;
