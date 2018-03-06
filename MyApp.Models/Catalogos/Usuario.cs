using MyApp.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyApp.Models.Catalogos
{
   public class Usuario
    {
        public long id { get; set; }

        public string username { get; set; }

        public string pass { get; set; }

        public string email { get; set; }

        public SexoEnum sexo {get; set;}

        public bool activo { get; set; }
    }
}
