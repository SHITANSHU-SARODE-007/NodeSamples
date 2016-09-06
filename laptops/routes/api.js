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



router.get('/', function(req, res, next) {
 res.json(laptops);
 // res.render('list', {laptops: laptops});
});



router.route('/:laptop_id')
	.all(function(req, res, next){
		laptop_id = req.params.laptop_id;
		laptop = lookuplaptop(laptop_id);
		next();
	})
	.get(function(req,res,next){
		//res.render('edit', {laptop: laptop});
		res.json(laptop);
	})
	.post(function(req,res,next){
		 res.redirect('/laptops/');
	})
	
module.exports = router;
