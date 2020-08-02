from django.http import JsonResponse
from .models import User
import json, smtplib, email


def send_test_mails(receiver):
    server = smtplib.SMTP('smtp.qq.com', 25)  # 发件人邮箱中的SMTP服务器，端口是25
    server.login("2290038501@qq.com", "这里填授权码")  # 发件人邮箱账号、邮箱授权码
    '''
    邮箱授权码的获得请看https://jingyan.baidu.com/article/fedf0737af2b4035ac8977ea.html
    获得后可以调用这个api用自己的邮箱发东西，请在使用前改成自己的邮箱及授权码
    发邮件详细教程见https://blog.csdn.net/chinesepython/article/details/82465947
    '''
    # msg.as_string()中as_string()是将msg(MIMEText或MIMEMultipart对象)变为str。
    server.sendmail("2290038501@qq.com", receiver, "testingtesting")  
    server.quit()


def register(request):
    status = ''
    if request.method == 'POST':
        data = json.loads(request.body, encoding='utf-8')
        username = data['username']
        user = User.objects.filter(username=username)
        if user:
            status = 'existed'
        else:
            user = User.objects.create(
                username=username,
                password=data['password'],
                email=data['email']
            )
            send_test_mails(data['email'])
            # 这里应该添加一下验证邮箱是否有效的逻辑
            user.save()
        return JsonResponse({'status': status})


def login(request):
    status = ''
    if request.method == 'POST':
        data = json.loads(request.body, encoding='utf-8')
        username = data['username']
        user_exist = User.objects.filter(
            username=data['username'],
            password=data['password']
        )
        if user_exist:
            status = 'success'
            user = User.objects.get(username=data['username'])
        else:
            status = 'failed'
        return JsonResponse({
            'status': status,
            'token': username,
            'user': {
                'name': user.username,
                'email': user.email,
                'createTime': user.createTime
            }
        })


def logout(request):
    return JsonResponse({})
