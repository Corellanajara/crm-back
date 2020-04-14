const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Tareachema = new Schema({
titulo : String,
descripcion : String,
estado : Boolean,
cuenta : String,
asignado : String,
creador : String,
empresa : String,

}, { timestamps: true }
);
Tareachema.virtual('id').get(function () {
return this._id.toHexString();
});
Tareachema.set('toJSON', {
virtuals: true
});

Tareachema.findById = function (cb) {
return this.model('Tarea').find({id: this.id}, cb);
};
const Tarea = mongoose.model('Tarea', Tareachema);
exports.findById = (id) => {
return Tarea.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createTarea = (TareaData) => {
const tarea = new Tarea(TareaData);
return tarea.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Tarea.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, tarea) {
if (err) {
reject(err);
} else {
resolve(tarea);
}
})
});
};
exports.patchTarea = (id, TareaData) => {
return new Promise((resolve, reject) => {
Tarea.findById(id, function (err, tarea) {
if (err) reject(err);

console.log(TareaData);
for (let i in TareaData) {
tarea[i] = TareaData[i];
}
tarea.save(function (err, updatedTarea) {
if (err) return reject(err);
resolve(updatedTarea);
});
});
})
};
exports.removeById = (TareaId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: TareaId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};