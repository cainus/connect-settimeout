module.exports = function(cb, duration, options){
  options = options || {};
  options.timeoutName = options.timeoutName || 'timeoutCheck';
  var timeoutName = options.timeoutName;

  return function(req, res, next){
    res.connectSetTimeouts = res.connectSetTimeouts || {};
    res.connectSetTimeouts[timeoutName] = setTimeout(function(){
      return cb(req, res);
    }, duration);

    function onEnd() {
      clearTimeout(res.connectSetTimeouts[timeoutName]);
    }
    res.on('finish', onEnd);
    res.on('close', onEnd);
    res.on('aborted', onEnd);
    next();
  };


};
