import { ClockDisplay } from './ClockDisplay';

export class TimeZoneClock extends ClockDisplay {
    private timeZoneOffset: number; // Time-zone offset in hours

    constructor(timeZoneOffset: number){
        super(); // call constructor of parent class 'ClockDisplay'
        this.timeZoneOffset= timeZoneOffset;
    }

    public updateTime(){
        const now = new Date();
        now.setHours(now.getHours() + this.timeZoneOffset);
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        this.update(hours, minutes, seconds);
        }



    }