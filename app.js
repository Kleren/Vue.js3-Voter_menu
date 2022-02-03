/*erstellen von vue Root Instanc*/
const app = Vue.createApp({
    //Optionen
    data: function() {
        return {
            submissions: submissions, //aus seed.js
        };
    },

    computed: {
        totalVotes() {
            return this.submissions.reduce((totalVotes, submission) => {
                return totalVotes + submission.votes;
            }, 0);
        },
        sortedSubmissions() {
            return this.submissions.sort((a, b) => {
                return b.votes - a.votes;
            });
        },
        cardHeaderBackgroundColor() {
            if (this.totalVotes >= 50) {
                return ["bg-success", "text-white"];
            }
        },
        cardTitleFontSize() {
            return {
                fontSize: this.totalVotes + 'px'
            }
        },
    },
    methods: {
        upvote(submissionId) {
            const submission = this.submissions.find(
                (submission) => submission.id === submissionId
            );
            submission.votes++;
        },
    },
    watch: {

    },
});
//Globale Component
app.component("SubmissionListItem", {
    //Optionen
    props: ["submission"],

    methods: {
        upvote() {
            this.submission.votes++;
        },
    },

    template: `
    <div class="d-flex">
        <div class="d-shring-0 ">        
        <img v-bind:src="submission.img " alt="" />
        </div>
        <div class="flex-grow-1 ms-3">       
        <h5>
           {{ submission.title }} 
        <span class="float-end text-success " style="cursor: pointer " @click="upvote()">
        <i class="fa fa-chevron-up "></i>         
        <strong>{{submission.votes}}</strong></span>
        </h5>
        <div v-html="submission.desc "></div>
        <small class="text-muted ">Eingereicht von: {{ submission.author }}</small>
        </div> 
        </div>
    `
});


// Liefert die Instanz zur Root-Component zurück
const vm = app.mount("#app");