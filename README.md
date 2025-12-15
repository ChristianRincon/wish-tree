# 🎄 Wish Tree - Página de Deseos Anónimos Navideños

Una Single Page Application (SPA) moderna construida con **Vite + Vanilla TypeScript** que permite compartir deseos navideños de forma anónima, almacenados en **Supabase**.

## ✨ Características

- ✍️ Modal para enviar deseos anónimos
- 💾 Almacenamiento en tiempo real con Supabase
- 🎨 Animaciones suaves y atractivas
- 📱 Diseño totalmente responsive
- 🔐 Completamente anónimo (sin autenticación)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/{tu-usuario}/wish-tree.git
cd wish-tree
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crear una cuenta en [Supabase](https://supabase.com)
2. Crear un nuevo proyecto
3. En el dashboard de Supabase, ir a "SQL Editor" y ejecutar:

```sql
-- Crear tabla de deseos
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INTEGER,
  country TEXT,
  wish_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Permitir inserciones públicas
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON wishes
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON wishes
FOR SELECT USING (true);
```

### 4. Copiar las credenciales:
   - Ir a Project Settings > Data API
   - Copiar `Project URL` y
   - Ir a Project Setting > API Keys
   - Copiar `anon public key`

### 5. Crear archivo `.env.local`:

```bash
cp .env.example .env.local
```

### 6. Completar las variables de entorno en `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

## 🏃 Ejecutar localmente

```bash
# Servidor de desarrollo
npm run dev

# Abrir http://localhost:5173 en el navegador
```

## 🔨 Construir para producción

```bash
npm run build

# Preview de la build
npm run preview
```

## 🔒 Privacidad

- ✅ Completamente anónimo
- ✅ No requiere login
- ✅ No se guardan IPs
- ✅ Los deseos son públicos por defecto (modifica RLS en Supabase si quieres cambiar esto)

## 🛠️ Tecnologías

- **Vite** - Build tool ultrarrápido
- **TypeScript** - Tipado estático
- **Supabase** - Backend as a Service
- **CSS3** - Animaciones y diseño responsive

## 📄 Licencia

MIT - Siéntete libre de usar este proyecto

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama con tu feature (`git checkout -b feature/{tu-feature}`)
3. Commit tus cambios (`git commit -m 'Add some {tu-feature}'`)
4. Push a la rama (`git push origin feature/{tu-feature}`)
5. Abre un Pull Request

---
<br>

Hecho con ❤️ y mucho espíritu navideño por [Christian Rincón](https://www.linkedin.com/in/christian-math%C3%ADas-rinc%C3%B3n-037a90297/)
