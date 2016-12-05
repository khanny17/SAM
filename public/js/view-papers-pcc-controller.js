(function () {
    'use strict';

    angular.module('ViewPapersPCCControllerModule', ['AuthModule'])

    .controller('viewPapersPCCController', ['$scope', '$http','AuthService','$window', function($scope, $http, AuthService,$window){

      $scope.papers = [];
      $scope.title = "SAM 2017 - View Papers";
      $scope.user =  AuthService.authenticatedUser();
      $scope.loadingPapers = true;
      $scope.pcms = [];
      $scope.selectedReviewer1=null;
      $scope.selectedReviewer2=null;
      $scope.selectedReviewer3=null;
      $scope.valmsg="";
      $scope.action={readOnly:false};
      var paper = null;
      var paperAuthor = null;

      loadPapers();

      function loadPapers(){
        $http.get('services/submission/get-all-submissions').then(function(response){
          console.log("inside get papers!")
          $scope.papers = response.data.submissions[0];
          console.log($scope.papers);
          $scope.loadingPapers = false;
        });
      }

      $("#assignPcmDialogBox").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,

        buttons: [
          // {
          //   text:"Submit",
          //   click:submitAssignment
          // },
          {
            text:"Cancel",
            click:function() {
              reset();
              $(this).dialog("close");
            }
          }
        ],
        close: function() {
          reset();
        }
      });


      $scope.assign = function(p){
        console.log("Inside assign function!");
        paper=p;
        var paperAuthorID=paper.PaperAuthorId;
        console.log("paper author id : "+paperAuthorID);
        $http.get('services/user/get-user-by-id',{params:{ID:paperAuthorID}}).then(function(response){
          paperAuthor=response.data;
          console.log(paperAuthor);
        });
        $http.get('services/user/get-pcms').then(function(response){
          console.log("inside assign!");
          $scope.pcms = response.data;
          console.log($scope.pcms);
          makeDialogEditable();
          $("#assignPcmDialogBox").dialog("open");
        });
      }

      $scope.view = function(p){
        console.log("Inside view!");
        paper = p;
        var paperAuthorID=paper.PaperAuthorId;
        console.log("paper author id : "+paperAuthorID);
        $http.get('services/user/get-user-by-id',{params:{ID:paperAuthorID}}).then(function(response){
          paperAuthor=response.data;
          console.log(paperAuthor);
        });

        $http.get('services/user/get-pcms').then(function(response){
          console.log("inside assign!");
          $scope.pcms = response.data;
          $scope.selectedReviewer1 = paper.SubmissionReviewer1Id;
          $scope.selectedReviewer2 = paper.SubmissionReviewer2Id;
          $scope.selectedReviewer3 = paper.SubmissionReviewer3Id;
          console.log($scope.pcms);
          makeDialogReadonly();
          $("#assignPcmDialogBox").dialog("open");
        });
      }

      $scope.submitAssignment=function(){

        console.log("Reviewer 1 : "+$scope.selectedReviewer1);
        console.log("Reviewer 2 : "+$scope.selectedReviewer2);
        console.log("Reviewer 3 : "+$scope.selectedReviewer3);

        if(!validate()){
          return;
        }

        var result = $window.confirm("Are you sure?");
        if(result!=true){
          return;
        }

        console.log("updating submission with paper id "+paper.PaperId);
        $http.post('services/submission/update-submission-with-reviewers',
          {
            params: {
              paperID: paper.PaperId,
              reviewer1:$scope.selectedReviewer1,
              reviewer2:$scope.selectedReviewer2,
              reviewer3:$scope.selectedReviewer3
             }
           }).then(function(response){
             console.log(response.data.success);
             console.log(paper.PaperId);
             $http.post('services/paper/update-paper-status',
                {
                  params: {
                    paperID: paper.PaperId,
                    status: "Review Pending"
                  }
                }).then(function(response){
                  console.log(response.data.success);
                  var pcms = [];
                  pcms.push( $scope.selectedReviewer1);
                  pcms.push( $scope.selectedReviewer2);
                  pcms.push( $scope.selectedReviewer3);
                  $http.post('services/notification/create-notification',
                    {
                        Text: 'You have been assigned paper' + paper.PaperTitle+' for review.',
                        userIds: pcms
                    })
                    .then(function () {
                      console.log("notification sent!");
                    });
                    reset();
                    $("#assignPcmDialogBox").dialog("close");
                    loadPapers();
                });
           });
        }

      function validate(){
        if($scope.selectedReviewer1==$scope.selectedReviewer2 || $scope.selectedReviewer2==$scope.selectedReviewer3 || $scope.selectedReviewer1==$scope.selectedReviewer3){
          $scope.valmsg = "Please select a different reviewer in each of the field";
          console.log($scope.valmsg);
          $scope.$apply();
          return false;
        }
        if(paperAuthor.ID==$scope.selectedReviewer1 || paperAuthor.ID==$scope.selectedReviewer2 || paperAuthor.ID==$scope.selectedReviewer3){
          $scope.valmsg = "You cannot select the author of the paper as a reviewer";
          console.log($scope.valmsg);
          $scope.$apply();
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

      function makeDialogReadonly(){
        $("#reviewer1").attr("disabled", "disabled");
        $("#reviewer2").attr("disabled", "disabled");
        $("#reviewer3").attr("disabled", "disabled");
        $("#submit").hide()
      }

      function makeDialogEditable(){
        $("#reviewer1").removeAttr("disabled");
        $("#reviewer2").removeAttr("disabled");
        $("#reviewer3").removeAttr("disabled");
        $("#submit").show()
      }

    }]);

}());
