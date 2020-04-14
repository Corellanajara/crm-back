const contactosController = require('./controllers/contactos.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
exports.routesConfig = function (app) {
app.post('/contactos', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
contactosController.insert
]);
app.get('/contactos', [
//ValidationMiddleware.validJWTNeeded,
//PermissionMiddleware.minimumPermissionLevelRequired(FREE),
contactosController.list
]);
app.get('/contactos/:contactosId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
contactosController.getById
]);
app.patch('/contactos/:contactosId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(FREE),
contactosController.patchById
]);
app.delete('/contactos/:contactosId', [
ValidationMiddleware.validJWTNeeded,
PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),

contactosController.removeById
]);
};
