<template>
  <SideBarView />
  <div class="main-content">
    <!-- Formulario de Valoración -->
    <div class="rating-form">
      <h1>Envianos tu comentario</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Estrellas -->
        <div class="stars">
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
          <p class="rating-label">{{ estrellasText }}</p>
        </div>

        <!-- Comentarios -->
        <div class="form-group">
          <textarea
            id="comments"
            v-model="comentario"
            rows="4"
            placeholder="Tu comentario nos ayuda mucho"
          ></textarea>
        </div>

        <!-- Botón de Enviar -->
        <button class="post-review" @click="createComentario">Publicar comentario</button>
      </form>
    </div>

    <!-- Lista de Comentarios -->
    <div class="comentarios-list">
      <ul>
        <li
          v-for="comentario in displayedComentarios"
          :key="comentario.idValoracion"
        >
          <p><strong>Estrellas:</strong> {{ comentario.estrellas }} ★</p>
          <p><strong>Comentario:</strong> {{ comentario.comentario }}</p>
        </li>
      </ul>
      <button v-if="comentarios.length > 3" @click="verMas">View More</button>
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
      estrellas: 0,
      comentario: "",
      comentarios: [],
    };
  },
  computed: {
    displayedComentarios() {
      return this.comentarios.slice(0, 3);
    },
    estrellasText() {
      return ["Pésimo", "Malo", "Regular", "Muy Bueno", "Excelente"][this.estrellas - 1] || "";
    },
    ratingColor() {
      // Devuelve una clase según la calificación
      return [
        "rating-poor",
        "rating-bad",
        "rating-regular",
        "rating-good",
        "rating-excellent",
      ][this.estrellas - 1] || "";
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
        };
        await axios.post("http://localhost:4200/comentario", comentarioData);
        this.estrellas = 0;
        this.comentario = "";
        await this.loadComentarios();
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
      this.$router.push("/comentario");
    },
  },
  async mounted() {
    await this.loadComentarios();
  },
};
</script>


<style scoped>
.rating-form {
  width: 100%;
  max-width: 600px;
  margin-top: 100px;
  margin-left: 250px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0, 0, 0);
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.star-rating {
  display: flex;
}

.star {
  font-size: 30px;
  cursor: pointer;
  color: #ccc;
  transition: color 0.3s ease;
}

.star.filled {
  color: #f39c12;
}

.rating-label {
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
}

/* Clases dinámicas para el color del texto */
.rating-poor {
  color: #e74c3c; /* Rojo */
}

.rating-bad {
  color: #e67e22; /* Naranja */
}

.rating-regular {
  color: #f1c40f; /* Amarillo */
}

.rating-good {
  color: #2ecc71; /* Verde claro */
}

.rating-excellent {
  color: #27ae60; /* Verde oscuro */
}

.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.post-review {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #0085FF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-review:hover {
  background-color: #005bb5;
}

.comentarios-list {
  margin-top: 20px;
  margin-left: 1000px;
}
</style>
