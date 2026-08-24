/* eslint-disable @typescript-eslint/no-explicit-any */
 
type EventCallback = (data?: any) => void;

class EventBus {
    private listeners = new Map<string, EventCallback[]>();

    on(event: string, callback: EventCallback): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event)!.push(callback);
    }

    off(event: string, callback: EventCallback): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
        }
    }

    emit(event: string, data?: any): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
        callbacks.forEach(callback => callback(data));
        }
    }
}

export const eventBus = new EventBus();