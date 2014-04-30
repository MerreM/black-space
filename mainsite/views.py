from django.shortcuts import render
from blog.models import Catergory

def home(request):
    return render(request,"index.html",{})

def about_me(request):
    return render(request,"about_me.html",{})

def projects(request):
    parent_cats = Catergory.objects.filter(visible=True,parent=None)
    context = {
    "parent_cats":parent_cats,
    }
    return render(request,"projects.html",context)

def canvas(request):
    return render(request,"canvas.html",{})    
