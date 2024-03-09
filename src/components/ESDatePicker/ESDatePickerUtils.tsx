import { CalendarDate } from "./ESDatepicker.model"

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]


export const addSixWeek = function(listOfWeeks, setListOfWeeks){
    
    if(listOfWeeks.length === 5){
        setListOfWeeks(
            [...listOfWeeks,
            [new CalendarDate(), new CalendarDate(), new CalendarDate(), new CalendarDate(), new CalendarDate(), new CalendarDate()]]
        )
    }else{
        setListOfWeeks(listOfWeeks)
    }
}
