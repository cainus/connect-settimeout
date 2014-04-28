module.exports = function(cb, duration, options){
  options = options || {};
  options.timeoutName = 'timeoutCheck' || options.timeoutName;
  var timeoutName = options.timeoutName;

  return function(req, res, next){
    res[timeoutName] = setTimeout(function(){
      return cb(req, res);
    }, duration);
    res.on('finish', function(evt){
      clearTimeout(res[timeoutName]);
    });
    next();
  };


};
