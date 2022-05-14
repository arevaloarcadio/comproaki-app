import { toastController,loadingController} from '@ionic/vue';


async function openToast(message,cssClass,duration = 2000 ,header = null){
 
  const toast = await toastController
    .create({
		position : 'top',	
		message:  message,
		duration: duration,
		cssClass :'toats-'+cssClass,
		header :  header
    })
  return toast.present();
}

async function showLoading(){
   const loading = await loadingController
        .create({
          cssClass: 'loading',
        });

  await  loading.present();
  
  return loading
}

export default {
	openToast : openToast,
  showLoading : showLoading,
} 