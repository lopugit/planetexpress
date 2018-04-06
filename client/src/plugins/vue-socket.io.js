// import something here
import socketio from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
var SocketInstance = socketio('https://alopuserver.com')
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueSocketIo, SocketInstance)
}
