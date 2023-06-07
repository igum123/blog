let formidable = require('formidable');
let fs = require('fs');
let path = require('path');


/**
 * Manage the upload
 * @constructor
 * @param {string} req - Request object from express
 * @return {Promise<object>} - Return a promise with the body of the request
 */
function upload(req) {
    let form = new formidable.IncomingForm({ multiple: true });
    let imgPath = path.resolve(__dirname, '../../img');
    form.uploadDir = imgPath;
    if (!fs.existsSync(imgPath)) {
        fs.mkdirSync(imgPath);
    }
    return new Promise(((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) {
                reject(err);
            } else {
                const data = fields['data'] ? JSON.parse(fields['data']) : {};
                if (files[0]) files = { file: files[0] };
                resolve({ fields: data, files });
            }
        });
    }));
}

module.exports = {
    upload
};