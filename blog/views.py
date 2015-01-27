from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.http import HttpResponse
from django.http import HttpResponseNotFound

from blog.models import Catergory
from blog.models import Post
from blog.models import Tag
from blog.models import Readit
from blog.models import Vote

def writing(request):
    parent_cats = Catergory.objects.filter(visible=True,parent=None)
    posts = {}
    for cat in parent_cats:
        posts[cat]=cat.post_set.filter(published=True).order_by("-priority")[:3]
    context = {
        "posts":posts,
        "parent_cats":parent_cats,
    }
    return render(request,"writing.html",context)

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
    posts = Post.objects.filter(tags__in=tags,published=True).order_by("-created").distinct()
    if request.user.is_staff:
        posts = Post.objects.filter(tags__in=tags).order_by("-created").distinct()
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
        read_post(request,catergory,slug,percent=0)
    context = {
        "post":found_post,
    }
    return render(request,"post.html",context)

def read_post(request,catergory=None,slug=None,percent=0):
    found_catergory = get_object_or_404(Catergory,visible=True,name=catergory)
    found_post = get_object_or_404(Post,catergories=found_catergory,slug=slug,published=True)
    ip_address = request.META.get("REMOTE_ADDR")
    read_item_exists = Readit.objects.filter(user_id=ip_address,post=found_post).exists()
    if read_item_exists:
        read_item =  Readit.objects.get(user_id=ip_address,post=found_post)
        if read_item.percentage_read < percent:
            read_item.percentage_read = percent
            read_item.save()
    else:
        Readit.objects.create(user_id=ip_address,post=found_post,percentage_read=0)
    return HttpResponse(status=203)

def liked_post(request,catergory=None,slug=None):
    found_catergory = get_object_or_404(Catergory,visible=True,name=catergory)
    found_post = get_object_or_404(Post,catergories=found_catergory,slug=slug)
    if not Vote.objects.filter(user_id=request.META["REMOTE_ADDR"],post=found_post).exists():
        Vote.objects.create(user_id=request.META["REMOTE_ADDR"],post=found_post)
    return HttpResponse(status=203)
