const File = require('../models/File');
const Box = require('../models/Box');
const _ = require('lodash');

const store = async (req, res) => {
    const file = await File.create({ 
        title: req.file.originalname,
        path: req.file.key
    });

    const box = await Box.findById(req.params.id);
    box.files.push(file);
    await box.save();
    
    return res.json(file);
}

const remove = async (req, res) => {
    const { idFile } = req.params; 
    const box = await Box.findById(req.params.idBox);

    const file = box.files.find(id => new String(id).localeCompare(new String(idFile)) === 0);
    if (_.isEmpty(file)) {
        return res.status(404);
    }   

    const index = box.files.indexOf(file);
    box.files.splice(index, 1);
    
    await box.save();
    return res.status(204);    
}

module.exports = {
    store,
    remove
}