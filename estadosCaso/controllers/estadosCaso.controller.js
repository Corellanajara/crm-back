const EstadosCasoModel = require('../models/estadosCaso.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
EstadosCasoModel.createEstadosCaso(req.body)
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
EstadosCasoModel.list(limit, page)
.then((result) => {
res.status(200).send(result);
})
};
exports.getById = (req, res) => {
EstadosCasoModel.findById(req.params.estadosCasoId)
.then((result) => {
res.status(200).send(result);
});
};
exports.patchById = (req, res) => {
EstadosCasoModel.patchEstadosCaso(req.params.estadosCasoId, req.body)
.then((result) => {
res.status(204).send({});
});
};
exports.removeById = (req, res) => {
EstadosCasoModel.removeById(req.params.estadosCasoId)
.then((result)=>{
res.status(204).send({});
});
};