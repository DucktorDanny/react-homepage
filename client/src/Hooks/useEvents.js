import { useState } from 'react';

const useEvents = () => {
    const eventsObject = JSON.parse(localStorage.getItem('events')) || {};
    return useState(eventsObject);
}

export default useEvents;