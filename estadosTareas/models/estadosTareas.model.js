const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const EstadosTareaschema = new Schema({
titulo : String,
empresa : String,

}, { timestamps: true }
);
EstadosTareaschema.virtual('id').get(function () {
return this._id.toHexString();
});
EstadosTareaschema.set('toJSON', {
virtuals: true
});

EstadosTareaschema.findById = function (cb) {
return this.model('EstadosTareas').find({id: this.id}, cb);
};
const EstadosTareas = mongoose.model('EstadosTareas', EstadosTareaschema);
exports.findById = (id) => {
return EstadosTareas.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createEstadosTareas = (EstadosTareasData) => {
const estadosTareas = new EstadosTareas(EstadosTareasData);
return estadosTareas.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
EstadosTareas.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, estadosTareas) {
if (err) {
reject(err);
} else {
resolve(estadosTareas);
}
})
});
};
exports.patchEstadosTareas = (id, EstadosTareasData) => {
return new Promise((resolve, reject) => {
EstadosTareas.findById(id, function (err, estadosTareas) {
if (err) reject(err);

console.log(EstadosTareasData);
for (let i in EstadosTareasData) {
estadosTareas[i] = EstadosTareasData[i];
}
estadosTareas.save(function (err, updatedEstadosTareas) {
if (err) return reject(err);
resolve(updatedEstadosTareas);
});
});
})
};
exports.removeById = (EstadosTareasId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: EstadosTareasId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};