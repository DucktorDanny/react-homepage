import Line from '../Settings/Line';
import './style/DailyTodoEvents.css';

const DateSeparator = ({ date }) => {
    return (
        <section className='date-separator'>
            <Line lineColor='black' />
            <p>{date}</p>
            <Line lineColor='black' />
        </section>
    )
}

export default DateSeparator;