# logicerp-website

Sitio web de **LogicERP v3**, el ERP de TSI Dominicana. HTML y CSS estáticos, sin
build ni dependencias de Node.

**Publicado en GitHub Pages:** https://tsidominicana.github.io/logicerp-website/

## Estructura

```
index.html            La landing, una sola página
site.css              Composición de la landing
site.js               Animaciones al entrar en pantalla (cifras, checks, SLA)
modulos/ftm.html      Página del módulo FTM · Facturación de Mercancías
modulos/modulo.css    Composición de las páginas de módulo
styles.css            Punto de entrada del sistema de diseño (sólo @import)
tokens/*.css          Color, tipografía, espaciado, bordes, sombras, motion
fonts/                Candara (woff) — cara de display del producto
assets/logos/         Logo de TSI Dominicana y marca DGII
assets/splash/        Splash de módulo del sistema
assets/screenshots/   Capturas de ventanas y documentos impresos
assets/icons/modules/ Iconos de módulo
```

Todas las rutas son **relativas**, por lo que el sitio funciona igual servido
desde la raíz de un dominio que desde el subpath `/logicerp-website/` de Pages.

Depende de internet para dos recursos externos: Bootstrap Icons (jsDelivr) y la
familia Archivo (Google Fonts).

## De dónde sale

Este repo es el **destino de publicación**, no la fuente. El sitio se genera en
`export/logicerp-web/` dentro del sistema de diseño (repo privado
`tsidominicana/logicerp_design-system`) y se copia aquí.

Para actualizarlo: regenerar el export en el DS y copiar su contenido a la raíz
de este repo.

## Capturas

Las capturas de `assets/screenshots/` llevan **datos de ejemplo**, no reales:
clientes, importes, NCF y nombres de usuario son placeholders. Está previsto
regenerarlas desde el ERP con una empresa ficticia.

> Este repo es público. No subir aquí capturas ni documentos con datos reales de
> clientes, importes de facturación o secuencias fiscales.

## Desarrollo local

No hace falta servidor; basta abrir `index.html` en el navegador. Para evitar
diferencias con Pages:

```sh
python -m http.server 8000
```
