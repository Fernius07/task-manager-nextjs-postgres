# Professional Task Manager | Full-Stack Next.js 14

Este proyecto es un gestor de tareas profesional diseñado con un enfoque en la experiencia de usuario (UX) y una arquitectura técnica sólida. Representa una solución completa que integra autenticación segura, operaciones CRUD en tiempo real y una interfaz moderna optimizada para desarrolladores.

## 🚀 Características Principales

- **Dashboard Privado**: Gestión de tareas con estados dinámicos (Pendiente, En Progreso, Completado).
- **Autenticación Segura**: Sistema de registro y login implementado con JWT (JSON Web Tokens) gestionados mediante cookies `httpOnly`, garantizando seguridad frente a ataques XSS.
- **Arquitectura Full-Stack**: Construido íntegramente con el **App Router de Next.js 14**, aprovechando Server Components para un rendimiento óptimo.
- **Persistencia de Datos**: Integración con **PostgreSQL** a través de **Prisma ORM**, con un diseño de esquema relacional eficiente entre usuarios y tareas.
- **Diseño Moderno**: Interfaz responsive con modo oscuro profundo, utilizando Tailwind CSS para una estética limpia y profesional.

## 🛠️ Stack Tecnológico

- **Frontend**: React 18, Next.js 14, Tailwind CSS.
- **Backend**: Route Handlers (API) de Next.js, Middleware para protección de rutas.
- **Base de Datos**: PostgreSQL.
- **ORM**: Prisma.
- **Seguridad**: JWT (jose), Bcryptjs para el hashing de contraseñas.

---

## 🏗️ Cómo ejecutar este proyecto localmente

Para probar esta aplicación en tu entorno local, sigue estos pasos:

### 1. Clonar y preparar dependencias
```bash
git clone https://github.com/Fernius07/task-manager-nextjs-postgres.git
cd task-manager-nextjs-postgres
npm install
```

### 2. Configuración de entorno
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
```env
DATABASE_URL="tu_url_de_postgresql"
JWT_SECRET="una_clave_secreta_para_tus_tokens"
```

### 3. Preparar la Base de Datos
Genera el cliente de Prisma y sincroniza el esquema con tu base de datos:
```bash
npx prisma generate
npx prisma db push
```

### 4. Lanzar la aplicación
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## 🔍 Detalles Técnicos de Interés (Portfolio)

- **Middleware Auth**: He implementado un middleware de Next.js que intercepta las peticiones a la ruta `/dashboard`, verificando el JWT antes de permitir el renderizado de la página, evitando destellos de contenido no autorizado.
- **Separación de Capas**: El código mantiene una separación clara entre la lógica de negocio en la API y los componentes de UI, facilitando el mantenimiento y la escalabilidad.
- **UX**: Gestión de estados de carga (skeletons/spinners) y notificaciones en tiempo real con `react-hot-toast` para un feedback inmediato al usuario.

---
*Desarrollado con enfoque en rendimiento y seguridad por **Iñigo Fernández García**.*
