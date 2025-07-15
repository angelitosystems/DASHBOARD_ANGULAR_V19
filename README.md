# Dashboard Template 🚀

Un template de dashboard moderno y responsivo desarrollado con **Angular 19** y **Tailwind CSS v3** para desarrolladores que buscan una base sólida para sus proyectos administrativos. **Específicamente orientado para integrarse con Laravel como backend**.

## ✨ Características Principales

- **Angular 19**: La última versión del framework con las mejores prácticas
- **Tailwind CSS v3**: Diseño moderno y totalmente personalizable
- **Tema Oscuro/Claro**: Cambio dinámico entre temas
- **Spartan-NG Helm**: Componentes UI de alta calidad
- **Lucide Icons**: Iconografía moderna y consistente
- **Responsive Design**: Optimizado para todos los dispositivos
- **Animaciones Fluidas**: Transiciones suaves y profesionales
- **Template Genérico**: Fácil de personalizar para cualquier tipo de proyecto
- **🔗 Laravel Ready**: Preparado para conectar con APIs de Laravel

## 🎯 Funcionalidades

### Dashboard Principal
- Vista general con métricas clave
- Gráficos interactivos y estadísticas
- Navegación intuitiva

### Gestión de Usuarios
- Lista completa de usuarios del sistema
- Filtros por rol y estado
- Búsqueda en tiempo real
- Información detallada (email, departamento, último login)
- Paginación eficiente

### Reportes Avanzados
- Distribución de usuarios por departamento
- Análisis de actividad del sistema
- Métricas de rendimiento
- Estadísticas de uso
- Actividad reciente del sistema

### Configuración
- Gestión de preferencias de usuario
- Configuración de tema
- Opciones de personalización

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Frontend**: Angular 19, TypeScript
- **Estilos**: Tailwind CSS v3
- **Componentes**: Spartan-NG Helm
- **Iconos**: Lucide Icons
- **Build Tool**: Angular CLI
- **Package Manager**: npm
- **Template**: Listo para personalizar

### Backend Recomendado
- **Laravel**: Framework PHP para APIs REST
- **MySQL/PostgreSQL**: Base de datos
- **Laravel Sanctum**: Autenticación API

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Angular CLI

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd dashboard_countries
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   # o
   ng serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 🔗 Integración con Laravel

Este dashboard está diseñado para trabajar con Laravel como backend. Para una integración completa:

### Configuración del Backend Laravel

1. **Instala Laravel**:
```bash
composer create-project laravel/laravel dashboard-api
cd dashboard-api
```

2. **Configura CORS** en `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:4200'],
```

3. **Crea las rutas API** en `routes/api.php`:
```php
Route::prefix('v1')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/reports', [ReportController::class, 'index']);
    Route::get('/dashboard-stats', [DashboardController::class, 'stats']);
});
```

4. **Instala Laravel Sanctum** para autenticación:
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

5. **Configura Sanctum** en `config/sanctum.php`:
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:4200')),
```

6. **Configura la URL del API** en `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api/v1'
};
```

### Servicios Angular Preparados para Laravel

El dashboard incluye servicios Angular optimizados para trabajar con Laravel:

- **UserService**: Gestión de usuarios con endpoints CRUD
- **ReportService**: Generación y consulta de reportes
- **AuthService**: Autenticación completa con Laravel Sanctum, manejo de CSRF, login, registro y logout
- **DashboardService**: Estadísticas y métricas del dashboard
- **HTTP Interceptor**: Configuración automática de headers, tokens CSRF y manejo de rutas Sanctum para Laravel
- **AuthGuard**: Protección de rutas autenticadas con redirección automática
- **GuestGuard**: Prevención de acceso a rutas de autenticación para usuarios ya logueados

### Controladores Laravel Sugeridos

Ejemplos de controladores Laravel que funcionan perfectamente con este dashboard:

```php
// app/Http/Controllers/Api/AuthController.php
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer'
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'])
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }
}

// app/Http/Controllers/Api/UserController.php
class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::paginate(10),
            'stats' => [
                'total' => User::count(),
                'active' => User::where('active', true)->count(),
                'new_today' => User::whereDate('created_at', today())->count()
            ]
        ]);
    }
}

// app/Http/Controllers/Api/DashboardController.php
class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'users' => User::count(),
            'active_users' => User::where('active', true)->count(),
            'departments' => Department::count(),
            'recent_activity' => Activity::latest()->take(5)->get()
        ]);
    }
}
```

### Características de Autenticación Implementadas

✅ **Token CSRF Automático**: El interceptor obtiene automáticamente el token CSRF de Laravel Sanctum desde múltiples fuentes (meta tag, cookie XSRF-TOKEN, localStorage)

✅ **Autenticación Stateful**: Soporte completo para cookies de sesión de Laravel con configuración automática de credenciales

✅ **Manejo de Errores**: Gestión automática de errores de autenticación con redirección inteligente

✅ **Headers Automáticos**: Configuración automática de headers necesarios para Laravel (Accept, Content-Type, X-Requested-With)

✅ **Rutas Protegidas**: Sistema de guards completo con `authGuard` para rutas autenticadas y `guestGuard` para rutas públicas

✅ **Persistencia de Sesión**: Mantenimiento de sesión entre recargas de página con recuperación automática de datos de usuario

✅ **Redirección Inteligente**: Sistema de `returnUrl` para redirigir usuarios a la página solicitada después del login

✅ **Fetch API Support**: Configuración con `withFetch()` para soporte completo de opciones HTTP modernas

✅ **Logout Completo**: Funcionalidad de logout integrada en el layout con limpieza de sesión y redirección

✅ **Información de Usuario Dinámica**: Visualización automática de datos del usuario autenticado en el dashboard

## 🆕 Últimas Actualizaciones y Mejoras

### Sistema de Autenticación Robusto
- **AuthService Mejorado**: Integración completa con Laravel Sanctum incluyendo obtención automática de tokens CSRF
- **Guards Implementados**: 
  - `authGuard`: Protege rutas del dashboard y redirige a login si no está autenticado
  - `guestGuard`: Previene acceso a login/registro si ya está autenticado
- **Interceptor HTTP Avanzado**: Manejo inteligente de rutas Sanctum y configuración automática de headers
- **Redirección Inteligente**: Sistema `returnUrl` que redirige al usuario a la página solicitada después del login

### Configuración de Entornos
- **Separación de Entornos**: Configuración completa para desarrollo y producción
- **FileReplacements**: Configuración automática en `angular.json` para reemplazo de archivos de entorno
- **URLs de API**: Configuración correcta para `http://localhost:8000/api/v1` en ambos entornos

### Mejoras en el Frontend
- **Fetch API**: Habilitado `withFetch()` en `app.config.ts` para soporte completo de opciones HTTP modernas
- **Layout Dinámico**: Dashboard layout actualizado con información de usuario en tiempo real
- **Logout Funcional**: Implementación completa de logout con limpieza de sesión
- **Manejo de Estados**: Visualización de estados de carga y manejo de errores mejorado

### Archivos Principales Actualizados
- `src/app/common/guards/auth-guard.ts` - Guard de autenticación
- `src/app/common/guards/guest-guard.ts` - Guard para usuarios no autenticados
- `src/app/common/interceptors/backend-interceptor.ts` - Interceptor HTTP mejorado
- `src/app/services/auth.service.ts` - Servicio de autenticación completo
- `src/app/pages/auth/login.ts` - Login con redirección inteligente
- `src/app/pages/auth/register.ts` - Registro integrado con AuthService
- `src/app/layout/dashboard-layout.ts` - Layout con logout y usuario dinámico
- `src/app/app.config.ts` - Configuración con Fetch API
- `src/app/app.routes.ts` - Rutas protegidas con guards
- `src/app/auth.routes.ts` - Rutas de autenticación con guest guard
- `src/environments/environment.ts` - Configuración de producción
- `src/environments/environment.development.ts` - Configuración de desarrollo
- `angular.json` - Configuración de builds con fileReplacements

## 🏗️ Estructura del Proyecto

```
dashboard_template/
├── src/
│   ├── app/
│   │   ├── common/
│   │   │   ├── guards/          # Guards de autenticación
│   │   │   │   ├── auth-guard.ts    # Protección rutas autenticadas
│   │   │   │   └── guest-guard.ts   # Protección rutas públicas
│   │   │   └── interceptors/    # Interceptores HTTP
│   │   │       └── backend-interceptor.ts # Configuración Laravel
│   │   ├── components/          # Componentes reutilizables
│   │   ├── layout/              # Layout principal del dashboard
│   │   │   └── dashboard-layout/ # Layout con logout y usuario dinámico
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   ├── home/        # Página principal
│   │   │   │   ├── users/       # Gestión de usuarios
│   │   │   │   ├── reports/     # Reportes y estadísticas
│   │   │   │   └── settings/    # Configuración
│   │   │   └── auth/            # Autenticación con login/registro
│   │   ├── services/            # Servicios de Angular
│   │   │   └── auth.service.ts  # Servicio de autenticación completo
│   │   ├── app.config.ts        # Configuración con withFetch()
│   │   ├── app.routes.ts        # Rutas con guards aplicados
│   │   └── auth.routes.ts       # Rutas de autenticación
│   ├── environments/            # Configuración de entornos
│   │   ├── environment.ts       # Producción
│   │   └── environment.development.ts # Desarrollo
│   ├── assets/                  # Recursos estáticos
│   └── styles/                  # Estilos globales
├── tailwind.config.js           # Configuración de Tailwind
├── angular.json                 # Configuración con fileReplacements
└── package.json                 # Dependencias del proyecto
```

## 🎨 Personalización

### Temas
El dashboard incluye soporte completo para temas oscuro y claro:

```typescript
// Cambiar tema programáticamente
themeService.toggleTheme();
```

### Colores
Personaliza los colores en `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Tus colores personalizados
        }
      }
    }
  }
}
```

### Adaptación del Template
1. **Modifica los datos mock** en los componentes para tu dominio específico
2. **Personaliza las rutas** en `app.routes.ts`
3. **Ajusta el menú** en `dashboard-layout.ts`
4. **Cambia los iconos** según tu necesidad
5. **Adapta los formularios** y tablas a tu modelo de datos

### Componentes
Todos los componentes están construidos con Spartan-NG Helm y son completamente personalizables.

## 📱 Responsive Design

El dashboard está completamente optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm start                    # Servidor de desarrollo
npm run watch               # Build en modo watch

# Producción
npm run build               # Build para producción

# Testing
npm test                    # Ejecutar tests

# Angular CLI
ng generate component <name> # Generar componente
ng generate service <name>   # Generar servicio
```

## 🔧 Configuración

### Angular
La configuración principal se encuentra en:
- `angular.json` - Configuración del workspace con fileReplacements para entornos
- `tsconfig.json` - Configuración de TypeScript
- `src/app/app.config.ts` - Configuración de la aplicación con `withFetch()` habilitado
- `src/environments/` - Configuración de entornos (desarrollo y producción)

### Entornos
Configuración automática de entornos:
- **Desarrollo**: `environment.development.ts` con `apiUrl: 'http://localhost:8000/api/v1'`
- **Producción**: `environment.ts` con configuración optimizada
- **Build**: `angular.json` configurado con `fileReplacements` automáticos

### TailwindCSS
La configuración de Tailwind está en `tailwind.config.js` con:
- Tema personalizado
- Colores del design system
- Animaciones personalizadas
- Sombras modernas

### Autenticación
Configuración completa de autenticación:
- **Guards**: Protección automática de rutas
- **Interceptors**: Manejo automático de headers y CSRF
- **Services**: Integración completa con Laravel Sanctum
- **Redirects**: Sistema inteligente de redirecciones

## 🌟 Características Destacadas

- **Template Listo**: Base sólida para cualquier proyecto administrativo
- **Autenticación Completa**: Sistema robusto con Laravel Sanctum, guards y redirects inteligentes
- **Fácil Personalización**: Estructura modular y bien organizada
- **Rendimiento**: Optimizado para carga rápida y navegación fluida con Fetch API
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO**: Estructura optimizada para motores de búsqueda
- **Seguridad**: Implementación de mejores prácticas de seguridad con CSRF y guards
- **Mantenibilidad**: Código limpio y bien documentado
- **Escalabilidad**: Arquitectura preparada para crecimiento
- **UX/UI**: Diseño intuitivo y experiencia de usuario excepcional
- **Entornos**: Configuración automática para desarrollo y producción
- **Laravel Ready**: Integración perfecta con Laravel y Sanctum
- **Documentación**: Guías claras para personalización

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

**Copyright (c) 2025 Angelito Systems**

## 💝 Donaciones y Atribución

Este proyecto es completamente **gratuito y de código abierto**. Sin embargo, si encuentras útil este software:

- **💰 Donaciones**: Se agradecen las donaciones para apoyar el desarrollo continuo del proyecto
- **🏷️ Atribución**: Se recomienda encarecidamente incluir una atribución a "**Angelito Systems**" en tu proyecto si utilizas este código

¡Tu apoyo nos ayuda a seguir creando herramientas útiles para la comunidad!

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
- Crea un issue en el repositorio
- Revisa la documentación de Angular
- Consulta la documentación de TailwindCSS

---

**Desarrollado con ❤️ usando Angular 19 y TailwindCSS v3**

*Este dashboard sirve como plantilla base para proyectos que requieran una interfaz moderna y funcional para la gestión de datos geográficos.*