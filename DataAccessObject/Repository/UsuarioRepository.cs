using DataAccessObject.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyApp.Models.Catalogos;
using DataAccessObject.EntityFramework;
using System.Data.Entity.Core.Objects;

namespace DataAccessObject.Repository
{
    public class UsuarioRepository : IUsuario
    {
        DbC dbc = new DbC();


        public List<Usuario> geByUserName(string nombreUsuario)
        {
            List<Usuario> list = dbc.getSearchByUserName(nombreUsuario);

            return list;
        }


        public Usuario getByUserNameandPass(string username, string pass)
        {
            Usuario usuario = dbc.getSearchByUserNameAndPass(username, pass);

            return usuario;
        }

        public List<Usuario> getAllUsers()
        {
            List<Usuario> usuariosList = dbc.usuarios.ToList();

            return usuariosList;
        }


        public void onDelete(long idUsuario)
        {
            dbc.onDelete(idUsuario);   
        }

        public void OnSave(Usuario usuario)
        {
            dbc.onSave(usuario);
        }

        public void OnUpdate(Usuario usuario)
        {
            dbc.onUpdate(usuario);
        }
    }
}
