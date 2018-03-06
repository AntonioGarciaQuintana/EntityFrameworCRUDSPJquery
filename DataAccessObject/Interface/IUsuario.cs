using MyApp.Models.Catalogos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessObject.Interface
{
   public interface IUsuario
    {
        void OnSave(Usuario usuario);

        void OnUpdate(Usuario usuario);

        void onDelete(long idUsuario);

       List<Usuario> geByUserName(string nombreUsuario);

        Usuario getByUserNameandPass(string username, string pass);

        List<Usuario> getAllUsers();
    }

}
