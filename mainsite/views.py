from django.shortcuts import render
from mainsite.models import Post
# Create your views here.
def home(request):
    latest_post = Post.objects.latest('created')
    return render(request,"index.html",{"latest":latest_post})