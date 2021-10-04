app.component( 'userDetails', {
    props: {
        id: {
            required: true
        }
    },

    template:
    /*html*/
    `<section>
        <div class='row'>
            <div class='users-title col-12'> 
                <h1 class='mt-5 mb-5'> <router-link to="/">Users</router-link> > {{ user_data.name }} </h1>
            </div>
        </div>
    </section>

    <!-- User details section -->
    <section>
        <div class='row'>
            <div class='col-md-4'>
                <h3> Contact Info</h3>
                <p> Username: {{ user_data.username }} </p>
                <p> Email: <a href='mailto:{{ user_data.email }}'>{{ user_data.email }}</a> </p>
                <p> Phone: <a href='tel:{{ user_data.phone }}'>{{ user_data.phone }}</a> </p>
                <p> Website: <a target='_blank' href='https://{{ user_data.website }}'> {{ user_data.website }} </a></p>
            </div>

            <div class='col-md-4'>
                <h3> Address</h3>
                <p> {{ address.suite }}, {{ address.street }}, {{ address.city }}, {{ address.zipcode }}  </p>
            </div>

            <div class='col-md-4'>
                <h3> {{ company.name }}</h3>
                <p> {{ company.bs }} </p>
                <p> {{ company.catchPhrase }} </p>
            </div>
        </div>
    </section>

    <!-- User post section -->
    <section>
        <div class='row'>
            <div class='col-md-12 mt-5 mb-2'>
                <h4 class='mb-4'> Posts by {{ user_data.name }} </h4>
            </div>
        </div>
        <div class='row'>
            <div v-for='post in user_posts' class='col-md-4'>
                <h4> {{ post.title }} </h4>
                <p>  {{ post.body }} </p>
            </div>
        </div>
    </section>`,

    data() {
        return {
            user_data:{},
            address:{},
            company:{},
            user_posts:[]
        }
    },

    methods: {
        
    },

    watch: {
    
    },

    computed: {
        
    },

    mounted() {
        var comp_context = this
        axios.get('http://jsonplaceholder.typicode.com/users/' + this.id)
            .then( function( response ){
                console.log( response.data );
                comp_context.user_data = response.data
                comp_context.address = response.data.address
                comp_context.company = response.data.company
            }).catch(function(error){
                alert('Can not load user details.');
            })

        axios.get('http://jsonplaceholder.typicode.com/posts?userId=' + this.id)
            .then( function( response ){
                console.log( response.data );
                comp_context.user_posts = response.data
            }).catch(function(error){
                alert('Can not load user posts.');
            })
    }
})