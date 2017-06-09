(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, websiteService) {
        var model = this;
        model.updateSite = updateSite;
        model.deleteSite = deleteSite;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.websiteList = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.webId);
        }

        function updateSite() {
            websiteService.updateWebsite(model.webId, model.website);
            $location.url("/user/" + model.userId + "/website")
        }

        function deleteSite() {
            websiteService.deleteWebsite(model.webId);
            $location.url("/user/" + model.userId + "/website")
        }
    }

})();