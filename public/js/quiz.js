/*
var quiz = {
    user: "Dave",
    questions: [
       {
          text: "What is the full form of HTTP?",
          responses: [
             { text: "Hyper text transfer package" },
             { text: "Hyper text transfer protocol", correct: true },
             { text: "Hyphenation text test program" },
             { text: "None of the above" }
          ]
       },
       {
          text:
             "What is the full form of HTML?",
          responses: [
             {
                text: "Hyper text marking language"
             },
             { text: "Hyphenation text markup language " },
             { text: "Hyper textx markup language", correct: true },
             { text: "Hyphenation test marking language" }
          ]
       }
    ]
 },
 userResponseSkelaton = Array(quiz.length).fill(null);
 */
var app = new Vue({
 el: "#app",
 data: {
    quiz: [],
    questionIndex: 0,
    userResponses: [],
    isActive: false
 },
 filters: {
    charIndex: function(i) {
       return String.fromCharCode(97 + i);
    }
 },
  mounted() {
    this.getQuiz();
  },
 methods: {
    getQuiz: function() {
        axios
          .get('/getQuiz')
          .then(response => {
            this.quiz = response.data;
            this.quiz.push(this.quiz[0], this.quiz[0], this.quiz[0], this.quiz[0])
            console.log(this.quiz.length)
            //console.log(Array(this.quiz.length).fill(null))
            this.userResponses = Array(this.quiz.length).fill(null);
          });
    },
    restart: function(){
               this.questionIndex=0;
               this.userResponses=Array(this.quiz.length).fill(null);
    },
    selectOption: function(index) {
       Vue.set(this.userResponses, this.questionIndex, index);
       //console.log(this.userResponses);
    },
    next: function() {
       if (this.questionIndex < this.quiz.length)
          this.questionIndex++;
    },

    prev: function() {
       if (this.quiz.length > 0) this.questionIndex--;
    },
    // Return "true" count in userResponses
    score: function() {
       var score = 0;
       for (let i = 0; i < this.userResponses.length; i++) {
          if (
             typeof this.quiz[i].responses[
                this.userResponses[i]
             ] !== "undefined" &&
             this.quiz[i].responses[this.userResponses[i]].correct
          ) {
             score = score + 1;
          }
       }
       return score;
       //return this.userResponses.filter(function(val) { return val }).length;
    }
 }
});
