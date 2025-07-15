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

4. **Configura la URL del API** en `src/environments/environment.ts`:
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
- **AuthService**: Autenticación con Laravel Sanctum
- **DashboardService**: Estadísticas y métricas del dashboard

### Controladores Laravel Sugeridos

Ejemplos de controladores Laravel que funcionan perfectamente con este dashboard:

```php
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

## 🏗️ Estructura del Proyecto

```
dashboard_template/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizables
│   │   ├── layout/              # Layout principal del dashboard
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   ├── home/        # Página principal
│   │   │   │   ├── users/       # Gestión de usuarios
│   │   │   │   ├── reports/     # Reportes y estadísticas
│   │   │   │   └── settings/    # Configuración
│   │   │   └── auth/            # Autenticación
│   │   ├── services/            # Servicios de Angular
│   │   └── app.routes.ts        # Configuración de rutas
│   ├── assets/                  # Recursos estáticos
│   └── styles/                  # Estilos globales
├── tailwind.config.js           # Configuración de Tailwind
├── angular.json                 # Configuración de Angular
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
- `angular.json` - Configuración del workspace
- `tsconfig.json` - Configuración de TypeScript
- `src/app/app.config.ts` - Configuración de la aplicación

### TailwindCSS
La configuración de Tailwind está en `tailwind.config.js` con:
- Tema personalizado
- Colores del design system
- Animaciones personalizadas
- Sombras modernas

## 🌟 Características Destacadas

- **Template Listo**: Base sólida para cualquier proyecto administrativo
- **Fácil Personalización**: Estructura modular y bien organizada
- **Rendimiento**: Optimizado para carga rápida y navegación fluida
- **Accesibilidad**: Cumple con estándares WCAG
- **SEO**: Estructura optimizada para motores de búsqueda
- **Seguridad**: Implementación de mejores prácticas de seguridad
- **Mantenibilidad**: Código limpio y bien documentado
- **Escalabilidad**: Arquitectura preparada para crecimiento
- **UX/UI**: Diseño intuitivo y experiencia de usuario excepcional
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