const Message = require('../models/message');

const index = (req, res) => {
    
    Message.find().sort({
            createdAt: -1
        })
        .then((result) => {
            res.render('index', {
                title: 'A simple message board',
                messages: result
            });
        })
        .catch(error => {
            console.log(error)
        });
}

const create_message = (req, res) => {
    const message = new Message({
        name: res.locals.currentUser.username,
        body: req.body.body
    });

    message.save()
        .then((response) => {
            res.redirect('/');
        })
        .catch(error => console.log(error));
}

module.exports = {
    index,
    create_message
}