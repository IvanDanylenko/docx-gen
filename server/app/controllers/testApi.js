exports.testFunc = function(req, res){
  res.status(200).json({data: JSON.stringify(req)});
};

exports.testPostFunc = function(req, res) {
  res.status(200).json({data: 'My post response data'});
}