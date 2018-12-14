import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import {markdown} from 'markdown';  

const apiurl = "http://localhost:8082/md-api/";
const defaultMsg = "Pulse sobre un documento en el panel de la izquierda para previsualizarlo o añada uno nuevo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  /**
   * Listado de documentos MD
   */
  private allMarkdowns = [];

  /**
   * Documento actual seleccionado
   */
  private currentmd = defaultMsg;
  private currentid = -1;
  private markdownpreview = "";// markdown.toHTML(this.currentmd);


  constructor(public navCtrl: NavController,
              public dataService: DataServiceProvider, 
              public alertCtrl: AlertController, 
              public toastCtrl: ToastController) {

   
  }

  /**
   * Función que se ejecuta al cargar la vista.
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityAddPage');
    this.loadAllMarkdowns();
    this.message("Las actualización automática al editor un documento está activada.")
  }

  message(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position:'top'
    
    }); 
    toast.present();
  }

  /**
   * Función que lista desde el backend los markdowns guardados
   */
  loadAllMarkdowns(){
    let result = []
    this.dataService.get(apiurl + 'list', null)
      .subscribe((res) =>{
         result = res;
      }, 
     (error) =>{
        this.message("No se han podido listar las notas, verifique el backend esté disponible y correctamente configurado")
     },
     ()=>{
        this.allMarkdowns = result;
        if (result == null){
          this.message("No hay documentos en el servidor, para comenzar a usar el sistema, agregue uno nuevo");
          this.currentmd = defaultMsg;
          this.markdownpreview = "";
        }
            
     })
      

  }

  /**
   * Función que pide el dialogo de confirmación para eliminar un documento.
   * @param id Primario del documento
   */
  removeMarkdown(id: number) {
    let confirm = this.alertCtrl.create({
      title: '¡ Atención !',
      message: '¿Está seguro que desea eliminar el documento Markdown?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => this.remove(id)
        },
        {
          text: 'Cancelar',
          handler: () => {
            //this.mensaje("No se eliminará");
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Función que elimina en sí mismo.
   * @param id Primario del documento
   */
  remove(id){
      this.dataService.delete(apiurl + 'delete/' + id, null)
        .subscribe((res)=>{
            console.log(res);
            if (res == null){
                this.message("Documento eliminado satisfactoriamente");
                this.loadAllMarkdowns();
            }
             else
               this.message("El documento no fue encontrado en el servidor");
        },
        (error)=>{

        },
        ()=>{

        })
  }

  /**
   * Función que muestra el dialogo para añadir un nuevo documento markdown
   */
  addMarkdown() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo documento markdown',
      message: "Entre el título del documento",
      inputs: [
        {
          name: 'title',
          placeholder: 'Entre el título'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
             this.crearDocumentoMarkdown(data.title);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Función que crea el documento markdown
   * @param texto Texto del documento Markdown
   */
  crearDocumentoMarkdown(texto){

     let result = ""; 
     this.dataService.post(apiurl + 'add', texto, null)
      .subscribe((res)=>{
          result = res;
      },
      (error) => {
        this.message("No se ha podido crear el documento markdown, verifique que el backend esté disponible y correctamente configurado")
      },
      () =>{
          this.loadAllMarkdowns();
      }      
    )
  }

  /**
   * Función que se ejecuta cuando se selecciona un documento de la lista de documentos
   * @param item El documento seleccionado
   */
  representarMd(item){
    this.currentmd = item.mddocument;
    this.currentid = item.id;
    this.markdownpreview = markdown.toHTML(this.currentmd) ;
  }

  /**
   * Función que actualiza el documento markdown en la base de datos
   */
  actualizarDocumento(){

    this.markdownpreview = markdown.toHTML(this.currentmd) ;

    if (this.currentid > 0){
      let resul = "";
      this.dataService.put(apiurl + "update/" + this.currentid, this.currentmd, null)
      .subscribe((res)=>{
          resul = res;
          this.loadAllMarkdowns()
      }, 
      (error)=>{
          this.message("No se ha podido actualizar el documento markdown, verifique que el backend esté disponible y correctamente configurado")
      },
      ()=>{
          console.log(resul);
      })

    }
    
  }

}
