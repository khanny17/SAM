(function () {
    'use strict';

    var db = require('../models/db');
    var PCCReviewModel = db.PCCReview;
    var PaperModel = db.paper;

    var init = function(router) {
        router.post('/submit-pcc-review', endpoints.createPCCReview);
        router.get('/get-pcc-review-by-submissionId', endpoints.getPCCReviewBySubmissionId);
    };

    var endpoints = {

        createPCCReview: function(req, res) {
          console.log("in createPCCReview!");
            return PCCReviewModel.create({
              Rating:req.body.params.review_rating,
              Comment:req.body.params.review_comment,
              submissionID:req.body.params.review_submissionID
            }).then(function(pccReview) {
                return PaperModel.update({
                    Status:'Review Complete'
                },{ where: {id: req.body.params.paper_id} }).then(function(){
                    res.send(pccReview);
                })
                });
        },

        getPCCReviewBySubmissionId: function(req, res){
          console.log("in getPCCReviewBySubmissionId!");
          PCCReviewModel.findAll({
            where:{
              submissionID:req.query.submissionId
            }
          }).then(function(pccReviews){
            console.log("pcc reviews-"+pccReviews);
            res.send({success:true,pccReviews:pccReviews});
          })
        }

    };


    module.exports = {
        init: init
    };

}());
