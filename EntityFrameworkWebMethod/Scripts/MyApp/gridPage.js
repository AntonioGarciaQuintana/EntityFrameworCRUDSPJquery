/**
*@class
* Script para iniciar sesion al sistema
* @author: Fco. Antonio García Quintana
*/
$(document).ready(function () {
    gridUserPage();
});

window.gridUserPage = function () {
    (function ($) {

        var gridPage = {
            /*Inicializador del script.*/
            init: function () {
                this.cache();
                this.bindEvents();
                this.clearForm();
                this.configureTable();
                this.getDataTable();


            },
            /*Declaracion de variables y objetos.*/
            cache: function () {
                this.table = $('#gridUsers');

                //campos del formulario
                this.txtId = $("#txtId");
                this.txtUserName = $("#txtUserName");
                this.txtPass = $("#txtPass");
                this.txtEmail = $("#txtEmail");
                this.sltSexo = $("#sltSexo");
                this.chckActivo = $("#chckActivo");

                //mensajes de validacion
                this.validUserName = $("#validUserName");
                this.validPass = $("#validPass");
                this.validEmail = $("#validEmail");
                this.validSexo = $("#validSexo");
                this.validEstructureEmail = $("#validEstructureEmail")

                this.btnCancel = $("#btnCancel");
                this.btnSave = $("#btnSave");


            },
            /*Declaración de eventos de los objetos*/
            bindEvents: function () {
                this.btnCancel.on('click', this.clearForm);
                this.btnSave.on('click', this.onSave);

            },
            clearForm: function () {
                var self = gridPage;

                self.txtId.val('');
                self.txtUserName.val('');
                self.txtPass.val('');
                self.txtEmail.val('');
                self.sltSexo.val('-1');
                self.chckActivo.prop('checked', false);

                self.btnSave.text('Guardar usuario')
                self.btnSave.removeClass('btn-primary');
                self.btnSave.removeClass('btn-warning');
                self.btnSave.addClass('btn-primary');

                self.validUserName.hide();


                self.validPass.hide();
                self.validEmail.hide();
                self.validSexo.hide();
                self.validEstructureEmail.hide();
            },
            /*Configuramos la tabla*/
            configureTable: function () {
                var self = gridPage;
                var oTable = self.table.dataTable({

                    aoColumns: [
                        {
                            "mData": function (data, type, row) {
                                return data.id;
                            }
                        },
                         {
                             "mData": function (data, type, row) {
                                 return data.username;
                             }
                         },
                          {
                              "mData": function (data, type, row) {
                                  return data.pass;
                              }
                          },
                           {
                               "mData": function (data, type, row) {
                                   return data.email;
                               }
                           },
                            {
                                "mData": function (data, type, row) {
                                    return data.sexo === 0 ? "Masculuno" : "Femenino";
                                }
                            },
                             {
                                 "mData": function (data, type, row) {
                                     return data.activo ? "Si" : "No";
                                 }
                             },
                              {
                                  "mData": function (data, type, row) {
                                      return '';
                                  }
                              }
                    ],
                    fnCreatedRow: this.onRowCreated
                });
            },
            onRowCreated: function (nRow) {
                var self = gridPage;

                var data = self.table.fnGetData(nRow);

                var btnEdit = $("<button id='btnEdit' class='btn btn-warning'>Editar</button>")
                var btnDelete = $("<button id='btnDelete' class='btn btn-danger'>Eliminar</button>")

                $($(nRow).children("td")[6]).text("");

                $($(nRow).children("td")[6]).append('  ');
                $($(nRow).children("td")[6]).append(btnEdit);
                $($(nRow).children("td")[6]).append('  ');
                $($(nRow).children("td")[6]).append(btnDelete);

                btnEdit.on("click", self.onEdit);
                btnDelete.on("click", self.onDelete)

            },
            getData: function () {
                var self = gridPage;
                var data = {
                    usuario: {
                        id: self.txtId.val() === "" ? 0 : self.txtId.val(),
                        username: self.txtUserName.val(),
                        pass: self.txtPass.val(),
                        email: self.txtEmail.val(),
                        sexo: self.sltSexo.val(),
                        activo: self.chckActivo.is(':checked')
                    }
                }
                return data;
            },
            onSave: function () {
                var self = gridPage;



                if (!self.validationForm()) {

                    var data = self.getData();


                    $.ajax({
                        type: 'POST',
                        url: 'gridUsers.aspx/' + (data.usuario.id === 0 ? 'onSave' : 'onUpdate'),
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var ret = JSON.parse(response.d);
                            if (ret.success) {
                                alert(ret.message);
                                self.clearForm();
                                self.getDataTable();
                            } else {
                                alert(ret.message);
                            }

                        },
                        failure: function (response) {
                            var ret = JSON.parse(response.d);
                            alert(ret.message);
                        }
                    });
                }


            },
            validationForm() {
                var self = gridPage;
                var regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                var ret = false;
                //validacion de nombre
                if (self.txtUserName.val() === "") {
                    self.validUserName.show();
                    ret = true;
                } else {
                    self.validUserName.hide();
                }

                //validacion de pass
                if (self.txtPass.val() === "") {
                    self.validPass.show();
                    ret = true;
                } else {
                    self.validPass.hide();
                }

                //validacion de email
                if (self.txtEmail.val() === "") {
                    self.validEmail.show();
                    ret = true;
                } else {

                    self.validEmail.hide();
                    //validacion del formato del correo electronico
                    if (!regularExpressionEmail.test(self.txtEmail.val())) {
                        self.validEstructureEmail.show();
                        ret = true;
                    } else {
                        self.validEstructureEmail.hide();
                    }
                }
                //validacion de sexo
                if (self.sltSexo.val() === "-1") {
                    self.validSexo.show();
                    ret = true;
                } else {
                    self.validSexo.hide();
                }
                return ret;
            },
            onDelete: function () {
                var self = gridPage;
                var data = self.table.fnGetData(this.parentNode.parentNode);

                $.ajax({
                    type: 'POST',
                    url: 'gridUsers.aspx/onDelete',
                    data: JSON.stringify({ idUsuario: data.id }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var ret = JSON.parse(response.d);
                        if (ret.success) {
                            alert(ret.message);
                            self.getDataTable();
                        } else {
                            alert(ret.message);
                        }
                    },
                    failure: function (response) {
                        var ret = JSON.parse(response.d);
                        alert(ret.message);
                    }
                });



            },
            onEdit: function () {
                var self = gridPage;
                var data = self.table.fnGetData(this.parentNode.parentNode);

                self.txtId.val(data.id);
                self.txtUserName.val(data.username);
                self.txtPass.val(data.pass);
                self.txtEmail.val(data.email);
                self.sltSexo.val(data.sexo);
                self.chckActivo.prop('checked', data.activo);

                self.btnSave.text('Actualizar usuario')
                self.btnSave.removeClass('btn-primary');
                self.btnSave.addClass('btn-warning');


            },

            getDataTable: function () {
                var self = gridPage;
                $.ajax({
                    type: 'POST',
                    url: 'gridUsers.aspx/getUsers',
                    data: [],
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var ret = JSON.parse(response.d);
                        if (ret.success) {
                            var nrow = self.table.fnGetData().length;
                            if (nrow > 0) {
                                self.table.fnClearTable();
                            }
                            self.table.fnAddData(ret.list);
                        } else {
                            alert(ret.message);
                        }
                    },
                    failure: function (response) {
                        var ret = JSON.parse(response.d);
                        alert(ret.message);
                    }
                });
            }
        };
        window.gridPage = gridPage.init();
    })(jQuery);
};