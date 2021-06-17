<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-data-table
        :headers="headers"
        :items="todos"
        :search="search"
        sort-by="title"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>TODO CRUD</v-toolbar-title>
            
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New TODO
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <validation-observer ref="form" v-slot="{ invalid }">
                  <v-form @submit.prevent="save">
                    <v-card-text>
                    <v-container>
                      <v-row>
                        <v-card-text style="display:none">
                          <vee-input v-model="editedItem.id" type="hidden" label="ID"/>
                        </v-card-text>
                        <v-card-text>
                          <vee-input v-model="editedItem.title" name="title" rules="required|min:3|max:50" label="Title"/>
                        </v-card-text>
                        <v-card-text>
                          <vee-textarea v-model="editedItem.description" name="description" rules="required|min:3|max:200" label="Description" />
                        </v-card-text>
                      </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn type="submit" align="right" color="primary" :disabled="invalid">Save</v-btn>
                      
                    </v-card-actions>
                  </v-form>
                </validation-observer>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="item">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import { ValidationObserver } from "vee-validate";
import VeeTextarea from '../../components/shared/inputs/VeeTextarea.vue'
  export default {
  components: { VeeTextarea, ValidationObserver },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions' },
      ],
      todos: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        title: '',
        description: '',
      },
      defaultItem: {
        id: '',
        title: '',
        description: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    mounted () {
        this.$api
        .get("/todos")
        .then((response) => {
          this.todos = response.data.data;
        })
        .catch((error) => {
           this.$refs.form.setErrors(error.response.data.errors);
        });
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete() 
      },
    },

    methods: {
      
      editItem (item) {
        this.editedIndex = this.todos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.todos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteTodo();
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.updateTodo();
        } else {
          this.createTodo();
        }
        this.close()
      },
      updateTodo(){
            this.$api
            .post("/todo/"+this.editedItem.id,this.editedItem)
            .then((response) => {
              Object.assign(this.todos[this.editedIndex], response.data.data)
            })
            .catch((error) => {
              this.$refs.form.setErrors(error.response.data.errors);
            });
      },
      createTodo(){
            this.$api
            .post("/todos",this.editedItem)
            .then((response) => {
              
              this.todos.push(response.data.data)
            })
            .catch((error) => {
              this.$refs.form.setErrors(error.response.data.errors);
            });
      },
      deleteTodo(){
            this.$api
            .delete("/todos/"+this.editedIndex.id,this.editedItem)
            .then((response) => {
              console.log(response.data);
              this.todos.splice(this.editedIndex, 1)
            })
            .catch((error) => {
              this.$refs.form.setErrors(error.response.data.errors);
            });
      }
    },
  }
</script>