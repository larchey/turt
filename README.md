# TurtCode 🐢

A VS Code extension featuring a Tamagotchi-style virtual pet turtle that lives in your editor.

## Features

### Turtle Customization
Your turtle can have various attributes with different rarity levels:
- **Shells**: Common, Uncommon, Rare, Epic, Legendary
- **Colors**: Various turtle colors with different rarity tiers
- **Sizes**: Tiny, Small, Medium, Large, Giant
- **Eyes**: Different eye types and colors
- **Age**: Baby, Young, Adult, Elder
- **Horoscope**: All zodiac signs with unique personality traits
- **Gender**: Male, Female, Non-binary
- **Names**: Generated or customizable
- **Hats**: Various collectible hats with different rarity tiers

### Turtle Needs
Your turtle has several needs you must attend to:
- **Food**: Feed your turtle regularly
- **Water**: Keep your turtle hydrated
- **Love**: Play with and pet your turtle
- **Cleaning**: Clean up after your turtle's "dookies"
- **Temperature**: Maintain optimal enclosure temperature

### Turtle Stats
Your turtle's stats improve based on how well you meet its needs:
- **Durability**: Increases with proper temperature maintenance
- **Strength**: Increases with proper feeding
- **Speed**: Increases with proper love and attention
- **Stamina**: Increases with proper hydration
- **Emotion**: Increases when you clean up after it

## Getting Started

### Prerequisites
- VS Code 1.60.0 or higher
- Node.js 14.x or higher
- npm or yarn

### Installation (Development)
1. Clone this repository
```bash
git clone https://github.com/yourusername/turtcode.git
cd turtcode
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Launch with debugging
Press F5 in VS Code to launch a new window with the extension loaded.

### Project Structure
```
turtcode/
├── src/                      # Source code
│   ├── extension.ts          # Extension entry point
│   ├── turtle/               # Turtle core functionality
│   │   ├── Turtle.ts         # Main Turtle class
│   │   ├── TurtleAttributes.ts # Appearance and customization
│   │   ├── TurtleNeeds.ts    # Need management
│   │   ├── TurtleStats.ts    # Stats management
│   │   └── generators.ts     # Random generation with rarity
│   ├── ui/                   # UI Components
│   │   ├── StatusBar.ts      # StatusBar integration
│   │   ├── WebviewPanel.ts   # Main turtle view
│   │   └── assets/           # Images and styles
│   ├── commands/             # VS Code command handlers
│   └── utils/                # Utility functions
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
├── .vscodeignore             # Files to exclude from package
├── webpack.config.js         # Webpack configuration
└── README.md                 # This file
```

### Development Steps
1. **Set up the basic extension structure** - Initialize project and configure VS Code extension
2. **Create the turtle model** - Implement the core turtle class with attributes, needs, and stats
3. **Implement random generation** - Create generator functions with rarity distributions
4. **Build the UI** - Create status bar and webview panel for interacting with the turtle
5. **Implement need management** - Create the systems for feeding, watering, etc.
6. **Add persistence** - Save and load turtle state between sessions
7. **Polish and refine** - Add animations, sounds, and visual feedback

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.