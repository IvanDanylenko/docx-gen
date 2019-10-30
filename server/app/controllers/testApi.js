exports.testFunc = function(req, res){
  res.status(200).json({data: 'My response data'});
};

exports.testPostFunc = function(req, res) {
  res.status(200).json({data: 'My post response data'});
}