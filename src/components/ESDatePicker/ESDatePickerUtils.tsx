import moment from 'moment';

export const generateCalender = function(selectedDate:string){
    let days = [];
    let listOfDays = [];
    let listOfWeeks = []
    let dayCount = 0;
    const viewFormat = "DD-MM-YYYY";
    let date;
    if(selectedDate == ""){

        date = moment(new Date(),viewFormat)
    }else{
        date = moment(selectedDate,viewFormat)
    }
    const month = date.month()
    const year = date.year()
    
    const firstValueInCalendarView = getFirstValueInCalendarView(date)

    console.log(date.endOf('month').date())
    // for(let i = firstValueInCalendarView; i <= ; i += 1){
        
    // }

    
}


const getFirstValueInCalendarView  = function(date: moment.Moment){
    let n = 1;
    const firstWeekDay: number = date.date(2).day();
    if(firstWeekDay !==1){
        n -= (firstWeekDay + 6) % 7
    }

    if( n === 1 && date.endOf('month').date() < 29)
        {
            n = -6
        }
    
}
