<template>
   <div class="container mt-2">
     <b-form>
       <b-form-group label="Nome do Produto" label-for="subject">
         <b-form-input id="subject"
         v-model="form.subject"
         type="text"
         placeholder="Ex: Caneca / Caderno"
         required
         autocomplete="off" >
         </b-form-input>
       </b-form-group>

           <b-form-group label="Valor do Produto" label-for="valor">
         <b-form-input id="valor"
         v-model="form.valor"
         type="number"
         placeholder="R$: "
         required
         autocomplete="off" >
         </b-form-input>
       </b-form-group>

       <b-form-group label="Descrição" label-for="description">
         <b-form-textarea id="description"
         v-model="form.description"
         type="text"
         placeholder="Ex: Caneca redonda com desenho"
         required
         autocomplete="off" >
         </b-form-textarea>
       </b-form-group>
       <div>
    <!-- Styled -->
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Escolha um imagem do produto ou solte-o aqui..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    </div>
    <br>
       <b-button type="submit" variant="outline-primary" @click="saveTask">Salvar</b-button>
     </b-form>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js"

export default ({
  name: "Form",

  mixins: [ToastMixin], 

  data(){
    return {
      form: {
        subject: "",
        valor: "",
        description: "",
        file1: "",
      },
      methodSave: "new"
    }
  },
  created(){
    if(this.$route.params.index === 0 || this.$route.params.index !== undefined ) {
      this.methodSave = "update";
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.form = tasks[this.$route.params.index];
    }
  },

  methods: {
    saveTask(){
      if(this.methodSave === "update"){
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks[this.$route.params.index] = this.form
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.showToast("success", "Sucesso!", "Cadastro do item atualizado com sucesso!!")
        this.$router.push({ name: "list" });
        return;
      }

      let tasks = (localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [];
      tasks.push(this.form);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.showToast("success", "Sucesso!", "Cadastro do item criado com sucesso!!")
      this.$router.push({ name: "list" })
    }

  }

})
</script>
