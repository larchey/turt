import * as vscode from 'vscode';
import { TurtleManager } from '../turtle/TurtleManager';

export class TurtleWebviewPanel {
  public static currentPanel: TurtleWebviewPanel | undefined;
  private static readonly viewType = 'turtcodeWebview';
  
  private readonly panel: vscode.WebviewPanel;
  private readonly extensionContext: vscode.ExtensionContext;
  private readonly turtleManager: TurtleManager;
  private disposables: vscode.Disposable[] = [];
  private updateInterval: NodeJS.Timeout | undefined;
  private readonly UPDATE_INTERVAL = 5 * 1000; // 5 seconds

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext, turtleManager: TurtleManager) {
    this.panel = panel;
    this.extensionContext = context;
    this.turtleManager = turtleManager;
    
    // Set the webview's initial html content
    this.update();
    
    // Set up a timer to update the webview
    this.startUpdateInterval();
    
    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    
    // Handle messages from the webview
    this.panel.webview.onDidReceiveMessage(
      message => {
        switch (message.command) {
          case 'feed':
            this.turtleManager.feedTurtle();
            this.update();
            return;
          case 'giveWater':
            this.turtleManager.giveWater();
            this.update();
            return;
          case 'giveLove':
            this.turtleManager.giveLove();
            this.update();
            return;
          case 'clean':
            this.turtleManager.clean();
            this.update();
            return;
          case 'adjustTemperature':
            this.turtleManager.adjustTemperature(message.value);
            this.update();
            return;
        }
      },
      null,
      this.disposables
    );
  }

  public static createOrShow(context: vscode.ExtensionContext, turtleManager: TurtleManager): void {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it
    if (TurtleWebviewPanel.currentPanel) {
      TurtleWebviewPanel.currentPanel.panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel
    const panel = vscode.window.createWebviewPanel(
      TurtleWebviewPanel.viewType,
      'TurtCode',
      column || vscode.ViewColumn.One,
      {
        // Enable JavaScript in the webview
        enableScripts: true,
        // Restrict the webview to only load resources from the `media` directory
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, 'media')
        ]
      }
    );

    TurtleWebviewPanel.currentPanel = new TurtleWebviewPanel(panel, context, turtleManager);
  }

  private startUpdateInterval(): void {
    this.updateInterval = setInterval(() => {
      this.update();
    }, this.UPDATE_INTERVAL);
  }

  private update(): void {
    const turtle = this.turtleManager.getTurtle();
    if (!turtle) {
      this.panel.webview.html = this.getErrorHtml('Turtle not found');
      return;
    }
    
    this.panel.webview.html = this.getWebviewContent(turtle);
  }

  private getErrorHtml(errorMessage: string): string {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TurtCode Error</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #e74c3c; text-align: center; }
      </style>
    </head>
    <body>
      <h1>Error</h1>
      <p>${errorMessage}</p>
    </body>
    </html>`;
  }

  private getWebviewContent(turtle: any): string {
    const attributes = turtle.getAttributes();
    const needs = turtle.getNeeds();
    const stats = turtle.getStats();
    const needsStatus = needs.getStatus();
    const statsStatus = stats.getStatus();
    
    // Get URI for CSS file
    const styleUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'css', 'style.css')
    );
    
    // Get URIs for turtle images
    const turtleBaseUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'turtle', 'turtle_base.svg')
    );
    
    const turtleIdleUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'turtle', 'turtle_idle.svg')
    );
    
    const turtleEatingUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'turtle', 'turtle_eating.svg')
    );
    
    const turtleWalkingUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'turtle', 'turtle_walking.svg')
    );
    
    const turtleHappyUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'turtle', 'turtle_happy.svg')
    );
    
    const turtleCleaningUri = this.panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'turtle', 'turtle_cleaning.svg')
    );
    
    // Get hat URI if turtle has a hat
    let hatUri = null;
    if (attributes.getHat()) {
      hatUri = this.panel.webview.asWebviewUri(
        vscode.Uri.joinPath(this.extensionContext.extensionUri, 'media', 'images', 'hats', `hat_${attributes.getHat().toLowerCase()}.svg`)
      );
    }
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TurtCode</title>
      <link rel="stylesheet" href="${styleUri}">
    </head>
    <body>
      <div class="container">
        <h1>🐢 ${attributes.getName()}</h1>
        
        <div class="turtle-container idle">
          <img src="${turtleIdleUri}" alt="Your Turtle" class="pixel-turtle shell-${attributes.getColor().toLowerCase()} eyes-${attributes.getEyeType().toLowerCase()} size-${attributes.getSize().toLowerCase()} rarity-${attributes.getShellRarity()}" id="turtle-image" />
          ${hatUri ? `<img src="${hatUri}" alt="Hat" class="turtle-hat" />` : ''}
          
          <div class="temperature-indicator">
            <div class="temperature-fill" style="height: ${Math.min(100, Math.max(0, ((needsStatus.temperature - 50) / 50) * 100))}%;"></div>
            <div class="temperature-icon">🌡️</div>
          </div>
        </div>
        
        <div class="turtle-info">
          <div class="info-section">
            <div class="info-card">
              <h3>Appearance</h3>
              <div class="attribute"><span>Shell Type:</span> ${attributes.getShellType()}</div>
              <div class="attribute"><span>Shell Rarity:</span> <span class="rarity-${attributes.getShellRarity()}">${attributes.getShellRarity()}</span></div>
              <div class="attribute"><span>Color:</span> ${attributes.getColor()}</div>
              <div class="attribute"><span>Size:</span> ${attributes.getSize()}</div>
              <div class="attribute"><span>Eyes:</span> ${attributes.getEyeType()}</div>
              <div class="attribute"><span>Age:</span> ${attributes.getAge()} (${turtle.getAge()} days)</div>
              <div class="attribute"><span>Gender:</span> ${attributes.getGender()}</div>
              <div class="attribute"><span>Horoscope:</span> ${attributes.getHoroscope()}</div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-card needs-panel">
              <h3>Needs</h3>
              <div>
                <label>Food (${needs.getFoodStatus()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${needsStatus.food}%; background-color: ${this.getProgressColor(needsStatus.food)}"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Water (${needs.getWaterStatus()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${needsStatus.water}%; background-color: ${this.getProgressColor(needsStatus.water)}"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Love (${needs.getLoveStatus()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${needsStatus.love}%; background-color: ${this.getProgressColor(needsStatus.love)}"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Cleanliness (${needs.getCleanlinessStatus()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${needsStatus.cleanliness}%; background-color: ${this.getProgressColor(needsStatus.cleanliness)}"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Temperature (${needs.getTemperatureStatus()}):</label>
                <div class="temp-control">
                  <span>50°F</span>
                  <input type="range" min="50" max="100" value="${needsStatus.temperature}" id="temperature-slider">
                  <span>100°F</span>
                </div>
                <div style="text-align: center; margin-top: 5px;">${needsStatus.temperature}°F</div>
              </div>
            </div>
            
            <div class="info-card stats-panel">
              <h3>Stats</h3>
              <div>
                <label>Durability (${stats.getDurabilityLevel()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${statsStatus.durability}%; background-color: #3498db"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Strength (${stats.getStrengthLevel()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${statsStatus.strength}%; background-color: #e74c3c"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Speed (${stats.getSpeedLevel()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${statsStatus.speed}%; background-color: #2ecc71"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Stamina (${stats.getStaminaLevel()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${statsStatus.stamina}%; background-color: #f39c12"></div>
                </div>
              </div>
              <div style="margin-top: 10px;">
                <label>Emotion (${stats.getEmotionLevel()}):</label>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${statsStatus.emotion}%; background-color: #9b59b6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="actions">
          <button id="feed-button" class="action-button">🥬 Feed</button>
          <button id="water-button" class="action-button">💧 Give Water</button>
          <button id="love-button" class="action-button">❤️ Pet</button>
          <button id="clean-button" class="action-button">🧹 Clean</button>
          <button id="temp-button" class="action-button">🌡️ Set Temperature</button>
        </div>
      </div>
      
      <script>
        const vscode = acquireVsCodeApi();
        const turtleContainer = document.querySelector('.turtle-container');
        const turtleImage = document.getElementById('turtle-image');
        
        // Image sources for different states
        const turtleImages = {
          idle: "${turtleIdleUri}",
          eating: "${turtleEatingUri}",
          walking: "${turtleWalkingUri}",
          happy: "${turtleHappyUri}",
          cleaning: "${turtleCleaningUri}"
        };
        
        // Randomly make the turtle walk around
        setInterval(() => {
          if (Math.random() > 0.7 && !turtleContainer.classList.contains('eating') && 
              !turtleContainer.classList.contains('happy') && !turtleContainer.classList.contains('cleaning')) {
            turtleContainer.classList.remove('idle');
            turtleContainer.classList.add('walking');
            turtleImage.src = turtleImages.walking;
            
            setTimeout(() => {
              turtleContainer.classList.remove('walking');
              turtleContainer.classList.add('idle');
              turtleImage.src = turtleImages.idle;
            }, 3000);
          }
        }, 5000);
        
        document.getElementById('feed-button').addEventListener('click', () => {
          // Show eating animation
          turtleContainer.className = 'turtle-container eating';
          turtleImage.src = turtleImages.eating;
          
          setTimeout(() => {
            turtleContainer.className = 'turtle-container idle';
            turtleImage.src = turtleImages.idle;
          }, 2000);
          
          vscode.postMessage({ command: 'feed' });
        });
        
        document.getElementById('water-button').addEventListener('click', () => {
          // Show drinking animation (using walking animation for now)
          turtleContainer.className = 'turtle-container walking';
          turtleImage.src = turtleImages.walking;
          
          setTimeout(() => {
            turtleContainer.className = 'turtle-container idle';
            turtleImage.src = turtleImages.idle;
          }, 2000);
          
          vscode.postMessage({ command: 'giveWater' });
        });
        
        document.getElementById('love-button').addEventListener('click', () => {
          // Show happy animation
          turtleContainer.className = 'turtle-container happy';
          turtleImage.src = turtleImages.happy;
          
          setTimeout(() => {
            turtleContainer.className = 'turtle-container idle';
            turtleImage.src = turtleImages.idle;
          }, 2000);
          
          vscode.postMessage({ command: 'giveLove' });
        });
        
        document.getElementById('clean-button').addEventListener('click', () => {
          // Show cleaning animation
          turtleContainer.className = 'turtle-container cleaning';
          turtleImage.src = turtleImages.cleaning;
          
          setTimeout(() => {
            turtleContainer.className = 'turtle-container idle';
            turtleImage.src = turtleImages.idle;
          }, 2000);
          
          vscode.postMessage({ command: 'clean' });
        });
        
        document.getElementById('temp-button').addEventListener('click', () => {
          const tempValue = document.getElementById('temperature-slider').value;
          vscode.postMessage({ command: 'adjustTemperature', value: parseInt(tempValue) });
        });
      </script>
    </body>
    </html>`;
  }

  private getProgressColor(value: number): string {
    if (value > 80) {
      return '#2ecc71'; // Green for high values
    } else if (value > 50) {
      return '#f39c12'; // Orange for medium values
    } else if (value > 30) {
      return '#e67e22'; // Darker orange for lower values
    } else {
      return '#e74c3c'; // Red for critical values
    }
  }

  private dispose(): void {
    TurtleWebviewPanel.currentPanel = undefined;
    
    // Clean up our resources
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = undefined;
    }
    
    this.panel.dispose();
    
    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
