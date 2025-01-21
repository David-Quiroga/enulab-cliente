<template>
    <SideBarView />
    <div class="main-content">
      <!-- Formulario de Valoración -->
      <div class="rating-form">
        <h2>Formulario de Valoración</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Estrellas -->
          <div class="stars">
            <label for="rating">Estrellas:</label>
            <div class="star-rating">
              <span
                v-for="n in 5"
                :key="n"
                :class="['star', { 'filled': n <= estrellas }]"
                @click="setRating(n)"
              >
                ★
              </span>
            </div>
          </div>
  
          <!-- Comentarios -->
          <div class="form-group">
            <label for="comments">Comentarios:</label>
            <textarea id="comments" v-model="comentario" rows="4" placeholder="Deja tu comentario"></textarea>
          </div>
  
          <!-- Fecha de Valoración -->
          <div class="form-group">
            <label for="date">Fecha de Valoración:</label>
            <input type="date" id="date" v-model="fechaValoracion" />
          </div>
  
          <!-- Botón de Enviar -->
          <button @click="createComentario">Enviar</button>
        </form>
      </div>
  
      <!-- Lista de Comentarios -->
      <div class="comentarios-list">
        <h2>Comentarios</h2>
        <div class="comentarios-container">
          <div
            class="comentario-box"
            v-for="comentario in displayedComentarios"
            :key="comentario.idValoracion"
          >
            <p><strong>Estrellas:</strong> {{ comentario.estrellas }} ★</p>
            <p><strong>Comentario:</strong> {{ comentario.comentario }}</p>
            <p><strong>Fecha:</strong> {{ comentario.fechaValoracion }}</p>
          </div>
        </div>
        <button v-if="comentarios.length > displayedComentarios.length" @click="verMas">
          Ver más
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import SideBarView from "@/views/Home/HomeView.vue";
  import axios from "axios";
  
  export default {
    name: "ComentarioView",
    components: {
      SideBarView,
    },
    data() {
      return {
        lista: [],
        estrellas: 0, // Valoración en estrellas
        comentario: "", // Comentarios del usuario
        fechaValoracion: "", // Fecha de valoración
        comentarios: [], // Lista de comentarios
      };
    },
    computed: {
      displayedComentarios() {
        return this.comentarios.slice(0, 6); // Mostrar los primeros 6 comentarios
      },
    },
    methods: {
      setRating(n) {
        this.estrellas = n;
      },
      async createComentario() {
        try {
          const comentarioData = {
            estrellas: this.estrellas,
            comentario: this.comentario,
            fechaValoracion: this.fechaValoracion,
          };
          await axios.post("http://localhost:4200/comentario", comentarioData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          this.estrellas = 0;
          this.comentario = "";
          this.fechaValoracion = "";
          await this.loadComentarios(); // Recargar comentarios después de enviar
        } catch (err) {
          console.error("Error al mandar el comentario", err);
        }
      },
      async loadComentarios() {
        try {
          const response = await axios.get("http://localhost:4200/comentario");
          this.comentarios = response.data;
        } catch (error) {
          console.error("Error cargando los comentarios", error);
        }
      },
      verMas() {
        this.$router.push("/comentarios"); // Redirigir a otra página (asegúrate de tener esta ruta configurada)
      },
    },
    async mounted() {
      await this.loadComentarios(); // Cargar comentarios al montar el componente
    },
  };
  </script>
  
  <style scoped>
  .main-content {
    padding: 20px;
  }
  
  /* Estilos del formulario */
  .rating-form {
    margin-bottom: 40px;
  }
  .rating-form h2 {
    margin-bottom: 20px;
  }
  .star-rating {
    display: flex;
    gap: 8px;
    cursor: pointer;
  }
  .star {
    font-size: 24px;
    color: #ccc;
  }
  .star.filled {
    color: gold;
  }
  textarea {
    width: 100%;
    resize: none;
    padding: 10px;
    margin-bottom: 20px;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
  }
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  
  /* Estilos de la lista de comentarios */
  .comentarios-list {
    margin-top: 40px;
  }
  .comentarios-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .comentario-box {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    width: calc(33.33% - 20px); /* Tres comentarios por fila */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .comentario-box p {
    margin: 5px 0;
  }
  </style>
  