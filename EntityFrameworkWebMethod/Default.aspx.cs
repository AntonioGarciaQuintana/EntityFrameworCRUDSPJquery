using DataAccessObject.Service;
using MyApp.Models.Catalogos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EntityFrameworkWebMethod
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        [WebMethod]
        public static string onLogin(Usuario usuario) {

            string json;
            try
            {
                UsuarioService service = new UsuarioService();
                Usuario usuarioRet = service.getByUserNameandPass(usuario.username, usuario.pass);

                if (usuarioRet != null)
                {
                    json = "{\"success\":true, \"message\":\"Bienvenido "+usuarioRet.username+"\"}";
                }
                else {
                    json = "{\"success\":false, \"message\":\"No se encontro el usuario\"}";
                }
            }
            catch (Exception ex) {
                json = "{\"success\":false, \"message\":\"Ha sucedido un error de procesamiento, por favor contacte a soporte técnico\"}";
            }


            return json;
        }
    }
}