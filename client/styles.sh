#! /bin/bash

cd src/AppStyle
sass --watch App.scss App.css &

cd ../Components/DailyTodos/style
sass --watch DailyTodoEvents.scss DailyTodoEvents.css &

cd ../../ClockAndGreeting/style
sass --watch Clock.scss Clock.css &
sass --watch Greeting.scss Greeting.css &

cd ../../Nav/style
sass --watch Nav.scss Nav.css &

cd ../../Popup/style
sass --watch Popup.scss Popup.css &

cd ../../Settings/style
sass --watch Settings.scss Settings.css &

wait