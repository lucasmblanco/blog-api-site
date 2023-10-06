[:es:](#projecto-blog) [:us:](#project-blog)
# Projecto: Blog
**Este proyecto consta de 3 partes diferentes, podes encontrarlas acá:**

 -  [Blog API](https://github.com/lucasmblanco/blog-api-be)
 - [ Admin Dashboard](https://github.com/lucasmblanco/blog-api-admin-dashboard)
 - [Blog](https://github.com/lucasmblanco/blog-api-site)

Este proyecto se encarda de utlizar la API Blog para poder mostrar los post que hay dentro de una base de datos. También permite la creación de usuarios para brindarles la posibilidad de dejar likes y comentarios en los posts y tambien en otros comentarios

## Tecnologías utilizadas 📚
![Tools](https://skillicons.dev/icons?i=ts,react,astro,tailwindcss)

## Principales características ⭐
 - Nos permite visualizar los post que estan marcadas dentro de la base de datos como visibles.
 - Los usuarios pueden crear comentarios y likes dentro de los posteos como también dentro de los comentarios que existen en estos mismos.
 - Los usuarios pueden eliminar sus propios comentarios.  
## Conclusión 🙌
Elegí Astro como framework ya que consideré que lo mejor era que la página utilice SSR como patrón de renderizado ya que la principal función de la aplicación era visualizar correctamente los posteos. Los componentes que estan relacionados a la visualización y la creación de nuevos comentarios utlizan el patrón CSR ya que los usuarios tienen que interactuar con estos mismos, y de esta forma podia reflejar los cambios que se producian con el mejor rendimiento posible.

Nuevamente utilizo localStorage para visualizar el estado de logueo en algunos componentes. 
<br/> 
***
<br/>


# Project: Blog

**This project consists of 3 different parts, you can find them here:**

-   [Blog API](https://github.com/lucasmblanco/blog-api-be)
-   [Admin Dashboard](https://github.com/lucasmblanco/blog-api-admin-dashboard)
-   [Blog](https://github.com/lucasmblanco/blog-api-site)

This project uses the Blog API to display the posts stored in a database. It also allows the creation of users to enable them to leave likes and comments on the posts and also on other comments.

## Technologies Used 📚

![Tools](https://skillicons.dev/icons?i=ts,react,astro,tailwindcss)

## Key Features ⭐

-   It allows us to view the posts that are marked as visible in the database.
-   Users can create comments and likes within the posts as well as within the comments that exist within these posts.
-   Users can delete their own comments.

## Conclusion 🙌

I chose Astro as the framework because I considered it best for the page to use SSR (Server-Side Rendering) as the rendering pattern, as the primary function of the application was to correctly display the posts. The components related to viewing and creating new comments use the CSR (Client-Side Rendering) pattern, as users need to interact with them, and this way I could reflect the changes that occurred with the best performance possible.

Once again, I use localStorage to track the login status on some components.
