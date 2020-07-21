window.onload = () => {
    Sammy("#container", function () {

        this.use('Handlebars', 'hbs');

        // Home
        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome); // optional

        // User
        this.get('#/register', userController.getRegister);
        this.get('#/login', userController.getLogin);
        this.post('#/register', userController.postRegister);
        this.post('#/login', userController.postLogin);
        this.get('#/logout', userController.logout);

        // Movies
        this.get('#/movie/create', movieController.createGet);
        this.post('#/movie/create', movieController.createPost);
        this.get('#/cinema', movieController.loadCinema);
        this.get('#/movie/user', movieController.myMovies);
        this.get('#/movie/edit/:id', movieController.editGet);
        this.post('#/movie/edit/:id', movieController.editPost);
        this.get('#/movie/delete/:id', movieController.deleteGet);
        this.post('#/movie/delete/:id', movieController.deletePost);
        this.get('#/movie/details/:id', movieController.loadDetails);
        this.get('#/movie/buy/:id', movieController.buyTicket);

    }).run('/');
};