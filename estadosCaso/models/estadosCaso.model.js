const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const EstadosCasochema = new Schema({
titulo : String,
empresa : String,

}, { timestamps: true }
);
EstadosCasochema.virtual('id').get(function () {
return this._id.toHexString();
});
EstadosCasochema.set('toJSON', {
virtuals: true
});

EstadosCasochema.findById = function (cb) {
return this.model('EstadosCaso').find({id: this.id}, cb);
};
const EstadosCaso = mongoose.model('EstadosCaso', EstadosCasochema);
exports.findById = (id) => {
return EstadosCaso.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createEstadosCaso = (EstadosCasoData) => {
const estadosCaso = new EstadosCaso(EstadosCasoData);
return estadosCaso.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
EstadosCaso.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, estadosCaso) {
if (err) {
reject(err);
} else {
resolve(estadosCaso);
}
})
});
};
exports.patchEstadosCaso = (id, EstadosCasoData) => {
return new Promise((resolve, reject) => {
EstadosCaso.findById(id, function (err, estadosCaso) {
if (err) reject(err);

console.log(EstadosCasoData);
for (let i in EstadosCasoData) {
estadosCaso[i] = EstadosCasoData[i];
}
estadosCaso.save(function (err, updatedEstadosCaso) {
if (err) return reject(err);
resolve(updatedEstadosCaso);
});
});
})
};
exports.removeById = (EstadosCasoId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: EstadosCasoId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};