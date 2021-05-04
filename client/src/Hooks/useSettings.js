const useSettings = () => {
    const data = JSON.parse(localStorage.getItem('data'));

    const showElements = data ? data.showElements : {
    calendar: true,
    favorites: true,
        greeting: true,
        notifications: true,
        seconds: true,
        twentyFourClockMode: false,
    };
    const greeting = data ? data.greeting : {
    pronouns: 'friend',
    emoji: '🐣',
    };
    const favoritesArray = data ? data.favoritesArray : [
    {
        name: 'Twitch',
        url: 'https://twitch.tv',
    },
    {
        name: 'Speedtest',
        url: 'https://speedtest.net'
    },
    ];
    const backgroundColor = data ? data.backgroundColor : {
    R: 7,
    G: 55,
    B: 89,
    };

    return {
        showElements,
        greeting,
        favoritesArray,
        backgroundColor,
    };
}

export default useSettings;