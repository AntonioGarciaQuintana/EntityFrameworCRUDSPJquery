using DataAccessObject.Service;
using MyApp.Models.Catalogos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EntityFrameworkWebMethod.Views
{
    public partial class RegisterUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        [WebMethod]
        public static string onSave(Usuario usuario) {

            string json;
            try
            {
                UsuarioService usuarioService = new UsuarioService();

                Usuario ret = new Usuario();
                ret = usuarioService.getByUserNameandPass(usuario.username, null);
                if (ret == null)
                {
                    usuarioService.OnSave(usuario);
                    json = "{\"success\":true, \"message\":\"El usuario se ha guardado correctamente\"}";
                }
                else
                {

                    json = "{\"success\":false, \"message\":\"Ya existe un usuario con el mismo nombre de usuario\"}";
                }
            }
            catch (Exception ex) {

                json = "{\"success\":false, \"message\":\"Ha sucedido un error de procesamiento, por favor contacte a soporte técnico\"}";

            }
            return json;
        }
    }
}