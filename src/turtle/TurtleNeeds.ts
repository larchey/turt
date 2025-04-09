export interface NeedsStatus {
  food: number;
  water: number;
  love: number;
  cleanliness: number;
  temperature: number;
}

export class TurtleNeeds {
  private food: number;
  private water: number;
  private love: number;
  private cleanliness: number;
  private temperature: number;
  private readonly MAX_VALUE = 100;
  private readonly OPTIMAL_TEMPERATURE = 75; // in °F

  constructor() {
    // Initialize needs with default values
    this.food = 70;
    this.water = 70;
    this.love = 70;
    this.cleanliness = 100;
    this.temperature = this.OPTIMAL_TEMPERATURE;
  }

  public getStatus(): NeedsStatus {
    return {
      food: this.food,
      water: this.water,
      love: this.love,
      cleanliness: this.cleanliness,
      temperature: this.temperature
    };
  }

  public decreaseAll(): void {
    // Natural decrease of needs over time
    this.food = Math.max(0, this.food - 5);
    this.water = Math.max(0, this.water - 7);
    this.love = Math.max(0, this.love - 3);
    this.cleanliness = Math.max(0, this.cleanliness - 10);
    
    // Randomly fluctuate temperature a bit
    const tempChange = Math.random() > 0.5 ? 2 : -2;
    this.temperature += tempChange;
  }

  public increaseFood(amount: number): void {
    this.food = Math.min(this.MAX_VALUE, this.food + amount);
  }

  public increaseWater(amount: number): void {
    this.water = Math.min(this.MAX_VALUE, this.water + amount);
  }

  public increaseLove(amount: number): void {
    this.love = Math.min(this.MAX_VALUE, this.love + amount);
  }

  public resetCleanliness(): void {
    this.cleanliness = this.MAX_VALUE;
  }

  public setTemperature(value: number): void {
    // Ensure temperature stays within reasonable bounds
    this.temperature = Math.max(50, Math.min(100, value));
  }

  public getTemperatureStatus(): string {
    const temp = this.temperature;
    const optimal = this.OPTIMAL_TEMPERATURE;
    
    if (Math.abs(temp - optimal) <= 5) {
      return 'Perfect';
    } else if (temp < optimal - 15) {
      return 'Too Cold';
    } else if (temp < optimal - 5) {
      return 'Cold';
    } else if (temp > optimal + 15) {
      return 'Too Hot';
    } else if (temp > optimal + 5) {
      return 'Hot';
    } else {
      return 'Acceptable';
    }
  }

  public getFoodStatus(): string {
    if (this.food > 80) return 'Full';
    if (this.food > 50) return 'Satisfied';
    if (this.food > 20) return 'Hungry';
    return 'Starving';
  }

  public getWaterStatus(): string {
    if (this.water > 80) return 'Hydrated';
    if (this.water > 50) return 'Content';
    if (this.water > 20) return 'Thirsty';
    return 'Dehydrated';
  }

  public getLoveStatus(): string {
    if (this.love > 80) return 'Adored';
    if (this.love > 50) return 'Happy';
    if (this.love > 20) return 'Lonely';
    return 'Depressed';
  }

  public getCleanlinessStatus(): string {
    if (this.cleanliness > 80) return 'Spotless';
    if (this.cleanliness > 50) return 'Clean';
    if (this.cleanliness > 20) return 'Dirty';
    return 'Filthy';
  }

  public static fromJSON(json: any): TurtleNeeds {
    const needs = new TurtleNeeds();
    
    if (json.food !== undefined) needs.food = json.food;
    if (json.water !== undefined) needs.water = json.water;
    if (json.love !== undefined) needs.love = json.love;
    if (json.cleanliness !== undefined) needs.cleanliness = json.cleanliness;
    if (json.temperature !== undefined) needs.temperature = json.temperature;
    
    return needs;
  }
}
