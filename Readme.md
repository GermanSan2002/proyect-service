# Proyecto: Proyect-Service

Proyect-Service es un microservicio desarrollado en TypeScript que tiene como objetivo gestionar proyectos y sus elementos relacionados, incluyendo estados, roles, miembros y geolocalización.

---

## **Características Principales**

### **Gestión de Proyectos**
- CRUD de proyectos con los siguientes atributos:
  - Identificador del proyecto.
  - Nombre del proyecto.
  - Fechas de inicio y finalización.
  - Descripción.
  - Puntos de interés (geolocalizaciones).

### **Estados del Proyecto**
- Gestión de estados asociados a proyectos con atributos como:
  - Identificador del estado.
  - Comentarios.
  - Fotos.
  - Geolocalización.
  - Usuario que registra el estado.

### **Roles en el Proyecto**
- Gestión de roles que definen funciones específicas dentro del proyecto.

### **Miembros del Proyecto**
- Gestión de usuarios asignados a proyectos con roles específicos.

---

## **Estructura del Proyecto**

```
src/
├── config/               # Configuración del entorno y base de datos
├── domain/               # Lógica de dominio
│   ├── entities/         # Entidades principales
│   ├── interfaces/       # Interfaces para los repositorios
├── infrastructure/       # Implementaciones técnicas
│   ├── repositories/     # Implementaciones de los repositorios
│   ├── services/         # Servicios de infraestructura (p.ej. API de OpenCage)
├── application/          # Servicios de aplicación
│   ├── services/         # Lógica de negocio principal
│   ├── controllers/      # Controladores para las APIs
├── routes/               # Rutas definidas para los recursos
├── shared/               # Componentes compartidos (utilidades, middlewares)
├── main.ts               # Punto de entrada principal
```

---

## **Requisitos Previos**

1. **Node.js** (v16 o superior).
2. **Docker** (opcional, para ejecutar en contenedores).
3. **PostgreSQL** (como base de datos relacional).
4. **API Key para Open Cage**:
   - Debes configurar la variable de entorno `API_GEOLOCALIZATION_KEY` con la llave para acceder a la API de OpenCage.

---

## **Configuración del Entorno**

1. Clona este repositorio:
   ```bash
   git clone https://github.com/GermanSan2002/proyect-service.git
   cd proyect-service
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en el archivo de ejemplo proporcionado:
   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_user
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=proyect_service
   API_GEOLOCALIZATION_KEY=your_opencage_api_key
   ```

4. Ejecuta las migraciones para configurar la base de datos:
   ```bash
   npm run typeorm migration:run
   ```

---

## **Ejecutar el Proyecto**

### Localmente

Inicia el servidor en desarrollo:
```bash
npm run start:dev
```

### Usando Docker

Construye la imagen y levanta el contenedor:
```bash
docker-compose up --build
```

---

## **Endpoints Disponibles**

### **Proyectos**
- **GET /projects**: Obtiene todos los proyectos.
- **GET /projects/:id**: Obtiene un proyecto por su ID.
- **POST /projects**: Crea un nuevo proyecto.
- **PUT /projects/:id**: Actualiza un proyecto existente.
- **DELETE /projects/:id**: Elimina un proyecto.

### **Estados**
- **GET /states**: Obtiene todos los estados.
- **GET /states/:id**: Obtiene un estado por su ID.
- **POST /states**: Crea un nuevo estado.
- **PUT /states/:id**: Actualiza un estado existente.
- **DELETE /states/:id**: Elimina un estado.

### **Roles**
- **GET /roles**: Obtiene todos los roles.
- **GET /roles/:id**: Obtiene un rol por su ID.
- **POST /roles**: Crea un nuevo rol.
- **PUT /roles/:id**: Actualiza un rol existente.
- **DELETE /roles/:id**: Elimina un rol.

### **Miembros**
- **GET /members**: Obtiene todos los miembros.
- **GET /members/:id**: Obtiene un miembro por su ID.
- **POST /members**: Crea un nuevo miembro.
- **PUT /members/:id**: Actualiza un miembro existente.
- **DELETE /members/:id**: Elimina un miembro.

---

## **Puntos de Extensión y Mejora**

1. **Pruebas**:
   - Agregar pruebas unitarias y de integración con herramientas como Jest.

---

## **Contribuir**

1. Haz un fork del repositorio.
2. Crea una rama con la nueva funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y crea un commit:
   ```bash
   git commit -m 'Agrega nueva funcionalidad'
   ```
4. Sube tus cambios al repositorio:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request.

---

## **Licencia**
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
