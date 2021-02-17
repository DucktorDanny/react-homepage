import { Component } from 'react';
import StartPagePhoto from './photos/start_page.png';
// import 
import './styles/index.css';

class App extends Component {
	render() {
		return (
			<>
				<header>
					<h1>Ducktor Homepage</h1>
					<img src={StartPagePhoto} alt='Start page example photo' />
					<div>
						<button onClick={ () => { window.location.href = 'https://chrome.google.com/webstore/detail/dnyyy-homepage/ijgaiihblkhlecdlnocobiokilenioak' } }>Add to Chrome</button>
						<button onClick={ () => { window.location.href = 'https://github.com/ducktorD/react-homepage' } }>Github repo</button>
					</div>
					<label htmlFor='Chrome add'>You need to be a tester to add it to Chrome!</label>
				</header>
				<main>
					<h2>About</h2>

					<label htmlFor='Descreption.'>
						About a half year ago I made a homepage for myself into my browser when I used jquery to make it.
						But since then I learned a lot and now I am mainly using react so I decided to remake it.
						And meanwhile I learned about browser extensions so I am gonna use this knowledge, as well.
						The idea: A homepage where you can add favorites, set greeting, background and much more...
					</label>

					<h2>Usage/user guide</h2>

					<section>
						<h3>Showing elements on the page</h3>
						<p>
							At the settings menu you can see lots of option what you can choose and set.
							Well, in the first section there are three checkbox where you can choose which elements wanna see on the homepage.
							If you click on one of those you can immediately see the changes.
							However, if you want it to be like this when you reload the page you need to hit the save button, as well.
							The saving always shows up a notication if it was successful.
						</p>
					</section>

					<section>
						<h3>Background color</h3>
						<p>
							In the next section you can change the background of the page with sliders.
							You can change it by the RGB code (if you don't know what it is actually it creates colors by red, green and blue where you can set the values between 0 and 255).
							Like before, you need to hit the save button if you want it to be the same when you come to the page later.
						</p>
					</section>

					<section>
						<h3>Greeting</h3>
						<p>
							On the page there is a greeting part above the clock. Well, there you can change the pronouns and the emoji at the end of the greeting.
							It immediately changes but like before you need to save it, as well.
							However there are limits! The length of the pronouns cannot be longer than 12 and emoji cannot be characters.
						</p>
					</section>

					<section>
						<h3>Add new favorite</h3>
						<p>
							On the homepage you can see favorites on the top what you actually can change.
							You can add new ones where you need to give the name and link of the site
							(https:// and http:// required and the name can't be longer than 20 characters).
							Save is also needed here.
						</p>
					</section>

					<section>
						<h3>Other favorite changes (order, edit and remove)</h3>
						<p>
							In the next section you see the list of all added favorites and you can do several changes here.
							By dragging and dropping an element you can change the order of list (don't forget to save).
							By clicking on the little pencil of an element you can rename it or you can change the link. Here if you edit something it is instatnly saving your changes.
							And last but not least, obviously by hitting the X button on an element it is gonna remove it (save it if you want...).
						</p>
					</section>

					<section>
						<h3>Import, export and reset settings</h3>
						<p>
							And in the last section of the settings you have opporunity to import settings for example from another user and you can also export yours to someone.
							Furthermore if you want to reset all your settings to default you can hit the big red button, but it might be a miss-click so you have to confirm it in the popup.
						</p>
					</section>
				</main>
				<footer>
					<label htmlFor=''>Made by ducktorD. 2021</label>
				</footer>
			</>
		)
	}
}

export default App;