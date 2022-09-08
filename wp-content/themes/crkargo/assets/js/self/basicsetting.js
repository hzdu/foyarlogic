$(function () {
  $(".savebtn").on("click", function () {
    var inputtoken = $('.inputtoken').val();
    var selcurrency = $("#selcurrency").val();
    var sms1id = $("#sms1").attr("dataid");
    var sms2id = $("#sms2").attr("dataid");
    var sms1 = $("#sms1").val();
    var sms2 = $("#sms2").val();
    var switchsms;
    if (isEmpty(inputtoken)) {
      // Qual.sdb(ee("对不起,签收密码不能为空"));
      xtip.msg(ee("对不起,签收密码不能为空"), {times: 4,icon: "e"});
      $(".inputtoken").focus();
      return;
    }
    switch ($(".switchsms").prop("checked")) {
      case true:
        switchsms = "1";
        break;
      case false:
        switchsms = "0";
        break;
    }
    var da = JSON.stringify({
      m: "edit",
      token: inputtoken,
      defaultcurrency: selcurrency,
      switchsms: switchsms,
      sms1id: sms1id,
      sms1: sms1,
      sms2id: sms2id,
      sms2: sms2,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/basicsettingapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        // Qual.sdb(data.msg);
        xtip.close(loading);
        xtip.msg(data.msg, {times: 4,icon: "s"});
      },
    });
  })


});
