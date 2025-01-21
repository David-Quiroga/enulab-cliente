<template>
    <div class="sidebar">
        <div class="logo">
            <img src="../../assets/logo.png" alt="Logo" />
        </div>
        <ul class="menu">
            <li><router-link to="/carta">Inicio</router-link></li>
            <li><router-link to="/carta">Menu</router-link></li>
            <li><router-link to="/reservaciones">Reservaciones-test</router-link></li>
            <li><router-link to="/comentarios">Comentarios</router-link></li>
            <li><router-link to="/test">test-2</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SidebarView",
    };
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0;
}

.logo img {
  width: 120px;
  margin-bottom: 110px;
}

.menu {
  list-style: none;
  padding: 0;
  width: 100%;
}

.menu li {
  text-align: center;
  margin: 10px 0;
}

.menu li a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  display: inline-block; /* Mantener inline-block para control del enlace */
  transition: color 0.3s ease; /* Suaviza el cambio de color */
}

.menu li a:hover {
  color: #0085FF; /* Cambiar el color del texto al pasar el mouse */
}
</style>


