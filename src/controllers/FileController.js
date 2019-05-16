const File = require('../models/File');
const Box = require('../models/Box');
const _ = require('lodash');

const FileController = ({ io }) => {

    const store = async (req, res) => {
        const { originalname: name, size, key, location: url = '' } = req.file;
        const file = await File.create({ 
            name,
            size,
            key,
            url
        });

        const box = await Box.findById(req.params.id);
        box.files.push(file);
        await box.save();
        
        io.to('user-1').emit('new-file', file);

        return res.status(201).json(file);
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

        io.to('user-1').emit('delete-file', file);

        return res.status(204);    
    }

    return { store, remove }
}

module.exports = FileController