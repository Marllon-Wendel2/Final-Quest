import Phaser from 'phaser';
import { DialogueBox } from './DialogueBox';
import { DialogueScript, DialogueStep } from './dialogue-types';

export default class UIScene extends Phaser.Scene {
  private dialogueBox!: DialogueBox;
  private zKey!: Phaser.Input.Keyboard.Key;
  private isWaitingForInput = false;
  private dialogueQueue: DialogueStep[] = [];
  private isPlaying = false;

  constructor() {
    super('UIScene');
  }

  create() {
    this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);

    const panelX = this.scale.width / 2;
    const panelY = 560;

    this.add.nineslice(
      panelX, panelY,
      'special_paper',
      undefined,
      600, 320,
      96, 115, 89, 146
    );

    this.dialogueBox = new DialogueBox(this, 130, 480);
    this.add.existing(this.dialogueBox);

    if (this.input.keyboard) {
      this.zKey = this.input.keyboard.addKey('Z');
      this.input.keyboard.on('keydown-Z', this.onZPressed, this);
    }

    this.events.on('typewriter-complete', () => {
      this.isWaitingForInput = true;
    });
  }

  playScript(script: DialogueScript): void {
    this.dialogueQueue = [...script];
    this.isPlaying = true;
    this.processNextStep();
  }

  private processNextStep(): void {
    if (this.dialogueQueue.length === 0) {
      this.isPlaying = false;
      return;
    }

    const step = this.dialogueQueue.shift()!;

    switch (step.type) {
      case 'text':
        this.isWaitingForInput = false;
        this.dialogueBox.show(step.text, step.color);
        break;

      case 'event':
        this.events.emit(step.emit, step.data);
        this.processNextStep();
        break;

      case 'wait':
        this.time.delayedCall(step.ms, () => {
          this.processNextStep();
        });
        break;
    }
  }

  private onZPressed() {
    if (this.isWaitingForInput) {
      this.isWaitingForInput = false;

      if (this.isPlaying && this.dialogueQueue.length > 0) {
        this.processNextStep();
      } else {
        this.dialogueBox.hide();
        this.isPlaying = false;
      }
    }
  }
}
