import * as vscode from 'vscode';
import { Turtle } from './Turtle';

export class TurtleManager {
  private turtle: Turtle | undefined;
  private context: vscode.ExtensionContext;
  private needsInterval: NodeJS.Timeout | undefined;
  private readonly SAVE_KEY = 'turtcode.turtleData';
  private readonly NEEDS_UPDATE_INTERVAL = 10 * 60 * 1000; // 10 minutes

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.loadOrCreateTurtle();
    this.startNeedsUpdater();
  }

  private loadOrCreateTurtle(): void {
    const savedData = this.context.globalState.get<string>(this.SAVE_KEY);
    
    if (savedData) {
      try {
        this.turtle = Turtle.fromJSON(JSON.parse(savedData));
        console.log('Turtle loaded successfully');
      } catch (error) {
        console.error('Failed to load turtle', error);
        this.turtle = new Turtle();
      }
    } else {
      this.turtle = new Turtle();
      console.log('New turtle created');
    }
    
    this.saveTurtle();
  }

  private saveTurtle(): void {
    if (this.turtle) {
      this.context.globalState.update(this.SAVE_KEY, JSON.stringify(this.turtle));
    }
  }

  private startNeedsUpdater(): void {
    this.needsInterval = setInterval(() => {
      if (this.turtle) {
        this.turtle.updateNeeds();
        this.saveTurtle();
      }
    }, this.NEEDS_UPDATE_INTERVAL);
  }

  public getTurtle(): Turtle | undefined {
    return this.turtle;
  }

  public feedTurtle(): void {
    if (this.turtle) {
      this.turtle.feed();
      this.saveTurtle();
    }
  }

  public giveWater(): void {
    if (this.turtle) {
      this.turtle.giveWater();
      this.saveTurtle();
    }
  }

  public giveLove(): void {
    if (this.turtle) {
      this.turtle.giveLove();
      this.saveTurtle();
    }
  }

  public clean(): void {
    if (this.turtle) {
      this.turtle.clean();
      this.saveTurtle();
    }
  }

  public adjustTemperature(value: number): void {
    if (this.turtle) {
      this.turtle.adjustTemperature(value);
      this.saveTurtle();
    }
  }

  public dispose(): void {
    if (this.needsInterval) {
      clearInterval(this.needsInterval);
    }
    this.saveTurtle();
  }
}
