$(function () {
  $("#inputpassword").keypress(function (even) {
    if (even.which == 13) {
      $("#loginbtn").click();
    }
  });

  $("#loginbtn").on("click", function () {
    var inputusername = $("#inputusername").val();
    var inputpassword = $("#inputpassword").val();
    if (isEmpty(inputusername)) {
      // Qual.sdb(ee("对不起!用户名不能为空"));
      xtip.msg(ee("对不起!用户名不能为空"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputpassword)) {
      // Qual.sdb(ee("对不起!密码不能为空"));
      xtip.msg(ee("对不起!密码不能为空"), {times: 4,icon: "e"});
      return;
    }

    var da = JSON.stringify({
      m: "login",
      username: inputusername,
      password: inputpassword,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "/wp-content/themes/crkargo/api/userapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(ee("登录失败"));
          xtip.msg(ee("登录失败"), {times: 4,icon: "e"});
        } else {
          window.location.href = "/dashboard";
        }
        xtip.close(loading);
      },
    });
  });
});
