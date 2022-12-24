import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import classes from "./tree.module.css";

function Tree() {
    let leftBranches = [];
    let rightBranches = [];
    let branchesLeft = 4;
    for (let i = 0; i < 5.5; i += 0.5) {
        let baseW = 5;
        let baseH = 60 * (0.3 + 0.60 * i);
        if (baseH < 20) baseH = 20;
        leftBranches.push(<RecursiveBranch baseW={baseW} baseH={baseH} branchesLeft={branchesLeft} lum={0.25}/>);
        rightBranches.push(<RecursiveBranch baseW={baseW} baseH={baseH} branchesLeft={branchesLeft}/>);
    }
    let balls = [];
    for (let i = 0; i <= 7; i++) {
        balls.push(<Ball className={classes["ball"+i]}></Ball>)
    }
    return <div className={classes.tree}>
        <div className={classes.trunk}></div>
        <div className={classes.trunkShade}></div>
        <GiftBox2/>
        <GiftBox1/>
        <div className={classes.star}>
            <div className={classes.starInner}></div>
        </div>
        <div className={classes.branchFrameAxis}>
            <div className={`${classes.branchFrame} ${classes.transform}`}>
                {leftBranches}
            </div>
        </div>
        <div className={classes.branchFrameReflect}>
            <div className={`${classes.branchFrame} ${classes.transform}`}>
                {rightBranches}
            </div>
        </div>
        {balls}
    </div>
}

function GiftBox1(props) {
    return <div className={`${classes.giftBox1} ${classes.transform} ${props.className || ""}`}>
        <div className={`${classes.giftBox1Overlay1}`}></div>
        <div className={`${classes.giftBox1Overlay2}`}></div>
        <div className={`${classes.bowtie1} ${classes.transform}`}>
            <div className={`${classes.bowtie1P1} ${classes.transform}`}></div>
            <div className={`${classes.bowtie1P1} ${classes.flipVertical}`}></div>
            <div className={`${classes.bowtie1P2} ${classes.transform}`}></div>
        </div>
    </div>
}
function GiftBox2(props) {
    return <div className={`${classes.giftBox2} ${classes.transform} ${props.className || ""}`}>
        <div className={`${classes.giftBox2Overlay1}`}></div>
        <div className={`${classes.giftBox2Overlay2}`}></div>
        <div className={`${classes.bowtie2} ${classes.transform}`}>
            <div className={`${classes.bowtie2P1} ${classes.transform}`}></div>
            <div className={`${classes.bowtie2P1} ${classes.flipVertical}`}></div>
            <div className={`${classes.bowtie2P2} ${classes.transform}`}></div>
        </div>
    </div>
}

function Ball(props) {
    return <div className={`${classes.ball} ${classes.transform} ${props.className || ""}`}></div>
}
function RecursiveBranch(props) {
    const miniBranches = [];
    const nestLevel = props.nestLevel ?? 0;
    if (props.branchesLeft >= 1) {
        for (let i = 0; i < 6; i++) {
            if (props.branchesLeft > 1 || Math.random() > 0.2   ) {
                miniBranches.push(<RecursiveBranch absolute={true} baseW={props.baseW * 0.5} baseH={props.baseH * 1 / 2}
                                                   branchesLeft={props.branchesLeft - 1}
                                                   lum={props.lum * 3 / 4}
                                                   nestLevel={nestLevel + 1}
                                                   className={`${classes.transform} ${classes["branch" + i] || ""}`}/>);
            }
        }
    }
    return <div style={{
        "--baseW": props.baseW !== undefined ? props.baseW + "px" : undefined,
        "--baseH": props.baseH !== undefined ? props.baseH + "px" : undefined,
        position: props.absolute ? "absolute" : "relative",
    }} className={`${classes.branch} ${props.className || ""} ${classes[`green${nestLevel}`]}`}>
        {miniBranches}
    </div>
}

function Canvas() {
    return <div className={classes.canvas}>
        <Tree></Tree>
    </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Canvas/>
)
