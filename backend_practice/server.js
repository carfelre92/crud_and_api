
//node express server
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

//model imported
var Post = require('./post-model')
var Type = require('./type-model')
var User = require('./user-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))



var connectionString = 'mongodb://admin:admin@cluster0-shard-00-00.ovuvz.mongodb.net:27017,cluster0-shard-00-01.ovuvz.mongodb.net:27017,cluster0-shard-00-02.ovuvz.mongodb.net:27017/zip?ssl=true&replicaSet=atlas-12flzp-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connectionString, { useNewUrlParser: true })
var db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))
//setup routes
var router = express.Router();

// router.get('/testing', (req, res) => {
//   res.send('<h1>Testing is working</h1>')
// })

//CRUD for posts

router.get('/posts', (req, res) => { //find all posts
  Post.find()
    .populate('type')
    .populate('user')
    .then((posts) => {
      res.json(posts)
    })

})

// router.get('/posts', (req, res) => {
//   Post.find()
//     .populate('user')
//     .then((posts) => {
//       res.json(posts)
//     })

// })

router.get('/posts/:id', (req, res) => { //find post with specific id
  Post.findOne({ id: req.params.id })
    .then((post) => {
      res.json(post)
    })
})

router.post('/posts', (req, res) => { //post new post

  var post = new Post()
  post.id = Date.now()

  var data = req.body
  console.log(data)
  Object.assign(post, data)

  post.save()
    .then((post) => {
      res.json(post)
    })
})


router.put('/posts/:id', (req, res) => {

	Post.findOne({id:req.params.id})
	.then((post) => {
		var data = req.body
		Object.assign(post,data)
		return post.save()	
	})
	.then((post) => {
		 res.json(post)
	})

})

router.delete('/posts/:id', (req, res) => { //delete the post

  Post.deleteOne({ id: req.params.id })
    .then(() => {
      res.json('deleted');
    })

})

//USER STUFF
router.get('/users', (req, res) => {
  User.find()
  .then((users) => {
    res.json(users)
  })
})

router.get('/users/:id', (req, res) => { //List user with posts they have created
  User.findOne({id:req.params.id})
  .populate('posts')
	.then((user) => {
	    return res.json(user);
	});
})

router.get('/getUserName/:userName', (req, res) => { //List user with posts they have created
  User.findOne({userName:req.params.userName})
  .populate('posts')
	.then((user) => {
	    return res.json(user);
	});
})

router.post('/users', (req, res)=>{
	var user = new User()
	var data = req.body
	Object.assign(user,data)
	
	user.save()
	.then((user) => {
	   res.json(user)
  })

})

router.post('/users/userCheck'), (req, res) => {
  var { userName } = req.body;

  User.findOne(userName)
    .then((user) => {
      return res.json(user)
    })
}

router.post('/users/userAuth'), (req, res) => {
  var { userName, password } = req.body;
  var userAuth = { userName,password }

  User.findOne(userAuth)
    .then((user) => {
      return res.json(user)
    })
}


//CRUD types
router.get('/types', (req, res) => {

	Type.find()
	.then((types) => {
	    return res.json(types)
	})

})

router.get('/types/:id', (req, res) => { 
	Type.findOne({id:req.params.id})
	.populate('posts')
	.then((type) => {
	    return res.json(type)
	})
})

//use server to serve up routes
app.use('/api', router);

// launch our backend into a port
const apiPort = 4000
app.listen(apiPort, () => console.log('Listening on port ' + apiPort));