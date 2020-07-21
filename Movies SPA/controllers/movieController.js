const movieController = function () {

    const createGet = function (context) {

        helper.addHeaderInfo(context);

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/movie/create.hbs');
        });
    };

    const createPost = function (context) {

        let payload = {
            title: context.params.title,
            imageUrl: context.params.imageUrl,
            description: context.params.description,
            tickets: Number(context.params.tickets),
            genres: context.params.genres
        };

        requester.post('movies', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('/');
            });
    };

    const loadCinema = function (context) {

        helper.addHeaderInfo(context);

        const sortCriteria = JSON.stringify({
            tickets: -1
        });

        const endpoint = `movies?query={}&sort=${sortCriteria}`;

        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movies) => {

                context.movies = movies;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/movie/cinema.hbs');
                });
            });
    };

    const myMovies = function (context) {

        helper.addHeaderInfo(context);

        const endpoint = `movies?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`;

        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((myMovies) => {

                context.movies = myMovies;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/movie/myMovies.hbs');
                });
            });
    };

    const editGet = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`movies/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleMovie) => {

                context.movie = singleMovie;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/movie/edit.hbs');
                });
            });
    };

    const editPost = function (context) {

        const id = context.params.id;

        let payload = {
            title: context.params.title,
            imageUrl: context.params.imageUrl,
            description: context.params.description,
            tickets: Number(context.params.tickets),
            genres: context.params.genres
        };

        requester.put(`movies/${id}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            });
    };

    const deleteGet = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`movies/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleMovie) => {

                context.movie = singleMovie;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/movie/delete.hbs');
                });
            });
    };

    const deletePost = function (context) {

        const id = context.params.id;

        requester.del(`movies/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('/');
            });
    };

    const loadDetails = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`movies/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((myMovie) => {
                context.movie = myMovie;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial('../views/movie/details.hbs');
                });
            });
    };

    const buyTicket = function (context) {

        helper.addHeaderInfo(context);

        const id = context.params.id;

        requester.get(`movies/${id}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((myMovie) => {
                myMovie.tickets--;

                return requester.put(`movies/${id}`, 'appdata', 'Kinvey', myMovie);

            })
            .then(helper.handler)
            .then(() => {
                context.redirect('#/cinema');
            });
    };

    return {
        createGet,
        createPost,
        loadCinema,
        myMovies,
        editGet,
        editPost,
        deleteGet,
        deletePost,
        loadDetails,
        buyTicket,
    };
}();