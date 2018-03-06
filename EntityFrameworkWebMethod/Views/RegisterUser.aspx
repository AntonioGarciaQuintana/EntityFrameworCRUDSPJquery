<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RegisterUser.aspx.cs" Inherits="EntityFrameworkWebMethod.Views.RegisterUser" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registro de nuevo usuario</title>



    <webopt:BundleReference runat="server" Path="~/Content/css" />
    <link href="~/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    
    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/bundles/jquery") %>
         <%: Scripts.Render("~/bundles/registerUser") %>
    </asp:PlaceHolder>
</head>
<body>

    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" runat="server" href="~/">Fco. Antonio García Quintana</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><a runat="server" href="~/">Inicio</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container body-content">

        <div class="row">
            <h2>Alta de nuevo usuario</h2>
            <hr />
            <%--  --%>
            <div class="form-group row">
                <label for="inputUserName" class="col-sm-2 col-form-label">Nombre de usuario</label>
                <div class="col-sm-10">
                    <input id="txtUserName" type="text" class="form-control" placeholder="Ingrese un nombre de usuario" />
                    <div style="color: red" id="validUserName">
                        Es necesario ingresar un nombre de usuario
                    </div>
                </div>

            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Contraseña</label>
                <div class="col-sm-10">
                    <input id="txtPass" type="password" class="form-control" placeholder="Ingrese una contraseña" />
                    <div style="color: red" id="validPass">
                        Es necesario ingresar una contraseña
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="txtEmail" class="col-sm-2 col-form-label">Correo electrónico</label>
                <div class="col-sm-10">
                    <input id="txtEmail" type="email" class="form-control" placeholder="Ingrese un correo electrónico" />
                    <div style="color: red" id="validEmail">
                        Es necesario ingresar un correo electrónico
                    </div>
                    <div style="color: red" id="validEstructureEmail">
                        El formato del correo electrónico es incorrecto
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label for="inputSexo" class="col-sm-2 col-form-label">Sexo</label>
                <div class="col-sm-10">
                    <select class="form-control" id="sltSexo">
                        <option selected value="-1">--seleccione una opción</option>
                        <option value="0">Masculino</option>
                        <option value="1">Femenino</option>
                    </select>
                    <div style="color: red" id="validSexo">
                        Es necesario seleccionar un tipo de sexo
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <label class="col-sm-2">¿Usuario activo?</label>
                <div class="col-sm-10">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input id="chckActivo" class="form-check-input" type="checkbox" />
                        </label>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-sm-2 col-sm-10">
                    <button id="btnSave" class="btn btn-primary">Guardar usuario</button>
                </div>
            </div>


        </div>

        <footer>
        <p>&copy; <%: DateTime.Now.Year %> - Fco. Antonio García Quintana</p>
    </footer>
    </div>


    
</body>
</html>
