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
    var inputdollarwallet = $("#inputdollarwallet").val();
    var inputrublewallet = $("#inputrublewallet").val();
    var inputcustomercode = $("#inputcustomercode").val();
    var baojiachaxunquanxian;
    var userid = $("#sel_suoshuzhanghao").val();
    if (isEmpty(inputcustomercode)) {
      Qual.sdb("对不起!客户编码不能为空");
      return;
    }
    if (isEmpty(inputcustomer)) {
      Qual.sdb("对不起!客户姓名不能为空");
      return;
    }
    if (isEmpty(inputaddress)) {
      Qual.sdb("对不起!地址不能为空");
      return;
    }
    if (isEmpty(inputpostcode)) {
      Qual.sdb("对不起!邮政编码不能为空");
      return;
    }
    if (isEmpty(inputphone)) {
      Qual.sdb("对不起!电话不能为空");
      return;
    }
    if (parseInt(inputdollarwallet) < 0) {
      Qual.sdb("对不起,美金钱包余额不能小于0");
      return;
    }
    if (parseInt(inputrublewallet) < 0) {
      Qual.sdb("对不起,卢布钱包余额不能小于0");
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
      dollarwallet: inputdollarwallet,
      rublewallet: inputrublewallet,
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
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/customer";
        }
        xtip.close(loading);
      },
    });
  });

  $(".delaccount").on("click", function () {
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
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/customer";
        }
        xtip.close(loading);
      },
    });
  });

  var editid;
  $(".editaccount").on("click", function () {
    var id = $(this).attr("dataid");
    editid = id;
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
        if (data.code != 200) {
          // Qual.sdb(data.msg);
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
          $("#ed_inputdollarwallet").val(data.dollarwallet);
          $("#ed_inputrublewallet").val(data.rublewallet);
          $("#ed_inputcustomercode").val(data.customercode);
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
        xtip.close(loading);
      },
    });
  });

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
    var inputdollarwallet = $("#ed_inputdollarwallet").val();
    var inputrublewallet = $("#ed_inputrublewallet").val();
    var inputcustomercode = $("#ed_inputcustomercode").val();
    var baojiachaxunquanxian;
    var userid = $("#ed_sel_suoshuzhanghao").val();
    if (isEmpty(inputcustomercode)) {
      Qual.sdb("对不起!客户编码不能为空");
      return;
    }
    if (isEmpty(inputcustomer)) {
      Qual.sdb("对不起!客户姓名不能为空");
      return;
    }
    if (isEmpty(inputaddress)) {
      Qual.sdb("对不起!地址不能为空");
      return;
    }
    if (isEmpty(inputpostcode)) {
      Qual.sdb("对不起!邮政编码不能为空");
      return;
    }
    if (isEmpty(inputphone)) {
      Qual.sdb("对不起!电话号码不允许为空");
      return;
    }
    if (parseInt(inputdollarwallet) < 0) {
      Qual.sdb("对不起,美金钱包余额不能小于0");
      return;
    }
    if (parseInt(inputrublewallet) < 0) {
      Qual.sdb("对不起,卢布钱包余额不能小于0");
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
      dollarwallet: inputdollarwallet,
      rublewallet: inputrublewallet,
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
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/customer";
        }
        xtip.close(loading);
      },
    });
  });
});
