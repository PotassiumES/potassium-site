import WebXRPolyfill from 'webxr-polyfill'

import App from 'potassium-es/src/App'
import Component from 'potassium-es/src/Component'

import MastheadComponent from 'potassium-components/src/organisms/MastheadComponent'

// Polyfill WebXR so that we can detect and use portal and immersive display modes
new WebXRPolyfill()

const SplashApp = class extends App {
	constructor(){
		super()
		this._brand = 'PotassiumES'
		this._titlePrefix = this._brand + ' • '

		this._masthead = new MastheadComponent(null, {
			brand: this._brand,
			menuItems: [
				{ name: 'Front', anchor: './#' },
				{ name: 'Code', anchor: 'https://github.com/PotassiumES/' },
				{ name: 'Projects', anchor: 'https://github.com/orgs/PotassiumES/projects' },
			]
		})
		this.appendComponent(this._masthead)

		// These are the views that we'll switch among when responding to Router events
		this._viewsComponent = new Component().appendTo(this)
		this._viewsComponent.addClass('views-component')
		this._frontComponent = new FrontComponent(this._imageCollection).appendTo(this._viewsComponent)

		// Set up our URL router to handle view switching
		this.router.addRoute(/^$/, 'front')
		this.router.addListener(this._handleRoutes.bind(this))
		this.router.start()
	}

	showFront(){
		this._frontComponent.removeClass('hidden')
		document.title = this._titlePrefix + 'Front'
		this._masthead.navigationMenu.setSelected(0)
	}

	_handleRoutes(routeName, hash, ...regexMatches){
		switch(routeName){
			default:
				this.showFront()
		}
	}
}

document.addEventListener('DOMContentLoaded', ev => {
	window.app = new SplashApp()
	document.body.appendChild(window.app.el)
})

const FrontComponent = class extends Component {
	constructor(dataObject=null, options=null){
		super(dataObject, options)
		this.addClass('front-component')
	}
}
