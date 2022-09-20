$(function () {
  $(".addcustomeraccount").on("click", function () {
    var inputcustomer = $("#inputcustomer").val();
    var inputaddress = $("#inputaddress").val();
    var inputpostcode = $("#inputpostcode").val();
    var inputphone = $("#inputphone").val();
    var inputemail = $("#inputemail").val();
    var inputwebchat = $("#inputwebchat").val();
    var inputwhatsapp = $("#inputwhatsapp").val();
    var inputtelegram = $("#inputtelegram").val();
    var inputremark = $("#inputremark").val();
    var inputcustomercode = $("#inputcustomercode").val();
    var baojiachaxunquanxian;
    var userid = $("#sel_suoshuzhanghao").val();
    if (isEmpty(inputcustomercode)) {
      xtip.msg(ee("对不起!客户编码不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputcustomer)) {
      Qual.sdb("对不起!客户姓名不能为空");xtip.msg(ee("对不起!客户编码不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputaddress)) {
      xtip.msg(ee("对不起!地址不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputpostcode)) {
      xtip.msg(ee("对不起!邮政编码不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputphone)) {
      xtip.msg(ee("对不起!电话不能为空"), {times: 4,icon: "e"});
      return;
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
      userid: userid,
      customer: inputcustomer,
      address: inputaddress,
      postcode: inputpostcode,
      phone: inputphone,
      email: inputemail,
      webchat: inputwebchat,
      whatsapp: inputwhatsapp,
      telegram: inputtelegram,
      remark: inputremark,
      customercode: inputcustomercode,
      baojiachaxunquanxian: baojiachaxunquanxian,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/customerapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        xtip.close(loading);
        if (data.code != 200) {
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/customer";
        }
      },
    });
  });

  $("body").on("click", ".delaccount",function () {
    var id = $(this).attr("dataid");
    var da = JSON.stringify({
      m: "delete",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/customerapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/customer";
        }
        xtip.close(loading);
      },
    });
  });

  var editid;
  $("body").on("click", ".editaccount",function () {
    var id = $(this).attr("dataid");
    editid = id;
    $("#ed_inp_wallet").val(0);
    var da = JSON.stringify({
      m: "getone",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/customerapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        xtip.close(loading);
        if (data.code != 200) {
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          $("#ed_inputcustomer").val(data.customername);
          $("#ed_inputaddress").val(data.address);
          $("#ed_inputpostcode").val(data.postcode);
          $("#ed_inputphone").val(data.phone);
          $("#ed_inputemail").val(data.email);
          $("#ed_inputwebchat").val(data.webchat);
          $("#ed_inputwhatsapp").val(data.whatsapp);
          $("#ed_inputtelegram").val(data.telegram);
          $("#ed_inputremark").val(data.remark);
          $("#ed_inp_wallet_yuanzhi").val(data.wallet);
          switch (data.baojiachaxunquanxian) {
            case "0":
              $("#ed_inputbaojiachaxunquanxian").prop("checked", false);
              break;
            case "1":
              $("#ed_inputbaojiachaxunquanxian").prop("checked", true);
              break;
          }
          $("#ed_sel_suoshuzhanghao").val(data.userid);
        }
      },
    });
  });
  
  $("body").on("click", ".wallet",function () {
    var id = editid;
    var inp_wallet_yuanzhi = $("#ed_inp_wallet_yuanzhi").val();
    var inp_wallet = $("#ed_inp_wallet").val();
    if (parseInt(inp_wallet_yuanzhi) < 0) {
      xtip.msg(ee("对不起,钱包余额不能小于0"), {times: 4,icon: "e"});
      return;
    }
    if (parseInt(inp_wallet) < 0) {
      xtip.msg(ee("对不起,新增/减少的数值不能小于0"), {times: 4,icon: "e"});
      return;
    }
    var da = JSON.stringify({
      m: "savewallet",
      id: id,
      cz: $("#ed_caozuofu").val(),
      wallet_yuanzhi: inp_wallet_yuanzhi,
      wallet: inp_wallet,
    });
    loading = xtip.load();
    $.ajax({
        type: "POST",
        url: appdomain + "wp-content/themes/crkargo/api/customerapi.php",
        contentType: "application/json;charset=UTF-8",
        data: da,
        success: function (data) {
            xtip.close(loading);
            if (data.code != 200) {
              xtip.msg(data.msg, {times: 4,icon: "w"});
            } else {
              $("#ed_inp_wallet").val(0);
              $("#ed_inp_wallet_yuanzhi").val(data.wallet);
              xtip.msg(data.msg, {times: 4,icon: "s"});
            }
        },
    });
  })

  $(".editcustomeraccount").on("click", function () {
    var id = editid;
    var inputcustomer = $("#ed_inputcustomer").val();
    var inputaddress = $("#ed_inputaddress").val();
    var inputpostcode = $("#ed_inputpostcode").val();
    var inputphone = $("#ed_inputphone").val();
    var inputemail = $("#ed_inputemail").val();
    var inputwebchat = $("#ed_inputwebchat").val();
    var inputwhatsapp = $("#ed_inputwhatsapp").val();
    var inputtelegram = $("#ed_inputtelegram").val();
    var inputremark = $("#ed_inputremark").val();
    // var inputcustomercode = $("#ed_inputcustomercode").val();
    var baojiachaxunquanxian;
    var userid = $("#ed_sel_suoshuzhanghao").val();
    // if (isEmpty(inputcustomercode)) {
    //   xtip.msg(ee("对不起!客户编码不能为空"), {times: 4,icon: "e"});
    //   return;
    // }
    if (isEmpty(inputcustomer)) {
      xtip.msg(ee("对不起!客户姓名不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputaddress)) {
      xtip.msg(ee("对不起!地址不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputpostcode)) {
      xtip.msg(ee("对不起!邮政编码不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputphone)) {
      xtip.msg(ee("对不起!电话号码不允许为空"), {times: 4,icon: "e"});
      return;
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
      id: id,
      userid: userid,
      customer: inputcustomer,
      address: inputaddress,
      postcode: inputpostcode,
      phone: inputphone,
      email: inputemail,
      webchat: inputwebchat,
      whatsapp: inputwhatsapp,
      telegram: inputtelegram,
      remark: inputremark,
      customercode: inputcustomercode,
      baojiachaxunquanxian: baojiachaxunquanxian,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/customerapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        xtip.close(loading);
        if (data.code != 200) {
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/customer";
        }
      },
    });
  });
});
