<template>
  <div id="app" class="container">
    <h1>Pequena Loja</h1>
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
      >{{ mensagem.texto }}</b-alert
    >
    <b-card>
      <b-form-group label="Nome do Produto">
        <b-form-input
          type="text"
          size="lg"
          v-model="produto.nome"
          placeholder="Ex: Caneca, Lápis, Caderno"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Descrição do Produto">
        <b-form-input
          type="text"
          size="lg"
          v-model="produto.descricao"
          placeholder="Ex: Redondo com desenhos"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Qual o Valor do Produto?">
        <b-form-input
          type="text"
          size="lg"
          v-model="produto.valor"
          placeholder="R$"
        ></b-form-input>
      </b-form-group>
      <hr />
      <b-button @click="salvar" size="lg" variant="primary"
        >Coletar Informações e Valores</b-button
      >
      <b-button
        @click.prevent="obterProdutos"
        size="lg"
        variant="success"
        class="ml-2"
        >Lista de Produtos</b-button
      >
    </b-card>
    <hr />
    <b-list-group>
      <b-list-item v-for="(produto, id) in produto" :key="id">
        <strong>Nome: </strong> {{ produto.nome }} <br />
        <strong>Descrição: </strong> {{ produto.descricao }} <br />
        <strong>Valor: </strong> {{ produto.valor }} <br />
        <strong>ID: </strong> {{ id }}
        <br />
        <b-button variant="warning" size="lg" @click="carregar(id)"
          >Carregar</b-button
        >
        <b-button variant="danger" size="lg" class="ml-2" @click="excluir(id)"
          >Excluir</b-button
        >
      </b-list-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mensagens: [],
      produto: [],
      id: null,
      produtos: {
        nome: "",
        descricao: "",
        valor: "",
      },
    };
  },
  methods: {
    limpar() {
      this.produto.nome = "";
      this.produto.descricao = "";
      this.produto.valor = "";
      this.id = null;
      this.mensagens = [];
    },
    carregar(id) {
      this.id = id;
      this.produto = { ...this.produtos[id] };
    },
    excluir(id) {
      this.$http
        .delete(`/produtos/${id}.json`)
        .then(() => this.limpar)
        .catch(() => {
          this.mensagens.push({
            texto: "Problema para excluir!",
            tipo: "danger",
          });
        });
    },
    salvar() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}.json` : ".json";
      this.$http[metodo](`/produtos${finalUrl}`, this.produto).then(() => {
        this.limpar();
        this.mensagens.push({
          texto: "Operação realizada com sucesso!",
          tipo: "success",
        });
      });
    },
    obterProdutos() {
      this.$http("produtos.json").then((res) => {
        this.produto = res.data;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>