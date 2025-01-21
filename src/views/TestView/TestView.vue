<template>
  <SideBarView />
  <div class="reservation-form">
    <h2>Reserva tu Mesa</h2>
    <form @submit.prevent="createReserva">
      <div class="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          v-model="reservation.name"
          required
          placeholder="Tu nombre"
        />
      </div>
      <div class="form-group">
        <label>Fecha de Reserva:</label>
        <input
          type="date"
          v-model="reservation.date"
          required
        />
      </div>
      <div class="form-group">
        <label>Hora de Reserva:</label>
        <input
          type="time"
          v-model="reservation.time"
          required
        />
      </div>
      <div class="form-group">
        <label>Número de Personas:</label>
        <input
          type="number"
          v-model="reservation.people"
          required
          min="1"
          placeholder="Número de personas"
        />
      </div>
      <div class="form-group">
        <label>Notas Adicionales:</label>
        <textarea
          v-model="reservation.notes"
          placeholder="Notas adicionales (opcional)"
        ></textarea>
      </div>
      <button type="submit" class="submit-btn">Reservar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import SideBarView from "@/views/Home/HomeView.vue";

export default {
  name: "ReservationForm",
  components: {
    SideBarView,
  },
  data() {
    return {
      reservation: {
        name: "",
        date: "",
        time: "",
        people: 1,
        notes: "",
      },
    };
  },
  methods: {
    async createReserva() {
      try {
        // Verificar que todos los campos estén llenos
        if (!this.reservation.name || !this.reservation.date || !this.reservation.time || !this.reservation.people) {
          console.error("Formulario incompleto");
          return;
        }

        // Verificar que los datos estén definidos antes de enviar
        console.log("Datos de reserva:", this.reservation);

        // Enviar los datos al backend
        const reservaData = { ...this.reservation };
        await axios.post("http://localhost:4200/reserva", reservaData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Limpiar formulario
        this.reservation = {
          name: "",
          date: "",
          time: "",
          people: 1,
          notes: "",
        };

        console.log("Reserva enviada con éxito");
      } catch (err) {
        console.error("Error al mandar la reserva", err);
      }
    },
  },
};
</script>

<style scoped>
.reservation-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reservation-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  resize: none;
}

button.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button.submit-btn:hover {
  background-color: #0056b3;
}
</style>
