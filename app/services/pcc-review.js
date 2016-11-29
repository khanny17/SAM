(function () {
    'use strict';

    var db = require('../models/db');
    var PCCReviewModel = db.PCCReview;

    var init = function(router) {
        router.post('/submit-pcc-review', endpoints.createPCCReview);
        router.get('/get-pcc-review-by-submissionId', endpoints.getPCCReviewBySubmissionId);
    };

    var endpoints = {

        createPCCReview: function(req, res) {
          console.log("in createPCCReview!");
            PCCReviewModel.create({
              Rating:req.body.params.review_rating,
              Comment:req.body.params.review_comment,
              submissionID:req.body.params.review_submissionID
            }).then(function(pccReview) {
                    res.send(pccReview);
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
