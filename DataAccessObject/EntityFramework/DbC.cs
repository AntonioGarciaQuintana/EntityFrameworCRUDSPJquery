using MyApp.Models.Catalogos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessObject.EntityFramework
{
    public class DbC: DbContext
    {

        public DbC() : base("dbconnection") { }


        public DbSet<Usuario> usuarios { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().ToTable("USUARIOS_Nombre");
              
            modelBuilder.Entity<Usuario>().HasKey(x => x.id);
        }


        public virtual void onSave(Usuario usuario) {

            object[] parameters = new SqlParameter[5];
            try
            {
                using (var db = new DbC())
                {
                    /*Set de parametros para el sp de guardar*/
                    parameters[0] = new SqlParameter("@prmUserName", usuario.username);
                    parameters[1] = new SqlParameter("@prmPass", usuario.pass);
                    parameters[2] = new SqlParameter("@prmEmail", usuario.email);
                    parameters[3] = new SqlParameter("@prmSexo", usuario.sexo);
                    parameters[4] = new SqlParameter("@prmActivo", usuario.activo);
                    var results = db.Database.ExecuteSqlCommand("spInsertUsers @prmUserName, @prmPass, @prmEmail, @prmSexo, @prmActivo", parameters);
                    ///usuarioResponse = results.SingleOrDefault();
                }
            }
            catch (Exception ex)
            {
               
            }
        }

        public virtual void onUpdate(Usuario usuario)
        {

            object[] parameters = new SqlParameter[6];
            try
            {
                using (var db = new DbC())
                {
                    /*Set de parametros para el sp de guardar*/
                    parameters[0] = new SqlParameter("@prmIdUser", usuario.id);
                    parameters[1] = new SqlParameter("@prmUserName", usuario.username); 
                     parameters[2] = new SqlParameter("@prmPass", usuario.pass);
                    parameters[3] = new SqlParameter("@prmEmail", usuario.email);
                    parameters[4] = new SqlParameter("@prmSexo", usuario.sexo);
                    parameters[5] = new SqlParameter("@prmActivo", usuario.activo);
                    var results = db.Database.ExecuteSqlCommand("spUpdateUsers @prmIdUser, @prmUserName, @prmPass, @prmEmail, @prmSexo, @prmActivo", parameters);
                    ///usuarioResponse = results.SingleOrDefault();
                }
            }
            catch (Exception ex)
            {

            }
        }

        public virtual void onDelete(long idUsuario)
        {

            object[] parameters = new SqlParameter[1];
            try
            {
                using (var db = new DbC())
                {
                    /*Set de parametros para el sp de guardar*/
                    parameters[0] = new SqlParameter("@prmIdUser", idUsuario);
                    var results = db.Database.ExecuteSqlCommand("spDeleteUsers @prmIdUser", parameters);
                    ///usuarioResponse = results.SingleOrDefault();
                }
            }
            catch (Exception ex)
            {

            }
            
        }


        public virtual List<Usuario> getSearchByUserName(string username) {

            object[] parameters = new SqlParameter[2];

            List<Usuario> usuarioResponse = new List<Usuario>();

            try
            {
                using (var db = new DbC())
                {
                    /*Set de parametros para el sp de guardar*/
                    parameters[0] = new SqlParameter("@prmUserName", username);
                    parameters[1] = new SqlParameter("@prmPass", null);
                    var results = db.Database.SqlQuery<Usuario>("spSelectUsers @prmUserName, @prmPass", parameters);
                    usuarioResponse = results.ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return usuarioResponse;

        }

        public virtual Usuario getSearchByUserNameAndPass(string username, string pass)
        {

            object[] parameters = new SqlParameter[2];

            Usuario usuarioResponse = new Usuario();

            try
            {
                using (var db = new DbC())
                {
                   
                    SqlParameter prmUserName = new SqlParameter("@prmUserName", SqlDbType.NVarChar);
                    prmUserName.IsNullable = true;
                    if (username != null)
                    {
                        prmUserName.Value = username;
                    }
                    else {
                        prmUserName.Value = DBNull.Value;
                    }
                   
                    parameters[0] = prmUserName;
                    SqlParameter prmPass = new SqlParameter("@prmPass", SqlDbType.NVarChar);
                    prmPass.IsNullable = true;
                    if (pass != null)
                    {
                        prmPass.Value = pass;
                    }
                    else {
                        prmPass.Value = DBNull.Value;
                    }
                    parameters[1] = prmPass;
                    

                    var results = db.Database.SqlQuery<Usuario>("spSelectUsers @prmUserName, @prmPass", parameters);
                    usuarioResponse = results.SingleOrDefault();
                }
            }
            catch (Exception ex)
            {

            }
            return usuarioResponse;

        }
    }
}
