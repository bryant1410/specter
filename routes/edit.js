var tomarkdown = require('to-markdown').toMarkdown;
var constants = require('../constants');
var request = require('request');
var helpers = require('../helpers');

exports.editPost = function(req,res){
    
    var id = req.params.id;
    var url = constants.queries.postType() + id;
     request(url,function(error,response,body){
        var parsed = JSON.parse(body);
        if(!parsed._source) return res.send(404);        
        var markdownText = tomarkdown(parsed._source.postHtml);       
        return res.render(constants.views.createPost,buildData(markdownText,parsed));
    });
};





function buildData(markdownText,parsed){

 var item = {
    post :markdownText,
    title : parsed._source.title,
     postedBy : parsed._source.postedBy,
     id : parsed._id,
     postedOn : parsed._source.postedOn
}
 
 return item;
}