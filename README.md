# Rick and Morty Favorites App

## Descripción

Esta aplicación permite a los usuarios ver personajes de la serie "Rick and Morty" y añadirlos a sus favoritos. Los usuarios pueden registrarse, iniciar sesión y gestionar sus personajes favoritos. La aplicación está construida con Node.js (Express) y PostgreSQL en el backend, y React en el frontend.

## Funcionalidades

- **Registro e Inicio de Sesión**: Los usuarios pueden registrarse e iniciar sesión.
- **Visualización de Personajes**: Todos los usuarios pueden ver los personajes de Rick and Morty.
- **Gestión de Favoritos**: Los usuarios autenticados pueden añadir personajes a su lista de favoritos.
- **Autenticación**: El token de autenticación se guarda en las cookies y Las contraseñas de los usuarios se almacenan de forma segura utilizando hashing.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/patriciogagietta/spa-rick-and-morty.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd spa-rick-and-morty
    ```
3. Instala las dependencias del backend:
    ```bash
    cd backend
    npm install
    ```
4. Instala las dependencias del frontend:
    ```bash
    cd ../frontend
    npm install
    ```

## Uso

1. Inicia el servidor backend:
    ```bash
    cd backend
    npm run dev
    ```
2. Inicia el servidor frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```
