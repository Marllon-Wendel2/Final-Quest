import Phaser from 'phaser';
import { DialogueBox } from './DialogueBox';
import { DialogueScript, DialogueStep } from './dialogue-types';
import { FONT_FAMILY, COLOR_HEX } from './FontManager';
import { eventBus } from '../core/EventBus';

export default class UIScene extends Phaser.Scene {
  private dialogueBox!: DialogueBox;
  private zKey!: Phaser.Input.Keyboard.Key;
  private isWaitingForInput = false;
  private dialogueQueue: DialogueStep[] = [];
  private isPlaying = false;
  private pressZText!: Phaser.GameObjects.Text;

  constructor() {
    super('UIScene');
  }

  create() {
    this.cameras.main.setViewport(0, 0, this.scale.width, this.scale.height);

    // Caixa de diálogo fica na área do jogo (esquerda, 720px)
    const gameAreaWidth = 720;
    const panelX = gameAreaWidth / 2;
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

    this.pressZText = this.add.text(this.scale.width - 400, 500, 'Pressione "Z"', {
      fontFamily: FONT_FAMILY,
      fontSize: '10px',
      color: COLOR_HEX['font_white'],
    }).setOrigin(1, 1).setAlpha(0);

    if (this.input.keyboard) {
      this.zKey = this.input.keyboard.addKey('Z');
      this.input.keyboard.on('keydown-Z', this.onZPressed, this);
    }

    this.events.on('typewriter-complete', () => {
      this.isWaitingForInput = true;
      this.pressZText.setAlpha(1);
    });
  }

  playScript(script: DialogueScript): void {
    this.dialogueQueue = [...script];
    this.isPlaying = true;
    eventBus.emit('dialogue:start')
    this.processNextStep();
  }

  private processNextStep(): void {
    if (this.dialogueQueue.length === 0) {
      this.isPlaying = false;
      this.pressZText.setAlpha(0);
      return;
    }

    const step = this.dialogueQueue.shift()!;

    switch (step.type) {
      case 'text':
        this.isWaitingForInput = false;
        this.pressZText.setAlpha(0);
        this.dialogueBox.show(
          step.text,
          step.color,
          step.speaker,
          step.speakerColor
        );
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
      this.pressZText.setAlpha(0);

      if (this.isPlaying && this.dialogueQueue.length > 0) {
        this.processNextStep();
      } else {
        this.dialogueBox.hide();
        this.isPlaying = false;
      }
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
