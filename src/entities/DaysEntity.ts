import {Type} from "class-transformer";
import {DayEntity} from "./DayEntity.js";
import {LessonEntity} from "./LessonEntity.js";

export class DaysEntity {
    @Type(() => DayEntity)
    days: DayEntity[];

    constructor(days: DayEntity[]) {
        this.days = days;
    }

    setDay(order: number, lessons: LessonEntity[]) {
        console.log("days",order,this.days[order]);
        return this.days[order].setDay(lessons);
    }

    getById(order: number) {
        return this.days[order];
    }
}
