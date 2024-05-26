import { ClockDisplay } from './ClockDisplay';

/**
 * Class representing a Watch.
 */
export class Watch {
    private clockDisplays: ClockDisplay[] = []; // Array to store ClockDisplay objects
    private intervalIds: NodeJS.Timeout[] = []; // Array to store interval IDs for periodic updates
    private mode: 'time' | 'alarm' | 'stopwatch' = 'time'; // Current mode of the watch
    private alarmTime: { hours: number, minutes: number } = { hours: 0, minutes: 0 }; // Alarm time
    private stopwatchTime: { hours: number, minutes: number, seconds: number } = { hours: 0, minutes: 0, seconds: 0 }; // Stopwatch time
    private defaultClockDisplay: ClockDisplay; // Default clock display
    private is24HourFormat: boolean = true; // Flag indicating whether the time format is 24-hour

    /**
     * Creates an instance of Watch.
     */
    constructor() {
        // Initialize the default clock display
        this.defaultClockDisplay = new ClockDisplay('Default', this.is24HourFormat);
        this.clockDisplays.push(this.defaultClockDisplay);

        // Initialize the default clock with the current time
        this.initializeDefaultClock();

        // Append default clock to the container
        const defaultClockContainer = document.getElementById('default-clock-container');
        if (defaultClockContainer) {
            defaultClockContainer.appendChild(this.defaultClockDisplay.getElement());
            this.addEventListeners(this.defaultClockDisplay); // Add event listeners to default clock
        }
    }

    /**
     * Starts updating the time periodically.
     */
    public start() {
        this.updateTime();
        this.intervalIds.push(setInterval(() => this.updateTime(), 1000));
    }

    /**
     * Stops updating the time.
     */
    public stop() {
        this.intervalIds.forEach(intervalId => clearInterval(intervalId));
        this.intervalIds = [];
    }

    /**
     * Changes the mode of the watch.
     * @param clockDisplay - The ClockDisplay object associated with the mode change.
     */
    public changeMode(clockDisplay: ClockDisplay) {
        if (this.mode === 'time') {
            this.mode = 'alarm';
        } else if (this.mode === 'alarm') {
            this.mode = 'stopwatch';
        } else {
            this.mode = 'time';
        }
        console.log('Current mode:', this.mode);
        this.clockDisplays.forEach(clock => clock.setMode(this.mode)); // Call setMode on each ClockDisplay
    }

    /**
     * Increases time for alarm or stopwatch modes.
     * @param clockDisplay - The ClockDisplay object associated with the time increase.
     */
    public increase(clockDisplay: ClockDisplay) {
        if (this.mode === 'alarm') {
            this.alarmTime.hours++;
            if (this.alarmTime.minutes >= 60) {
                this.alarmTime.minutes = 0;
                this.alarmTime.hours++;
                if (this.alarmTime.hours >= 24) {
                    this.alarmTime.hours = 0;
                }
            }
            clockDisplay.update(this.alarmTime.hours, this.alarmTime.minutes, 0);
        } else if (this.mode === 'stopwatch') {
            this.stopwatchTime.minutes++;
            if (this.stopwatchTime.seconds >= 60) {
                this.stopwatchTime.seconds = 0;
                this.stopwatchTime.minutes++;
                if (this.stopwatchTime.minutes >= 60) {
                    this.stopwatchTime.minutes = 0;
                    this.stopwatchTime.hours++;
                }
            }
            clockDisplay.update(this.stopwatchTime.hours, this.stopwatchTime.minutes, this.stopwatchTime.seconds);
        }
    }

    /**
     * Adds a clock display based on user-provided time zone offset.
     */
    public addClock() {
        const offsetInput = prompt('Enter the time zone offset (GMT±X):');
        if (offsetInput) {
            const match = offsetInput.match(/GMT([+-])(\d+)/);
            if (match) {
                const sign = match[1];
                const hours = parseInt(match[2], 10);
                const timeZone = `GMT${sign}${hours}`;
                this.addClockDisplay(timeZone);
            } else {
                alert('Invalid time zone offset format. Please enter it in the format "GMT±X".');
            }
        }
    }

    /**
     * Adds a clock display with the provided time zone.
     * @param timeZone - The time zone for the new clock display.
     */
    private addClockDisplay(timeZone: string) {
        this.stop();

        const newClockDisplay = new ClockDisplay(timeZone, this.is24HourFormat);
        this.clockDisplays.push(newClockDisplay);

        const timeZoneOffset = newClockDisplay.getTimeZoneOffset();

        const now = new Date();
        let adjustedHours = now.getHours() + timeZoneOffset;

        if (adjustedHours < 0) {
            adjustedHours += 24;
        } else if (adjustedHours >= 24) {
            adjustedHours %= 24;
        }

        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        setTimeout(() => {
            newClockDisplay.update(adjustedHours, minutes, seconds);
            this.start();
        }, 100);

        const clockElement = newClockDisplay.getElement();
        const clocksContainer = document.getElementById('clocks-container');
        if (clocksContainer) {
            clocksContainer.appendChild(clockElement);
            this.addEventListeners(newClockDisplay); // Add event listeners to the new clock
        }
    }

    /**
     * Adds event listeners to a ClockDisplay object.
     * @param clockDisplay - The ClockDisplay object to add event listeners to.
     */
    private addEventListeners(clockDisplay: ClockDisplay) {
        clockDisplay.getElement().addEventListener('increase', () => this.increase(clockDisplay));
        clockDisplay.getElement().addEventListener('light', () => this.light(clockDisplay));
        clockDisplay.getElement().addEventListener('changeMode', () => this.changeMode(clockDisplay));
        clockDisplay.getElement().addEventListener('toggleFormat', () => this.toggleFormat());
    }

    /**
     * Toggles between 12-hour and 24-hour time format for all clock displays.
     */
    public toggleFormat() {
        this.is24HourFormat = !this.is24HourFormat;
        this.clockDisplays.forEach(clockDisplay => {
            clockDisplay.setFormat(this.is24HourFormat);
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            clockDisplay.update(hours, minutes, seconds);
        });
    }

    /**
     * Handles the light button press event.
     * @param clockDisplay - The ClockDisplay object associated with the light button press.
     */
    public light(clockDisplay: ClockDisplay) {
        console.log('Light button pressed');
        clockDisplay.toggleDarkMode();
    }

    /**
     * Initializes the default clock with the current time.
     */
    private initializeDefaultClock() {
        const defaultClockDisplay = this.defaultClockDisplay;
        const now = new Date();
        const defaultHours = now.getHours();
        const defaultMinutes = now.getMinutes();
        const defaultSeconds = now.getSeconds();
        defaultClockDisplay.update(defaultHours, defaultMinutes, defaultSeconds);
    }

    /**
     * Updates the time for all clock displays.
     */
    private updateTime() {
        const now = new Date();
        const defaultHours = now.getHours();
        const defaultMinutes = now.getMinutes();
        const defaultSeconds = now.getSeconds();
        this.defaultClockDisplay.update(defaultHours, defaultMinutes, defaultSeconds);

        this.clockDisplays.slice(1).forEach(clockDisplay => {
            const timeZoneOffset = clockDisplay.getTimeZoneOffset();
            const adjustedTime = new Date(now.getTime());
            adjustedTime.setHours(now.getHours() + timeZoneOffset);

            const adjustedHours = adjustedTime.getHours();
            const adjustedMinutes = adjustedTime.getMinutes();
            const adjustedSeconds = adjustedTime.getSeconds();

            clockDisplay.update(adjustedHours, adjustedMinutes, adjustedSeconds);
        });
    }
}
