import './style.css'
import shadow_dog from './assets/sprite/shadow_dog.png'
import { animateStates} from './types';

let playState = "idle";

const dropdown = document.querySelector('#animations') as HTMLElement;
dropdown.addEventListener("change", (e:Event) => {
  playState = (e.target as HTMLInputElement).value;

  console.log(e);
});
const canvas: HTMLCanvasElement = document.querySelector(
  "#app"
)!;


const ctx = canvas.getContext('2d')!;
console.log(ctx);
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = shadow_dog;
//sprite size
const spriteWidth = 575;
const spriteHeight = 523;
//animate frame
let frameX = 0;
let frameY = 2;
let gameFrame = 0;
const  staggerFrames = 4;

const spriteAnimates:{[key:string]:any} = {};
const animateStates: animateStates[] = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bit",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  }
];
type frames ={
    loc:{x:number;y:number}[]
}
animateStates.forEach((state,index)=>{
  let frames:frames = {
    loc:[]
  }

  for(let i = 0; i < state.frames; i++){
    let positionX = i * spriteWidth ;
    let positionY = index * spriteHeight;
    frames.loc.push({x:positionX, y:positionY})
  }
  spriteAnimates[state.name] = frames;
})
console.log(spriteAnimates)
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
   let position = Math.floor(gameFrame/staggerFrames) % spriteAnimates[playState].loc.length;
   frameX = spriteWidth * position; 
   frameY = spriteAnimates[playState].loc[position].y;
  // ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)
  ctx.drawImage(
    playerImage,
    frameX, 
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  gameFrame++ ;
 
   requestAnimationFrame(animate);
}

animate();