<template>
  <div>
    <UserForm></UserForm>
  </div>
</template>

<script>
/* User registration form */
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'Home',
  components: {
    UserForm,
  },
};
</script>
