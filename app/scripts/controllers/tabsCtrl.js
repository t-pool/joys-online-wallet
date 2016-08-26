'use strict';
var tabsCtrl = function($scope, globalService, $translate) {
	$scope.tabNames = globalService.tabs;
	$scope.curLang = "English";
	var hval = window.location.hash;
    $scope.setArrowVisibility = function (){
        setTimeout(function(){
            $scope.showLeftArrow = false;
            $scope.showRightArrow = !(document.querySelectorAll(".nav-inner")[0].clientWidth<=document.querySelectorAll(".nav-scroll")[0].clientWidth);
            $scope.$apply();
        },200);
    }
    $scope.setArrowVisibility();
	$scope.setTab = function(hval) {
		if (hval != "") {
			hval = hval.replace("#", '');
			for (var key in $scope.tabNames) {
				if ($scope.tabNames[key].url == hval) {
					$scope.activeTab = globalService.currentTab = $scope.tabNames[key].id;
					break;
				}
				$scope.activeTab = globalService.currentTab;
			}
		} else {
			$scope.activeTab = globalService.currentTab;
		}
	}
    $scope.setTab(hval);
	$scope.tabClick = function(id) {
		$scope.activeTab = globalService.currentTab = id;
		for (var key in $scope.tabNames) {
			if ($scope.tabNames[key].id == id) location.hash = $scope.tabNames[key].url;
		}
	}
	$scope.changeLanguage = function(key, value) {
		$translate.use(key);
		$scope.curLang = value;
        $scope.setArrowVisibility();
	};
    $scope.setHash = function(hash){
        location.hash = hash;
        $scope.setTab(hash);
        $scope.$apply();
    }
    $scope.scrollHoverIn = function(isLeft, val) {
        clearInterval($scope.sHoverTimer);
        $scope.sHoverTimer = setInterval(function(){
            if(isLeft) $scope.scrollLeft(val);
            else $scope.scrollRight(val);
        },20);
    }
    $scope.scrollHoverOut = function() {
        clearInterval($scope.sHoverTimer);
    }
    $scope.scrollLeft = function(val){
        var ele = document.querySelectorAll(".nav-scroll")[0];
        ele.scrollLeft -= val;
        $scope.showLeftArrow = ele.scrollLeft > 0;
        $scope.showRightArrow = document.querySelectorAll(".nav-inner")[0].clientWidth > (ele.clientWidth+ele.scrollLeft);
    }
    $scope.scrollRight = function(val){
        var ele = document.querySelectorAll(".nav-scroll")[0];
        ele.scrollLeft += val;
        $scope.showLeftArrow = ele.scrollLeft > 0;
        $scope.showRightArrow = document.querySelectorAll(".nav-inner")[0].clientWidth > (ele.clientWidth+ele.scrollLeft);
    }
    globalFuncs.changeHash = $scope.setHash;
};
module.exports = tabsCtrl;