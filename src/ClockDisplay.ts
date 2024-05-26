/**
 * Class representing a clock display.
 */
export class ClockDisplay {
    private element: HTMLElement; // HTML element representing the clock display
    private timeZone: string; // Time zone associated with the clock display
    private isAM: boolean = true; // Flag indicating whether it is AM or PM
    public is24HourFormat: boolean = true; // Flag indicating whether the time format is 24-hour
    private timeDisplay: HTMLElement; // HTML element displaying the time
    private mode: 'time' | 'alarm' | 'stopwatch' = 'time'; // Current mode of the clock display

    /**
     * Creates an instance of ClockDisplay.
     * @param timeZone - The time zone associated with the clock display.
     * @param is24HourFormat - Indicates whether the time format is 24-hour.
     */
    constructor(timeZone: string, is24HourFormat: boolean) {
        this.element = document.createElement('div');
        this.element.classList.add('clock');
        this.element.id = `clock-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID
        this.timeZone = timeZone;
        this.is24HourFormat = is24HourFormat;

        // Create and append time display element
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.classList.add('time-display');
        this.element.appendChild(this.timeDisplay);

        // Initialize the display to 00:00:00
        this.update(0, 0, 0);

        // Add buttons
        this.addButtons();

        // Initialize mode
        this.mode = 'time';
    }

    /**
     * Adds buttons to the clock display.
     */
    private addButtons() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('clock-buttons');

        const buttonConfig: { [key: string]: string } = {
            'increase': 'Increase',
            'light': 'Light',
            'changeMode': 'Change Mode',
            'toggleFormat': 'Toggle Format'
        };

        for (const [eventName, buttonText] of Object.entries(buttonConfig)) {
            const button = document.createElement('button');
            button.textContent = buttonText;
            button.id = `${eventName}-button`;
            buttonsContainer.appendChild(button);

            button.addEventListener('click', () => {
                const event = new CustomEvent(eventName);
                this.element.dispatchEvent(event);
            });
        }

        this.element.appendChild(buttonsContainer);
    }

    /**
     * Updates the time displayed on the clock.
     * @param hours - The hours component of the time.
     * @param minutes - The minutes component of the time.
     * @param seconds - The seconds component of the time.
     */
    public update(hours: number, minutes: number, seconds: number) {
        // Convert hours to 12-hour format if needed
        if (!this.is24HourFormat) {
            if (hours === 0) {
                hours = 12; // Midnight case
            } else if (hours > 12) {
                hours -= 12;
                this.isAM = false;
            } else {
                this.isAM = true;
            }
        }

        const formattedHours = this.pad(hours);
        const formattedMinutes = this.pad(minutes);
        const formattedSeconds = this.pad(seconds);
        const formattedTime = this.is24HourFormat
            ? `${formattedHours}:${formattedMinutes}:${formattedSeconds} (${this.timeZone})`
            : `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${this.isAM ? 'AM' : 'PM'} (${this.timeZone})`;
        this.timeDisplay.textContent = formattedTime;
    }

    /**
     * Pads a number with leading zeros if it's less than 10.
     * @param number - The number to pad.
     * @returns The padded number as a string.
     */
    public pad(number: number): string {
        return number < 10 ? '0' + number : number.toString();
    }

    /**
     * Gets the HTML element representing the clock display.
     * @returns The HTML element representing the clock display.
     */
    public getElement(): HTMLElement {
        return this.element;
    }

    /**
     * Toggles dark mode for the clock display.
     */
    public toggleDarkMode() {
        this.element.classList.toggle('dark-mode');
        console.log(`Dark mode ${this.element.classList.contains('dark-mode') ? 'enabled' : 'disabled'} for clock display ${this.element.id}`);
    }

    /**
     * Gets the time zone offset associated with the clock display.
     * @returns The time zone offset.
     */
    public getTimeZoneOffset(): number {
        const match = this.timeZone.match(/GMT([+-])(\d+)/);
        if (match) {
            const sign = match[1] === '+' ? 1 : -1;
            const hours = parseInt(match[2], 10);
            return sign * hours;
        }
        return 0; // Default to 0 if no valid offset found
    }

    /**
     * Sets the time format for the clock display.
     * @param is24HourFormat - Indicates whether the time format is 24-hour.
     */
    public setFormat(is24HourFormat: boolean) {
        this.is24HourFormat = is24HourFormat;
        const currentTimeParts = this.timeDisplay.textContent!.split(':');
        const hours = parseInt(currentTimeParts[0], 10);
        const minutes = parseInt(currentTimeParts[1], 10);
        const seconds = parseInt(currentTimeParts[2].split(' ')[0], 10);
        this.update(hours, minutes, seconds);
    }

    /**
     * Sets the mode of the clock display.
     * @param mode - The mode to set.
     */
    public setMode(mode: 'time' | 'alarm' | 'stopwatch') {
        this.mode = mode;
    }
}
