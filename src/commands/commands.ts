import * as vscode from 'vscode';
import { TurtleManager } from '../turtle/TurtleManager';
import { TurtleWebviewPanel } from '../ui/WebviewPanel';

export function registerCommands(context: vscode.ExtensionContext, turtleManager: TurtleManager): void {
  // Register feed command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.feed', () => {
      turtleManager.feedTurtle();
      vscode.window.showInformationMessage('Turtle has been fed!');
    })
  );

  // Register give water command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.giveWater', () => {
      turtleManager.giveWater();
      vscode.window.showInformationMessage('Turtle has been given water!');
    })
  );

  // Register give love command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.giveLove', () => {
      turtleManager.giveLove();
      vscode.window.showInformationMessage('Turtle has been shown love!');
    })
  );

  // Register clean command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.clean', () => {
      turtleManager.clean();
      vscode.window.showInformationMessage('Turtle enclosure has been cleaned!');
    })
  );

  // Register adjust temperature command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.adjustTemperature', async () => {
      const options = ['Too Cold', 'Cold', 'Perfect', 'Hot', 'Too Hot'];
      const temperatureMap = {
        'Too Cold': 60,
        'Cold': 70,
        'Perfect': 75,
        'Hot': 80,
        'Too Hot': 90
      };
      
      const selected = await vscode.window.showQuickPick(options, {
        placeHolder: 'Choose a temperature setting'
      });
      
      if (selected && temperatureMap[selected] !== undefined) {
        turtleManager.adjustTemperature(temperatureMap[selected]);
        vscode.window.showInformationMessage(`Temperature set to ${selected} (${temperatureMap[selected]}°F)`);
      }
    })
  );
  
  // Register unlock hat command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.unlockHat', () => {
      const newHat = turtleManager.unlockRandomHat();
      if (newHat) {
        vscode.window.showInformationMessage(`🎉 Your turtle unlocked a new hat: ${newHat}!`);
      } else {
        vscode.window.showInformationMessage('Your turtle already has all available hats!');
      }
    })
  );
  
  // Register rename turtle command
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.renameTurtle', async () => {
      const turtle = turtleManager.getTurtle();
      if (!turtle) { return; }
      
      const name = await vscode.window.showInputBox({
        placeHolder: 'Enter a new name for your turtle',
        prompt: 'Rename Your Turtle',
        value: turtle.getAttributes().getName()
      });
      
      if (name) {
        turtleManager.renameTurtle(name);
        vscode.window.showInformationMessage(`Your turtle has been renamed to ${name}!`);
      }
    })
  );
}
