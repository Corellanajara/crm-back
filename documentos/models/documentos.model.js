const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Documentoschema = new Schema({
titulo : String,
docto : String,
compartidos : Array,
creador : String,
empresa : String,

}, { timestamps: true }
);
Documentoschema.virtual('id').get(function () {
return this._id.toHexString();
});
Documentoschema.set('toJSON', {
virtuals: true
});

Documentoschema.findById = function (cb) {
return this.model('Documentos').find({id: this.id}, cb);
};
const Documentos = mongoose.model('Documentos', Documentoschema);
exports.findById = (id) => {
return Documentos.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createDocumentos = (DocumentosData) => {
const documentos = new Documentos(DocumentosData);
return documentos.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Documentos.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, documentos) {
if (err) {
reject(err);
} else {
resolve(documentos);
}
})
});
};
exports.patchDocumentos = (id, DocumentosData) => {
return new Promise((resolve, reject) => {
Documentos.findById(id, function (err, documentos) {
if (err) reject(err);

console.log(DocumentosData);
for (let i in DocumentosData) {
documentos[i] = DocumentosData[i];
}
documentos.save(function (err, updatedDocumentos) {
if (err) return reject(err);
resolve(updatedDocumentos);
});
});
})
};
exports.removeById = (DocumentosId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: DocumentosId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};