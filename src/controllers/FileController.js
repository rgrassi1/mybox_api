const File = require('../models/File');
const Box = require('../models/Box');

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

module.exports = {
    store
}