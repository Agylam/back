import {Type} from "class-transformer";
import {DayEntity} from "./DayEntity.js";
import {LessonEntity} from "./LessonEntity";

export class DaysEntity {
    @Type(() => DayEntity)
    days: DayEntity[];

    constructor(days: DayEntity[]) {
        this.days = days;
    }

    setDay(order: number, lessons: LessonEntity[]) {
        return this.days[order].setDay(lessons);
    }

    getById(order: number) {
        return this.days[order];
    }
}
