(function () {
    'use strict';

    angular.module('ViewPapersPCCControllerModule', ['AuthModule'])

    .controller('viewPapersPCCController', ['$scope', '$http','AuthService', function($scope, $http, AuthService){

      $scope.papers = [];
      $scope.title = "SAM 2017 - View Papers";
      $scope.user =  AuthService.authenticatedUser();
      $scope.loadingPapers = true;
      $scope.pcms = [];
      $scope.selectedReviewer1=null;
      $scope.selectedReviewer2=null;
      $scope.selectedReviewer3=null;
      $scope.valmsg="";
      var paper = null;
      var paperAuthor = null;

      $http.get('services/paper/get-all-papers').then(function(response){
        console.log("inside get papers!")
          $scope.papers = response.data;
          console.log($scope.papers);
          $scope.loadingPapers = false;
      });

      $scope.assign = function(p){
        paper=p;
        paperAuthor=paper.user;
        $http.get('services/user/get-pcms').then(function(response){
          $scope.pcms = response.data;
        });
         dialog.dialog( "open" );
      }

        //$scope.submitAssignment = function(){
      function submitAssignment(){
        var result = $window.confirm("Are you sure?");
        if(result!=true){
          return;
        }
        if(!validate()){
          return;
        }
        // var submission;
        // $http.get('services/submission/get-submission', {params: { paperID: paper.ID }}).then(function(response){
        //     submission = response.data;
        // })

        //update submission
        $http.post('services/submission/update-submission-with-reviewers',
          {
            params: {
              paperID: paper.ID,
              reviewer1:$scope.selectedReviewer1,
              reviewer2:$scope.selectedReviewer2,
              Reviewer3:$scope.selectedReviewer3
             }
           }).then(function(response){
             console.log(response.success);
           })
        }

      function validate(){
        if($scope.selectedReviewer1==$scope.selectedReviewer2 || $scope.selectedReviewer2==$scope.selectedReviewer3 || $scope.selectedReviewer1==$scope.selectedReviewer3){
          $scope.valmsg = "Please select a different reviewer in each of the field";
          return false;
        }
        if(paperAuthor==$scope.selectedReviewer1 || paperAuthor==$scope.selectedReviewer2 || paperAuthor==$scope.selectedReviewer3){
          $scope.valmsg = "You cannot select the author of the paper as a reviewer";
          return false;
        }
        return true;
      }

      function reset(){
        paper = null;
        paperAuthor = null;
        $scope.valmsg = "";
        $scope.selectedReviewer1=null;
        $scope.selectedReviewer2=null;
        $scope.selectedReviewer3=null;
      }

      var dialog = $( "#assignPcmDialogBox" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
          "Submit": submitAssignment,
          Cancel: function() {
            reset();
            dialog.dialog( "close" );
          }
        },
        close: function() {
          reset();
          form[ 0 ].reset();
          // allFields.removeClass( "ui-state-error" );
        }
      });

      var form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        submitAssignment();
      });

      // $( "#assign" ).button().on( "click", function() {
      //   dialog.dialog( "open" );
      // });

    }]);

}());
