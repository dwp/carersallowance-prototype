var express = require('express');
var router = express.Router();
var tog = require(__dirname + '/../lib/tog.js');
var moment = require('moment');

router.get('/', function (req, res) {

  res.render('index');

});


// Example routes - feel free to delete these

// Passing data into a page

router.get('/examples/template-data', function (req, res) {

  res.render('examples/template-data', { 'name' : 'Foo' });

});

// Branching

router.get('/application/aboutwork', function (req, res) {

  // get the answer from the query string (eg. ?over18=false)
  var worked = req.query.worked;
  if (worked === 'No') {
    // redirect to the relevant page
    res.redirect("/application/paydetails");
  } else {

    // if over18 is any other value (or is missing) render the page requested
    res.render('application/aboutwork');
  }
});

router.get('/application/employment', function (req, res) {

  // get the answer from the query string (eg. ?over18=false)
  var worktype = req.query.worktype;
  var prevworktype = req.query.prevworktype;
  if (worktype == 'selfemp' || prevworktype === 'selfemp') {
    // redirect to the relevant page
    res.redirect("/application/selfemployment");
  } else {

    // if over18 is any other value (or is missing) render the page requested
    res.render('application/employment');
  }
});

router.get('/application/confirmclaimdate', function(req,res,next)
{
  var today = new moment();
  var qualben = req.session.data.qualifyingbenefit;

  if (qualben['radio-group'] == "Yes") // within 3 months
  {
    var qualbenstring = qualben["qb-year"]+'-'+qualben["qb-month"]+'-'+qualben["qb-day"];
    var qualbendate = new moment(qualbenstring);
    qual_start = qualbendate;
  } else {
    qual_start = today.subtract(3,'months');
  }
  
  var claimdate = req.session.data.claimdate;
  var claimdatestring = claimdate["work-dob-year"]+'-'+claimdate["work-dob-month"]+'-'+claimdate["work-dob-day"];
  var claim_start = new moment(claimdatestring);
  console.log(claim_start.toString());

  var backdate;
  if (claim_start < qual_start) backdate = qual_start;
  else if (claim_start > qual_start) backdate = claim_start;

  req.data = req.data || {};
  req.data.backdate = backdate;

  // res.send(tog(req.session.data));
  next();
});

// add your routes here

module.exports = router;
