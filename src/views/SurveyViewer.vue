<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <h1 class="text-primary mb-4"> Hi {{fullName}}<br> Thank You For Participating !</h1>
                <div class="col text-center">
                    <button @click="redirectToHome" type="button" class="btn btn-light">Go Home</button>
                </div>
            </div>
            <div class="card border-0">
                <div class="card-body">
                    <!--QUESTION AND ANSWER START-->
                    <div v-for="(data, i) in answers" :key="i" class="que-ans text-left shadow">
                        <p class="que"> Q{{i + 1}}. {{data.que}}</p>
                        <p class="mb-0 ans"> Ans. {{data.answ}}</p>
                    </div>
                     <!--QUESTION AND ANSWER END-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'SurveyViewer',
    data() {
        return {
            userSurveyCollection:[],
            userCollection: null,
            user: null,
            survey: null,
            answers:[],
            fullName: ''
        }
    },
    methods:{
        fetchData() {
            const userId = JSON.parse(localStorage.getItem("userId"));
            this.userCollection = JSON.parse(localStorage.getItem("users"));
            this.userSurveyCollection = JSON.parse(localStorage.getItem("survey"));
            this.user = this.userCollection.find( user => userId === user.id)
            this.fullName = this.user.fName
            this.survey = this.userSurveyCollection.find( survey => userId === survey.id)
            this.answers = this.survey.answers
        },

        /* Redirection to Home */
        redirectToHome() {
            this.$router.push('/');
        }
    },
    async mounted() {
        /* Fetching User and related survey questions and answers data */
        this.fetchData();
    }
}
</script>