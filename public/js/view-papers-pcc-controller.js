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
      var paper = null;

        $http.get('services/paper/get-all-papers').then(function(response){
            $scope.papers = response.data;
            $scope.loadingPapers = false;
        });

        $scope.assign = function(p){
          paperId=p;
          $http.get('services/user/get-pcms').them(function(response)){
            $scope.pcms = response.data;
          }
           dialog.dialog( "open" );
        }

        //$scope.submitAssignment = function(){
        submitAssignment = function(){
          var result = $window.confirm("Are you sure?");
          if(result!=true){
            return;
          }
          //this is not required here when the dialog box opens
          //you can fetch it once the PCC submits the reviewers and then update it
          var submission = $http.get('services/submission/get-submission').then(function(response){
              $scope.submission = response.data;
          })
        }

        reset = function(){
          paper = null;
          $scope.selectedReviewer1=null;
          $scope.selectedReviewer2=null;
          $scope.selectedReviewer3=null;
        }

        dialog = $( "#assignPcmDialogBox" ).dialog({
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

        form = dialog.find( "form" ).on( "submit", function( event ) {
          event.preventDefault();
          submitAssignment();
        });

        // $( "#assign" ).button().on( "click", function() {
        //   dialog.dialog( "open" );
        // });

    }]);

}());
