import React, {CSSProperties} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// @ts-ignore
import classes from "./tree2.module.css";

function asyncRaf(): Promise<DOMHighResTimeStamp> {
    return new Promise(resolve => {
        requestAnimationFrame(resolve);
    })
}

function Tree() {
    let leftBranches = [];
    let rightBranches = [];
    let branchesLeft = 3;
    for (let i = 0; i < 5.5; i += 0.5) {
        let baseW = 5;
        let baseH = 60 * (0.3 + 0.60 * i);
        if (baseH < 20) baseH = 20;
        leftBranches.push(<RecursiveBranch baseW={baseW} baseH={baseH} branchesLeft={branchesLeft}/>);
        rightBranches.push(<RecursiveBranch baseW={baseW} baseH={baseH} branchesLeft={branchesLeft}/>);
    }
    let balls = [];
    for (let i = 0; i <= 7; i++) {
        balls.push(<Ball className={classes["ball"+i]}></Ball>)
    }
    return <div className={classes.tree}>
        <div className={classes.trunk}></div>
        <div className={classes.trunkShade}></div>

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
                                                   nestLevel={nestLevel + 1}
                                                   className={`${classes.transform} ${classes["branch" + i] || ""}`}/>);
            }
        }
    }
    return <div style={{
        "--baseW": props.baseW !== undefined ? `calc(${props.baseW / 10} * var(--unitSize))` : undefined,
        "--baseH": props.baseH !== undefined ? `calc(${props.baseH / 10} * var(--unitSize))` : undefined,
        position: props.absolute ? "absolute" : "relative",
    } as CSSProperties} className={`${classes.branch} ${props.className || ""} ${classes[`green${nestLevel}`]}`}>
        {miniBranches}
    </div>
}

function SnowflakeCanvas() {
    const canvas = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const currentElement = canvas.current;
        if (currentElement) {
            const ctx: CanvasRenderingContext2D = currentElement.getContext("2d");
            ctx.globalCompositeOperation = 'source-over'
            let circleCount = 0;
            let queue: {x: number, y: number, radius: number}[] = [];
            let maxElements;

            function resize() {
                currentElement.width = currentElement.parentElement.offsetWidth;
                currentElement.height = currentElement.parentElement.offsetHeight;
                maxElements = Math.min(currentElement.height * currentElement.width / 6000, 2000);
            }
            resize();

            class Circle {
                startingX = Math.random() * currentElement.width;
                x = this.startingX;
                startingY = 0;
                y = this.startingY;
                amplitude = 40 * Math.random();
                radius = 2 + 2 * Math.random();
                t = 0;
                initialTime = 0;
                phaseDelay = Math.random() * 2 * Math.PI;
                running = true;

                constructor(startingY?: number) {
                    this.startingY = startingY ?? 0;
                    circleCount++;
                    this.render().then(() => {
                        circleCount--;
                    });
                }

                async render() {
                    this.initialTime = await asyncRaf();
                    const stopRender = () => {
                        window.removeEventListener("resize", stopRender);
                        this.running = false;
                    }
                    window.addEventListener("resize", stopRender);
                    while (this.y < currentElement.height && this.running) {
                        this.t = (await asyncRaf() - this.initialTime) / 1000;
                        this.x = this.startingX + this.amplitude * Math.cos(this.t * 1/2 - this.phaseDelay);
                        this.y = this.startingY + 80 * this.t;
                        queue.push({
                            x: this.x,
                            y: this.y,
                            radius: this.radius,
                        });
                    }
                    stopRender();
                }
            }

            let renderLoopCancelled = false;
            setTimeout(async () => {
                while (!renderLoopCancelled) {
                    await asyncRaf();
                    ctx.clearRect(0, 0, currentElement.width, currentElement.height);
                    for (let snowflake of queue) {
                        ctx.beginPath();
                        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, 2 * Math.PI);
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                    }
                    queue = [];
                }
            });

            function fillSnowflake() {
                while (circleCount < maxElements) {
                    new Circle(currentElement.height * Math.random());
                }
            }

            let snowflakeInterval = setInterval(() => {
                if (circleCount < maxElements) {
                    new Circle();
                }
            }, 10);

            fillSnowflake();

            let timeout;
            function resizeHandler() {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    resize();
                    setTimeout(fillSnowflake, 0);
                }, 300);
            }
            window.addEventListener("resize", resizeHandler);

            return () => {
                window.removeEventListener("resize", resizeHandler);
                renderLoopCancelled = true;
                clearInterval(snowflakeInterval);
            }
        }
    }, []);

    return <div className={classes.snowflakeCanvasContainer}>
        <canvas ref={canvas}></canvas>
    </div>
}

function Ground() {
    return <div className={classes.ground}></div>
}

function Canvas() {
    return <div className={classes.canvas}>
        <Tree></Tree>
        <Ground></Ground>
        <GiftBox1/>
        <GiftBox2/>
        <SnowflakeCanvas></SnowflakeCanvas>
    </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Canvas/>
)
