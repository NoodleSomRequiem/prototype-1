import * as PIXI from "pixi.js";
import { Fish } from "./fish";
import fishImage from "./images/bee.png";
import waterImage from "./images/yah.jpg";

export class Game {
  private pixi: PIXI.Application;
  private loader: PIXI.Loader;
  private fishes: Fish[] = [];
 
  constructor() {
    this.pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(this.pixi.view);

    console.log("starting .. ?");

    this.loader = new PIXI.Loader();
    this.loader
      .add("fishTexture", fishImage)
      .add("waterTexture", waterImage)
     

    this.loader.onProgress.add((loader) => this.showProgress(loader));
    this.loader.onError.add((arg) => {
      console.error(arg);
    });
    this.loader.load(() => this.startGame());
  }

  private showProgress(p: PIXI.Loader) {
    console.log(p.progress);
  }

  private startGame() {
    let bg = new PIXI.Sprite(
      this.loader.resources["waterTexture"].texture!,
      
      
    );
    this.pixi.stage.addChild(bg);

    for (let i = 0; i < 14; i++) {
      let fish = new Fish(this.loader.resources["fishTexture"].texture!);
      this.pixi.stage.addChild(fish);
      this.fishes.push(fish);
    }

    

    this.pixi.ticker.add(() => this.update());
  }



  private update() {
    for (let fish of this.fishes) {
      fish.swim();
     
      }
    }
 
    }

  
