// import something here
window.mapboxgl = require('mapbox-gl')

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	// something to do
	Vue.prototype.$mglt = "pk.eyJ1IjoibG9wdSIsImEiOiJjamFydTVhc3QxNjRtMzNwaHEzNmJ1bW0zIn0.Wm7f-1eyd7K5AT3WN7fRDw"
}
