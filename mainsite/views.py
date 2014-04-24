from django.shortcuts import render
from mainsite.models import Post


def home(request):
    # latest_post = Post.objects.latest('created')
    return render(request,"index.html",{})

def about_me(request):
    return render(request,"about_me.html",{})

def projects(request):
    return render(request,"index.html",{})
