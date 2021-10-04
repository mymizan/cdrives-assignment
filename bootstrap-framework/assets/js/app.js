
//Vue App instance
const app = Vue.createApp({
    data() {
        return {
            users: [],
            searchTerm: '',
            sortBy: 'name'
        }
    },

    methods: {
        loadUserDetails( id ){
            console.log( id )
        }, 

        sortUsers() {
            console.log( this.sortBy )
            switch( this.sortBy ){
                default:
                case 'name':
                    this.users.sort((a, b) => (a.name > b.name) ? 1 : -1)
                    break

                case 'username':
                    this.users.sort((a, b) => (a.username > b.username) ? 1 : -1)
                    break

                case 'email':
                    this.users.sort((a, b) => (a.email > b.email) ? 1 : -1)
                    break
            }
        }
    },

    watch: {
        searchTerm() {
            console.log( this.searchTerm )
        },

        sortBy() {
            this.sortUsers();
        }
    },

    computed: {
        filteredUsers() {
            this.sortUsers();
            
            if ( this.searchTerm != '' ) {
                return this.users.filter( row => {
                    return row.name.includes(this.searchTerm) || row.username.includes(this.searchTerm) || row.email.includes(this.searchTerm)
                });
            } else {
                return this.users;
            }
        }
    },

    mounted() {
        axios.get('http://jsonplaceholder.typicode.com/users')
            .then( function( response ){
                console.log( response.data );
                app.users = response.data
            }).catch(function(error){
                alert('Can not load list of users from remote host.');
            })
    }
}).mount('#app')