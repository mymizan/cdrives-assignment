app.component( 'user-list', {
    template:
    /*html*/
    `<section class='mt-5'>
        <div class='row'>
            <div class='users-title col-12 col-md-3 mt-4'> 
                <h1 class='fs-4'> Users </h1>
            </div>
            <div class='users-filter col-12 col-md-9'>
                <!-- Search form -->
                <form class='float-md-end float-lg-end float-xl-end float-xxl-end'>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <label class='form-label'>Search</label>
                            <input class='form-control' type='text' placeholder="name, email or username" v-model='searchTerm'  />
                        </div>
                        <div class="col-12 col-md-6">
                            <div class='d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none mb-2'></div>
                            <label class='form-label'> Sort by</label>
                            <select class='form-control' v-model='sortBy'>
                                <option value='name'> Name </option>
                                <option value='username'> Username </option>
                                <option value='email'> Email </option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- User table section -->
    <section>
        <div class='row'>
            <div class='col-12 col-md-12'>
                <div class='table-responsive'>
                    <table class='table table-striped table-hover table-bordered align-top mt-3'>
                        <tbody>
                            <tr v-for="user in filteredUsers" @click='loadUserDetails(user.id)'>
                                <td>
                                    <div class='row'>
                                        <div class='col-2'>
                                            <img class='pr-2 img-responsive align-center mt-xl-2 mt-md-2 mt-lg-2 mt-xxl-2 mt-3' width='30' height='30' src='assets/images/profile.png' />
                                        </div>
                                        <div class='col-10'>
                                        <h3 class='m-0 fs-6 mt-1'> {{ user.name }}</h3>
                                        <p class='m-0'> {{ user.username }}</p>
                                        <a class='pr-2 d-md-none d-lg-none d-xl-none d-xxl-none' v-bind:href="'mailto:' + user.email"> {{ user.email }} </a>
                                        </div>
                                    </div>
                                </td>
                                <td class='align-middle text-end d-none d-md-table-cell d-lg-table-cell d-xl-table-cell d-xxl-table-cell'>
                                    <a class='pr-2' v-bind:href="'mailto:' + user.email"> {{ user.email }} </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>`,

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
        var comp_context = this;
        axios.get('http://jsonplaceholder.typicode.com/users')
            .then( function( response ){
                console.log( response.data );
                comp_context.users = response.data
            }).catch(function(error){
                alert('Can not load list of users from remote host.');
            })
    }
})