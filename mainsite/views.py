from django.shortcuts import render
from blog.models import Catergory
from blog.models import Post

def home(request):
    latest_post = Post.objects.filter(catergories__in=Catergory.objects.filter(visible=True,parent=None)).filter(published=True).latest()
    return render(request,"index.html",{
        "latest_post":latest_post
        })

def about_me(request):
    return render(request,"about_me.html",{})

def writing(request):
    parent_cats = Catergory.objects.filter(visible=True,parent=None)
    context = {
        "parent_cats":parent_cats,
    }
    return render(request,"projects.html",context)

def canvas(request):
    return render(request,"canvas.html",{})    
