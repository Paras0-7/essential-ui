import { FC, useState } from 'react';
import { ESDatpickerProps } from './ESDatepicker.model';
import { CalendarDaysIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import { generateCalender } from './ESDatePickerUtils';

export const ESDatepicker : FC<ESDatpickerProps> = function({selectedDate, setSelectedDate}){

    const [open, setOpen] = useState(false);
    const [listOfWeeks, setListOfWeeks] = useState([])
    
    const toggleOpen = function(){
        setOpen(val=> !val)
    }

    generateCalender(selectedDate)
    return (
        <div>
            <div>
                <input type='text' aria-label='date' placeholder='DD-MM-YYYY' defaultValue={selectedDate} onClick={toggleOpen}/>
                <CalendarDaysIcon width={25} height={25}/>
            </div>
            {open && <div>
            <table>
                
                <thead>
                    <tr>
                        <th className='prev'
                            title='Previous Year'>
                                <ChevronDoubleLeftIcon width={25} height={25}/>
                        </th>
                        <th className='prev'
                            title='Previous Month'>
                                <ChevronLeftIcon width={25} height={25}/>
                        </th>
                        <th className='datepicker' colSpan={3}>
                            7 October 2024
                        </th>
                        <th className='prev'
                            title='Next Month'>
                             <ChevronRightIcon width={25} height={25}/>   
                        </th>
                        <th className='prev'
                            title='Next Year'>
                                <ChevronDoubleRightIcon width={25} height={25}/>
                                
                        </th>
                    </tr>
                    <tr>
                        <th id="Sunday">Sun</th>
                        <th id="Monday">Mon</th>
                        <th id="Tuesday">Tues</th>
                        <th id="Wednesday">Wed</th>
                        <th id="Thursday">Thur</th>
                        <th id="Friday">Fri</th>
                        <th id="Saturday">Sat</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            </div>}
        </div>
    )
}   
