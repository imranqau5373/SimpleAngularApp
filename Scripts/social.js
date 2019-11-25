var app = angular.module("socialLogin", []);
app.controller("loginController", function($scope) {

    let apiUrl = "http://localhost:19576/";
    $scope.facebookLogin = function(){
        window.location.href = apiUrl+"/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A19576%2FLogin.html&state=GUWcHoliFgNN3dL05-rQMlDPw0nJxMaTetSEvB6zZWs1";

    };
    $scope.googleLogin = function(){
        window.location.href = apiUrl+"/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2F192.168.222.135%3A8081%2FLogin.html&state=GUWcHoliFgNN3dL05-rQMlDPw0nJxMaTetSEvB6zZWs1";
    };
    $scope.githubLogin = function(){
        alert('github login.');
    };
    $scope.Title = "Test new Data";

    $scope.getAccessToken = function(){
        if (location.hash) {
            if (location.hash.split('access_token=')) {
                var accessToken = location.hash.split('access_token=')[1].split('&')[0];
                if (accessToken) {
                    isUserRegistered(accessToken);   
                }
            }
        }
    };
    $scope.isUserRegistered = function(){
        $.ajax({
            url: '/api/Account/UserInfo',
            method: 'Get',
            headers: {
                'content-type': 'application/JSON',
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                if (response.HasRegistered) {
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('userName', response.Email);
                    window.location.href = "Data.html";
                } else {
                    signupExternalUser(accessToken, response.LoginProvider);
                }
            }
        });
    };
    $scope.getAccessToken();
});