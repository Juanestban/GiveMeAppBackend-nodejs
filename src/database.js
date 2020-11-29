const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/give-me-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err))
