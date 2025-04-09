import { generateRandom } from './generators';

export enum ShellRarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary'
}

export enum TurtleSize {
  Tiny = 'Tiny',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Giant = 'Giant'
}

export enum TurtleAge {
  Baby = 'Baby',
  Young = 'Young',
  Adult = 'Adult',
  Elder = 'Elder'
}

export enum TurtleGender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'Non-binary'
}

export enum Horoscope {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces'
}

export class TurtleAttributes {
  private shellType: string;
  private shellRarity: ShellRarity;
  private color: string;
  private size: TurtleSize;
  private eyeType: string;
  private age: TurtleAge;
  private horoscope: Horoscope;
  private gender: TurtleGender;
  private name: string;
  private hat: string | null;

  constructor() {
    // Generate random attributes
    this.shellType = this.generateShellType();
    this.shellRarity = this.generateShellRarity();
    this.color = this.generateColor();
    this.size = this.generateSize();
    this.eyeType = this.generateEyeType();
    this.age = this.generateAge();
    this.horoscope = this.generateHoroscope();
    this.gender = this.generateGender();
    this.name = this.generateName();
    this.hat = null; // Start with no hat
  }

  private generateShellType(): string {
    const shellTypes = [
      'Classic', 'Spiked', 'Smooth', 'Patterned', 'Crystal', 'Ancient', 
      'Fossil', 'Hardened', 'Glowing', 'Metallic', 'Golden', 'Ruby', 
      'Emerald', 'Sapphire', 'Diamond'
    ];
    return generateRandom(shellTypes, [
      { value: 'Classic', weight: 40 },
      { value: 'Spiked', weight: 20 },
      { value: 'Smooth', weight: 20 },
      { value: 'Patterned', weight: 10 },
      { value: 'Crystal', weight: 3 },
      { value: 'Ancient', weight: 2 },
      { value: 'Fossil', weight: 2 },
      { value: 'Hardened', weight: 1 },
      { value: 'Glowing', weight: 1 },
      { value: 'Metallic', weight: 0.5 },
      { value: 'Golden', weight: 0.3 },
      { value: 'Ruby', weight: 0.1 },
      { value: 'Emerald', weight: 0.05 },
      { value: 'Sapphire', weight: 0.03 },
      { value: 'Diamond', weight: 0.02 }
    ]);
  }

  private generateShellRarity(): ShellRarity {
    return generateRandom(Object.values(ShellRarity), [
      { value: ShellRarity.Common, weight: 60 },
      { value: ShellRarity.Uncommon, weight: 25 },
      { value: ShellRarity.Rare, weight: 10 },
      { value: ShellRarity.Epic, weight: 4 },
      { value: ShellRarity.Legendary, weight: 1 }
    ]);
  }

  private generateColor(): string {
    const colors = [
      'Green', 'Brown', 'Olive', 'Gray', 'Blue', 'Red', 'Purple', 
      'Yellow', 'Orange', 'Pink', 'Teal', 'Turquoise', 'Gold', 'Silver', 'Rainbow'
    ];
    return generateRandom(colors, [
      { value: 'Green', weight: 30 },
      { value: 'Brown', weight: 30 },
      { value: 'Olive', weight: 20 },
      { value: 'Gray', weight: 10 },
      { value: 'Blue', weight: 5 },
      { value: 'Red', weight: 2 },
      { value: 'Purple', weight: 1 },
      { value: 'Yellow', weight: 1 },
      { value: 'Orange', weight: 0.5 },
      { value: 'Pink', weight: 0.3 },
      { value: 'Teal', weight: 0.1 },
      { value: 'Turquoise', weight: 0.05 },
      { value: 'Gold', weight: 0.03 },
      { value: 'Silver', weight: 0.02 },
      { value: 'Rainbow', weight: 0.01 }
    ]);
  }

  private generateSize(): TurtleSize {
    return generateRandom(Object.values(TurtleSize), [
      { value: TurtleSize.Tiny, weight: 10 },
      { value: TurtleSize.Small, weight: 25 },
      { value: TurtleSize.Medium, weight: 40 },
      { value: TurtleSize.Large, weight: 20 },
      { value: TurtleSize.Giant, weight: 5 }
    ]);
  }

  private generateEyeType(): string {
    const eyeTypes = [
      'Black', 'Blue', 'Green', 'Brown', 'Yellow', 'Red', 
      'Purple', 'Heterochromia', 'Glowing', 'Star-shaped'
    ];
    return generateRandom(eyeTypes, [
      { value: 'Black', weight: 40 },
      { value: 'Blue', weight: 20 },
      { value: 'Green', weight: 15 },
      { value: 'Brown', weight: 15 },
      { value: 'Yellow', weight: 5 },
      { value: 'Red', weight: 2 },
      { value: 'Purple', weight: 1 },
      { value: 'Heterochromia', weight: 1 },
      { value: 'Glowing', weight: 0.9 },
      { value: 'Star-shaped', weight: 0.1 }
    ]);
  }

  private generateAge(): TurtleAge {
    return generateRandom(Object.values(TurtleAge), [
      { value: TurtleAge.Baby, weight: 20 },
      { value: TurtleAge.Young, weight: 30 },
      { value: TurtleAge.Adult, weight: 40 },
      { value: TurtleAge.Elder, weight: 10 }
    ]);
  }

  private generateHoroscope(): Horoscope {
    return generateRandom(Object.values(Horoscope), [
      { value: Horoscope.Aries, weight: 1 },
      { value: Horoscope.Taurus, weight: 1 },
      { value: Horoscope.Gemini, weight: 1 },
      { value: Horoscope.Cancer, weight: 1 },
      { value: Horoscope.Leo, weight: 1 },
      { value: Horoscope.Virgo, weight: 1 },
      { value: Horoscope.Libra, weight: 1 },
      { value: Horoscope.Scorpio, weight: 1 },
      { value: Horoscope.Sagittarius, weight: 1 },
      { value: Horoscope.Capricorn, weight: 1 },
      { value: Horoscope.Aquarius, weight: 1 },
      { value: Horoscope.Pisces, weight: 1 }
    ]);
  }

  private generateGender(): TurtleGender {
    return generateRandom(Object.values(TurtleGender), [
      { value: TurtleGender.Male, weight: 45 },
      { value: TurtleGender.Female, weight: 45 },
      { value: TurtleGender.NonBinary, weight: 10 }
    ]);
  }

  private generateName(): string {
    const namesByGender = {
      [TurtleGender.Male]: [
        'Sheldon', 'Rocky', 'Crush', 'Leonardo', 'Donatello', 'Raphael', 'Michelangelo',
        'Squirtle', 'Franklin', 'Bowser', 'Koopa', 'Speedy', 'Flash', 'Tank', 'Rex', 'Gus'
      ],
      [TurtleGender.Female]: [
        'Shelly', 'Penelope', 'Daphne', 'Marina', 'Coral', 'Pearl', 'Jade',
        'Terra', 'Luna', 'Emerald', 'Nova', 'Venus', 'Gem', 'Pebbles', 'Harmony'
      ],
      [TurtleGender.NonBinary]: [
        'Ripple', 'Shell', 'River', 'Ocean', 'Pebble', 'Reef', 'Storm',
        'Ziggy', 'Echo', 'Sage', 'Taylor', 'Journey', 'Wren', 'Riley', 'Casey'
      ]
    };

    const names = namesByGender[this.gender];
    return names[Math.floor(Math.random() * names.length)];
  }

  public getShellType(): string {
    return this.shellType;
  }

  public getShellRarity(): ShellRarity {
    return this.shellRarity;
  }

  public getColor(): string {
    return this.color;
  }

  public getSize(): TurtleSize {
    return this.size;
  }

  public getEyeType(): string {
    return this.eyeType;
  }

  public getAge(): TurtleAge {
    return this.age;
  }

  public getHoroscope(): Horoscope {
    return this.horoscope;
  }

  public getGender(): TurtleGender {
    return this.gender;
  }

  public getName(): string {
    return this.name;
  }

  public getHat(): string | null {
    return this.hat;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setHat(hat: string): void {
    this.hat = hat;
  }

  public removeHat(): void {
    this.hat = null;
  }

  public static fromJSON(json: any): TurtleAttributes {
    const attributes = new TurtleAttributes();
    
    if (json.shellType) attributes.shellType = json.shellType;
    if (json.shellRarity) attributes.shellRarity = json.shellRarity as ShellRarity;
    if (json.color) attributes.color = json.color;
    if (json.size) attributes.size = json.size as TurtleSize;
    if (json.eyeType) attributes.eyeType = json.eyeType;
    if (json.age) attributes.age = json.age as TurtleAge;
    if (json.horoscope) attributes.horoscope = json.horoscope as Horoscope;
    if (json.gender) attributes.gender = json.gender as TurtleGender;
    if (json.name) attributes.name = json.name;
    if (json.hat) attributes.hat = json.hat;
    
    return attributes;
  }
}
