$(function () {
  var isformula = "0";
  var iseditformula = "0";

// 保存新的用户资料
  $("#add_roles").on("click", function () {
    var inputnickname = $("#inputnickname").val();
    var inputpassword = $("#inputpassword").val();
    var inputusername = $("#inputusername").val();
    var inputphone = $("#inputphone").val();
    var inputemail = $("#inputemail").val();
    var inputwebchat = $("#inputwebchat").val();
    var inputqq = $("#inputqq").val();
    var inputremark = $("#inputremark").val();
    var inputformula = $("#inputformula").val();
    var gongzi_currency = $("#sel_gongzi_currency").val();
    var gongzi = $("#inputgongzi").val();
    var addpricemethod = $("#inputaddpricemethod").val();
    var baojiachaxunquanxian;
    if ($("#selectroles").val()==8 && $("#inputaddpricemethod").val()==0){
      // Qual.sdb(ee("该账户角色为[代理],请为其设置报价表的计价方式"));
      xtip.msg(ee("该账户角色为[代理],请为其设置报价表的计价方式"), {times: 4,icon: "w"});
      return;
    }
    if (gongzi_currency=="null") {
      // Qual.sdb(ee("对不起!基础工资计算币种不能为空"));
      xtip.msg(ee("对不起!基础工资计算币种不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(gongzi)) {
      // Qual.sdb(ee("对不起!基础工资不能为空"));
      xtip.msg(ee("对不起!基础工资不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputnickname)) {
      // Qual.sdb(ee("对不起!用户编号不允许为空"));
      xtip.msg(ee("对不起!用户编号不允许为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputpassword)) {
      // Qual.sdb(ee("对不起!密码不允许为空"));
      xtip.msg(ee("对不起!密码不允许为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputusername)) {
      // Qual.sdb(ee("对不起!姓名不允许为空"));
      xtip.msg(ee("对不起!姓名不允许为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputphone)) {
      // Qual.sdb(ee("对不起!电话号码不允许为空"));
      xtip.msg(ee("对不起!电话号码不允许为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputemail)) {
      // Qual.sdb(ee("对不起!电子邮件不允许空"));
      xtip.msg(ee("对不起!电子邮件不允许空"), {times: 4,icon: "e"});
      return;
    }
    if (isformula!="0"){
      if (isEmpty(inputformula)) {
        // Qual.sdb(ee("对不起!您启用了提成机制,请输入该账号的提成数值"));
        xtip.msg(ee("对不起!您启用了提成机制,请输入该账号的提成数值"), {times: 4,icon: "e"});
        return;
      }
    }

    switch ($("#inputbaojiachaxunquanxian").prop("checked")) {
      case true:
        baojiachaxunquanxian = "1";
        break;
      case false:
        baojiachaxunquanxian = "0";
        break;
    }

    var da = JSON.stringify({
      m: "add",
      username1: inputnickname,
      password: inputpassword,
      username2: inputusername,
      phone: inputphone,
      email: inputemail,
      webchat: inputwebchat,
      qq: inputqq,
      roles: $("#selectroles").val(),
      orginal: $("#selectorginal").val(),
      remark: inputremark,
      formulamethod: isformula,
      formula: inputformula,
      gongzi_currency: gongzi_currency,
      gongzi: gongzi,
      addpricemethod: addpricemethod,
      baojiachaxunquanxian: baojiachaxunquanxian,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/userapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          window.location.href = "/roles";
        }
        xtip.close(loading);
      },
    });
  });

  $("#inputformulamethod").change(function() {
    // console.log($(this).val());
    switch ($(this).val()) {
      case "0":
        iseditformula = "0";
        $("#inputformula").prop("disabled", true);
        break;
      case "1":
        iseditformula = "1";
        $("#inputformula").prop("disabled", false);
        break;
      case "2":
        iseditformula = "2";
        $("#inputformula").prop("disabled", false);
        break;
    }
  });

  $("#ed_inputformulamethod").change(function() {
    // console.log($(this).val());
    switch ($(this).val()) {
      case "0":
        isformula = "0";
        $("#ed_inputformula").prop("disabled", true);
        break;
      case "1":
        $("#ed_inputformula").prop("disabled", false);
        isformula = "1";
        break;
      case "2":
        $("#ed_inputformula").prop("disabled", false);
        isformula = "2";
        break;
    }
  });

  $(".delaccount").on("click", function () {
    var userid = $(this).parents().parents().prev().prev().prev().prev().text();
    var da = JSON.stringify({
      m: "delete",
      userid: userid,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/userapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          window.location.href = "/roles";
        }
        xtip.close(loading);
      },
    });
  });

  var the_user_id;
  $(".editaccount").on("click", function () {
    var userid = $(this).parents().parents().prev().prev().prev().prev().text();
    the_user_id = userid;
    if (userid == "1") {
      console.log("禁止编辑初始管理员账号");
      return;
    }
    var da = JSON.stringify({
      m: "getone",
      userid: userid,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/userapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          // $("#ed_inputnickname").val(data.userinfo.username1);
          $("#ed_inputusername").val(data.userinfo.username2);
          $("#ed_inputphone").val(data.userinfo.phone);
          $("#ed_inputwebchat").val(data.userinfo.webchat);
          $("#ed_inputqq").val(data.userinfo.qq);
          $("#ed_inputremark").val(data.userinfo.remark);
          $("#ed_selectorginal").find("option").remove();
          $.each(data.userinfo.orginal, function (i, item) {
            var str =
              "<option value='" +
              item.id +
              "'>" +
              item.orginalname +
              "</option>";

            $("#ed_selectorginal").append(str);
          });
          $("#ed_inputformulamethod").val(data.userinfo.formulamethod);
          switch (data.userinfo.formulamethod) {
            case "0":
              $("#ed_inputformula").prop("disabled", true);
              break;
            case "1":
              $("#ed_inputformula").prop("disabled", false);
              break;
            case "2":
              $("#ed_inputformula").prop("disabled", false);
              break;
          }
          $("#ed_inputformula").val(data.userinfo.formula);
          $("#ed_selectroles").val(data.userinfo.userlevelid);
          $("#ed_sel_gongzi_currency").val(data.userinfo.currencyid);
          $("#ed_inputgongzi").val(data.userinfo.gongzi);
          $("#ed_inputformulamethod").val(data.userinfo.addpricemethod);
          switch (data.userinfo.baojiachaxunquanxian) {
            case "0":
              $("#ed_inputbaojiachaxunquanxian").prop("checked", false);
              break;
            case "1":
              $("#ed_inputbaojiachaxunquanxian").prop("checked", true);
              break;
          }
        }
        xtip.close(loading);
      },
    });
  });

  $(".addaccountevent").on("click", function () {
    var da = JSON.stringify({
      m: "addevent",
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/userapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $("#ed_selectorginal").find("option").remove();
          $.each(data.userinfo.orginal, function (i, item) {
            var str =
              "<option value='" +
              item.id +
              "'>" +
              item.orginalname +
              "</option>";

            $("#ed_selectorginal").append(str);
          });
        }
        xtip.close(loading);
      },
    });
  });

  $("#edit_roles").on("click", function () {
    // var inputnickname = $("#ed_inputnickname").val();
    var inputpassword = $("#ed_inputpassword").val();
    var inputusername = $("#ed_inputusername").val();
    var inputphone = $("#ed_inputphone").val();
    var inputwebchat = $("#ed_inputwebchat").val();
    var inputqq = $("#ed_inputqq").val();
    var inputremark = $("#ed_inputremark").val();
    var inputformula = $("#ed_inputformula").val();
    var gongzi_currency = $("#ed_sel_gongzi_currency").val();
    var gongzi = $("#ed_inputgongzi").val();
    var addpricemethod = $("#ed_inputformulamethod").val();
    var baojiachaxunquanxian;
    if ($("#selectroles").val()==8 && $("#inputaddpricemethod").val()==0){
      // Qual.sdb(ee("该账户角色为[代理],请为其设置报价表的计价方式"));
      xtip.msg(ee("该账户角色为[代理],请为其设置报价表的计价方式"), {times: 4,icon: "w"});
      return;
    }
    if (gongzi_currency=="null") {
      // Qual.sdb(ee("对不起!基础工资计算币种不能为空"));
      xtip.msg(ee("对不起!基础工资计算币种不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(gongzi)) {
      // Qual.sdb(ee("对不起!基础工资不能为空"));
      xtip.msg(ee("对不起!基础工资不能为空"), {times: 4,icon: "e"});
      return;
    }
    // if (isEmpty(inputnickname)) {
    //   Qual.sdb("对不起!用户编号不能为空");
    //   return;
    // }
    if (isEmpty(inputusername)) {
      // Qual.sdb(ee("对不起!姓名不能为空"));
      xtip.msg(ee("对不起!姓名不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputphone)) {
      // Qual.sdb(ee("对不起!电话不能为空"));
      xtip.msg(ee("对不起!电话不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (iseditformula!="0"){
      if (isEmpty(inputformula)) {
        // Qual.sdb(ee("对不起!您启用了提成机制,请输入该账号的提成数值"));
        xtip.msg(ee("对不起!您启用了提成机制,请输入该账号的提成数值"), {times: 4,icon: "e"});
        return;
      }
    }
    switch ($("#ed_inputbaojiachaxunquanxian").prop("checked")) {
      case true:
        baojiachaxunquanxian = "1";
        break;
      case false:
        baojiachaxunquanxian = "0";
        break;
    }
    var da = JSON.stringify({
      m: "edit",
      userid: the_user_id,
      // username1: inputnickname,
      password: inputpassword,
      username2: inputusername,
      phone: inputphone,
      webchat: inputwebchat,
      qq: inputqq,
      roles: $("#ed_selectroles").val(),
      orginal: $("#ed_selectorginal").val(),
      remark: inputremark,
      formulamethod: iseditformula,
      formula: inputformula,
      gongzi_currency: gongzi_currency,
      gongzi: gongzi,
      addpricemethod: addpricemethod,
      baojiachaxunquanxian: baojiachaxunquanxian,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/userapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          window.location.href = "/roles";
        }
        xtip.close(loading);
      },
    });
  });
});
