import * as vscode from 'vscode';
import { TurtleManager } from '../turtle/TurtleManager';

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private turtleManager: TurtleManager;
  private updateInterval: NodeJS.Timeout | undefined;
  private readonly UPDATE_INTERVAL = 60 * 1000; // 1 minute

  constructor(context: vscode.ExtensionContext, turtleManager: TurtleManager) {
    this.turtleManager = turtleManager;
    
    // Create status bar item
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.command = 'turtcode.showTurtle';
    
    // Update the status bar with initial data
    this.updateStatusBar();
    
    // Start interval to update status bar
    this.startUpdateInterval();
    
    // Register the status bar item to be disposed when the extension is deactivated
    context.subscriptions.push(this.statusBarItem);
  }

  private startUpdateInterval(): void {
    this.updateInterval = setInterval(() => {
      this.updateStatusBar();
    }, this.UPDATE_INTERVAL);
  }

  private updateStatusBar(): void {
    const turtle = this.turtleManager.getTurtle();
    
    if (!turtle) {
      this.statusBarItem.text = '$(error) Turtle not found';
      return;
    }
    
    const needs = turtle.getNeeds();
    const attributes = turtle.getAttributes();
    
    // Show most critical need first
    const needsStatus = needs.getStatus();
    let criticalNeed = '';
    
    if (needsStatus.food < 30) {
      criticalNeed = '$(alert) Hungry';
    } else if (needsStatus.water < 30) {
      criticalNeed = '$(alert) Thirsty';
    } else if (needsStatus.cleanliness < 30) {
      criticalNeed = '$(alert) Dirty';
    } else if (needsStatus.love < 30) {
      criticalNeed = '$(alert) Lonely';
    } else if (Math.abs(needsStatus.temperature - 75) > 15) {
      criticalNeed = '$(alert) ' + (needsStatus.temperature < 75 ? 'Cold' : 'Hot');
    }
    
    // Show turtle icon and name
    let statusText = '$(turtle) ' + attributes.getName();
    
    // Add critical need if there is one
    if (criticalNeed) {
      statusText += ' ' + criticalNeed;
    }
    
    this.statusBarItem.text = statusText;
    this.statusBarItem.tooltip = this.generateTooltip(turtle);
  }

  private generateTooltip(turtle: any): string {
    const needs = turtle.getNeeds();
    const needsStatus = needs.getStatus();
    
    return `Turtle: ${turtle.getAttributes().getName()}
` +
      `Food: ${needs.getFoodStatus()} (${needsStatus.food}%)
` +
      `Water: ${needs.getWaterStatus()} (${needsStatus.water}%)
` +
      `Love: ${needs.getLoveStatus()} (${needsStatus.love}%)
` +
      `Cleanliness: ${needs.getCleanlinessStatus()} (${needsStatus.cleanliness}%)
` +
      `Temperature: ${needs.getTemperatureStatus()} (${needsStatus.temperature}°F)`;
  }

  public show(): void {
    this.statusBarItem.show();
  }

  public dispose(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = undefined;
    }
    this.statusBarItem.dispose();
  }
}
