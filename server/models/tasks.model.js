const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    task: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

