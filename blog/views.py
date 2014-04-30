from django.shortcuts import render
from django.shortcuts import get_object_or_404


from blog.models import Catergory
from blog.models import Post

# Create your views here.
def catergory(request,catergory):
    found_catergory = get_object_or_404(Catergory,visible=True,name=catergory)
    posts = Post.objects.filter(catergories__in=[found_catergory])
    context = {
        "catergory":found_catergory,
        "posts":posts,
    }
    return render(request,"catergory.html",context)

def post(request,catergory,post):
    pass
