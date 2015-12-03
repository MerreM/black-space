from django.shortcuts import render
from blog.models import Category
from blog.models import Post

def home(request):
    try:
        latest_post = Post.objects.filter(catergories__in=Category.objects.filter(visible=True,parent=None)).filter(published=True).latest()
    except Post.DoesNotExist:
        latest_post = None
    return render(request,"index.html",{"latest_post":latest_post})

def particles(request):
    return render(request,"particles.html")

# def liquid(request):
#     return render(request,"liquid.html")

def about_me(request):
    return render(request,"about_me.html")

def writing(request):
    parent_cats = Category.objects.filter(visible=True,parent=None)
    context = {"parent_cats":parent_cats}
    return render(request,"projects.html",context)

def canvas(request):
    return render(request,"canvas.html")

def life(request):
    return render(request,"life.html")