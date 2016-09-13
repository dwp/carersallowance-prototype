var util    = require('util')
       _    = require('underscore');

module.exports = {

  clear: function(req, res)
  {
    console.log("Clearing all user values.")
    req.session.destroy();
    for (cookie in req.cookies)
    {
      if (req.cookies.hasOwnProperty(cookie))
      {
          res.clearCookie(cookie);
      }
    }
  },

  save_input_data: function()
  {
    return function(req, res, next)
    {
      var ref = req.header('Referer');
      
      // console.log('SAVING - save_input_data');
      // console.log('- - - session.user');
      // console.log(req.session.user);
      // console.log('- - - session.test');
      // console.log(req.session.test);

      if (ref && req.method == "POST")
      {
        var page = _.last(ref.split('/')).replace(/[\?\=]/,'')
        req.session.data = req.session.data || {};
        req.session.data[page] = req.body;
      }
      next();
    }
  }
};
