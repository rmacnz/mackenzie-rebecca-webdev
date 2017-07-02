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

            model.urlPrev = "#!/user/" + model.userId + "/website";
            model.urlNew = "#!/user/" + model.userId + "/website/new";
            model.headerTitleLeft = "Websites";
            model.headerTitleRight = "Edit Website";

            model.clickOk = updateSite;
            model.deleteSite = deleteSite;

            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(initializeWebsiteList);
            websiteService
                .findWebsiteById(model.webId)
                .then(initializeWebsite);
        }

        function initializeWebsiteList(websites) {
            model.websiteList = websites;
        }

        function initializeWebsite(website) {
            model.website = website;
        }

        function updateSite() {
            if (model.website.name != "") {
                websiteService
                    .updateWebsite(model.webId, model.website)
                    .then(function() {
                        console.log("Website updated successfully.");
                    });
                $location.url("/user/" + model.userId + "/website")
            } else {
                model.errormsg = "Please enter a name for the website.";
            }
        }

        function deleteSite() {
            console.log("Trying to delete site");
            websiteService
                .deleteWebsite(model.webId)
                .then(function () {
                    console.log("Deleted site");
                    $location.url("/user/" + model.userId + "/website")
                })
        }
    }

})();