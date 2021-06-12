$(function () {
	//初始是登录页面
	$('.reg').hide();
	//"去注册"的链接
	$('#link_reg').on('click', function () {
		$('.login').hide();
		$('.reg').show();
	})
	//"回到登录"的链接
	$('#link_login').on('click', function () {
		$('.reg').hide();
		$('.login').show();
	})

	//从layui中获取form对象
	var form = layui.form;
	//自定义一个校验规则
	form.verify({
		//密码的校验规则
		pwd: [
			/^[\S]{6,12}$/
			, '密码必须6到12位，且不能出现空格'
		],
		//密码的确认
		rpwd: function (value) {
			var pwd = $('.reg [name=password]').val();
			if (pwd !== value) {
				return '两次输入的密码不一致';
			}
		}
	})

	//监听注册表单的提交事件
	$('#form_reg').on('submit', function (e) {
		e.preventDefault();
		$.post('/api/reguser', {
			username: $('#form_reg [name=title]').val(),
			password: $('#form_reg [name=password]').val()
		}, function (res) {
			if (res.status !== 0) {
				//使用layer里面的提示
				return layer.msg(res.message);
			}
			layer.msg('注册成功,即将跳转至登录界面', function () {
				$('#link_login').click();
			});
		})
	})


	// 监听登录表单的提交事件
	$('#form_login').submit(function (e) {
		// 阻止默认提交行为
		e.preventDefault()
		$.ajax({
			url: '/api/login',
			method: 'POST',
			// 快速获取表单中的数据
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('登录失败！')
				}
				layer.msg('登录成功！')
				localStorage.setItem('token',res.token)
				location.href = '/index.html';
			}
		})
	})
})