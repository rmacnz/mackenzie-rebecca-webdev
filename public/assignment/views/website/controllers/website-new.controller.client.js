(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, websiteService) {
        var model = this;

        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.websiteList = websiteService.findWebsitesByUser(model.userId);

            model.urlPrev = "#!/user/" + model.userId + "/website";
            model.urlNew = "#!/user/" + model.userId + "/website/new";
            model.headerTitleLeft = "Websites";
            model.headerTitleRight = "New Website";

            model.clickOk = createSite;
        }

        function createSite() {
            if (model.website != null && model.website.name != null && model.website.name != "") {
                websiteService.createWebsite(model.userId, model.website);
                model.websiteList = websiteService.findWebsitesByUser(model.userId);
                $location.url("/user/" + model.userId + "/website");
            } else if (model.website != null) {
                model.errormsg = "Please enter a name for your new site.";
            } else {
                model.errormsg = "Please enter some information for your new site.";
            }
        }
    }

})();