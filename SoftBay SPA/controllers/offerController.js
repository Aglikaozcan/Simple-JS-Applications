const offerController = function () {

    const createGet = function (context) {

        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/offer/create.hbs');
        });
    };

    const createPost = function (context) {

        let payload = {
            product: context.params.product,
            description: context.params.description,
            price: Number(context.params.price),
            pictureUrl: context.params.pictureUrl,
        };

        if (payload.product && payload.description && payload.price && payload.pictureUrl) {
            requester.post('offers', 'appdata', 'Kinvey', payload)
                .then(helper.handler)
                .then(() => {
                    context.redirect('#/offer/dashboard');
                });
        }
    };

    const loadDashboard = function (context) {

        helper.addHeaderInfo(context);

        requester.get('offers', 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offers) => {
                
                context.offers = offers;                

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/offer/dashboard.hbs');
                });
            });
    };

    const editGet = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`offers/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleOffer) => {

                context.offer = singleOffer;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/offer/edit.hbs');
                });
            });
    };

    const editPost = function (context) {

        const id = context.params.id;

        let payload = {
            product: context.params.product,
            description: context.params.description,
            price: Number(context.params.price),
            pictureUrl: context.params.pictureUrl
        };

        requester.put(`offers/${id}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/offer/dashboard');
            });
    };

    const deleteGet = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`offers/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleOffer) => {

                context.offer = singleOffer;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/offer/delete.hbs');
                });
            });
    };

    const deletePost = function (context) {

        const id = context.params.id;

        requester.del(`offers/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('#/offer/dashboard');
            });
    };

    const loadDetails = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`offers/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((myOffer) => {
                context.offer = myOffer;

                context.isCreator = myOffer.creator;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/offer/details.hbs');
                });
            });
    };

    const loadProfile = function (context) {

        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/auth/profile.hbs');
        });
    };

    const buyProduct = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`offers/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {               

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/offer/noBuy.hbs');
                });
            });
    };

    return {
        createGet,
        createPost,
        loadDashboard,
        editGet,
        editPost,
        deleteGet,
        deletePost,
        loadDetails,
        loadProfile,
        buyProduct
    };
}();