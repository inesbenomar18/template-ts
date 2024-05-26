export class Button {
    protected label: string;
    protected action: () => void;

    constructor(label: string, action: () => void) {
        this.label = label;
        this.action = action;
    }

    // Method to handle button click event
    onClick(): void {
        this.action();
    }

    // Method to render the button as HTML
    render(): string {
        // Generate HTML for the button
        const html = `<button id="${this.label.toLowerCase()}-button">${this.label}</button>`;

        // Log the generated HTML for debugging
        console.log(`${this.label}Button HTML:`, html);

        // Return the generated HTML
        return html;
    }
}
