const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const contactoschema = new Schema({
nombres : String,
apellidos : String,
email : String,
phone : String,
direccion : String,
descripcion : String,
asignado : ObjectId,
creadoPor : ObjectId,
creadoEn : Date,
estado : Boolean,
equipo : ObjectId,

}, { timestamps: true }
);
contactoschema.virtual('id').get(function () {
return this._id.toHexString();
});
contactoschema.set('toJSON', {
virtuals: true
});

contactoschema.findById = function (cb) {
return this.model('contactos').find({id: this.id}, cb);
};
const contactos = mongoose.model('contactos', contactoschema);
exports.findById = (id) => {
return contactos.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createcontactos = (contactosData) => {
const contactos = new contactos(contactosData);
return contactos.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
contactos.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, contactos) {
if (err) {
reject(err);
} else {
resolve(contactos);
}
})
});
};
exports.patchcontactos = (id, contactosData) => {
return new Promise((resolve, reject) => {
contactos.findById(id, function (err, contactos) {
if (err) reject(err);

console.log(contactosData);
for (let i in contactosData) {
contactos[i] = contactosData[i];
}
contactos.save(function (err, updatedcontactos) {
if (err) return reject(err);
resolve(updatedcontactos);
});
});
})
};
exports.removeById = (contactosId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: contactosId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};