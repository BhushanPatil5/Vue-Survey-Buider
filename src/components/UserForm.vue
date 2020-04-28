<template>
  <div class="contaier-flex p-0 p-md-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-lg border-0 br-rounded">
          <div class="card-body br-rounded">
            <h4 class="text-primary mb-4">Please Fill The Form For Survey</h4>
            <!-- USER REGISTRATION FROM START -->
            <form ref="userForm" class="p-0 p-md-3" @submit.prevent="handleSubmit">
              <div class="form-row">
                <!-- FULL NAME -->
                <div class="form-group col-md-6 text-left">
                  <label for="name">Full Name</label>
                  <input
                    v-model="user.fName"
                    type="text"
                    placeholder="Full Name"
                    id="firstName"
                    name="firstName"
                    class="form-control"
                    required
                  />
                </div>
                <!-- EMAIL -->
                <div class="form-group col-md-6 text-left">
                  <label for="email">Email</label>
                  <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <!-- COUNTRY -->
                <div class="form-group col-md-6 text-left">
                  <label for="country">Country</label>
                  <select id="country" v-model="user.country" class="form-control" required>
                    <option disabled value>Please select one</option>
                    <option
                      v-for="country in countries"
                      :key="country.name"
                      :value="country.name"
                    >{{ country.name }}</option>
                  </select>
                </div>
                <!-- AGE -->
                <div class="form-group col-md-6 text-left">
                  <label for="age">Age</label>
                  <input
                    v-model="user.age"
                    type="number"
                    class="form-control"
                    id="age"
                    required
                    min="0"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div class="form-row">
                <!-- GENDER -->
                <div class="form-group col-md-6 text-left">
                  <label for="gender">Gender</label>
                  <br />
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="male"
                      value="Male"
                      v-model="user.gender"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="male">Male</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="female"
                      value="Female"
                      v-model="user.gender"
                      class="custom-control-input"
                    />
                    <label class="custom-control-label" for="female">Female</label>
                  </div>
                </div>

                <!-- SUBMIT BUTTON -->
                <div class="form-group col-md-6 align-self-center justify-content-center">
                  <button type="submit" class="btn btn-light">Submit</button>
                </div>
              </div>
            </form>
            <!-- USER REGISTRATION FROM END -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      user: {
        fName: "",
        email: "",
        country: "",
        age: null,
        gender: "Not Specified",
        id: ""
      },
      countries: [],
      submitted: false
    };
  },
  methods: {
    /* 
       handle sbmitting the form and adding form data to local storage
    */
    handleSubmit() {
      if (this.isValid()) {
        this.user.id = this.uuidv4();
        localStorage.setItem("userId", JSON.stringify(this.user.id));
        let userCollection = [];
        const newUserCollection = [];
        userCollection = JSON.parse(localStorage.getItem("users"));
        if (Array.isArray(userCollection) && userCollection.length > 0) {
          for (const [i, v] of userCollection.entries()) {
            newUserCollection[i] = v;
          }
          newUserCollection.push(this.user);
          localStorage.setItem("users", JSON.stringify(newUserCollection));
        } else {
          userCollection = [this.user];
          localStorage.setItem("users", JSON.stringify(userCollection));
        }
        this.submitted = true;
        this.$refs.userForm.reset();
        this.$router.push(`/survey-taker/${this.user.id}`);
      }
    },

    /* Check all form fields are valid or not */
    isValid() {
      const { fName, email, country, age } = this.user;
      if ((fName === "" || email === "", country === "" || age === "")) {
        return false;
      }
      return true;
    },
    /* generate unique id */
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    /* fetching list of countries from server */
    async getCountryList() {
      this.countries = await (
        await fetch("https://restcountries.eu/rest/v2/all")
      ).json();
    },
  },

  async mounted() {
    await this.getCountryList();
  }
};
</script>
