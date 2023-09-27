import Camera from "@/react-dimension-css/components/Camera";
import Scene from "@/react-dimension-css/components/Scene";
import Group from "@/react-dimension-css/components/Group";
import Body from "@/components/Body";
import Neck from "@/components/Neck";
import React from "react";
import Head from "@/components/Head";
import Tail from "@/components/Tail";
import Wing from "@/components/Wing";
import FrontLeg from "@/components/FrontLeg";
import HindLeg from "@/components/HindLeg";
import ParticleSimulator from "@/components/ParticleSimulator";

export default function Home() {

  return (
    <Scene width={"100%"} height={"100%"} background={"#13061c"} perspectiveOriginY={"-400px"} perspective={"800px"}>
      <Camera canRotate={true} rotationSensitivity={700} initialRotateY={"30deg"}>
        <ParticleSimulator duration={2} particleCount={100}></ParticleSimulator>
        <Group>
          <Body></Body>
          <Neck></Neck>
          <Head></Head>
          <Tail></Tail>
          <Wing></Wing>
          <Wing flipped={true}></Wing>
          <FrontLeg></FrontLeg>
          <FrontLeg flipped={true}></FrontLeg>
          <HindLeg></HindLeg>
          <HindLeg flipped={true}></HindLeg>
        </Group>
      </Camera>
    </Scene>
  );
}
