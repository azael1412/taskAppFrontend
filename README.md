# TaskApp Frontend (React) Documentation

Este documento contiene la guía para ejecutar y probar el **frontend de TaskApp**, que interactúa con la **TaskApp API Laravel**.

## 1. **Instrucciones para la API (Backend)**

Antes de proceder con el frontend, debes asegurarte de que la **API de TaskApp** esté ejecutándose correctamente. Puedes obtenerla desde el siguiente repositorio y seguir las instrucciones de instalación y configuración:

- **Repositorio de la API**: [TaskApp API Laravel Repository](https://github.com/azael1412/taskAppApiLaravel)

### Pasos para la API:

1. **Clonar el repositorio de la API**:

   ```bash
   git clone https://github.com/azael1412/taskAppApiLaravel.git
   cd taskAppApiLaravel
   ```

2. **Instalar las dependencias de PHP**:

   ```bash
   composer install
   ```

3. **Configurar el archivo `.env`**:

   Copia el archivo `.env.example` a `.env` y actualiza las variables para la base de datos y correo.

   - **En Linux o MacOS**:

     ```bash
     cp .env.example .env
     ```

   - **En Windows**:

     ```bash
     copy .env.example .env
     ```

4. **Configurar la base de datos** en el archivo `.env`:

   Asegúrate de que los valores sean correctos para la conexión a tu base de datos MySQL.

   ```ini
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=taskApp
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Generar la clave de la aplicación**:

   ```bash
   php artisan key:generate
   ```

6. **Ejecutar las migraciones y poblar la base de datos**:

   ```bash
   php artisan migrate --seed
   ```

7. **Iniciar el servidor de desarrollo de la API**:

   Asegúrate de que el servidor de la API esté disponible en la dirección IP adecuada. Puedes iniciar el servidor utilizando la siguiente instrucción:

   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

   Esto hará que la API esté accesible a través de tu red local en `http://<tu-ip>:8000`, donde `<tu-ip>` es la dirección IP de tu máquina.

   Una vez que tengas la API funcionando correctamente, puedes proceder con el **frontend**.

---

## 2. **Instrucciones para el Frontend (React)**

### Requisitos

Antes de ejecutar el frontend, asegúrate de tener instalados los siguientes requisitos:

- **Node.js**: Se recomienda la versión `18.x.x` o superior. Puedes descargarla desde [Node.js Official Website](https://nodejs.org/).
- **npm**: Viene instalado con Node.js. Si ya tienes Node.js, también tendrás npm.
- **Vite**: La aplicación utiliza Vite como bundler para el frontend.

---

### Instalación de Dependencias

1. **Clonar el repositorio del Frontend**:

   Primero, clona el repositorio del frontend:

   ```bash
   git clone https://github.com/azael1412/taskAppFrontend.git
   cd taskAppFrontend
   ```

2. **Instalar las dependencias de JavaScript**:

   Ejecuta el siguiente comando para instalar todas las dependencias de JavaScript:

   ```bash
   npm install
   ```

---

### Configuración de Variables de Entorno

Este frontend utiliza el archivo `.env` para configurar varias variables que definen cómo se conectará con la API de TaskApp. Asegúrate de crear un archivo `.env` en la raíz del proyecto copiando `.env.example`:

- **En Linux o MacOS**:

  ```bash
  cp .env.example .env
  ```

- **En Windows**:

  Abre la terminal de **CMD** o **PowerShell** y ejecuta el siguiente comando:

  ```bash
  copy .env.example .env
  ```

Después, abre el archivo `.env` y actualiza las variables según sea necesario.

#### Variables de Entorno

Estas son las variables de entorno que puedes actualizar:

- **VITE_API_URL**: La URL de la API de TaskApp en Laravel, con la que se conectará el frontend. Cambia esta variable para apuntar a la dirección correcta de tu servidor de API.

  ```ini
  VITE_API_URL=http://192.168.1.7:8000
  ```

- **VITE_BRAND_NAME**: El nombre de la marca que se mostrará en la aplicación frontend.

  ```ini
  VITE_BRAND_NAME="Task App"
  ```

- **VITE_PUBLIC_URL**: La URL pública que se utiliza en el frontend. Generalmente es la raíz del proyecto. En caso de que tu frontend esté alojado en una subruta, actualiza esta variable.

  ```ini
  VITE_PUBLIC_URL="/"
  ```

- **VITE_THEME_COLOR**: El color de tema para la aplicación. Esto afectará a las partes visuales como la barra de título en dispositivos móviles.

  ```ini
  VITE_THEME_COLOR="#d32f2f"
  ```

- **VITE_LANG**: El idioma predeterminado de la aplicación. Actualmente, está configurado en español (`es`), pero puedes cambiarlo si necesitas otro idioma.

  ```ini
  VITE_LANG="es"
  ```

---

### Desarrollo

1. **Ejecutar la aplicación localmente**:

   Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar la aplicación frontend con el siguiente comando:

   ```bash
   npm run dev
   ```

   Esto iniciará el servidor de desarrollo localmente, generalmente en [http://localhost:5173](http://localhost:5173), donde podrás ver la interfaz del frontend y probar la conexión con la API de TaskApp.

---

### Conexión con la API de TaskApp

Este frontend se conecta a la API de TaskApp utilizando la URL configurada en la variable de entorno `VITE_API_URL`. Las solicitudes de datos se manejan mediante **Axios** y **React Query**.

La API de TaskApp, con la que este frontend interactúa, se encuentra en el siguiente repositorio: [TaskApp API Laravel Repository](https://github.com/azael1412/taskAppApiLaravel).

Asegúrate de revisar el repositorio de la API para obtener detalles adicionales sobre las rutas y la autenticación que necesitarás para interactuar con la API.

---

### Rutas de API y Funcionalidades

Este frontend interactúa con la API de TaskApp que fue documentada previamente en el repositorio: [TaskApp API Laravel Repository](https://github.com/azael1412/taskAppApiLaravel). Algunas de las rutas clave son:

- **Login**: Para obtener un JWT (JSON Web Token) para la autenticación, realiza una solicitud `POST` a la ruta `/auth/login`.

- **Tareas**: Para obtener, crear, actualizar o eliminar tareas, las rutas incluyen `/protected/tasks` (requiere autenticación).

- **Usuarios**: Si necesitas ver o modificar la información de los usuarios, puedes usar las rutas dentro de `/protected/users`.

Asegúrate de autenticarte utilizando el JWT proporcionado en el login y agregarlo en los encabezados de tus solicitudes para acceder a las rutas protegidas.

---

### Dependencias Importantes

A continuación se presentan las dependencias clave que el proyecto usa:

#### Dependencias Principales

- **@ckeditor/ckeditor5-build-classic** y **@ckeditor/ckeditor5-react**: Para integrar un editor de texto enriquecido.
- **@mui/material** y **@mui/icons-material**: Para componentes de Material UI.
- **axios**: Para realizar solicitudes HTTP a la API de TaskApp.
- **react-query**: Para manejar el estado de las solicitudes y el cache.
- **react-redux** y **@reduxjs/toolkit**: Para manejar el estado global de la aplicación.
- **yup** y **react-hook-form**: Para la validación de formularios.

#### Dependencias de Desarrollo

- **vite**: Para la construcción rápida del frontend.
- **typescript**: Para el soporte de TypeScript en el proyecto.
- **eslint**: Para la configuración de la linting en el código.

---

## Actualización de Variables de Entorno

Puedes personalizar el comportamiento del frontend actualizando las siguientes variables de entorno en el archivo `.env`:

```ini
VITE_API_URL=http://192.168.1.7:8000
VITE_BRAND_NAME="Task App"
VITE_PUBLIC_URL="/"
VITE_THEME_COLOR="#d32f2f"
VITE_LANG="es"
```

Estas variables se utilizan a lo largo de la aplicación para configurar la conexión con la API, el nombre de la marca, el idioma de la interfaz y otros aspectos visuales.

---

### Repositorio de la API

Puedes acceder al repositorio de la API de **TaskApp** en Laravel en el siguiente enlace: [TaskApp API Laravel Repository](https://github.com/azael1412/taskAppApiLaravel).

---