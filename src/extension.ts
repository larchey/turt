import * as vscode from 'vscode';
import { TurtleManager } from './turtle/TurtleManager';
import { StatusBarManager } from './ui/StatusBar';
import { TurtleWebviewPanel } from './ui/WebviewPanel';
import { registerCommands } from './commands/commands';

let turtleManager: TurtleManager;
let statusBarManager: StatusBarManager;

export function activate(context: vscode.ExtensionContext) {
  console.log('TurtCode is now active!');
  
  // Initialize the turtle manager
  turtleManager = new TurtleManager(context);
  
  // Initialize the status bar
  statusBarManager = new StatusBarManager(context, turtleManager);
  
  // Register commands
  registerCommands(context, turtleManager);
  
  // Show status bar
  statusBarManager.show();
  
  // Register the webview panel provider
  context.subscriptions.push(
    vscode.commands.registerCommand('turtcode.showTurtle', () => {
      TurtleWebviewPanel.createOrShow(context, turtleManager);
    })
  );
}

export function deactivate() {
  // Clean up
  if (statusBarManager) {
    statusBarManager.dispose();
  }
}
