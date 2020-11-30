const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://juanestban:juanes2000@givemeappbackend.ai7pc.mongodb.net/give-me-app?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err))
