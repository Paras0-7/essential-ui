// @ts-nocheck
import { FC, useEffect, useRef, useState } from 'react';
import { ESDatpickerProps } from './ESDatepicker.model';
import { CalendarDaysIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import moment, { Moment } from 'moment';
import { CalendarDate } from './ESDatepicker.model';
import { addSixWeek, months } from './ESDatePickerUtils';
import './ESDatepicker.css'


export const ESDatepicker : FC<ESDatpickerProps> = function({selectedDate, setSelectedDate}){


    const [open, setOpen] = useState(false);
    const [listOfWeeks, setListOfWeeks] = useState([])
    const date = useRef<Moment>();
    const date_ = useRef<Moment>()
    const startUp = useRef(true)

    const toggleOpen = function(){
        setOpen(val=> !val)
    }

   
    const generateCalender = function(){
        let daySelected = selectedDate == "" ? false : true;
        let listOfDays : CalendarDate[] = [];
        let weeks = []
        let dayCount = 0;
        const viewFormat = "DD-MM-YYYY";
    
        if(selectedDate!=="") date_.current= moment(selectedDate,viewFormat)
        if(startUp.current){
            if(selectedDate == ""){
                
                date.current = moment(new Date(), viewFormat);
                
            }else{
                date.current = moment(selectedDate,viewFormat)
            }
            date_.current = date.current.clone();
        }
        
    
        const firstValueInCalendarView = getFirstValueInCalendarView(date.current)

        for(let i = firstValueInCalendarView; i <= date.current.clone().endOf('month').date() ; i += 1){
            const currentDate = moment(`${i}-${date.current.month()+1}-${date.current.year()}`,viewFormat)
            // console.log(currentDate.format(viewFormat))
            const today = moment().startOf('day').isSame(currentDate) && !daySelected;
            const selected = date_.current.isSame(currentDate)
        
            let day : CalendarDate = null;
            const weekend: boolean = dayCount === 6;
        
            if(i>0){

                const [dt,month] = currentDate.format(viewFormat).split('-')
                day = {
                    day: dt,
                    month: month,
                    year: ""+date.current.year(),
                    today,
                    selected,
                    weekend
                }
            }else{
                day = new CalendarDate();
            }

            if(date.current.clone().endOf('month').date() === i) {
                if(dayCount <= 6){
                    listOfDays.push(day)
                    weeks.push(listOfDays)
                }else {
                    weeks.push(listOfDays);
                    listOfDays = [];
                    day.weekend = true;
                    listOfDays.push(day)
                    weeks.push(listOfDays)
                }
            }else if(dayCount <=6){
                listOfDays.push(day)
                dayCount++
            }else {
                weeks.push(listOfDays);
                dayCount=1;
                listOfDays=[];
                day.weekend = true;
                listOfDays.push(day)
            }
        }
     
        addSixWeek(weeks, setListOfWeeks)   
        startUp.current = false;
    
}

const getFirstValueInCalendarView  = function(date: moment.Moment){
    let n = 1;
    const firstWeekDay: number = date.clone().date(2).day();
    if(firstWeekDay !==1){
        n -= (firstWeekDay + 6) % 7
    }
    
    if( n === 1 && date.clone().endOf('month').date() < 29){
        n = -6
    }

    return n
        
}


const nextMonth = function(){
    date.current.add(1,'month')
    generateCalender();
}

const prevMonth = function(){
    date.current.subtract(1,'month')
    generateCalender();
}

const nextYear = function(){
    date.current.add(1,'year')
    generateCalender();
}


const prevYear = function(){
    date.current.subtract(1,'year')
    generateCalender();
}

const clickHandler = function(day){
    const date = `${day.day}-${day.month}-${day.year}`
    setSelectedDate(date);
    setOpen(false)
    
}


useEffect(()=>{
    generateCalender()
},[selectedDate])

    return (
        <div className='datepicker'>
            <div>
                <input type='text' aria-label='date' placeholder='DD-MM-YYYY' value={selectedDate} onClick={toggleOpen} readOnly/>
                <CalendarDaysIcon width={25} height={25}/>
            </div>
            {open && <div className='datepicker-container'>
            <table>
                
                <thead>
                    <tr>
                        <th className='prev'
                            title='Previous Year' onClick={prevYear}>
                                <ChevronDoubleLeftIcon width={25} height={25}/>
                        </th>
                        <th className='prev'
                            title='Previous Month' onClick={prevMonth}>
                                <ChevronLeftIcon width={25} height={25}/>
                        </th>
                        <th className='datepicker' colSpan={3}>
                            {months[ date.current.month()]} {date.current.year()}
                        </th>
                        <th className='prev'
                            title='Next Month' onClick={nextMonth}>
                             <ChevronRightIcon width={25} height={25}/>   
                        </th>
                        <th className='prev'
                            title='Next Year' onClick={nextYear}>
                                <ChevronDoubleRightIcon width={25} height={25}/>
                                
                        </th>
                    </tr>
                    <tr>
                        <th id="Sunday" className='day'>Sun</th>
                        <th id="Monday" className='day'>Mon</th>
                        <th id="Tuesday" className='day'>Tues</th>
                        <th id="Wednesday" className='day'>Wed</th>
                        <th id="Thursday" className='day'>Thur</th>
                        <th id="Friday" className='day'>Fri</th>
                        <th id="Saturday" className='day'>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOfWeeks.map((week,i) => {
                            return <tr key={i}>
                                {week.map((day : CalendarDate,i) => {
                                    if(!day.day) return <td key={Math.random()}></td>
                                    return <td key={day.day} className={`date ${(day.today || day.selected) && "selected-date"}`} onClick={()=>clickHandler(day)}>
                                        <span>{+day.day}</span>
                                    </td>
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>}
        </div>
    )
}   




