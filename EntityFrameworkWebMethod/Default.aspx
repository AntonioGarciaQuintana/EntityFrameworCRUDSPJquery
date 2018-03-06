<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EntityFrameworkWebMethod._Default" %>





<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">


    <div class="row">

        <div class="col-sm-6 col-md-4 col-md-offset-4">
            <div class="account-wall">
                <img class="profile-img" src="Content/images/user-icon.png" alt="" />

                <div class="form-signin">
                    <input id="txtUserName" type="text" class="form-control" placeholder="Email" required autofocus>
                    <div style="color: red" id="validUserName">
                       Ingrese un nombre de usuario
                    </div>
                    <input id="txtPass" type="password" class="form-control" placeholder="Password" required>
                    <div style="color: red" id="validPass">
                        Ingrese una contraseña
                    </div>
                    <button id="btnLogin" class="btn btn-lg btn-primary btn-block">
                        Iniciar sesión
                    </button>
                    <a href="/About" class="pull-right need-help">¿Necesitas ayuda? </a><span class="clearfix"></span>
                </div>
            </div>
            <a href="Views/RegisterUser.aspx" class="text-center new-account">Crear nuevo usuario</a>
        </div>
    </div>



</asp:Content>
