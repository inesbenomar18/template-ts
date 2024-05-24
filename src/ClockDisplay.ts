export class ClockDisplay {
    private element: HTMLElement;
    private timeZone: string;

    constructor(timeZone: string) {
        this.element = document.createElement('div');
        this.element.classList.add('clock');
        this.element.id = `clock-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID
        this.timeZone = timeZone;
        this.update(0, 0, 0); // Initialize the display to 00:00:00
        // Log the unique identifier for the clock display
        //console.log('Clock display created:', this.element.id);
    }

    public update(hours: number, minutes: number, seconds: number) {
        //console.log('Received hours:', hours, 'minutes:', minutes, 'seconds:', seconds);
        const formattedHours = this.pad(hours);
        const formattedMinutes = this.pad(minutes);
        const formattedSeconds = this.pad(seconds);
        const formattedTime = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds + ' (' + this.timeZone + ')';
        this.element.textContent = formattedTime;
    }

    public pad(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    public toggleDarkMode() {
        this.element.classList.toggle('dark-mode');
        // Log the dark mode toggle
        console.log(`Dark mode ${this.element.classList.contains('dark-mode') ? 'enabled' : 'disabled'} for clock display ${this.element.id}`);
    }

    public getTimeZoneOffset(): number {
        const match = this.timeZone.match(/GMT([+-])(\d+)/);
        if (match) {
            const sign = match[1] === '+' ? 1 : -1;
            const hours = parseInt(match[2], 10);
            return sign * hours;
        }
        return 0; // Default to 0 if no valid offset found
    }

}
