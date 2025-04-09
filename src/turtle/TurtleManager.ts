import * as vscode from 'vscode';
import { Turtle } from './Turtle';
import { HatType } from './TurtleAttributes';

export class TurtleManager {
  private turtle: Turtle | undefined;
  private context: vscode.ExtensionContext;
  private needsInterval: NodeJS.Timeout | undefined;
  private readonly SAVE_KEY = 'turtcode.turtleData';
  private readonly UNLOCKED_HATS_KEY = 'turtcode.unlockedHats';
  private readonly NEEDS_UPDATE_INTERVAL = 10 * 60 * 1000; // 10 minutes
  private unlockedHats: Set<HatType>;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.unlockedHats = new Set<HatType>(context.globalState.get<HatType[]>(this.UNLOCKED_HATS_KEY) || []);
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

  private saveUnlockedHats(): void {
    this.context.globalState.update(this.UNLOCKED_HATS_KEY, Array.from(this.unlockedHats));
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

  public renameTurtle(name: string): void {
    if (this.turtle) {
      this.turtle.getAttributes().setName(name);
      this.saveTurtle();
    }
  }

  public unlockRandomHat(): HatType | null {
    if (!this.turtle) {
      return null;
    }

    // Get all available hats that haven't been unlocked yet
    const allHats = Object.values(HatType);
    const availableHats = allHats.filter(hat => !this.unlockedHats.has(hat));

    // If all hats are unlocked, return null
    if (availableHats.length === 0) {
      return null;
    }

    // Unlock a random hat
    const randomHat = availableHats[Math.floor(Math.random() * availableHats.length)];
    this.unlockedHats.add(randomHat);
    this.saveUnlockedHats();

    // Set the hat on the turtle and save
    this.turtle.getAttributes().setHat(randomHat);
    this.saveTurtle();

    return randomHat;
  }

  public getUnlockedHats(): HatType[] {
    return Array.from(this.unlockedHats);
  }

  public setHat(hat: HatType): boolean {
    if (!this.turtle || !this.unlockedHats.has(hat)) {
      return false;
    }

    this.turtle.getAttributes().setHat(hat);
    this.saveTurtle();
    return true;
  }

  public removeHat(): void {
    if (this.turtle) {
      this.turtle.getAttributes().removeHat();
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
