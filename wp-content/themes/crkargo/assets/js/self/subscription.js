$(function () {
  $(".addsubscriptionaccount").on("click", function () {
    var inputorginalname = $("#inputorginalname").val();
    var inputsubscriptiontime = $("#inputsubscriptiontime").val();
    var inputexpiredate = $("#inputexpiredate").val();
    if (isEmpty(inputorginalname)) {
      // Qual.sdb(ee("对不起!组织名称不能为空"));
      xtip.msg(ee("对不起!组织名称不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputsubscriptiontime)) {
      // Qual.sdb(ee("对不起!订阅起始时间不能为空"));
      xtip.msg(ee("对不起!订阅起始时间不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputexpiredate)) {
      // Qual.sdb(ee("对不起!订阅结束时间不能为空"));
      xtip.msg(ee("对不起!订阅结束时间不能为空"), {times: 4,icon: "e"});
      return;
    }

    var da = JSON.stringify({
      m: "add",
      orginalname: inputorginalname,
      subscriptiontime: inputsubscriptiontime,
      expiredate: inputexpiredate,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/subscriptionapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          window.location.href = "/subscription";
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
      url: appdomain + "wp-content/themes/crkargo/api/subscriptionapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          window.location.href = "/subscription";
        }
        xtip.close(loading);
      },
    });
  });

  var editid;
  $(".editaccount").on("click", function () {
    var id = $(this).attr("dataid");
    editid = id;
    if (id == "1") {
      $(".closeeditmodal").click();
      return;
    }
    var da = JSON.stringify({
      m: "getone",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/subscriptionapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          $("#ed_inputorginalname").val(data.orginalname);
          $("#ed_inputsubscriptiontime").val(data.subscriptiontime);
          $("#ed_inputexpiredate").val(data.expiredate);
        }
        xtip.close(loading);
      },
    });
  });

  $(".editsubscriptionaccount").on("click", function () {
    var id = editid;
    var inputorginalname = $("#ed_inputorginalname").val();
    var inputsubscriptiontime = $("#ed_inputsubscriptiontime").val();
    var inputexpiredate = $("#ed_inputexpiredate").val();
    if (isEmpty(inputorginalname)) {
      // Qual.sdb(ee("对不起!组织名称不能为空"));
      xtip.msg(ee("对不起!组织名称不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputsubscriptiontime)) {
      // Qual.sdb("对不起!订阅起始时间不能为空");
      xtip.msg(ee("对不起!订阅起始时间不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputexpiredate)) {
      // Qual.sdb("对不起!订阅结束时间不能为空");
      xtip.msg(ee("对不起!订阅结束时间不能为空"), {times: 4,icon: "e"});
      return;
    }

    var da = JSON.stringify({
      m: "edit",
      id: id,
      orginalname: inputorginalname,
      subscriptiontime: inputsubscriptiontime,
      expiredate: inputexpiredate,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/subscriptionapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.href = "/subscription";
        }
        xtip.close(loading);
      },
    });
  });
});
