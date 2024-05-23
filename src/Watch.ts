import { ClockDisplay } from './ClockDisplay';


export class Watch {
    private clockDisplay: ClockDisplay;
    private intervalId?: NodeJS.Timeout; // intervalId can hold values returned by setInterval
    private mode: 'time' | 'alarm' | 'stopwatch' = 'time';
    private alarmTime: { hours: number, minutes: number } = { hours: 0, minutes: 0 };
    private stopwatchTime: { hours: number, minutes: number, seconds: number } = { hours: 0, minutes: 0, seconds: 0 };

    constructor() {
        this.clockDisplay = new ClockDisplay();
    }

    public start() {
        this.updateTime();
        this.intervalId = setInterval(() => this.updateTime(), 1000);
    }

    public stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    //todo: display current mode once clicked/changed?
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
        this.clockDisplay.update(this.alarmTime.hours, this.alarmTime.minutes, 0);
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
        this.clockDisplay.update(this.stopwatchTime.hours, this.stopwatchTime.minutes, this.stopwatchTime.seconds);
        }
    }


    public light() {
    console.log('Light button pressed');
    // Toggle dark mode by adding/removing a CSS class to the clock display element
    // Not working RN
    this.clockDisplay.toggleDarkMode();
    }


    private updateTime() {
        if (this.mode === 'time') {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            this.clockDisplay.update(hours, minutes, seconds);
        }
    }
}
