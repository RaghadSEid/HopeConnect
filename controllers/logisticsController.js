const LogisticsTask = require('../models/logisticsModel');

exports.getAllTasks = (req, res) => {
    LogisticsTask.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getTaskById = (req, res) => {
    const id = req.params.id;
    LogisticsTask.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length === 0) return res.status(404).json({ message: 'Task not found' });
        res.json(result[0]);
    });
};

exports.createTask = (req, res) => {
    LogisticsTask.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Task created', id: result.insertId });
    });
};

exports.updateTask = (req, res) => {
    const id = req.params.id;
    LogisticsTask.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Task updated' });
    });
};

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    LogisticsTask.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Task deleted' });
    });
};
