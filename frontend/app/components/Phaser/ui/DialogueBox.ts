import Phaser from 'phaser';
import { FontColor, FONT_FAMILY, COLOR_HEX } from './FontManager';

export class DialogueBox extends Phaser.GameObjects.Container {
    static readonly PADDING = 20;

    private textObject: Phaser.GameObjects.Text;
    private currentColor: FontColor = 'font_white';
    private typewriterTimer?: Phaser.Time.TimerEvent;
    private typewriterResolvers: Array<() => void> = [];
    private fullText: string = '';
    private typewriterSpeed: number = 30;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.textObject = scene.add.text(DialogueBox.PADDING, DialogueBox.PADDING, '', {
            fontFamily: FONT_FAMILY,
            fontSize: '14px',
            color: COLOR_HEX['font_white'],
            wordWrap: { width: 540 },
            lineSpacing: 6,
        });

        this.add([this.textObject]);
        this.setVisible(false);
    }

    show(text: string, color: FontColor = 'font_white'): void {
        this.setColor(color);
        this.setVisible(true);
        this.alpha = 1;
        this.fullText = text;
        this.textObject.setText('');

        let index = 0;
        this.typewriterTimer?.destroy();

        this.typewriterTimer = this.scene.time.addEvent({
            delay: this.typewriterSpeed,
            repeat: text.length - 1,
            callback: () => {
                this.textObject.setText(text.substring(0, index + 1));
                index++;
                if (index >= text.length) {
                    this.scene.events.emit('typewriter-complete');
                    this.typewriterResolvers.forEach((r) => r());
                    this.typewriterResolvers = [];
                }
            },
        });
    }

    hide(): void {
        this.typewriterTimer?.destroy();
        this.typewriterTimer = undefined;

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                this.setVisible(false);
            },
        });
    }

    setColor(color: FontColor): void {
        this.currentColor = color;
        this.textObject.setColor(COLOR_HEX[color]);
    }

    setText(text: string): void {
        this.typewriterTimer?.destroy();
        this.typewriterTimer = undefined;

        this.fullText = text;
        this.textObject.setText(text);
        this.setVisible(true);
        this.alpha = 1;
    }

    setTypewriterSpeed(ms: number): void {
        this.typewriterSpeed = ms;
    }

    waitForTypewriter(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.typewriterTimer) {
                resolve();
                return;
            }
            this.typewriterResolvers.push(resolve);
        });
    }

    getFullText(): string {
        return this.fullText;
    }

    getCurrentColor(): FontColor {
        return this.currentColor;
    }
}
