const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Cuentachema = new Schema({
titulo : String,
datosEmpresa : Array,
asignados : Array,
creador : String,
empresa : String,

}, { timestamps: true }
);
Cuentachema.virtual('id').get(function () {
return this._id.toHexString();
});
Cuentachema.set('toJSON', {
virtuals: true
});

Cuentachema.findById = function (cb) {
return this.model('Cuenta').find({id: this.id}, cb);
};
const Cuenta = mongoose.model('Cuenta', Cuentachema);
exports.findById = (id) => {
return Cuenta.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
delete result.__v;
return result;
});
};
exports.createCuenta = (CuentaData) => {
const cuenta = new Cuenta(CuentaData);
return cuenta.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Cuenta.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, cuenta) {
if (err) {
reject(err);
} else {
resolve(cuenta);
}
})
});
};
exports.patchCuenta = (id, CuentaData) => {
return new Promise((resolve, reject) => {
Cuenta.findById(id, function (err, cuenta) {
if (err) reject(err);

console.log(CuentaData);
for (let i in CuentaData) {
cuenta[i] = CuentaData[i];
}
cuenta.save(function (err, updatedCuenta) {
if (err) return reject(err);
resolve(updatedCuenta);
});
});
})
};
exports.removeById = (CuentaId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: CuentaId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};