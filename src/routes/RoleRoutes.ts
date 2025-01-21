import { Router } from 'express';
import { RoleController } from 'src/application/controllers/RoleController';
import { RoleService } from 'src/application/services/RoleService';
import { dataSource } from 'src/config/database';
import { RoleRepositoryImpl } from 'src/infrastructure/repositories/RoleRepositoryImpl';

// Creamos instancias del servicio y el controlador
const roleRepository = new RoleRepositoryImpl(dataSource);
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

// Creamos una nueva instancia del Router
const roleRoutes = Router();

// Definimos las rutas para los roles

// Ruta para crear un nuevo rol
roleRoutes.post('/', (req, res) => roleController.createRole(req, res));

// Ruta para obtener todos los roles
roleRoutes.get('/', (req, res) => roleController.getAllRoles(req, res));

// Ruta para obtener un rol por su ID
roleRoutes.get('/:roleId', (req, res) => roleController.getRoleById(req, res));

// Ruta para actualizar un rol
roleRoutes.put('/:roleId', (req, res) => roleController.updateRole(req, res));

// Ruta para eliminar un rol
roleRoutes.delete('/:roleId', (req, res) => roleController.deleteRole(req, res));

export { roleRoutes };
