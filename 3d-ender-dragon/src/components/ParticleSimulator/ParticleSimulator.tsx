"use client";

import React from "react";
import Group from "@/react-dimension-css/components/Group";
import Box from "@/react-dimension-css/components/Box";
import styles from './styles.module.css';

interface WindParticle {
  x: number,
  y: number,
  delay: number,
  id: string,
}

function randomRange(start: number, end: number) {
  return Math.random() * (end - start) + start;
}

function ParticleSimulator(props: {
  duration: number,
  particleCount: number,
}) {
  const [particles, setParticles] = React.useState<WindParticle[]>([]);

  React.useEffect(() => {
    setParticles(() => {
      const draft = [];
      for (let i = 0; i < props.particleCount; i++) {
        draft.push({
          delay: randomRange(-props.duration, 0),
          y: randomRange(-1000, 1000),
          x: randomRange(-1000, 1000),
          id: crypto.randomUUID(),
        });
      }
      return draft;
    });
  }, [props.duration, props.particleCount]);

  return <Group>
    {particles.map(particle => {
      return <WindParticle {...particle} key={particle.id} duration={props.duration}></WindParticle>;
    })}
  </Group>;
}

function WindParticle(props: WindParticle & {
  duration: number
}) {
  return <Group x={props.x + "px"} y={props.y + "px"}>
    <Box.Root width={"250px"} height={"1px"} length={"1px"} className={styles.windParticle} style={{
      animationDelay: props.delay + "s",
      animationDuration: props.duration + "s",
    }}>
      <Box.Left background={"#c4c4c4"}></Box.Left>
      <Box.Right background={"#c4c4c4"}></Box.Right>
      <Box.Top background={"#c4c4c4"}></Box.Top>
    </Box.Root>
  </Group>;
}

export default ParticleSimulator;
