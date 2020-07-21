const eventController = function () {

    const getCreateEvent = function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/event/createEvent.hbs');
        });
    };

    const postCreateEvent = function (context) {
        // console.log(context.params);

        eventModel.createEvent(context.params)
            .then(helper.handler)
            .then(() => {
                homeController.getHome(context);
            });
    };

    const getEventDetails = async function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await eventModel.getEvent(context.params.eventId);
            let event = await response.json();

            Object.keys(event).forEach((key) => {
                context[key] = event[key];
            });

            context.isCreator = username === event.organizer;
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/event/eventDetails.hbs');
        });
    };

    const getEditEvent = async function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await eventModel.getEvent(context.params.eventId);
            let event = await response.json();

            Object.keys(event).forEach((key) => {
                context[key] = event[key];
            });

            //console.log(event);
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/event/editEvent.hbs');
        });
    };

    const postEditEvent = function (context) {

        eventModel.editEvent(context.params)
            .then(helper.handler)
            .then(() => {
                homeController.getHome(context);
            });
    };

    const postDeleteEvent = function (context) {

        eventModel.deleteEvent(context.params.eventId)
            .then(helper.handler)
            .then(() => {
                homeController.getHome(context);
            });
    };

    const getJoinEvent = async function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await eventModel.getEvent(context.params.eventId);
            let event = await response.json();

            Object.keys(event).forEach((key) => {
                context[key] = event[key];
            });

            context.peopleInterestedIn++;

            console.log(context.peopleInterestedIn);
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/event/eventDetails.hbs');
        });        
    };    

    const postJoinEvent = function (context) {

        eventModel.joinEvent(context.params)
        .then(helper.handler)
        .then(() => {
            homeController.getHome(context);
        });
    };

    return {
        getCreateEvent,
        postCreateEvent,
        getEventDetails,
        getEditEvent,
        postEditEvent,
        postDeleteEvent,
        getJoinEvent,
        postJoinEvent
    };
}();