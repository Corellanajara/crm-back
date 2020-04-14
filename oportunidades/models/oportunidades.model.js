const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Oportunidadeschema = new Schema({
nombre : String,
cuenta : ObjectId,
monto : Number,
moneda : Number,
etapa : Number,
probabilidad : Number,
usuarios : Array,
contacto : String,
descripcion : String,
archivo : String,

}, { timestamps: true }
);
Oportunidadeschema.virtual('id').get(function () {
return this._id.toHexString();
});
Oportunidadeschema.set('toJSON', {
virtuals: true
});

Oportunidadeschema.findById = function (cb) {
return this.model('Oportunidades').find({id: this.id}, cb);
};
const Oportunidades = mongoose.model('Oportunidades', Oportunidadeschema);
exports.findById = (id) => {
return Oportunidades.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createOportunidades = (OportunidadesData) => {
const oportunidades = new Oportunidades(OportunidadesData);
return oportunidades.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Oportunidades.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, oportunidades) {
if (err) {
reject(err);
} else {
resolve(oportunidades);
}
})
});
};
exports.patchOportunidades = (id, OportunidadesData) => {
return new Promise((resolve, reject) => {
Oportunidades.findById(id, function (err, oportunidades) {
if (err) reject(err);

console.log(OportunidadesData);
for (let i in OportunidadesData) {
oportunidades[i] = OportunidadesData[i];
}
oportunidades.save(function (err, updatedOportunidades) {
if (err) return reject(err);
resolve(updatedOportunidades);
});
});
})
};
exports.removeById = (OportunidadesId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: OportunidadesId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};