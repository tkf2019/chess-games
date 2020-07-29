from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    email = models.EmailField()
    createTime = models.DateField(auto_now_add=True)
    modifyTime = models.DateField(auto_now=True)