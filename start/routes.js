'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/save', 'ProductoController.store').middleware(['admin', 'auth'])
  Route.get('/getAll', 'ProductoController.index')
  Route.get('/:id', 'ProductoController.show')
  Route.put('/:id', 'ProductoController.update').middleware(['admin', 'auth'])
  Route.delete('/:id', 'ProductoController.delete').middleware(['admin', 'auth'])
  Route.post('/saveImage', 'ProductoController.storeFile').middleware(['admin', 'auth'])
}).prefix('/producto')

Route.group(() => {
  Route.post('/addFavorite', 'Auth/UserController.addFavorite').middleware(['auth'])
  Route.delete('/deleteFavorite/:id', 'Auth/UserController.deleteFavorite').middleware(['auth'])
  Route.get('/indexFavorite', 'Auth/UserController.indexFavorite').middleware(['auth'])
}).prefix('/user')

Route.post('/register', 'Auth/UserController.register')
Route.post('/login', 'Auth/UserController.login')
Route.get('/logout', 'Auth/UserController.logout').middleware(['auth'])

Route.group(() => {
  Route.post('/create', 'PedidoController.create').middleware(['auth'])
  Route.get('/getFromAuth', 'PedidoController.indexAuth').middleware(['auth'])
  Route.get('/getAdmin', 'PedidoController.indexToAdmin').middleware(['auth', 'admin'])
  Route.put('status/:id', 'PedidoController.updateStatus').middleware(['admin', 'auth'])
}).prefix('/pedido')

Route.group(() => {
  Route.post('/send', 'ChatController.send').middleware(['auth'])
  Route.get('/index', 'ChatController.index').middleware(['auth'])
}).prefix('/chat')



