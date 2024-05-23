export class ClockDisplay {
    private element: HTMLElement;

    constructor() {
        this.element = document.getElementById('clock')!;
    }

    public update(hours: number, minutes: number, seconds: number) {
        const formattedTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        this.element.textContent = formattedTime;
    }

    public toggleDarkMode() {
    this.element.classList.toggle('dark-mode');
    }

    private pad(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }
}
