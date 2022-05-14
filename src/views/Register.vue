<template>
  <ion-page class="ion-padding">
    <div>
      <center><ion-label>Comproaki</ion-label></center>  
      <br/>
      <div class="not-mobile">
        
        <ion-input type="text" v-model="dni" placeholder="Ingrese el DNI" />
        <ion-input type="text" v-model="firstname" placeholder="Ingrese el Nombre" />
        <ion-input type="text" v-model="lastname" placeholder="Ingrese el Apellido" />
        <ion-input type="email" v-model="email" placeholder="Ingrese el correo electrónico" />
        <ion-input type="password" v-model="password" placeholder="Ingrese la contraseña" />
        <ion-input type="password" v-model="passwordConfirmation" placeholder="Ingrese la confimación de contraseña" />
      
        <ion-button color="dark" @click="register()">
          Enviar
        </ion-button>
        <ion-button color="dark" @click="$router.push('/login')">
              Login
        </ion-button>
        <br>
        
        <center> <p><b>o</b></p></center>
         
        <ion-grid>
          <ion-row>
            <ion-col>
              <img src="/assets/icon/icon-facebook.png" @click="loginFacebook" >
            </ion-col>
            <ion-col>
              <img src="/assets/icon/icon-google.png" @click="loginGoogle" >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonInput } from "@ionic/vue";
import axios from 'axios'
import toast from '@/plugins/toast'
//import Form from "../components/Form";
//import People from "../components/People";
//import PayCardOverview from "../components/PayCardOverview";

export default {
  name: "pay",
  title: "Pay",
  requiresAuth: false,
  components: {
    IonPage,
    IonInput,
    //Form,
    //People,
    //PayCardOverview,
    IonButton
  },
  data() {
    return {
      dni : '',
      firstname : '',
      lastname : '',
      email : '',
      password : '',
      passwordConfirmation : '',
    };
  },
  methods: {
    register(){
      const data = {
          dni : this.dni,
          firstname : this.firstname,
          lastname : this.lastname,
          email : this.email,
          password : this.password,
          password_confirmation : this.passwordConfirmation,
      };

      axios.post('/users',data)
      .then(res => {
        console.log(res)
        toast.openToast("Registro Exitoso","error",2000)
        this.$router.push('/login')

      })
      .error(error =>{
        console.log(error)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .test{
    display: none;
  }
}



ion-label {
  font-weight: bold;
}

ion-input {
  background: #fff;
  border-radius: 20px;
  padding: 5px 8px !important;
  margin: 10px 0;
}

.tokens {
  background: #fff;
  border-radius: 20px;
  font-weight: bold;
  margin: 5px;
  text-align: center;
  padding: 7px;
}

.reason-wrapper {
  margin: 10px 0;
  background: #ffffff;
  // padding: 9px;
  border-radius: 20px;

  .reason {
    border-right: 2px grey solid;
  }

  .reason-options {
    margin-left: 15px;
  }
}

ion-item {
  width: 100%;
  --background: none; 
}

@media (min-width: 1025px) and (max-width: 1280px) {
    
    .not-mobile {
      display: block;
      width: 50%;
      text-align: center;
      margin: 0 auto;
      z-index: 9999999999;
    }

    ion-button {
      width: 100%;
      --border-radius: 20px;
      height: 46px;
      text-transform: none;
    }
    
  }

  @media (min-width: 100px) and (max-width: 1024px) {
    
    .not-mobile {
      display: block;
      width: 100%;
      text-align: center;
      margin: 0 auto;
      z-index: 9999999999;
    }
  }


ion-button {
  width: 100%;
  --border-radius: 20px;
  height: 46px;
  text-transform: none;
}
</style>

