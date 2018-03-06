using DataAccessObject.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyApp.Models.Catalogos;
using DataAccessObject.Repository;

namespace DataAccessObject.Service
{
    public class UsuarioService : IUsuario
    {
        UsuarioRepository usuarioRepository = new UsuarioRepository();

        public List<Usuario> geByUserName(string nombreUsuario)
        {
            List<Usuario> list = usuarioRepository.geByUserName(nombreUsuario);

            return list;
        }

        public Usuario getByUserNameandPass(string username, string pass)
        {
            Usuario usu = this.usuarioRepository.getByUserNameandPass(username, pass);

            return usu;
        }

        public List<Usuario> getAllUsers()
        {
            return this.usuarioRepository.getAllUsers();
        }

       

        public void onDelete(long idUsuario)
        {
            this.usuarioRepository.onDelete(idUsuario);
        }

        public void OnSave(Usuario usuario)
        {
            this.usuarioRepository.OnSave(usuario);
        }

        public void OnUpdate(Usuario usuario)
        {
            this.usuarioRepository.OnUpdate(usuario);
        }
    }
}
