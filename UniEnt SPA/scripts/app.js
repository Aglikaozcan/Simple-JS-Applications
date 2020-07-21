const app = Sammy("#rootElement", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('/', homeController.getHome);
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    // Events
    this.get('#/organizeEvent', eventController.getCreateEvent);
    this.post('#/organizeEvent', eventController.postCreateEvent);
    this.get('#/eventDetails/:eventId', eventController.getEventDetails);
    this.get('#/editEvent/:eventId', eventController.getEditEvent);
    this.post('#/editEvent/:eventId', eventController.postEditEvent);
    this.get('#/deleteEvent/:eventId', eventController.postDeleteEvent);
    this.get('#/joinEvent/:eventId', eventController.getJoinEvent);
    this.post('#/joinEvent/:eventId', eventController.postJoinEvent);
    
});

(() => {
    app.run('#/home');
})();