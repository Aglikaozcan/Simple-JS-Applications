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

        // Shop
        this.get('#/offer/create', offerController.createGet);
        this.post('#/offer/create', offerController.createPost);
        this.get('#/offer/dashboard', offerController.loadDashboard);
        this.get('#/offer/edit/:id', offerController.editGet);
        this.post('#/offer/edit/:id', offerController.editPost);
        this.get('#/offer/delete/:id', offerController.deleteGet);
        this.post('#/offer/delete/:id', offerController.deletePost);
        this.get('#/offer/details/:id', offerController.loadDetails);
        this.get('#/user/profile', offerController.loadProfile);
        this.get('#/offer/buy/:id', offerController.buyProduct);

    }).run('/');
};