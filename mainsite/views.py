from django.shortcuts import render

def home(request):
    return render(request,"index.html",{})

def about_me(request):
    return render(request,"about_me.html",{})

def projects(request):
    return render(request,"projects.html",{})

def canvas(request):
    return render(request,"canvas.html",{})    
