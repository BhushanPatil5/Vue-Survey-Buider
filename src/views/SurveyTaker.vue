<template>
  <div class="contaier-flex p-0 p-md-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-lg border-0 br-rounded">
          <div class="card-body br-rounded">
            <div class="text-center">
              <h4>Twitter Survey</h4>
              <p>Page {{currentPageCount + 1}}</p>
            </div>
            <div v-for="(el, i) in elements" :key="i">
              <div class="jumbotron">
                <div class="container">
                  <p class="lead">{{el.title}}</p>
                </div>
              </div>

              <div class="card border-0">
                <div class="card-body">
                  <!-- DYNAMIC RADIO BUTTON INPUT START -->
                  <div v-for="(ch, j) in el.choices" :key="j" class="row justify-content-center">
                    <div class="col-md-4 col-xs-10 text-left">
                      <div class="custom-control custom-radio my-2">
                        <input
                          type="radio"
                          :id="ch.text.replace(/ /g,'')"
                          :name="ch.text.replace(/ /g,'')"
                          class="custom-control-input"
                          :value="ch.value"
                          v-model="chosen[i]"
                          @change="onChange(el.title,chosen[i])"
                        />
                        <label
                          class="custom-control-label"
                          :for="ch.text.replace(/ /g,'')"
                        >{{ch.text.trim()}}</label>
                      </div>
                    </div>
                  </div>
                  <!-- DYNAMIC RADIO BUTTON INPUT END -->
                </div>
              </div>
            </div>
            <div class="row">
              <!-- BUTTON  PREVIOUS-->
              <div v-if="currentPageCount > 0" class="col text-left">
                <button @click="prev" type="button" class="btn btn-light">Previous</button>
              </div>

              <!-- BUTTON  NEXT-->
              <div v-if="currentPageCount !== 4 " class="col text-right">
                <button @click="next" type="button" class="btn btn-light">Next</button>
              </div>

              <!-- BUTTON  COMPLETE-->
              <div v-if="currentPageCount === 4 " class="col text-right">
                <button @click="complete" type="button" class="btn btn-light">Complete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* JSON of survey questions */
import survey from "../../public/survey";
export default {
  name: "SurveyTaker",
  data() {
    return {
      currentPageCount: 0,
      answers: [],
      elements: [],
      chosen: []
    };
  },
  methods: {
    /* Previous button handler */
    prev() {
      if (this.currentPageCount > 0) {
        this.currentPageCount--;
        this.elements = survey.pages.slice(
          this.currentPageCount,
          this.currentPageCount + 1
        )[0].elements;
      }
    },

    /* Next button handler */
    next() {
      if (this.currentPageCount < 4) {
        this.currentPageCount++;
        this.elements = survey.pages.slice(
          this.currentPageCount,
          this.currentPageCount + 1
        )[0].elements;
      }
    },

    /* 
       Complete button handler 
       we are storing surveyAnswerCollection to local storage
       with respective id and redirect the view to survey viewer
    */
    complete() {
      this.surveyAnswerCollection = {
        id: this.$route.params.id,
        answers: this.answers
      };
      let surveyCollection = [];
      const newSurveyCollection = [];
      surveyCollection = JSON.parse(localStorage.getItem("survey"));
      if (Array.isArray(surveyCollection) && surveyCollection.length > 0) {
        for (const [i, v] of surveyCollection.entries()) {
          newSurveyCollection[i] = v;
        }
        newSurveyCollection.push(this.surveyAnswerCollection);
        localStorage.setItem("survey", JSON.stringify(newSurveyCollection));
      } else {
        surveyCollection = [this.surveyAnswerCollection];
        localStorage.setItem("survey", JSON.stringify(surveyCollection));
      }
      this.$router.push('/survey-viewer');
    },

    /* radio event handler */
    onChange(que, answ) {
      if (this.answers.length > 0) {
        this.answers = this.answers.filter(
          item => item.que !== que && item.answ !== answ
        );
      }
      this.answers.push({ que, answ });
    }
  },


  mounted() {
    /* initial loading of question */
    this.elements = survey.pages.slice(
      this.currentPageCount,
      this.currentPageCount + 1
    )[0].elements;
  }
};
</script>
