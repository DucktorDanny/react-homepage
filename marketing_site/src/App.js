import { Component } from 'react';
import './styles/index.css';

// own components:
import Nav from './Components/Nav';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Section from './Components/Section';

// library components:
import ImageGallery from 'react-image-gallery';

//images:
import StartPagePhoto from './photos/start_page.png';
import oldHomepage from './photos/old_homepage.png';
import elementsShowing from './photos/visibility.png'
import backgroundColor from './photos/background.png';
import greeting from './photos/greeting.png'
import addNewFav from './photos/add_fav.png';
import favChanges from './photos/fav_changes.png';
import editPopup from './photos/edit_popup.png';
import importImage from './photos/import.png';
import resetPopup from './photos/reset_popup.png';
import Logo from './photos/ducktorD.png';

// images for gallery:
import Start from './photos/start_page.png';
import StartThumbnail from './photos/start_page_thumbnail.png';

const galleryImages = [
	{
		original: Start,
	},
	{
		original: Start,
	},
	{
		original: Start,
	},
	{
		original: Start,
	},
]

class App extends Component {
	state = {
		buttons: [
			{
				name: 'Add to Chrome',
				url: 'https://chrome.google.com/webstore/detail/dnyyy-homepage/ijgaiihblkhlecdlnocobiokilenioak'
			},
			{
				name: 'Github repo',
				url: 'https://github.com/ducktorD/react-homepage'
			}
		]
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) {
		const header = document.querySelector('header');
		const nav = document.querySelector('nav');
		
		if (header.offsetHeight <= window.pageYOffset && !nav.classList.contains('nav-shown')) {
			if (nav.classList.contains('nav-hidden')) {
				nav.classList.remove('nav-hidden');
			}
			nav.classList.add('nav-shown');
		} else if (header.offsetHeight > window.pageYOffset && nav.classList.contains('nav-shown') && !nav.classList.contains('nav-hidden')) {
			nav.classList.remove('nav-shown');
			nav.classList.add('nav-hidden');
		}
	}

	render() {
		return (
			<>
				<Nav buttons={this.state.buttons} />
				<Header startPagePhoto={StartPagePhoto} images={galleryImages} buttons={this.state.buttons} />
				
				<main>

					<h2>About</h2>

					<label htmlFor='Descreption.'>
						About a half year ago I made a homepage for myself into my browser when I used jquery to make it.
						But since then I learned a lot and now I am mainly using react so I decided to remake it.
						And meanwhile I learned about browser extensions so I am gonna use this knowledge, as well.
						The idea: A homepage where you can add favorites, set greeting, background and much more...
					</label>
					<Section
						name='My old homepage'
						content="It was just a simple page with some animations."
						imagesLink={[oldHomepage]}
					/>

					<h2>Sample images</h2>

					<section className='sample-images'>
						<ImageGallery
							items={galleryImages}
							infinite={true}
							autoPlay={true}
							slideDuration={1000}
							slideInterval={5000}
							showThumbnails={false}
							showPlayButton={true}
							showFullscreenButton={false}
							showBullets={false}
							showNav={true}
						/>
					</section>

					<h2>Usage/user guide</h2>

					<Section
						name='Showing elements on the page'
						content="At the settings menu you can see lots of option what you can choose and set.
							Well, in the first section there are three checkbox where you can choose which elements wanna see on the homepage.
							If you click on one of those you can immediately see the changes.
							However, if you want it to be like this when you reload the page you need to hit the save button, as well.
							The saving always shows up a notication if it was successful."
						imagesLink={[elementsShowing]}
					/>
					<Section
						name='Background color'
						content="In the next section you can change the background of the page with sliders.
							You can change it by the RGB code (if you don't know what it is actually it creates colors by red, green and blue where you can set the values between 0 and 255).
							Like before, you need to hit the save button if you want it to be the same when you come to the page later."
						imagesLink={[backgroundColor]}
					/>

					<Section
						name='Greeting'
						content="On the page there is a greeting part above the clock. Well, there you can change the pronouns and the emoji at the end of the greeting.
							It immediately changes but like before you need to save it, as well.
							However there are limits! The length of the pronouns cannot be longer than 12 and emoji cannot be characters."
						imagesLink={[greeting]}
					/>

					<Section
						name='Add new favorite'
						content="On the homepage you can see favorites on the top what you actually can change.
							You can add new ones where you need to give the name and link of the site
							(https:// and http:// required and the name can't be longer than 20 characters).
							Save is also needed here."
						imagesLink={[addNewFav]}
					/>

					<Section
						name='Other favorite changes (order, edit and remove)'
						content="In the next section you see the list of all added favorites and you can do several changes here.
							By dragging and dropping an element you can change the order of list (don't forget to save).
							By clicking on the little pencil of an element you can rename it or you can change the link. Here if you edit something it is instatnly saving your changes.
							And last but not least, obviously by hitting the X button on an element it is gonna remove it (save it if you want...)."
						imagesLink={[favChanges, editPopup]}
					/>

					<Section
						name='Import, export and reset settings'
						content="And in the last section of the settings you have opporunity to import settings for example from another user and you can also export yours to someone.
							Furthermore if you want to reset all your settings to default you can hit the big red button, but it might be a miss-click so you have to confirm it in the popup."
						imagesLink={[importImage, resetPopup]}
					/>
				</main>
				<Footer Logo={Logo} />
			</>
		)
	}
}

export default App;