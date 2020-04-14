const contactosModel = require('../models/contactos.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
contactosModel.createcontactos(req.body)
.then((result) => {
res.status(201).send({id: result._id});
});
};exports.list = (req, res) => {
let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
let page = 0;
if (req.query) {
if (req.query.page) {
req.query.page = parseInt(req.query.page);
page = Number.isInteger(req.query.page) ? req.query.page : 0;
}
}
contactosModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
contactosModel.findById(req.params.contactosId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
contactosModel.patchcontactos(req.params.contactosId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
contactosModel.removeById(req.params.contactosId)
.then((result)=>{
res.status(204).send({});
});
};