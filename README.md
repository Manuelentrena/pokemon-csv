<p align="center"><img src="https://i.gifer.com/EkFh.gif" width="200" alt="Next Movies Logo"></p>

<p align="center">
<a href="https://github.com/Manuelentrena/pokemon-csv/actions"><img src="https://github.com/Manuelentrena/pokemon-csv/actions/workflows/deploy.yml/badge.svg" alt="Build Status"></a>
<a href="https://app.codecov.io/gh/Manuelentrena/pokemon-csv"><img src="https://img.shields.io/codecov/c/github/Manuelentrena/pokemon-csv" alt="Test Coverage"></a>
</p>

# Pokémon CSV API

Este proyecto es una API desarrollada con **NestJS** que permite consultar información de Pokémon desde la PokéAPI y generar archivos CSV personalizados. Puedes filtrar Pokémon por color, buscar por nombre y descargar un CSV con sus datos principales. El proyecto está preparado para ejecutarse en entornos Docker y pensado para ser escalable en clúster.

---

## Descripción general

Esta API expone endpoints para:

- **Buscar Pokémon por nombre** (ignorando mayúsculas/minúsculas y espacios).
- **Obtener todos los nombres de Pokémon.**
- **Descargar un archivo CSV** con los Pokémon de un color específico, ordenados por experiencia base.
- **Gestionar errores y reportar Pokémon no encontrados** durante las búsquedas o generación de CSV.
- **Cachear resultados en Redis** para mejorar el rendimiento de las consultas.

La aplicación realiza llamadas a la [PokéAPI](https://pokeapi.co/api/v2/) como fuente de datos externa.

---

## Tecnologías usadas

- **Node.js** (v20)
- **NestJS** (Framework principal)
- **TypeScript**
- **PokéAPI** (fuente de datos externa)
- **Redis** (cache de resultados)
- **Docker** y **Docker Compose** (para desarrollo y despliegue)
- **ESLint** + **Prettier** (calidad y formato de código)
- **Swagger** (documentación interactiva de la API)

---

## Características principales

- **Búsqueda flexible por nombre:**  
  Permite buscar Pokémon por nombre, ignorando mayúsculas, minúsculas y espacios.
- **Listado de Pokémon por color:**  
  Permite obtener y descargar un CSV de todos los Pokémon de un color específico, ordenados por experiencia base.
- **Gestión de errores:**  
  Informa de los Pokémon no encontrados durante las búsquedas o generación de CSV.
- **Generación de archivos CSV** con los campos:  
  `name;base_experience;height;weight`
- **Preparado para clúster y Docker:**  
  Listo para ejecutarse en contenedores y entornos escalables.
- **Cache con Redis:**  
  Los resultados de las búsquedas y listados se almacenan en Redis para acelerar futuras consultas.
- **Documentación interactiva con Swagger:**  
  Accesible en `/api`.

---

## Endpoints principales

### Buscar Pokémon por nombre

**POST** `/pokemon/findByName`

**Body de ejemplo:**

```json
{
  "name": "Pikachu"
}
```

**Respuesta de ejemplo:**

```json
{
  "count": 2,
  "results": [
    {
      "base_experience": 112,
      "name": "pikachu",
      "height": 4,
      "weight": 60
    }
  ],
  "errors": [
    // Nombres no encontrados (si los hay)
  ]
}
```

---

### Descargar CSV de Pokémon por color

**GET** `/pokemon/csv/:color`

Devuelve un archivo CSV descargable con todos los Pokémon del color especificado, ordenados por experiencia base.

**Ejemplo de CSV:**

```
Pokemons of color yellow

Failed pokemons: meloetta, missingno

name;base_experience;height;weight
pikachu;112;4;60
psyduck;64;8;196
...
```

---

### Obtener todos los nombres de Pokémon

**GET** `/pokemon/getAllNames`

Devuelve un listado de todos los nombres de Pokémon disponibles en la PokéAPI.

---

## Cache con Redis

La API utiliza **Redis** como sistema de cache para acelerar las respuestas de los endpoints más consultados.

### Instrucciones para usar Redis

- Redis se levanta automáticamente con Docker Compose.
- Puedes inspeccionar las keys almacenadas en Redis accediendo al contenedor:

```sh
docker exec -it pokemon-csv-redis redis-cli
```

- Para ver todas las keys almacenadas:

```sh
KEYS *
```

- Para ver el contenido de una key específica (por ejemplo, `pokemon:color:yellow`):

```sh
GET pokemon:color:yellow
```

---

## Test de CSV

Existen tests **end-to-end** que comprueba que el endpoint `/pokemon/csv/:color` devuelve exactamente el CSV esperado.

### Ejecutar el test e2e

1. Asegúrate de tener Redis y la app levantados (puedes usar Docker Compose).
2. Ejecuta el test con:

```sh
npm run test:e2e
```

El test compara la respuesta del endpoint con un archivo CSV de ejemplo y falla si hay diferencias.

---

## Documentación de la API

La API está documentada con **Swagger** y puedes acceder a la documentación interactiva en:

[http://localhost:3000/api](http://localhost:3000/api)

Desde ahí puedes probar los endpoints y ver los modelos de datos.

---

## Estructura de carpetas relevante

- `src/pokemon/domain/` — Entidades y enums de dominio.
- `src/pokemon/application/` — Casos de uso y servicios de aplicación.
- `src/pokemon/infrastructure/` — Repositorios y acceso a PokéAPI.
- `src/pokemon/interfaces/` — Controladores y DTOs.
- `docker/` — Dockerfiles para desarrollo y producción.
- `common/utils/` — Utilidades compartidas (ej: manejo seguro de promesas).

---

## Arrancar el proyecto con Docker

1. **Clona el repositorio**

   ```sh
   git clone <url-del-repo>
   cd pokemon-csv
   ```

2. **Arranca el entorno de desarrollo con Docker Compose**

   ```sh
   docker compose -f docker-compose.dev.yml up --build
   ```

3. **Accede a la API**  
   La API estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Notas

- El entorno de desarrollo usa hot-reload gracias a `npm run start:dev`.
- Los cambios en el código fuente se reflejan automáticamente en el contenedor.
- Puedes personalizar los puertos y variables de entorno en el archivo `docker-compose.dev.yml`.
- El proyecto está preparado para ejecutarse en clústeres Docker/Kubernetes.

---

## Integración continua y despliegue (CI/CD)

Este proyecto utiliza **GitHub Actions** para automatizar:

- Linting del código (`npm run lint`)
- Tests end-to-end (`npm run test:e2e`)
- Generación de cobertura de tests (`npm run test:cov`)
- Build y push de la imagen Docker a GHCR
- Creación automática de releases en GitHub con changelog

El pipeline se ejecuta automáticamente al hacer push de un tag (`v*`).  
Puedes ver el estado de los workflows en la pestaña **Actions** del repositorio.

---

## Imagen Docker pública

Cada vez que se crea un tag de versión (`v*`), se construye y publica automáticamente una imagen Docker en [GitHub Container Registry (GHCR)](https://github.com/users/manuelentrena/packages/container/package/pokemon-csv).

Puedes usar la imagen con:

```sh
docker pull ghcr.io/manuelentrena/pokemon-csv:<version>
```

## Cobertura de tests

[![codecov](https://codecov.io/gh/manuelentrena/pokemon-csv/branch/main/graph/badge.svg)](https://codecov.io/gh/manuelentrena/pokemon-csv)

La cobertura de tests se genera automáticamente y se puede consultar en [Codecov](https://codecov.io/gh/manuelentrena/pokemon-csv).

---

¿Quieres un ejemplo de cómo quedaría todo junto en tu README? ¡Pídelo!
