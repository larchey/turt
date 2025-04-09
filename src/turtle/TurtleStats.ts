export interface StatsStatus {
  durability: number;
  strength: number;
  speed: number;
  stamina: number;
  emotion: number;
}

export class TurtleStats {
  private durability: number;
  private strength: number;
  private speed: number;
  private stamina: number;
  private emotion: number;
  private readonly MAX_VALUE = 100;
  private readonly MIN_VALUE = 1;

  constructor() {
    // Initialize stats with default values
    this.durability = 50;
    this.strength = 50;
    this.speed = 50;
    this.stamina = 50;
    this.emotion = 50;
  }

  public getStatus(): StatsStatus {
    return {
      durability: this.durability,
      strength: this.strength,
      speed: this.speed,
      stamina: this.stamina,
      emotion: this.emotion
    };
  }

  public increaseDurability(amount: number): void {
    this.durability = Math.min(this.MAX_VALUE, this.durability + amount);
  }

  public increaseStrength(amount: number): void {
    this.strength = Math.min(this.MAX_VALUE, this.strength + amount);
  }

  public increaseSpeed(amount: number): void {
    this.speed = Math.min(this.MAX_VALUE, this.speed + amount);
  }

  public increaseStamina(amount: number): void {
    this.stamina = Math.min(this.MAX_VALUE, this.stamina + amount);
  }

  public increaseEmotion(amount: number): void {
    this.emotion = Math.min(this.MAX_VALUE, this.emotion + amount);
  }

  public decreaseDurability(amount: number): void {
    this.durability = Math.max(this.MIN_VALUE, this.durability - amount);
  }

  public decreaseStrength(amount: number): void {
    this.strength = Math.max(this.MIN_VALUE, this.strength - amount);
  }

  public decreaseSpeed(amount: number): void {
    this.speed = Math.max(this.MIN_VALUE, this.speed - amount);
  }

  public decreaseStamina(amount: number): void {
    this.stamina = Math.max(this.MIN_VALUE, this.stamina - amount);
  }

  public decreaseEmotion(amount: number): void {
    this.emotion = Math.max(this.MIN_VALUE, this.emotion - amount);
  }

  public getDurabilityLevel(): string {
    if (this.durability > 80) return 'Excellent';
    if (this.durability > 60) return 'Good';
    if (this.durability > 40) return 'Average';
    if (this.durability > 20) return 'Poor';
    return 'Terrible';
  }

  public getStrengthLevel(): string {
    if (this.strength > 80) return 'Mighty';
    if (this.strength > 60) return 'Strong';
    if (this.strength > 40) return 'Average';
    if (this.strength > 20) return 'Weak';
    return 'Frail';
  }

  public getSpeedLevel(): string {
    if (this.speed > 80) return 'Speedy';
    if (this.speed > 60) return 'Swift';
    if (this.speed > 40) return 'Average';
    if (this.speed > 20) return 'Slow';
    return 'Crawling';
  }

  public getStaminaLevel(): string {
    if (this.stamina > 80) return 'Tireless';
    if (this.stamina > 60) return 'Energetic';
    if (this.stamina > 40) return 'Average';
    if (this.stamina > 20) return 'Tired';
    return 'Exhausted';
  }

  public getEmotionLevel(): string {
    if (this.emotion > 80) return 'Blissful';
    if (this.emotion > 60) return 'Happy';
    if (this.emotion > 40) return 'Content';
    if (this.emotion > 20) return 'Sad';
    return 'Miserable';
  }

  public static fromJSON(json: any): TurtleStats {
    const stats = new TurtleStats();
    
    if (json.durability !== undefined) stats.durability = json.durability;
    if (json.strength !== undefined) stats.strength = json.strength;
    if (json.speed !== undefined) stats.speed = json.speed;
    if (json.stamina !== undefined) stats.stamina = json.stamina;
    if (json.emotion !== undefined) stats.emotion = json.emotion;
    
    return stats;
  }
}
