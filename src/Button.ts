export class Button {
    protected label: string;
    protected action: () => void;

    constructor(label: string, action: () => void) {
        this.label = label;
        this.action = action;
    }

    onClick(): void {
        this.action();
    }

    render(): string {
        const html = `<button id="${this.label.toLowerCase()}-button">${this.label}</button>`;
        console.log(`${this.label}Button HTML:`, html);
        return html;
    }
}
