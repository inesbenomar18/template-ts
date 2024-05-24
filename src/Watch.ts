import { ClockDisplay } from './ClockDisplay';

export class Watch {
    private clockDisplays: ClockDisplay[] = [];
    private intervalIds: NodeJS.Timeout[] = [];
    private mode: 'time' | 'alarm' | 'stopwatch' = 'time';
    private alarmTime: { hours: number, minutes: number } = { hours: 0, minutes: 0 };
    private stopwatchTime: { hours: number, minutes: number, seconds: number } = { hours: 0, minutes: 0, seconds: 0 };
    private defaultClockDisplay: ClockDisplay;

    constructor() {
        this.defaultClockDisplay = new ClockDisplay('Default');
        this.clockDisplays.push(this.defaultClockDisplay);

        // Initialize the default clock with the current time
        this.initializeDefaultClock();

        // Append default clock to the container
        const defaultClockContainer = document.getElementById('default-clock-container');
        if (defaultClockContainer) {
            defaultClockContainer.appendChild(this.defaultClockDisplay.getElement());
        }
    }

    public start() {
        this.updateTime();
        this.intervalIds.push(setInterval(() => this.updateTime(), 1000));
    }

    public stop() {
        this.intervalIds.forEach(intervalId => clearInterval(intervalId));
        this.intervalIds = [];
    }

    public changeMode() {
        if (this.mode === 'time') {
            this.mode = 'alarm';
        } else if (this.mode === 'alarm') {
            this.mode = 'stopwatch';
        } else {
            this.mode = 'time';
        }
        console.log('Current mode:', this.mode);
    }

    public increase() {
        if (this.mode === 'alarm') {
            this.alarmTime.hours++;
            if (this.alarmTime.minutes >= 60) {
                this.alarmTime.minutes = 0;
                this.alarmTime.hours++;
                if (this.alarmTime.hours >= 24) {
                    this.alarmTime.hours = 0;
                }
            }
            this.defaultClockDisplay.update(this.alarmTime.hours, this.alarmTime.minutes, 0);
        } else if (this.mode === 'stopwatch') {
            this.stopwatchTime.seconds++;
            if (this.stopwatchTime.seconds >= 60) {
                this.stopwatchTime.seconds = 0;
                this.stopwatchTime.minutes++;
                if (this.stopwatchTime.minutes >= 60) {
                    this.stopwatchTime.minutes = 0;
                    this.stopwatchTime.hours++;
                }
            }
            this.defaultClockDisplay.update(this.stopwatchTime.hours, this.stopwatchTime.minutes, this.stopwatchTime.seconds);
        }
    }

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

    private addClockDisplay(timeZone: string) {
    // Pause the updateTime method
    this.stop();

    const newClockDisplay = new ClockDisplay(timeZone);
    this.clockDisplays.push(newClockDisplay);

    // Log the unique identifier for the new clock
    console.log('Added new clock:', newClockDisplay.getElement().id);

    // Get the time zone offset in hours
    const timeZoneOffset = newClockDisplay.getTimeZoneOffset();
    console.log(timeZoneOffset)

    // Update the new clock display to show the current time with timezone offset
    const now = new Date();

    let adjustedHours = now.getHours() + timeZoneOffset;

    if (adjustedHours < 0) {
        adjustedHours += 24; // Wrap around to previous day
    } else if (adjustedHours >= 24) {
        adjustedHours %= 24; // Ensure hours stay within 0 to 23 range
    }

    //console.log('Hours on Watch.ts:', hours)
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Delay the update by 100 milliseconds
    setTimeout(() => {
        newClockDisplay.update(adjustedHours, minutes, seconds);
        // Resume the updateTime method after initializing the clock
        this.start();
    }, 100);

    // Append the new clock display element to the clocks container
    const clockElement = newClockDisplay.getElement();
    const clocksContainer = document.getElementById('clocks-container');
    if (clocksContainer) {
        clocksContainer.appendChild(clockElement);
    }
}


    public light() {
        console.log('Light button pressed');
        // Toggle dark mode for all clock displays
        this.clockDisplays.forEach(clockDisplay => {
            clockDisplay.toggleDarkMode();
        });
    }

    private initializeDefaultClock() {
        const defaultClockDisplay = this.defaultClockDisplay;
        const now = new Date();
        const defaultHours = now.getHours();
        const defaultMinutes = now.getMinutes();
        const defaultSeconds = now.getSeconds();
        defaultClockDisplay.update(defaultHours, defaultMinutes, defaultSeconds);
    }

    private updateTime() {
        const now = new Date();
        const defaultHours = now.getHours();
        const defaultMinutes = now.getMinutes();
        const defaultSeconds = now.getSeconds();
        this.defaultClockDisplay.update(defaultHours, defaultMinutes, defaultSeconds); // Update default clock

        // Update other clock displays based on their time zones
        this.clockDisplays.slice(1).forEach(clockDisplay => {
            const timeZoneOffset = clockDisplay.getTimeZoneOffset(); // Get time zone offset in minutes
            const adjustedTime = new Date(now.getTime()); // Create a copy of the current time
            let adjustedHours = adjustedTime.getHours() + timeZoneOffset

            if (adjustedHours < 0) {
                adjustedHours += 24; // Wrap around to previous day
            } else if (adjustedHours >= 24) {
                adjustedHours %= 24; // Ensure hours stay within 0 to 23 range
            }

            const minutes = adjustedTime.getMinutes();
            const seconds = adjustedTime.getSeconds();
            clockDisplay.update(adjustedHours, minutes, seconds); // Update clock with adjusted time
        });
    }

    private getTimeZoneOffset(timeZone: string): number {
        const match = timeZone.match(/GMT([+-])(\d+)/);
        if (match) {
            const sign = match[1] === '+' ? 1 : -1;
            const hours = parseInt(match[2], 10);
            return sign * hours * 60; // Convert hours to minutes
        }
        return 0; // Default to no offset
    }
}
