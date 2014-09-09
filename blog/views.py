from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.db.models import Q

from blog.models import Catergory
from blog.models import Post
from blog.models import Tag

# Create your views here.
def catergory(request,catergory):
    found_catergory = get_object_or_404(Catergory,visible=True,name=catergory)
    posts = Post.objects.filter(catergories__in=[found_catergory],published=True).order_by("-created")
    if request.user.is_staff:
        posts = Post.objects.filter(catergories__in=[found_catergory]).order_by("-created")
    context = {
        "catergory":found_catergory,
        "posts":posts,
    }
    return render(request,"catergory.html",context)

def tags(request,tags):
    split_tags = tags.split("/")
    query = Q()
    for tag in split_tags:
        query = query | Q(tag__icontains=tag)
    tags = Tag.objects.filter(query)
    posts = Post.objects.filter(tags__in=tags,published=False).order_by("-created")
    if request.user.is_staff:
        posts = Post.objects.filter(tags__in=tags).order_by("-created")
    context = {
        "posts":posts,
        "tags":tags,
        }
    return render(request,"tags.html",context)



def post(request,catergory=None,slug=None):
    found_catergory = get_object_or_404(Catergory,visible=True,name=catergory)
    found_post = None
    if request.user.is_staff:
        found_post = get_object_or_404(Post,catergories=found_catergory,slug=slug)
    elif not request.user.is_staff:
        found_post = get_object_or_404(Post,catergories=found_catergory,slug=slug,published=True)
    context = {
        "post":found_post,
    }
    return render(request,"post.html",context)
