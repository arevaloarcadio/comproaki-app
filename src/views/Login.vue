<template>
  <ion-page class="ion-padding">
    <div>
      <center><ion-label>Comproaki</ion-label></center>  
      <br/>
        <div class="not-mobile">
          <ion-input type="text"  v-model="email" placeholder="Ingrese el Usuario" />
          <ion-input type="password" v-model="password" placeholder="Ingrese la contraseña" />
          <ion-button color="dark" @click="login()">
            Enviar
          </ion-button>
          <ion-button color="dark" @click="$router.push('/register')">
            Registro
          </ion-button>

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
import jwtToken from "@/plugins/jwt/jwt-token";
import {mapActions} from "vuex";
import user from "@/plugins/jwt/user";
import  '@capacitor-community/facebook-login';
import  '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core'
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
      email : '',
      password : ''
    };
  },
  mounted(){
    Plugins.GoogleAuth.initialize()
   
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '403919611251185',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v12.0' // use graph api current version
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    ...mapActions([
          'setAuthUser',
    ]),
    login(){
      let data = {
        email : this.email,
        password : this.password
      }

      axios.post('/auth/login',data)
      .then(res =>{
        console.log(res)
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        this.$router.push({path: '/' });
      }).error(error =>{
        console.log(error)
      })
    },
    async loginFacebook(){


      const FACEBOOK_PERMISSIONS = ['email'];
      const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

      if (result.accessToken) {
        this.token = result.accessToken;
      }else{
        toast.openToast("Error al registrar con facebook","error",2000);
        return
      }
      
      //alert(JSON.stringify(result))
      var loading = await toast.showLoading()

      await loading.present();

      const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),email&access_token=${this.token.token}`;
    
      axios
      .get(url)
      .then(res => {
        this.fb_user = res.data
        
        axios
        .post("/auth/mobile/external",{email : this.fb_user.email , names :this.fb_user.name, provider : 'facebook',key : 'google'  })
        .then(async res => {
          loading.dismiss()
          user.setUser(res.data.user)
          jwtToken.setToken(res.data.token);
          this.setAuthUser(res.data.user)
          await Plugins.FacebookLogin.logout()
          this.$router.push({path: '/dashboard' , query : {set_fcm : true }});
        })
        .catch(err => {
          loading.dismiss()
          console.log(err.response)
          /*if(err.response.data?.message){
            toast.openToast(err.response.data.message,"error",2000);
          }else{
            toast.openToast("Ha ocurrido un error","error",2000);
          }*/
       }) 
      
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
        //toast.openToast("Ha ocurrido un error","error",2000);
      }) 
   },
    async loginGoogle() {
    
    const googleUser = await Plugins.GoogleAuth.signIn()
    
    console.log('my user: ', googleUser);
    
    if(!googleUser?.email){
      toast.openToast("Error al autenticar con google","error",2000);
      return
    }
    
    var loading = await toast.showLoading()

    await loading.present();

    let data = {
       email : googleUser.email,
       names : googleUser.name,
       provider : 'google',
       key : 'google' 
    }

    axios
      .post("/auth/mobile/external",data)
      .then(async res =>  {
        loading.dismiss()
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        await Plugins.GoogleAuth.signOut();
        this.$router.push({path: '/dashboard' , query : {set_fcm : true }});
      })
      .catch(err => {
        loading.dismiss()
        console.log(err.response)
        /*if(err.response.data?.message){
          toast.openToast(err.response.data.message,"error",2000);
        }else{
          toast.openToast("Ha ocurrido un error","error",2000);
        }*/
      });
    }
  }
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

