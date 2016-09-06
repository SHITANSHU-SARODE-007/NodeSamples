var express = require('express');
var router = express.Router();
var _ = require('underscore');

var datapath = 'data.json';

var laptops = [
  {
    id: 1,
    name: 'Macbook',
    title: 'Apple',
    color: 'silver',
    price: '$1500'
  },
  {
    id: 2,
    name: 'Inspiron 7000',
    title: 'Dell',
    color: 'Blue',
    price: '$1200'
  },
  {
    id: 3,
    name: 'Yoga Flip 360',
    title: 'HP',
    color: 'Black',
    price: '$1100'
  }
];

function lookuplaptop(laptop_id) {
  return _.find(laptops, function(c) {
    return c.id == parseInt(laptop_id);
  });
}

function findMaxId() {
  return _.max(laptops, function(laptop) {
    return laptop.id;
  });
}

router.get('/', function(req, res, next) {
  res.render('list', {laptops: laptops});
});

router.get('/api', function(req, res, next) {
  //res.render('list', {contacts: contacts});
  res.json(contacts);
});

router.post('/', function(req, res, next) {
	console.log(findMaxId());
	var new_laptop_id = (findMaxId()).id + 1;
	var new_laptop = {
		id: new_laptop_id,
		name: req.body.fullname,
		title: req.body.title,
		color: req.body.color,
		price: req.body.price,
	};
	laptops.push(new_laptop);

	//res.send("New laptop created with id: " + new_laptop.id);
	res.redirect('/laptops/');
});

router.get('/add', function(req, res, next) {
	res.render('add', {laptop:{}});
});

router.route('/:laptop_id')
	.all(function(req, res, next){
		laptop_id = req.params.laptop_id;
		laptop = lookuplaptop(laptop_id);
		next();
	})
	.get(function(req,res,next){
		res.render('edit', {laptop: laptop});
	})
	.post(function(req,res,next){
		res.send('Post for laptop ' + laptop_id);
	})
	.put(function(req,res,next){
		res.send('Put for laptop ' + laptop_id);
	})
	.delete(function(req,res,next){
		res.send('Delete for laptop ' + laptop_id);
	});

module.exports = router;
