$(function () {
  var qudaomingchengid;
  $(".savequdaobtn").on("click", function () {
    var qudaomingcheng = $("#inputqudaomingcheng").val();
    if (isEmpty(qudaomingcheng)) {
      Qual.sdb("对不起,渠道名称不能为空");
      return;
    }
    var da = JSON.stringify({
      m: "add",
      qudaomingcheng: qudaomingcheng,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/channelapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.reload();
        }
        xtip.close(loading);
      },
    });
  });

  $(".delqudao").on("click", function () {
    var id = $(this).attr("dataid");
    var da = JSON.stringify({
      m: "delete",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/channelapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.reload();
        }
        xtip.close(loading);
      },
    });
  });

  // 获取数据
  $(".editqudao").on("click", function () {
    var id = $(this).attr("dataid");
    qudaomingchengid = id;
    var da = JSON.stringify({
      m: "getone",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/channelapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          $("#ed_inputqudaomingcheng").val(data.qudaomingcheng);
        }
        xtip.close(loading);
      },
    });
  });

  // 提交编辑的数据
  $(".editqudaobtn").on("click", function () {
    var qudaomingcheng = $("#ed_inputqudaomingcheng").val();
    if (isEmpty(qudaomingcheng)) {
      Qual.sdb("对不起,渠道名称不能为空");
      return;
    }
    var da = JSON.stringify({
      m: "edit",
      id: qudaomingchengid,
      qudaomingcheng: qudaomingcheng,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/channelapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "e"});
        } else {
          window.location.reload();
        }
        xtip.close(loading);
      },
    });
  });

});
