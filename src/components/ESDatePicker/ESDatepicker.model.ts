// @ts-nocheck
export interface ESDatpickerProps {
    selectedDate: string,
    setSelectedDate : Function
}


export class CalendarDate {
    day: string;
    month: string;
    year: string;
    today: boolean;
    selected: boolean;
    weekend: boolean;
    class?: string;

    constructor(){
        this.day = null;
        this.month = null;
        this.year = null;
        this.today = null;
        this.selected = false;
        this.weekend = false;
        this.class = ''
    }
}