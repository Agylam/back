export class LessonEntity {
    StartHour: number;
    StartMinute: number;
    StopHour: number;
    StopMinute: number;

    constructor(
        StartHour: number,
        StartMinute: number,
        StopHour: number,
        StopMinute: number
    ) {
        this.StartHour = StartHour;
        this.StartMinute = StartMinute;
        this.StopHour = StopHour;
        this.StopMinute = StopMinute;
    }
}
