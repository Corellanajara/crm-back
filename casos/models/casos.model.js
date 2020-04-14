const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Casoschema = new Schema({
titulo : String,
cuenta : String,
descripcion : String,
estado : Boolean,
asignado : String,
creador : String,
empresa : String,

}, { timestamps: true }
);
Casoschema.virtual('id').get(function () {
return this._id.toHexString();
});
Casoschema.set('toJSON', {
virtuals: true
});

Casoschema.findById = function (cb) {
return this.model('Casos').find({id: this.id}, cb);
};
const Casos = mongoose.model('Casos', Casoschema);
exports.findById = (id) => {
return Casos.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createCasos = (CasosData) => {
const casos = new Casos(CasosData);
return casos.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Casos.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, casos) {
if (err) {
reject(err);
} else {
resolve(casos);
}
})
});
};
exports.patchCasos = (id, CasosData) => {
return new Promise((resolve, reject) => {
Casos.findById(id, function (err, casos) {
if (err) reject(err);

console.log(CasosData);
for (let i in CasosData) {
casos[i] = CasosData[i];
}
casos.save(function (err, updatedCasos) {
if (err) return reject(err);
resolve(updatedCasos);
});
});
})
};
exports.removeById = (CasosId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: CasosId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};