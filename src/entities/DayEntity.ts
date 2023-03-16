import {Type} from "class-transformer";
import {LessonEntity} from "./LessonEntity.js";

export class DayEntity {
    @Type(() => LessonEntity)
    day: LessonEntity[];

    constructor(day: LessonEntity[]) {
        this.day = day;
    }
    setDay(day: LessonEntity[]){
        this.day = day;
    }
}
