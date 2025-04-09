import { v4 as uuidv4 } from 'uuid';
import { TurtleAttributes } from './TurtleAttributes';
import { TurtleNeeds } from './TurtleNeeds';
import { TurtleStats } from './TurtleStats';

export class Turtle {
  private id: string;
  private createdAt: Date;
  private attributes: TurtleAttributes;
  private needs: TurtleNeeds;
  private stats: TurtleStats;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.attributes = new TurtleAttributes();
    this.needs = new TurtleNeeds();
    this.stats = new TurtleStats();
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getAttributes(): TurtleAttributes {
    return this.attributes;
  }

  public getNeeds(): TurtleNeeds {
    return this.needs;
  }

  public getStats(): TurtleStats {
    return this.stats;
  }

  public getAge(): number {
    const now = new Date();
    const diffInMs = now.getTime() - this.createdAt.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  }

  public feed(): void {
    this.needs.increaseFood(30);
    this.stats.increaseStrength(5);
  }

  public giveWater(): void {
    this.needs.increaseWater(40);
    this.stats.increaseStamina(5);
  }

  public giveLove(): void {
    this.needs.increaseLove(25);
    this.stats.increaseSpeed(5);
  }

  public clean(): void {
    this.needs.resetCleanliness();
    this.stats.increaseEmotion(10);
  }

  public adjustTemperature(value: number): void {
    this.needs.setTemperature(value);
    this.stats.increaseDurability(5);
  }

  public updateNeeds(): void {
    this.needs.decreaseAll();
    this.updateStats();
  }

  private updateStats(): void {
    // Update stats based on needs
    const needsStatus = this.needs.getStatus();
    
    // If needs are critically low, decrease stats
    if (needsStatus.food < 20) {
      this.stats.decreaseStrength(2);
    }
    
    if (needsStatus.water < 20) {
      this.stats.decreaseStamina(2);
    }
    
    if (needsStatus.love < 20) {
      this.stats.decreaseSpeed(2);
    }
    
    if (needsStatus.cleanliness < 20) {
      this.stats.decreaseEmotion(2);
    }
    
    if (Math.abs(needsStatus.temperature - 75) > 15) {
      this.stats.decreaseDurability(2);
    }
  }

  public static fromJSON(json: any): Turtle {
    const turtle = new Turtle();
    
    if (json.id) turtle.id = json.id;
    if (json.createdAt) turtle.createdAt = new Date(json.createdAt);
    if (json.attributes) turtle.attributes = TurtleAttributes.fromJSON(json.attributes);
    if (json.needs) turtle.needs = TurtleNeeds.fromJSON(json.needs);
    if (json.stats) turtle.stats = TurtleStats.fromJSON(json.stats);
    
    return turtle;
  }

  public toJSON(): any {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString(),
      attributes: this.attributes,
      needs: this.needs,
      stats: this.stats
    };
  }
}
