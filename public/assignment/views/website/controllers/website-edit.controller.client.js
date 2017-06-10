(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, websiteService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.webId = $routeParams["wid"];
            model.websiteList = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.webId);

            model.urlPrev = "#!/user/" + model.userId + "/website";
            model.urlNew = "#!/user/" + model.userId + "/website/new";
            model.headerTitleLeft = "Websites";
            model.headerTitleRight = "Edit Website";

            model.clickOk = updateSite;
            model.deleteSite = deleteSite;
        }

        function updateSite() {
            if (model.website.name != "") {
                websiteService.updateWebsite(model.webId, model.website);
                $location.url("/user/" + model.userId + "/website")
            } else {
                model.errormsg = "Please enter a name for the website.";
            }
        }

        function deleteSite() {
            websiteService.deleteWebsite(model.webId);
            $location.url("/user/" + model.userId + "/website")
        }
    }

})();