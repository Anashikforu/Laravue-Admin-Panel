<template>
    <v-data-table
    item-key="name"
    loading-text="Loading... Please wait"
    :headers="headers"
    :items="roles"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Role </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="error" dark class="mb-2" v-on="on">Add New Role</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field color="error" v-model="editedItem.name" label="Role Name"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.created_at" label="Created at"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.updated_at" label="Updated at"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="error darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
       mdi-file-edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="error" @click="initialize">Reset</v-btn>
    </template>
    </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Created at', value: 'created_at' },
        { text: 'Updated at', value: 'updated_at' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      roles: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        created_at: '',
        updated_at: '',


      },
      defaultItem: {
        id: '',
        name: '',
        created_at: '',
        updated_at: '',


      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          // Add a request interceptor
            axios.interceptors.request.use( (config)=> {
                this.loading=true;
                return config;
            },  (error)=> {
                this.loading=false;
                return Promise.reject(error);
            });

            // Add a response interceptor
            axios.interceptors.response.use( (response)=> {
                this.loading=false;
                return response;
            },  (error) =>{
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                this.loading=false;
                return Promise.reject(error);
            });
            axios.get('/api/roles',{})
            .then(res=> this.roles = res.data.roles)
            .catch(err=>{
                    if(err.response.status == 401)
                    localStorage.removeItem('token');
                    this.router.push('/login');
            }
            )
      },



      editItem (item) {
        this.editedIndex = this.roles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.roles.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.roles.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {

        if (this.editedIndex > -1) {
        axios.put('/api/roles/'+this.editedIndex,{'name': this.editedItem.name})
          .then(res=>Object.assign(this.roles[this.editedIndex],res.data.roles))
          .catch(err=> console.log(err.response))
        //   Object.assign(this.roles[this.editedIndex], this.editedItem)
        } else {
        axios.post('/api/roles',{'name': this.editedItem.name})
          .then(res=>this.roles.push(res.data.roles))
          .catch(err=> console.dir(err.response))

        }
        this.close()
      },
    },
  }
</script>
<style lang="stylus" scoped>

</style>
