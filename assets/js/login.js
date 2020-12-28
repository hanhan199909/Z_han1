$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击登录按钮
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  // 从layui获取form表单
  const { form, layer } = layui;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      const pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "俩次密码不一致";
      }
    },
  });
  // 监听表单提交事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/reguser",
      method: "POST",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) {
          layer.msg(res.message || "注册失败");
          return;
        }
        layer.msg(res.message || "注册成功");
        $("#link_login").click();
      },
    });
  });

  // 监听登录表单事件
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message);
          return;
        }
        layer.msg("登录成功");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
