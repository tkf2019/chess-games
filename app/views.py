from django.http import JsonResponse
from .models import User
import json


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
